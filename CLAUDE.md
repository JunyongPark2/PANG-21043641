# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 기술 스택

- **React 19** + **TypeScript** + **Vite 8** (`@vitejs/plugin-react`, Oxc 기반)
- **Oxlint**: ESLint 대신 사용하는 Rust 기반 린터 (`.oxlintrc.json`)
- 별도의 테스트 프레임워크(Vitest/Jest 등)는 아직 설정되어 있지 않음

## 명령어

```bash
npm run dev      # 개발 서버 실행 (Vite)
npm run build    # tsc -b (프로젝트 참조 기반 타입체크) 후 vite build
npm run preview  # 빌드 결과물 로컬 미리보기
npm run lint     # oxlint 실행
```

타입 체크만 별도로 하려면:
```bash
npx tsc -b --noEmit
```

## 테스트 방법

현재 테스트 프레임워크가 설치되어 있지 않다. 테스트를 추가할 경우 Vite 프로젝트이므로 Vitest 도입이 자연스러운 선택이며, 도입 전까지는 `npm run build`(타입 체크)와 `npm run lint`(Oxlint)로 코드 정합성을 확인한다.

## 아키텍처

- `tsconfig.json`은 파일을 직접 포함하지 않고 `tsconfig.app.json`(앱 소스, `src/`)과 `tsconfig.node.json`(Vite 설정 등 Node 환경 파일)으로 프로젝트 참조(project references)만 분리되어 있다. TS 설정을 바꿀 때는 대상 범위(app vs node)에 맞는 파일을 수정해야 한다.
- 엔트리 포인트: `index.html` → `src/main.tsx` → `src/App.tsx`. 현재 `App.tsx`는 별도 상태나 라우팅 없이 단일 컴포넌트로 구성된 최소 구조이다.
- 전역 스타일은 `src/index.css` 하나로 관리되며, 컴포넌트 단위 CSS 파일은 아직 없다.
