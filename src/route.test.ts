import { describe, expect, test } from 'vitest'
import { formatLat, latitudeAt } from './route'

describe('latitudeAt', () => {
  test('starts in Ushuaia and ends in Cologne', () => {
    expect(latitudeAt(0)).toBeCloseTo(-54.8)
    expect(latitudeAt(1)).toBeCloseTo(50.94)
  })
  test('is linear in between', () => {
    expect(latitudeAt(0.5)).toBeCloseTo((-54.8 + 50.94) / 2)
  })
  test('clamps progress outside 0..1 (overscroll)', () => {
    expect(latitudeAt(-0.2)).toBeCloseTo(-54.8)
    expect(latitudeAt(1.3)).toBeCloseTo(50.94)
  })
})

describe('formatLat', () => {
  test('south and north with one decimal', () => {
    expect(formatLat(-54.8)).toBe('54.8°S')
    expect(formatLat(50.94)).toBe('50.9°N')
    expect(formatLat(-12.44)).toBe('12.4°S')
  })
  test('the equator has no hemisphere', () => {
    expect(formatLat(0.01)).toBe('0.0°')
    expect(formatLat(-0.04)).toBe('0.0°')
  })
})
