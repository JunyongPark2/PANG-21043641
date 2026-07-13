import { render, screen, waitFor } from '@testing-library/react'
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
    render(<Mission1Screen />)

    await waitFor(() => expect(screen.getByText('CLEAR')).toBeInTheDocument())
  })
})
