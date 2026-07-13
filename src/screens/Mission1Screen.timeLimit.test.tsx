import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../game/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../game/constants')>()
  return {
    ...actual,
    TIME_LIMIT_SECONDS: 0.2,
  }
})

const { default: Mission1Screen } = await import('./Mission1Screen')

describe('Mission1Screen 제한 시간 초과', () => {
  it('제한 시간이 끝나면 FAILED가 표시된다', async () => {
    render(<Mission1Screen />)

    await waitFor(() => expect(screen.getByText('FAILED')).toBeInTheDocument(), { timeout: 3000 })
  })
})
