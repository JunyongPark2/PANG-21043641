import { useEffect, useRef } from 'react'

export function useGameLoop(callback: (deltaTime: number) => void) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    let frameId: number
    let lastTime = performance.now()

    const tick = (time: number) => {
      const deltaTime = (time - lastTime) / 1000
      lastTime = time
      callbackRef.current(deltaTime)
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [])
}
