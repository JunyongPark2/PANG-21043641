import { useEffect, useRef } from 'react'

// 탭이 백그라운드에 있다가 돌아오는 등 프레임 간격이 크게 벌어졌을 때 물리 연산이
// 한 번에 크게 튀지 않도록 프레임당 델타 타임 상한을 둔다.
const MAX_DELTA_TIME = 0.1 // seconds

export function useGameLoop(callback: (deltaTime: number) => void) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    let frameId: number
    let lastTime = performance.now()

    const tick = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, MAX_DELTA_TIME)
      lastTime = time
      callbackRef.current(deltaTime)
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [])
}
