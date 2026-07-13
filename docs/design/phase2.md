# Phase 2 설계 - 캐릭터 이동

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 2 목표/통과 기준), [`../FEATURE/game_rule.md`](../FEATURE/game_rule.md), [`phase1.md`](./phase1.md)

## 목표

Mission 1 화면에 캐릭터를 배치하고, 방향키(← →) 입력으로 화면 하단에서 좌우로 이동시킨다. 화면 좌우 끝을 벗어나지 않도록 벽 처리를 한다.

## 게임 루프 도입

Phase 1까지는 정적인 화면 전환만 있었지만, 이번 Phase부터 매 프레임 위치를 갱신하는 루프가 필요하다. `requestAnimationFrame` 기반의 루프 훅을 도입해 이후 Phase(무기, 풍선 이동 등)에서도 재사용한다.

```
src/
  game/
    constants.ts       # FIELD_WIDTH, FIELD_HEIGHT, CHARACTER_SPEED 등 상수
    useGameLoop.ts      # requestAnimationFrame으로 매 프레임 callback(deltaTime) 실행
    useKeyboard.ts       # keydown/keyup을 추적해 현재 눌린 키 집합(Set)을 ref로 반환
  screens/
    Mission1Screen.tsx   # useGameLoop + useKeyboard를 사용해 캐릭터 위치 상태 관리
    Character.tsx        # x 위치를 props로 받아 절대 위치(absolute) div로 렌더링
```

- `useKeyboard`는 렌더링을 유발하지 않고 눌린 키 목록만 최신 상태로 유지한다(각 프레임에서 읽기만 함).
- `Mission1Screen`은 캐릭터의 x 좌표를 `useState`로 들고, `useGameLoop`의 콜백 안에서 `useKeyboard`가 반환한 현재 눌린 키를 읽어 위치를 갱신한다.
- 이동량은 `deltaTime * CHARACTER_SPEED`로 계산해 프레임 속도와 무관하게 일정한 이동 속도를 보장한다.

## 벽 처리

- 캐릭터 x 좌표를 `[0, FIELD_WIDTH - CHARACTER_WIDTH]` 범위로 클램프(clamp)한다.
- ← → 를 동시에 떼면 다음 프레임에 이동량이 0이 되어 즉시 정지한다(관성 없음).

## 범위 밖 (Phase 2에서 하지 않는 것)

- 무기 발사 (Phase 3)
- 풍선 및 충돌 처리 (Phase 4 이후)
- 상하 이동, 점프 등 좌우 이동 외의 조작

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 2 통과 기준을 그대로 따른다.
