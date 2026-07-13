type Circle = {
  x: number
  y: number
  radius: number
}

export function isHit(point: { x: number; y: number }, circle: Circle): boolean {
  const dx = point.x - circle.x
  const dy = point.y - circle.y
  return dx * dx + dy * dy <= circle.radius * circle.radius
}
