import {
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GRAVITY,
  INITIAL_BALLOON_COUNT,
  INITIAL_BALLOON_SPEED,
  MAX_STAGE,
  SPLIT_BALLOON_SPEED,
  SPLIT_BALLOON_VY,
  STAGE_RADIUS,
} from './constants'
import type { Balloon } from './types'

export function createInitialBalloons(): Balloon[] {
  const radius = STAGE_RADIUS[0]
  return Array.from({ length: INITIAL_BALLOON_COUNT }, (_, index) => ({
    id: index,
    x: ((index + 1) * FIELD_WIDTH) / (INITIAL_BALLOON_COUNT + 1),
    y: radius * 2,
    vx: index % 2 === 0 ? INITIAL_BALLOON_SPEED : -INITIAL_BALLOON_SPEED,
    vy: 0,
    radius,
    stage: 0,
  }))
}

export function updateBalloon(balloon: Balloon, deltaTime: number): Balloon {
  let { x, y, vx, vy } = balloon
  const { radius } = balloon

  vy += GRAVITY * deltaTime
  x += vx * deltaTime
  y += vy * deltaTime

  if (x - radius < 0) {
    x = radius
    vx = -vx
  } else if (x + radius > FIELD_WIDTH) {
    x = FIELD_WIDTH - radius
    vx = -vx
  }

  if (y + radius > FIELD_HEIGHT) {
    y = FIELD_HEIGHT - radius
    vy = -Math.abs(vy)
  } else if (y - radius < 0) {
    y = radius
    vy = Math.abs(vy)
  }

  return { ...balloon, x, y, vx, vy }
}

export function splitBalloon(balloon: Balloon, nextId: () => number): Balloon[] {
  if (balloon.stage >= MAX_STAGE) return []

  const stage = balloon.stage + 1
  const radius = STAGE_RADIUS[stage]

  return [
    { id: nextId(), x: balloon.x, y: balloon.y, vx: SPLIT_BALLOON_SPEED, vy: SPLIT_BALLOON_VY, radius, stage },
    { id: nextId(), x: balloon.x, y: balloon.y, vx: -SPLIT_BALLOON_SPEED, vy: SPLIT_BALLOON_VY, radius, stage },
  ]
}
