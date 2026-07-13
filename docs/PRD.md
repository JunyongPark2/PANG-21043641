# PANG(팡) 게임 - Mission 1 PRD

## 개요

《팡(PANG)》은 미첼(Mitchell)이 제작한 아케이드 게임으로, 화면 안을 튕겨 다니는 풍선을 작살(무기)로 터뜨려 모두 제거하면 스테이지를 클리어하는 방식의 게임이다. 본 프로젝트에서는 그중 첫 번째 스테이지(Mission 1)를 웹 게임으로 구현한다.

## 목표

플레이어가 화면 하단에서 좌우로 이동하며 위쪽으로 무기를 발사해 풍선을 모두 제거하면 Mission 1 클리어, 풍선과 접촉하거나 제한 시간을 초과하면 실패한다.

## 핵심 게임플레이 (요약)

- 캐릭터는 화면 하단에서 좌우로 이동하며 위쪽으로 무기를 발사한다.
- 풍선은 튕기며 이동하고, 무기에 맞으면 더 작은 풍선 2개로 분열되며 최대 3단계까지 반복된 뒤 소멸한다.

> 상세 규칙은 [`docs/FEATURE/game_rule.md`](./FEATURE/game_rule.md)를 참고한다.

## 문서 구조

- [`docs/PLAN.md`](./PLAN.md): Phase별 목표, 테스트 방법, 통과 기준
- [`docs/FEATURE/main.md`](./FEATURE/main.md): 메인(시작) 화면 구성
- [`docs/FEATURE/game_rule.md`](./FEATURE/game_rule.md): 캐릭터/풍선 물리, 분열, 클리어·실패 조건 등 상세 규칙
- [`docs/FEATURE/mission1.md`](./FEATURE/mission1.md): Mission 1의 난이도 및 규칙
- `docs/design/phaseN.md`: 각 Phase를 실제로 어떻게 구현할지에 대한 설계

## 범위

- Mission 1 단일 스테이지에 대한 구현을 우선 목표로 하며, 스테이지 배경/난이도는 초반 스테이지 수준으로 단순하게 구성한다.
- 목숨, 점수, 아이템, 이후 스테이지 진행 등 부가 시스템은 이후 단계에서 상세화한다.

## 참고 자료

- [팡(게임) - 나무위키](https://namu.wiki/w/%ED%8C%A1(%EA%B2%8C%EC%9E%84))
- [팡 (비디오 게임) - 위키백과](https://ko.wikipedia.org/wiki/%ED%8C%A1_(%EB%B9%84%EB%94%94%EC%98%A4_%EA%B2%8C%EC%9E%84))
- [Project) 오락실 Pang 게임 만들기 - velog](https://velog.io/@jusung-c/Project-%EC%98%A4%EB%9D%BD%EC%8B%A4-Pang-%EA%B2%8C%EC%9E%84-%EB%A7%8C%EB%93%A4%EA%B8%B0)
