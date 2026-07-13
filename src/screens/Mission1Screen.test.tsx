import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CHARACTER_WIDTH, FIELD_WIDTH } from '../game/constants'
import Mission1Screen from './Mission1Screen'

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
    render(<Mission1Screen />)

    expect(screen.getByText('Mission 1')).toBeInTheDocument()
  })

  it('← 를 누르고 있으면 캐릭터가 왼쪽으로 이동한다', async () => {
    render(<Mission1Screen />)
    const startX = getCharacterX()

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    await waitFor(() => expect(getCharacterX()).toBeLessThan(startX))

    fireEvent.keyUp(window, { key: 'ArrowLeft' })
  })

  it('→ 를 누르고 있으면 캐릭터가 오른쪽으로 이동한다', async () => {
    render(<Mission1Screen />)
    const startX = getCharacterX()

    fireEvent.keyDown(window, { key: 'ArrowRight' })

    await waitFor(() => expect(getCharacterX()).toBeGreaterThan(startX))

    fireEvent.keyUp(window, { key: 'ArrowRight' })
  })

  it('왼쪽 벽에 도달하면 더 이상 이동하지 않는다', async () => {
    render(<Mission1Screen />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    await waitFor(() => expect(getCharacterX()).toBe(0), { timeout: 3000 })

    const clampedX = getCharacterX()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(getCharacterX()).toBe(clampedX)

    fireEvent.keyUp(window, { key: 'ArrowLeft' })
  })

  it('오른쪽 벽에 도달하면 더 이상 이동하지 않는다', async () => {
    render(<Mission1Screen />)
    const maxX = FIELD_WIDTH - CHARACTER_WIDTH

    fireEvent.keyDown(window, { key: 'ArrowRight' })

    await waitFor(() => expect(getCharacterX()).toBe(maxX), { timeout: 3000 })

    fireEvent.keyUp(window, { key: 'ArrowRight' })
  })

  it('키를 떼면 캐릭터가 즉시 멈춘다', async () => {
    render(<Mission1Screen />)

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    await waitFor(() => expect(getCharacterX()).toBeGreaterThan(0))

    fireEvent.keyUp(window, { key: 'ArrowRight' })
    const stoppedX = getCharacterX()

    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(getCharacterX()).toBe(stoppedX)
  })

  it('Space를 누르면 무기가 발사된다', async () => {
    render(<Mission1Screen />)

    fireEvent.keyDown(window, { key: ' ' })

    await waitFor(() => expect(getWeaponCount()).toBe(1))

    fireEvent.keyUp(window, { key: ' ' })
  })

  it('발사된 무기는 위쪽으로 이동한다', async () => {
    render(<Mission1Screen />)

    fireEvent.keyDown(window, { key: ' ' })
    await waitFor(() => expect(getWeaponCount()).toBe(1))
    const startY = getWeaponY()

    await waitFor(() => expect(getWeaponY()).toBeLessThan(startY))

    fireEvent.keyUp(window, { key: ' ' })
  })

  it('무기가 화면 상단에 도달하면 사라진다', async () => {
    render(<Mission1Screen />)

    fireEvent.keyDown(window, { key: ' ' })
    await waitFor(() => expect(getWeaponCount()).toBe(1))
    fireEvent.keyUp(window, { key: ' ' })

    await waitFor(() => expect(getWeaponCount()).toBe(0), { timeout: 3000 })
  })

  it('Space를 누르고 있어도 프레임마다 여러 발이 발사되지 않는다', async () => {
    render(<Mission1Screen />)

    fireEvent.keyDown(window, { key: ' ' })
    await waitFor(() => expect(getWeaponCount()).toBe(1))

    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(getWeaponCount()).toBe(1)

    fireEvent.keyUp(window, { key: ' ' })
  })
})
