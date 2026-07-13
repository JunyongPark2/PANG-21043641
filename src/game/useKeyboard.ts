import { useEffect, useRef } from 'react'

const GAME_KEYS = new Set(['ArrowLeft', 'ArrowRight', ' '])

export function useKeyboard() {
  const pressedKeys = useRef(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (GAME_KEYS.has(event.key)) event.preventDefault()
      pressedKeys.current.add(event.key)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.current.delete(event.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return pressedKeys
}
