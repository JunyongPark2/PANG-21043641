import { describe, expect, it } from 'vitest'
import { isHit, isRectCircleHit } from './collision'

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

describe('isRectCircleHit', () => {
  const rect = { x: 100, y: 100, width: 40, height: 60 }

  it('원이 사각형과 겹치면 true를 반환한다', () => {
    expect(isRectCircleHit(rect, { x: 120, y: 90, radius: 15 })).toBe(true)
  })

  it('원이 사각형 안에 완전히 있으면 true를 반환한다', () => {
    expect(isRectCircleHit(rect, { x: 120, y: 130, radius: 5 })).toBe(true)
  })

  it('원이 사각형과 떨어져 있으면 false를 반환한다', () => {
    expect(isRectCircleHit(rect, { x: 500, y: 500, radius: 15 })).toBe(false)
  })
})
