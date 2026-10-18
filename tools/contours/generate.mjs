// Builds src/assets/ushuaia-contours.svg from AWS Terrain Tiles (terrarium encoding).
// Run once: node tools/contours/generate.mjs. Tiles are cached in tools/contours/.cache/.
import { contours } from 'd3-contour'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'

const here = dirname(fileURLToPath(import.meta.url))
const cache = join(here, '.cache')
const out = join(here, '../../src/assets/ushuaia-contours.svg')

const Z = 11
const BBOX = { north: -54.7, south: -54.86, west: -68.45, east: -68.2 }
const STEP = Number(process.env.STEP ?? 100)
const WIDTH = 1200

const tileX = (lon) => ((lon + 180) / 360) * 2 ** Z
const tileY = (lat) => {
  const r = (lat * Math.PI) / 180
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** Z
}

async function tile(x, y) {
  const file = join(cache, `${Z}-${x}-${y}.png`)
  if (!existsSync(file)) {
    const res = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${x}/${y}.png`)
    if (!res.ok) throw new Error(`tile ${x}/${y}: HTTP ${res.status}`)
    writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  }
  return PNG.sync.read(readFileSync(file))
}

mkdirSync(cache, { recursive: true })
const fx0 = tileX(BBOX.west), fx1 = tileX(BBOX.east)
const fy0 = tileY(BBOX.north), fy1 = tileY(BBOX.south)
const tx0 = Math.floor(fx0), tx1 = Math.floor(fx1), ty0 = Math.floor(fy0), ty1 = Math.floor(fy1)

// Pixel window of the bbox inside the stitched tiles.
const px0 = Math.round((fx0 - tx0) * 256), py0 = Math.round((fy0 - ty0) * 256)
const w = Math.round((fx1 - fx0) * 256), h = Math.round((fy1 - fy0) * 256)
const heights = new Float64Array(w * h)

for (let ty = ty0; ty <= ty1; ty++)
  for (let tx = tx0; tx <= tx1; tx++) {
    const png = await tile(tx, ty)
    for (let y = 0; y < 256; y++)
      for (let x = 0; x < 256; x++) {
        const gx = (tx - tx0) * 256 + x - px0, gy = (ty - ty0) * 256 + y - py0
        if (gx < 0 || gy < 0 || gx >= w || gy >= h) continue
        const i = (y * 256 + x) * 4
        const d = png.data
        heights[gy * w + gx] = d[i] * 256 + d[i + 1] + d[i + 2] / 256 - 32768
      }
  }

const thresholds = [1]
for (let t = STEP; t <= 1400; t += STEP) thresholds.push(t)

// Ramer–Douglas–Peucker: drop points closer than TOL grid pixels to the simplified line.
const TOL = Number(process.env.TOL ?? 2)
function simplify(pts) {
  if (pts.length < 3) return pts
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1]
  const len = Math.hypot(bx - ax, by - ay) || 1
  let max = 0, idx = 0
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((bx - ax) * (ay - pts[i][1]) - (ax - pts[i][0]) * (by - ay)) / len
    if (d > max) {
      max = d
      idx = i
    }
  }
  if (max <= TOL) return [pts[0], pts[pts.length - 1]]
  return [...simplify(pts.slice(0, idx + 1)).slice(0, -1), ...simplify(pts.slice(idx))]
}

// Closed rings start and end on the same point, so split them in half first.
const simplifyRing = (ring) => {
  const mid = Math.floor(ring.length / 2)
  return [...simplify(ring.slice(0, mid + 1)).slice(0, -1), ...simplify(ring.slice(mid))]
}

// d3-contour closes rings along the grid edge; those edge runs would draw a frame, so cut them out.
const onEdge = ([x, y]) => x <= 0.5 || y <= 0.5 || x >= w - 0.5 || y >= h - 0.5
function openAtEdges(ring) {
  if (!ring.some(onEdge)) return [simplifyRing(ring)]
  const runs = []
  let run = []
  for (const p of ring) {
    if (onEdge(p)) {
      if (run.length) {
        runs.push(run)
        run = []
      }
    } else run.push(p)
  }
  if (run.length) runs.push(run)
  return runs.filter((r) => r.length > 8).map(simplify)
}

// One Chaikin pass rounds off the grid's staircase corners.
const smooth = (pts) =>
  pts.length < 3
    ? pts
    : [pts[0], ...pts.slice(0, -1).flatMap(([x0, y0], i) => {
        const [x1, y1] = pts[i + 1]
        return [[0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1], [0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1]]
      }), pts[pts.length - 1]]

const k = WIDTH / w
const fmt = (n) => (Math.round(n * k * 10) / 10).toString()
const paths = contours().size([w, h]).thresholds(thresholds)(Array.from(heights))
  .map((c) =>
    c.coordinates
      .flat()
      .filter((ring) => ring.length > 12)
      .flatMap(openAtEdges)
      .filter((line) => line.length > 3)
      .map(smooth)
      .map((line) => 'M' + line.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L'))
      .join(''),
  )
  .filter(Boolean)
  .map((d) => `<path d="${d}"/>`)
  .join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${Math.round(h * k)}" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke">${paths}</svg>\n`
writeFileSync(out, svg)
console.log(`wrote ${out}: ${(svg.length / 1024).toFixed(1)} KB, ${w}x${h} px grid, step ${STEP} m`)
