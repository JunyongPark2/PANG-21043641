import { useEffect, useRef } from 'react'

export function useKeyboard() {
  const pressedKeys = useRef(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
