const STAGE_COLORS = ['#e74c3c', '#f39c12', '#f1c40f']

type BalloonProps = {
  x: number
  y: number
  radius: number
  stage: number
}

function Balloon({ x, y, radius, stage }: BalloonProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        backgroundColor: STAGE_COLORS[stage] ?? STAGE_COLORS[0],
      }}
    />
  )
}

export default Balloon
