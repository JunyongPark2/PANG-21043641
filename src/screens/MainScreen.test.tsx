import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import MainScreen from './MainScreen'

describe('MainScreen', () => {
  it('타이틀과 시작 버튼을 보여준다', () => {
    render(<MainScreen onStart={() => {}} />)

    expect(screen.getByText('PANG')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '시작' })).toBeInTheDocument()
  })

  it('시작 버튼을 클릭하면 onStart를 호출한다', async () => {
    const onStart = vi.fn()
    render(<MainScreen onStart={onStart} />)

    await userEvent.click(screen.getByRole('button', { name: '시작' }))

    expect(onStart).toHaveBeenCalledOnce()
  })
})
