import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FIELD_HEIGHT, FIELD_WIDTH, INITIAL_BALLOON_COUNT } from '../game/constants'
import Mission1Screen from './Mission1Screen'

function getBalloonElements() {
  return Array.from(document.querySelectorAll('div[style*="border-radius: 50%"]')) as HTMLElement[]
}

describe('Mission1Screen 풍선 물리', () => {
  it('풍선이 등장한다', () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    expect(getBalloonElements().length).toBe(INITIAL_BALLOON_COUNT)
  })

  it('풍선은 화면 밖으로 나가지 않고, 벽/바닥에서 튕긴다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    for (let i = 0; i < 20; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100))

      for (const el of getBalloonElements()) {
        const left = Number.parseFloat(el.style.left)
        const top = Number.parseFloat(el.style.top)
        const size = Number.parseFloat(el.style.width)

        expect(left).toBeGreaterThanOrEqual(-0.01)
        expect(top).toBeGreaterThanOrEqual(-0.01)
        expect(left + size).toBeLessThanOrEqual(FIELD_WIDTH + 0.01)
        expect(top + size).toBeLessThanOrEqual(FIELD_HEIGHT + 0.01)
      }
    }
  }, 10000)

  it('풍선은 시간이 지나도 멈추지 않고 계속 움직인다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    const startPositions = getBalloonElements().map((el) => `${el.style.left},${el.style.top}`)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const endPositions = getBalloonElements().map((el) => `${el.style.left},${el.style.top}`)

    expect(endPositions).not.toEqual(startPositions)
  })
})
