# 세온비즈 웹사이트

Astro 7, React 19, Tailwind CSS 4로 만든 한국어 코칭 사이트입니다. 소개·사례·노트는 정적 HTML로 생성하고, 상담 신청과 관리자 기능은 Cloudflare Worker와 기존 D1 데이터베이스를 사용합니다.

## 구성

- `src/pages/`: 홈페이지, 코칭 안내, 사례, 노트, 소개, 상담 신청, 개인정보 안내
- `src/layouts/SiteLayout.astro`: 공통 메타데이터, 헤더, 푸터와 스타일
- `components/site/`: React 구성요소. 메뉴·탭·FAQ·폼·체크리스트 등 상호작용이 필요한 부분만 브라우저에서 실행합니다.
- `src/pages/api/`: 상담 접수, 관리자 로그인·로그아웃, 접수 정보 삭제
- `src/pages/manage.astro`: 접속키로 보호한 상담 접수 관리
- `db/`, `drizzle/`: 기존 D1 스키마와 마이그레이션
- `public/`: 승인된 로고·파비콘, 이미지와 영상

기존 페이지 주소를 유지합니다. `/notes/choose-coaching`은 `/process#pricing`으로 308 리디렉션됩니다.

## 개발

Node.js 22.13 이상이 필요합니다.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 3001
npm run check
npm run build
npm run start -- --host 127.0.0.1 --port 3002
```

새 로컬 데이터베이스는 `npm run db:migrate:local`로 초기화합니다. 기존 Vinext 개발 환경에서 사용하던 로컬 D1 데이터는 그대로 유지합니다. 이미 초기화된 데이터베이스를 다시 만들거나 삭제할 필요는 없습니다.

로컬 관리자 접속키는 `.dev.vars`의 `SEONBIZ_ADMIN_KEY`로 설정합니다. 빌드 결과에서 실행하는 미리보기도 이 값이 런타임에 필요합니다. 키를 바꾸면 기존 관리 세션도 무효화됩니다. `.dev.vars`, `.private/`, 로컬 D1 데이터는 Git과 배포 아카이브에서 제외합니다.

서버 실행 후 `npm run test:smoke`로 페이지·리디렉션·신청 검증·저장·관리자 인증을 확인합니다. 다른 로컬 포트는 `TEST_BASE_URL=http://127.0.0.1:3002 npm run test:smoke`로 지정합니다. 이 검증은 로컬 주소만 허용하며, 검증 중 만든 접수 데이터는 종료 시 삭제합니다.

## 배포와 운영

기존 Sites 프로젝트와 D1 바인딩은 `.openai/hosting.json`으로 연결합니다. `npm run build`는 `dist/client`의 정적 파일, `dist/server/index.js`의 Worker, 기존 마이그레이션을 준비하고 로컬 환경변수 파일을 빌드 결과에서 제거합니다. 소스를 커밋하고 Sites 소스 저장소에 푸시한 뒤 Sites의 빌드 패키징·버전 저장·배포 절차를 따릅니다.

운영 환경의 `SEONBIZ_ADMIN_KEY`는 Sites 비밀 값으로 별도 설정합니다. 신청은 D1에 저장되며, 관리자가 접수를 확인하고 카카오톡 또는 문자로 연락합니다. 자동 메시지는 발송하지 않습니다. 상담 목적을 달성하거나 철회 요청을 받으면 관리 화면에서 해당 정보를 삭제합니다.

서버에서 입력·동의·출처를 검증합니다. 저장 실패 시 완료로 표시하지 않고 입력을 유지하며, 동일 요청 ID를 재시도해도 중복 저장하지 않습니다. 관리자 요청은 인증과 동일 출처 검사를 통과해야 합니다.
