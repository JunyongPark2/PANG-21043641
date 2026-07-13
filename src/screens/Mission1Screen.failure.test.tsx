import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CHARACTER_HEIGHT, CHARACTER_WIDTH, FIELD_HEIGHT, FIELD_WIDTH } from '../game/constants'

vi.mock('../game/balloonPhysics', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../game/balloonPhysics')>()
  return {
    ...actual,
    createInitialBalloons: () => [
      {
        id: 0,
        x: FIELD_WIDTH / 2,
        y: FIELD_HEIGHT - CHARACTER_HEIGHT / 2,
        vx: 0,
        vy: 0,
        radius: CHARACTER_WIDTH,
        stage: 0,
      },
    ],
  }
})

const { default: Mission1Screen } = await import('./Mission1Screen')

describe('Mission1Screen 캐릭터-풍선 충돌', () => {
  it('캐릭터가 풍선에 닿으면 FAILED가 표시된다', async () => {
    render(<Mission1Screen onExitToMain={() => {}} />)

    await waitFor(() => expect(screen.getByText('FAILED')).toBeInTheDocument())
  })
})
