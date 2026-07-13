# Phase 6 설계 - 승패 판정

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 6 목표/통과 기준), [`../FEATURE/game_rule.md`](../FEATURE/game_rule.md), [`../FEATURE/mission1.md`](../FEATURE/mission1.md), [`phase5.md`](./phase5.md)

## 목표

캐릭터-풍선 충돌 시 실패, 제한 시간 초과 시 실패, 모든 풍선 제거 시 클리어로 처리하고 결과를 화면에 표시한다.

## 상태 모델

Mission 1 내부에도 진행 상태가 필요해지므로, [`phase1.md`](./phase1.md)에서 도입한 "상태값으로 화면/단계 분기" 패턴을 그대로 확장한다.

```ts
type MissionStatus = 'playing' | 'cleared' | 'failed'
```

`Mission1Screen`이 `status: MissionStatus`를 상태로 들고, `'playing'`일 때만 게임 루프(이동/충돌/타이머)를 갱신한다. `'cleared'` 또는 `'failed'`가 되면 루프 갱신을 멈추고 결과를 표시한다.

## 구조

```
src/
  game/
    constants.ts       # TIME_LIMIT_SECONDS 추가
  screens/
    Mission1Screen.tsx   # status, remainingTime 상태 및 판정 로직 추가
    ResultOverlay.tsx     # status가 cleared/failed일 때 결과 문구를 표시하는 오버레이
```

## 판정 로직 (매 프레임, `status === 'playing'`일 때만 수행)

1. **제한 시간**: `remainingTime -= deltaTime`으로 감소시키고, 0 이하가 되면 `status = 'failed'`로 전환한다.
2. **캐릭터-풍선 충돌**: [`phase5.md`](./phase5.md)에서 만든 `collision.ts`의 판정 로직을 재사용(캐릭터는 원 또는 사각형으로 근사)해 캐릭터와 임의의 풍선이 겹치는지 검사한다. 겹치면 즉시 `status = 'failed'`로 전환한다.
3. **클리어 판정**: Phase 5의 분열 처리 후 `balloons.length === 0`이 되면 `status = 'cleared'`로 전환한다.

세 조건 모두 `status`를 `'playing'`에서 벗어나게 하는 시점에 한 번만 평가하면 되므로, 이미 `'playing'`이 아니면 이후 판정을 건너뛴다(중복 전환 방지).

## 결과 표시

- `ResultOverlay`는 `status`에 따라 "CLEAR" 또는 "FAILED" 텍스트를 화면 중앙에 표시한다.
- 이 Phase에서는 재시작/메인 복귀 버튼은 만들지 않고 텍스트 표시까지만 구현한다(재시작 흐름은 Phase 7).

## 범위 밖 (Phase 6에서 하지 않는 것)

- 재시작 또는 메인 화면 복귀 버튼과 그 흐름 (Phase 7)
- 목숨(생명력), 점수 등 부가 시스템

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 6 통과 기준을 그대로 따른다.
