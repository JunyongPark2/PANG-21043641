import { useRef, useState } from 'react'
import { CHARACTER_SPEED, CHARACTER_WIDTH, FIELD_HEIGHT, FIELD_WIDTH, WEAPON_SPEED } from '../game/constants'
import type { Weapon as WeaponType } from '../game/types'
import { useGameLoop } from '../game/useGameLoop'
import { useKeyboard } from '../game/useKeyboard'
import Character from './Character'
import Weapon from './Weapon'

function Mission1Screen() {
  const [characterX, setCharacterX] = useState((FIELD_WIDTH - CHARACTER_WIDTH) / 2)
  const [weapons, setWeapons] = useState<WeaponType[]>([])
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
      </div>
    </div>
  )
}

export default Mission1Screen
