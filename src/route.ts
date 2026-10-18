// The page reads as a trip along the meridian: Ushuaia at the top, Cologne at the bottom.
export const START_LAT = -54.8
export const END_LAT = 50.94

export function latitudeAt(progress: number): number {
  const p = Math.min(1, Math.max(0, progress))
  return START_LAT + p * (END_LAT - START_LAT)
}

export function formatLat(lat: number): string {
  const value = Math.abs(lat).toFixed(1)
  if (value === '0.0') return '0.0°'
  return `${value}°${lat < 0 ? 'S' : 'N'}`
}

/** Where a latitude sits on the route, from 0 (start) to 1 (end). */
export const progressOf = (lat: number) => (lat - START_LAT) / (END_LAT - START_LAT)
