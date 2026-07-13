import type { MissionStatus } from '../game/types'

type ResultOverlayProps = {
  status: Extract<MissionStatus, 'cleared' | 'failed'>
}

function ResultOverlay({ status }: ResultOverlayProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <h2 style={{ color: 'white' }}>{status === 'cleared' ? 'CLEAR' : 'FAILED'}</h2>
    </div>
  )
}

export default ResultOverlay
