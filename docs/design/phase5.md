# Phase 5 설계 - 풍선 충돌 및 분열

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 5 목표/통과 기준), [`../FEATURE/game_rule.md`](../FEATURE/game_rule.md), [`phase4.md`](./phase4.md)

## 목표

무기와 풍선의 충돌을 감지해 풍선을 제거하고, [`game_rule.md`](../FEATURE/game_rule.md) 규칙대로 최대 3단계까지 작은 풍선 2개로 분열시킨 뒤 가장 작은 풍선은 소멸시킨다.

## 구조

```
src/
  game/
    collision.ts     # 원-점(또는 원-원) 충돌 판정 유틸 함수
  screens/
    Mission1Screen.tsx  # 매 프레임 충돌 검사 후 weapons/balloons 갱신
```

`collision.ts`에 무기(점으로 취급)와 풍선(원)의 충돌을 판정하는 순수 함수를 둔다.

```ts
function isHit(weapon: Weapon, balloon: Balloon): boolean {
  const dx = weapon.x - balloon.x
  const dy = weapon.y - balloon.y
  return dx * dx + dy * dy <= balloon.radius * balloon.radius
}
```

## 충돌 처리 로직 (매 프레임)

1. 모든 `weapon` × `balloon` 쌍에 대해 `isHit` 검사를 수행한다.
2. 맞은 무기는 즉시 `weapons` 배열에서 제거한다(하나의 무기는 한 프레임에 하나의 풍선만 제거).
3. 맞은 풍선은 `balloons` 배열에서 제거하고, `stage`에 따라 분기한다.
   - `stage < MAX_STAGE`(최대 3단계 미만)인 경우: `stage + 1`짜리 풍선 2개를 원래 위치에 생성한다. 두 풍선은 서로 반대 방향의 `vx`(예: `+SPLIT_SPEED`, `-SPLIT_SPEED`)를 가지며, `vy`는 튀어 오르도록 위 방향 초기값을 준다.
   - `stage === MAX_STAGE`(가장 작은 단계)인 경우: 풍선을 제거만 하고 새로 생성하지 않는다.
4. `STAGE_RADIUS`, `MAX_STAGE`는 Phase 4에서 정의한 상수 테이블을 그대로 사용한다.

## 범위 밖 (Phase 5에서 하지 않는 것)

- 캐릭터-풍선 충돌(실패 처리), 제한 시간, 클리어 판정 (Phase 6)
- 점수 계산 — `docs/FEATURE/game_rule.md`의 "기타 시스템"에 따라 아직 범위 밖

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 5 통과 기준을 그대로 따른다.
