type WeaponProps = {
  x: number
  y: number
}

function Weapon({ x, y }: WeaponProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 4,
        height: 16,
        backgroundColor: 'red',
      }}
    />
  )
}

export default Weapon
