# Phase 3 설계 - 무기 발사

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 3 목표/통과 기준), [`../FEATURE/game_rule.md`](../FEATURE/game_rule.md), [`phase2.md`](./phase2.md)

## 목표

Space 키로 캐릭터가 위쪽으로 무기(작살)를 발사하도록 한다. 무기는 일직선으로 올라가며 화면 상단에 닿으면 사라진다.

## 데이터 모델

여러 개의 무기가 동시에 존재할 수 있으므로 배열로 관리한다.

```ts
// src/game/types.ts
type Weapon = {
  id: number
  x: number
  y: number
}
```

## 구조

```
src/
  game/
    types.ts        # Weapon 타입 정의 (이후 Balloon도 여기에 추가)
  screens/
    Mission1Screen.tsx  # weapons: Weapon[] 상태 추가, 발사/이동/제거 로직
    Weapon.tsx           # 무기 하나를 절대 위치 div로 렌더링
```

- `useKeyboard`(Phase 2)로 Space 키의 **눌리는 순간**(keydown edge)을 감지해 무기를 1개 생성한다. 누르고 있다고 매 프레임 발사되지 않도록 edge-trigger로 처리한다.
- 발사 위치는 그 순간 캐릭터의 x 좌표, y는 캐릭터 상단으로 고정한다.
- `useGameLoop` 콜백 안에서 모든 무기의 y를 `deltaTime * WEAPON_SPEED`만큼 감소시킨다.
- y가 화면 상단(0) 미만이 되면 해당 무기를 배열에서 제거한다.
- 무기 id는 단순 증가 카운터(useRef)로 발급해 배열 갱신 시 React key로 사용한다.

## 범위 밖 (Phase 3에서 하지 않는 것)

- 풍선과의 충돌 판정 (Phase 5)
- 무기 개수 제한, 연사 속도 제한 등 밸런싱 요소 — 필요성이 확인되면 Phase 7에서 조정

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 3 통과 기준을 그대로 따른다.
