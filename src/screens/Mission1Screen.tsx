import { useState } from 'react'
import { CHARACTER_SPEED, CHARACTER_WIDTH, FIELD_HEIGHT, FIELD_WIDTH } from '../game/constants'
import { useGameLoop } from '../game/useGameLoop'
import { useKeyboard } from '../game/useKeyboard'
import Character from './Character'

function Mission1Screen() {
  const [characterX, setCharacterX] = useState((FIELD_WIDTH - CHARACTER_WIDTH) / 2)
  const pressedKeys = useKeyboard()

  useGameLoop((deltaTime) => {
    let direction = 0
    if (pressedKeys.current.has('ArrowLeft')) direction -= 1
    if (pressedKeys.current.has('ArrowRight')) direction += 1

    if (direction === 0) return

    setCharacterX((x) => {
      const next = x + direction * CHARACTER_SPEED * deltaTime
      return Math.min(Math.max(next, 0), FIELD_WIDTH - CHARACTER_WIDTH)
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
      </div>
    </div>
  )
}

export default Mission1Screen
