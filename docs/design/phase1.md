# Phase 1 설계 - 메인 화면

관련 문서: [`../PLAN.md`](../PLAN.md) (Phase 1 목표/통과 기준), [`../FEATURE/main.md`](../FEATURE/main.md) (메인 화면 기획)

## 목표

타이틀과 시작 버튼이 있는 메인 화면을 만들고, 시작 버튼을 누르면 Mission 1 화면(내용은 비어있는 placeholder)으로 전환한다.

## 화면 전환 방식

아직 여러 화면을 오가는 라우팅이 필요한 단계가 아니므로 별도 라우터 라이브러리(react-router 등)는 도입하지 않는다. 대신 최상위 `App` 컴포넌트가 현재 화면이 무엇인지를 상태로 들고, 그 값에 따라 화면 컴포넌트를 조건부 렌더링한다.

```ts
type Screen = 'main' | 'mission1'
```

- `App`이 `useState<Screen>('main')`으로 현재 화면을 관리한다.
- 화면 전환 함수(`goToMission1` 등)를 하위 컴포넌트에 props로 내려준다.
- Phase 6~7에서 Mission 1 내부에 진행중/클리어/실패 상태가 추가될 예정이므로, 이 "상태값으로 화면 분기" 패턴을 그대로 확장해서 쓴다.

## 컴포넌트 구조

```
src/
  App.tsx                 # 현재 화면(Screen) 상태 보유, MainScreen/Mission1Screen 분기
  screens/
    MainScreen.tsx        # 타이틀 + 시작 버튼
    Mission1Screen.tsx    # Phase 1에서는 빈 placeholder만 표시
```

- `MainScreen`은 `onStart: () => void` props 하나만 받는다. 버튼 클릭 시 `onStart`를 호출한다.
- `Mission1Screen`은 Phase 1에서는 "Mission 1" 텍스트 정도만 표시하는 빈 화면으로 두고, 실제 내용은 Phase 2 이후에 채운다.

## 동작 흐름

1. 앱 로드 시 `App`의 화면 상태는 `'main'`이므로 `MainScreen`이 렌더링된다.
2. 사용자가 시작 버튼을 클릭하면 `onStart`가 호출되어 `App`의 화면 상태가 `'mission1'`으로 바뀐다.
3. 상태 변경에 따라 `Mission1Screen`이 렌더링된다.

## 범위 밖 (Phase 1에서 하지 않는 것)

- 미션 선택 화면, 옵션, 랭킹 등 부가 화면
- 키보드(Enter/Space)로 시작하는 기능 — 버튼 클릭만 우선 지원하고, 필요 시 이후 Phase에서 추가
- 배경 애니메이션 등 비주얼 디테일 — 최소한의 레이아웃으로 타이틀/버튼이 보이면 충분

## 통과 기준

[`PLAN.md`](../PLAN.md)의 Phase 1 통과 기준을 그대로 따른다.
