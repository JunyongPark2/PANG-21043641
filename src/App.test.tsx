import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

vi.mock('./game/balloonPhysics', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./game/balloonPhysics')>()
  return {
    ...actual,
    createInitialBalloons: () => [],
  }
})

const { default: App } = await import('./App')

describe('App', () => {
  it('처음에는 메인 화면을 보여준다', () => {
    render(<App />)

    expect(screen.getByText('PANG')).toBeInTheDocument()
  })

  it('시작 버튼을 클릭하면 Mission 1 화면으로 전환된다', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: '시작' }))

    expect(screen.getByText('Mission 1')).toBeInTheDocument()
    expect(screen.queryByText('PANG')).not.toBeInTheDocument()
  })

  it('클리어 후 메인으로 버튼을 누르면 다시 메인 화면으로 돌아간다', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: '시작' }))
    await waitFor(() => expect(screen.getByText('CLEAR')).toBeInTheDocument())

    await userEvent.click(screen.getByText('메인으로'))

    expect(screen.getByText('PANG')).toBeInTheDocument()
    expect(screen.queryByText('Mission 1')).not.toBeInTheDocument()
  })
})
