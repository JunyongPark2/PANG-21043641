import type { MissionStatus } from '../game/types'

type ResultOverlayProps = {
  status: Extract<MissionStatus, 'cleared' | 'failed'>
  onRestart: () => void
  onExitToMain: () => void
}

function ResultOverlay({ status, onRestart, onExitToMain }: ResultOverlayProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <h2 style={{ color: 'white' }}>{status === 'cleared' ? 'CLEAR' : 'FAILED'}</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={onRestart}>
          재시작
        </button>
        <button type="button" onClick={onExitToMain}>
          메인으로
        </button>
      </div>
    </div>
  )
}

export default ResultOverlay
