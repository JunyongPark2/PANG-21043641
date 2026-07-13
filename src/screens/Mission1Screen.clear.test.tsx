import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../game/balloonPhysics', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../game/balloonPhysics')>()
  return {
    ...actual,
    createInitialBalloons: () => [],
  }
})

const { default: Mission1Screen } = await import('./Mission1Screen')

describe('Mission1Screen 클리어 판정', () => {
  it('풍선이 모두 없으면 CLEAR가 표시된다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    await waitFor(() => expect(screen.getByText('CLEAR')).toBeInTheDocument())
  })

  it('메인으로 버튼을 누르면 메인 화면으로 돌아가는 콜백이 호출된다', async () => {
    const onExitToMain = vi.fn()
    render(<Mission1Screen onExitToMain={onExitToMain} />)

    await waitFor(() => expect(screen.getByText('CLEAR')).toBeInTheDocument())

    fireEvent.click(screen.getByText('메인으로'))

    expect(onExitToMain).toHaveBeenCalledOnce()
  })
})
