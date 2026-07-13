# Phase 4 설계 - 풍선 등장 및 튕기는 물리

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 4 목표/통과 기준), [`../FEATURE/game_rule.md`](../FEATURE/game_rule.md), [`../FEATURE/mission1.md`](../FEATURE/mission1.md), [`phase3.md`](./phase3.md)

## 목표

화면에 [`mission1.md`](../FEATURE/mission1.md) 기준 수량(큰 풍선 1~2개)을 등장시키고, 중력의 영향을 받아 포물선으로 움직이며 좌우 벽/바닥에 부딪히면 튕기도록 한다. 이 Phase에서는 아직 무기와 충돌해도 터지지 않는다.

## 데이터 모델

```ts
// src/game/types.ts
type Balloon = {
  id: number
  x: number
  y: number
  vx: number     // 좌우 속도 (부호가 방향)
  vy: number     // 상하 속도 (양수 = 아래 방향)
  radius: number
  stage: number  // 0 = 가장 큰 단계, stage가 커질수록 작아짐
}
```

## 구조

```
src/
  game/
    constants.ts     # GRAVITY, INITIAL_BALLOON_RADIUS, STAGE_RADIUS[] 등 추가
  screens/
    Mission1Screen.tsx  # balloons: Balloon[] 상태 및 물리 업데이트 추가
    Balloon.tsx           # 풍선 하나를 radius 크기의 원(div, border-radius: 50%)으로 렌더링
```

- Mission 1 진입 시 `stage: 0` 풍선을 초기 위치(예: 화면 중앙 상단)에 배치해 `balloons` 상태를 초기화한다.
- 매 프레임(`useGameLoop` 콜백) 다음 순서로 갱신한다.
  1. `vy += GRAVITY * deltaTime` (중력 가속)
  2. `x += vx * deltaTime`, `y += vy * deltaTime`
  3. 좌우 벽 충돌: `x - radius < 0` 또는 `x + radius > FIELD_WIDTH`이면 `vx = -vx`로 반사하고 위치를 경계 안으로 보정
  4. 바닥 충돌: `y + radius > FIELD_HEIGHT`이면 `vy = -Math.abs(vy)`로 반사하고 위치를 경계 안으로 보정 (에너지 손실 없이 항상 같은 세기로 튀어 오르는 아케이드식 바운스)
- `radius`는 `stage`에 대응하는 `STAGE_RADIUS[stage]` 값을 사용해, Phase 5에서 분열이 추가될 때 같은 테이블을 재사용한다.

## 범위 밖 (Phase 4에서 하지 않는 것)

- 무기와 풍선의 충돌 판정 및 분열 (Phase 5)
- 캐릭터와 풍선의 충돌(실패 처리) (Phase 6)

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 4 통과 기준을 그대로 따른다.
