import { CHARACTER_HEIGHT, CHARACTER_WIDTH, FIELD_HEIGHT } from '../game/constants'

type CharacterProps = {
  x: number
}

function Character({ x }: CharacterProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: FIELD_HEIGHT - CHARACTER_HEIGHT,
        width: CHARACTER_WIDTH,
        height: CHARACTER_HEIGHT,
        backgroundColor: 'blue',
      }}
    />
  )
}

export default Character
