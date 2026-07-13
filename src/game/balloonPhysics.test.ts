import { describe, expect, it } from 'vitest'
import { createInitialBalloons, splitBalloon, updateBalloon } from './balloonPhysics'
import { INITIAL_BALLOON_COUNT, MAX_STAGE, STAGE_RADIUS } from './constants'

describe('createInitialBalloons', () => {
  it('mission1 설정에 맞는 개수의 stage 0 풍선을 생성한다', () => {
    const balloons = createInitialBalloons()

    expect(balloons).toHaveLength(INITIAL_BALLOON_COUNT)
    for (const balloon of balloons) {
      expect(balloon.stage).toBe(0)
      expect(balloon.radius).toBe(STAGE_RADIUS[0])
    }
  })
})

describe('updateBalloon', () => {
  it('중력에 의해 vy가 증가한다', () => {
    const balloon = { id: 0, x: 100, y: 100, vx: 0, vy: 0, radius: 20, stage: 0 }

    const next = updateBalloon(balloon, 0.1)

    expect(next.vy).toBeGreaterThan(0)
  })

  it('왼쪽 벽에 부딪히면 vx의 방향이 반전되고 경계 안에 위치한다', () => {
    const balloon = { id: 0, x: 5, y: 100, vx: -50, vy: 0, radius: 20, stage: 0 }

    const next = updateBalloon(balloon, 1)

    expect(next.vx).toBeGreaterThan(0)
    expect(next.x).toBeGreaterThanOrEqual(next.radius)
  })

  it('바닥에 부딪히면 vy가 위쪽(음수)으로 반전된다', () => {
    const balloon = { id: 0, x: 100, y: 590, vx: 0, vy: 300, radius: 20, stage: 0 }

    const next = updateBalloon(balloon, 1)

    expect(next.vy).toBeLessThan(0)
  })
})

describe('splitBalloon', () => {
  it('최대 단계 미만인 풍선은 한 단계 작은 풍선 2개로 분열한다', () => {
    const balloon = { id: 0, x: 100, y: 100, vx: 50, vy: -50, radius: STAGE_RADIUS[0], stage: 0 }
    let id = 100

    const result = splitBalloon(balloon, () => id++)

    expect(result).toHaveLength(2)
    expect(result[0].stage).toBe(1)
    expect(result[1].stage).toBe(1)
    expect(result[0].radius).toBe(STAGE_RADIUS[1])
    expect(result[0].vx).toBe(-result[1].vx)
  })

  it('최대 단계인 풍선은 분열 없이 사라진다', () => {
    const balloon = { id: 0, x: 100, y: 100, vx: 50, vy: -50, radius: STAGE_RADIUS[MAX_STAGE], stage: MAX_STAGE }

    const result = splitBalloon(balloon, () => 1)

    expect(result).toHaveLength(0)
  })
})
