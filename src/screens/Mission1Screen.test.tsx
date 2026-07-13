import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CHARACTER_HEIGHT, CHARACTER_WIDTH, FIELD_HEIGHT, FIELD_WIDTH } from '../game/constants'

// 캐릭터 이동/무기 발사 테스트는 풍선과의 충돌·클리어 판정(Phase 6)에 영향받지 않아야 하므로
// 캐릭터 이동 경로(화면 하단)와 겹치지 않는 위치에 풍선을 고정해 둔다.
vi.mock('../game/balloonPhysics', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../game/balloonPhysics')>()
  return {
    ...actual,
    createInitialBalloons: () => [{ id: 0, x: 100, y: 100, vx: 0, vy: 0, radius: 50, stage: 0 }],
    updateBalloon: (balloon: Parameters<typeof actual.updateBalloon>[0]) => balloon,
  }
})

const { default: Mission1Screen } = await import('./Mission1Screen')

function getCharacterX() {
  const character = document.querySelector('div[style*="position: absolute"]') as HTMLElement
  return Number.parseFloat(character.style.left)
}

function getWeaponCount() {
  return document.querySelectorAll('div[style*="background-color: red"]').length
}

function getWeaponY() {
  const weapon = document.querySelector('div[style*="background-color: red"]') as HTMLElement
  return Number.parseFloat(weapon.style.top)
}

describe('Mission1Screen', () => {
  it('Mission 1 타이틀과 캐릭터를 보여준다', () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    expect(screen.getByText('Mission 1')).toBeInTheDocument()
  })

  it('← 를 누르고 있으면 캐릭터가 왼쪽으로 이동한다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)
    const startX = getCharacterX()

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    await waitFor(() => expect(getCharacterX()).toBeLessThan(startX), { timeout: 3000 })

    fireEvent.keyUp(window, { key: 'ArrowLeft' })
  })

  it('→ 를 누르고 있으면 캐릭터가 오른쪽으로 이동한다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)
    const startX = getCharacterX()

    fireEvent.keyDown(window, { key: 'ArrowRight' })

    await waitFor(() => expect(getCharacterX()).toBeGreaterThan(startX), { timeout: 3000 })

    fireEvent.keyUp(window, { key: 'ArrowRight' })
  })

  it('왼쪽 벽에 도달하면 더 이상 이동하지 않는다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    await waitFor(() => expect(getCharacterX()).toBe(0), { timeout: 3000 })

    const clampedX = getCharacterX()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(getCharacterX()).toBe(clampedX)

    fireEvent.keyUp(window, { key: 'ArrowLeft' })
  })

  it('오른쪽 벽에 도달하면 더 이상 이동하지 않는다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)
    const maxX = FIELD_WIDTH - CHARACTER_WIDTH

    fireEvent.keyDown(window, { key: 'ArrowRight' })

    await waitFor(() => expect(getCharacterX()).toBe(maxX), { timeout: 3000 })

    fireEvent.keyUp(window, { key: 'ArrowRight' })
  })

  it('키를 떼면 캐릭터가 즉시 멈춘다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    await waitFor(() => expect(getCharacterX()).toBeGreaterThan(0), { timeout: 3000 })

    fireEvent.keyUp(window, { key: 'ArrowRight' })
    const stoppedX = getCharacterX()

    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(getCharacterX()).toBe(stoppedX)
  })

  it('Space를 누르면 캐릭터 상단에서 무기가 발사된다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    fireEvent.keyDown(window, { key: ' ' })

    await waitFor(() => expect(getWeaponCount()).toBe(1), { timeout: 3000 })
    expect(getWeaponY()).toBe(FIELD_HEIGHT - CHARACTER_HEIGHT)

    fireEvent.keyUp(window, { key: ' ' })
  })

  it('발사된 무기는 위쪽으로 이동한다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    fireEvent.keyDown(window, { key: ' ' })
    await waitFor(() => expect(getWeaponCount()).toBe(1), { timeout: 3000 })
    const startY = getWeaponY()

    await waitFor(() => expect(getWeaponY()).toBeLessThan(startY), { timeout: 3000 })

    fireEvent.keyUp(window, { key: ' ' })
  })

  it('무기가 화면 상단에 도달하면 사라진다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    fireEvent.keyDown(window, { key: ' ' })
    await waitFor(() => expect(getWeaponCount()).toBe(1), { timeout: 3000 })
    fireEvent.keyUp(window, { key: ' ' })

    await waitFor(() => expect(getWeaponCount()).toBe(0), { timeout: 3000 })
  })

  it('Space를 누르고 있어도 프레임마다 여러 발이 발사되지 않는다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    fireEvent.keyDown(window, { key: ' ' })
    await waitFor(() => expect(getWeaponCount()).toBe(1), { timeout: 3000 })

    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(getWeaponCount()).toBe(1)

    fireEvent.keyUp(window, { key: ' ' })
  })
})
