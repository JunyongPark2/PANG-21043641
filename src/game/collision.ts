type Circle = {
  x: number
  y: number
  radius: number
}

type Rect = {
  x: number // 좌측 상단 x
  y: number // 좌측 상단 y
  width: number
  height: number
}

export function isHit(point: { x: number; y: number }, circle: Circle): boolean {
  const dx = point.x - circle.x
  const dy = point.y - circle.y
  return dx * dx + dy * dy <= circle.radius * circle.radius
}

export function isRectCircleHit(rect: Rect, circle: Circle): boolean {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width))
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height))
  const dx = circle.x - closestX
  const dy = circle.y - closestY
  return dx * dx + dy * dy <= circle.radius * circle.radius
}
