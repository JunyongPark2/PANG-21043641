import { describe, expect, it } from 'vitest'
import { isHit } from './collision'

describe('isHit', () => {
  it('점이 원 안에 있으면 true를 반환한다', () => {
    expect(isHit({ x: 10, y: 10 }, { x: 10, y: 10, radius: 5 })).toBe(true)
  })

  it('점이 원 경계에 있으면 true를 반환한다', () => {
    expect(isHit({ x: 15, y: 10 }, { x: 10, y: 10, radius: 5 })).toBe(true)
  })

  it('점이 원 밖에 있으면 false를 반환한다', () => {
    expect(isHit({ x: 20, y: 20 }, { x: 10, y: 10, radius: 5 })).toBe(false)
  })
})
