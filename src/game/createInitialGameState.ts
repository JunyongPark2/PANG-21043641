import { createInitialBalloons } from './balloonPhysics'
import { CHARACTER_WIDTH, FIELD_WIDTH, TIME_LIMIT_SECONDS } from './constants'
import type { Balloon, MissionStatus, Weapon } from './types'

export type GameState = {
  characterX: number
  weapons: Weapon[]
  balloons: Balloon[]
  status: MissionStatus
  remainingTime: number
}

export function createInitialGameState(): GameState {
  return {
    characterX: (FIELD_WIDTH - CHARACTER_WIDTH) / 2,
    weapons: [],
    balloons: createInitialBalloons(),
    status: 'playing',
    remainingTime: TIME_LIMIT_SECONDS,
  }
}
