type MainScreenProps = {
  onStart: () => void
}

function MainScreen({ onStart }: MainScreenProps) {
  return (
    <div>
      <h1>PANG</h1>
      <button type="button" onClick={onStart}>
        시작
      </button>
    </div>
  )
}

export default MainScreen
