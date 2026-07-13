import { useRef, useState } from 'react'
import {
  CHARACTER_SPEED,
  CHARACTER_WIDTH,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  GRAVITY,
  INITIAL_BALLOON_COUNT,
  INITIAL_BALLOON_SPEED,
  STAGE_RADIUS,
  WEAPON_SPEED,
} from '../game/constants'
import type { Balloon as BalloonType, Weapon as WeaponType } from '../game/types'
import { useGameLoop } from '../game/useGameLoop'
import { useKeyboard } from '../game/useKeyboard'
import Balloon from './Balloon'
import Character from './Character'
import Weapon from './Weapon'

function createInitialBalloons(): BalloonType[] {
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

function updateBalloon(balloon: BalloonType, deltaTime: number): BalloonType {
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
  }

  return { ...balloon, x, y, vx, vy }
}

function Mission1Screen() {
  const [characterX, setCharacterX] = useState((FIELD_WIDTH - CHARACTER_WIDTH) / 2)
  const [weapons, setWeapons] = useState<WeaponType[]>([])
  const [balloons, setBalloons] = useState<BalloonType[]>(createInitialBalloons)
  const pressedKeys = useKeyboard()
  const nextWeaponId = useRef(0)
  const wasSpacePressed = useRef(false)

  useGameLoop((deltaTime) => {
    let direction = 0
    if (pressedKeys.current.has('ArrowLeft')) direction -= 1
    if (pressedKeys.current.has('ArrowRight')) direction += 1

    let currentCharacterX = characterX
    if (direction !== 0) {
      currentCharacterX = Math.min(
        Math.max(characterX + direction * CHARACTER_SPEED * deltaTime, 0),
        FIELD_WIDTH - CHARACTER_WIDTH,
      )
      setCharacterX(currentCharacterX)
    }

    const isSpacePressed = pressedKeys.current.has(' ')
    const shouldFire = isSpacePressed && !wasSpacePressed.current
    wasSpacePressed.current = isSpacePressed

    setWeapons((prev) => {
      let next = prev
        .map((weapon) => ({ ...weapon, y: weapon.y - WEAPON_SPEED * deltaTime }))
        .filter((weapon) => weapon.y >= 0)

      if (shouldFire) {
        next = [
          ...next,
          {
            id: nextWeaponId.current++,
            x: currentCharacterX + CHARACTER_WIDTH / 2,
            y: FIELD_HEIGHT - CHARACTER_WIDTH,
          },
        ]
      }

      return next
    })

    setBalloons((prev) => prev.map((balloon) => updateBalloon(balloon, deltaTime)))
  })

  return (
    <div>
      <h1>Mission 1</h1>
      <div
        style={{
          position: 'relative',
          width: FIELD_WIDTH,
          height: FIELD_HEIGHT,
          overflow: 'hidden',
          backgroundColor: '#eef',
        }}
      >
        <Character x={characterX} />
        {weapons.map((weapon) => (
          <Weapon key={weapon.id} x={weapon.x} y={weapon.y} />
        ))}
        {balloons.map((balloon) => (
          <Balloon key={balloon.id} x={balloon.x} y={balloon.y} radius={balloon.radius} stage={balloon.stage} />
        ))}
      </div>
    </div>
  )
}

export default Mission1Screen
