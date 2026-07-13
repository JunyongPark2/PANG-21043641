# Phase 7 설계 - Mission 1 통합 및 밸런싱

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 7 목표/통과 기준), [`../FEATURE/mission1.md`](../FEATURE/mission1.md), [`phase1.md`](./phase1.md), [`phase6.md`](./phase6.md)

## 목표

메인 화면 → Mission 1 플레이 → 클리어/실패 → (재시작 또는 메인으로 복귀)까지 전체 흐름을 연결하고, [`mission1.md`](../FEATURE/mission1.md)의 난이도 방향성에 맞춰 수치를 조정한다.

## 흐름 연결

Phase 1의 `Screen`(`'main' | 'mission1'`)과 Phase 6의 `MissionStatus`(`'playing' | 'cleared' | 'failed'`)를 그대로 사용하되, 결과 화면에 버튼을 추가해 두 상태를 이어준다.

- `ResultOverlay`(Phase 6)에 버튼 두 개를 추가한다.
  - **재시작**: `Mission1Screen`의 모든 게임 상태(캐릭터 위치, weapons, balloons, remainingTime, status)를 초기값으로 리셋한다.
  - **메인으로**: `App`의 `Screen` 상태를 `'main'`으로 되돌린다.
- 리셋 로직은 각 상태를 개별적으로 초기화하는 대신, 초기 상태를 만드는 함수(`createInitialGameState()`)를 하나 두고 재시작·최초 진입 시 동일하게 사용해 두 경로가 어긋나지 않게 한다.

## 구조

```
src/
  game/
    createInitialGameState.ts  # 캐릭터/무기/풍선/타이머 초기값 생성 함수
  screens/
    Mission1Screen.tsx           # 최초 진입과 재시작 모두 createInitialGameState() 사용
    ResultOverlay.tsx             # 재시작/메인으로 버튼 추가
```

## 밸런싱

[`mission1.md`](../FEATURE/mission1.md)에 명시된 방향성(풍선 1~2개, 느린 이동 속도, 여유로운 제한 시간)을 `game/constants.ts` 값으로 확정한다. 구체적인 수치는 고객이 Phase 1~6에서 준 피드백과 실제 플레이 결과를 반영해 조정하며, 최종 값을 이 문서 또는 `mission1.md`에 갱신한다.

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 7 통과 기준을 그대로 따른다. 특히 재시작 시 모든 상태(캐릭터 위치, 남은 무기/풍선, 타이머)가 초기값으로 정확히 되돌아가는지를 중점적으로 확인한다.
