import { useRef, useState } from 'react'
import { createInitialBalloons, splitBalloon, updateBalloon } from '../game/balloonPhysics'
import { isHit, isRectCircleHit } from '../game/collision'
import {
  CHARACTER_HEIGHT,
  CHARACTER_SPEED,
  CHARACTER_WIDTH,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  INITIAL_BALLOON_COUNT,
  TIME_LIMIT_SECONDS,
  WEAPON_SPEED,
} from '../game/constants'
import type { Balloon as BalloonType, MissionStatus, Weapon as WeaponType } from '../game/types'
import { useGameLoop } from '../game/useGameLoop'
import { useKeyboard } from '../game/useKeyboard'
import Balloon from './Balloon'
import Character from './Character'
import ResultOverlay from './ResultOverlay'
import Weapon from './Weapon'

function Mission1Screen() {
  const [characterX, setCharacterX] = useState((FIELD_WIDTH - CHARACTER_WIDTH) / 2)
  const [weapons, setWeapons] = useState<WeaponType[]>([])
  const [balloons, setBalloons] = useState<BalloonType[]>(createInitialBalloons)
  const [status, setStatus] = useState<MissionStatus>('playing')
  const [remainingTime, setRemainingTime] = useState(TIME_LIMIT_SECONDS)
  const pressedKeys = useKeyboard()
  const nextWeaponId = useRef(0)
  const nextBalloonId = useRef(INITIAL_BALLOON_COUNT)
  const wasSpacePressed = useRef(false)

  useGameLoop((deltaTime) => {
    if (status !== 'playing') return

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

    let nextWeapons = weapons
      .map((weapon) => ({ ...weapon, y: weapon.y - WEAPON_SPEED * deltaTime }))
      .filter((weapon) => weapon.y >= 0)

    if (shouldFire) {
      nextWeapons = [
        ...nextWeapons,
        {
          id: nextWeaponId.current++,
          x: currentCharacterX + CHARACTER_WIDTH / 2,
          y: FIELD_HEIGHT - CHARACTER_WIDTH,
        },
      ]
    }

    let nextBalloons = balloons.map((balloon) => updateBalloon(balloon, deltaTime))

    const hitWeaponIds = new Set<number>()
    const hitBalloonIds = new Set<number>()

    for (const balloon of nextBalloons) {
      if (hitBalloonIds.has(balloon.id)) continue
      const weapon = nextWeapons.find((w) => !hitWeaponIds.has(w.id) && isHit(w, balloon))
      if (weapon) {
        hitWeaponIds.add(weapon.id)
        hitBalloonIds.add(balloon.id)
      }
    }

    if (hitBalloonIds.size > 0) {
      nextWeapons = nextWeapons.filter((weapon) => !hitWeaponIds.has(weapon.id))

      const survivors = nextBalloons.filter((balloon) => !hitBalloonIds.has(balloon.id))
      const spawned = nextBalloons
        .filter((balloon) => hitBalloonIds.has(balloon.id))
        .flatMap((balloon) => splitBalloon(balloon, () => nextBalloonId.current++))

      nextBalloons = [...survivors, ...spawned]
    }

    setWeapons(nextWeapons)
    setBalloons(nextBalloons)

    const nextRemainingTime = remainingTime - deltaTime
    setRemainingTime(nextRemainingTime)

    const characterRect = {
      x: currentCharacterX,
      y: FIELD_HEIGHT - CHARACTER_HEIGHT,
      width: CHARACTER_WIDTH,
      height: CHARACTER_HEIGHT,
    }
    const hitCharacter = nextBalloons.some((balloon) => isRectCircleHit(characterRect, balloon))

    if (hitCharacter || nextRemainingTime <= 0) {
      setStatus('failed')
    } else if (nextBalloons.length === 0) {
      setStatus('cleared')
    }
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
        {status !== 'playing' && <ResultOverlay status={status} />}
      </div>
    </div>
  )
}

export default Mission1Screen
