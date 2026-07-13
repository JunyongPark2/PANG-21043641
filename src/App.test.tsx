import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

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
})
