# 세온비즈 웹사이트

Astro 7, React 19, Tailwind CSS 4로 만든 한국어 코칭 사이트입니다. 소개·사례·노트는 정적 HTML로 생성하고, 상담 폼은 Cloudflare Worker에서 검증한 뒤 운영자 Gmail로 전송합니다. 상담 데이터베이스와 관리자 화면은 사용하지 않습니다.

## 구성

- `src/pages/`: 홈페이지, 코칭 안내, 사례, 노트, 소개, 상담 신청, 개인정보 안내
- `src/layouts/SiteLayout.astro`: 공통 메타데이터, 헤더, 푸터와 스타일
- `components/site/`: 메뉴·탭·FAQ·폼 등 상호작용이 필요한 React 구성요소
- `src/pages/api/applications.ts`, `lib/server/application-email.ts`: 상담 검증·요청 제한·메일 전송
- `public/`: 로고·파비콘, 이미지와 영상

기존 페이지 주소를 유지합니다. `/notes/choose-coaching`은 `/process#pricing`으로 308 리디렉션됩니다. 기존 Sites 배포의 데이터와 이전 D1 마이그레이션 기록은 별개이며, 새 Workers 배포에 연결하지 않습니다.

## 개발과 검증

Node.js 22.19 이상이 필요하며 `.node-version`은 검증한 24.12.0으로 고정했습니다.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 3001
npm run check
node scripts/test-application-email.mjs
npm run build:cloudflare
npm run start -- --host 127.0.0.1 --port 3002
TEST_BASE_URL=http://127.0.0.1:3002 npm run test:smoke
```

단위 검증은 실제 핸들러에 모의 메일·요청 제한 바인딩을 넣어 실행하며 메일을 보내지 않습니다. 로컬 smoke 검증은 페이지와 잘못된 요청만 확인합니다. 미리보기의 메일 바인딩은 로컬 에뮬레이터를 사용합니다. `.dev.vars`, `.private/`, 로컬 상태는 Git과 배포 산출물에 포함하지 않습니다.

## Cloudflare Workers 배포

설정은 `wrangler.cloudflare.jsonc`에 있습니다. Workers Free 플랜을 사용하며, Pages용 정적 배포는 상담 API를 실행하지 못합니다.

```sh
npm run build:cloudflare
npm run deploy:cloudflare -- --dry-run
npm run deploy:cloudflare
```

배포 스크립트는 생성된 설정의 계정·Worker 이름·수신 주소·요청 제한을 확인하고 D1 연결이 있으면 중단합니다. 발신 도메인은 Cloudflare Email Routing에 등록되어야 하며, 수신 주소 `cobaltblue872@gmail.com`은 같은 계정의 인증된 Destination Address여야 합니다. 기존 메일 서버의 MX 레코드를 바꾸지 않고 발신 설정을 완료한 다음 배포해야 합니다.

GitHub 자동 배포 설정:

- 저장소: `seon-biz/seonbiz_web`, 브랜치: `main`, 루트: 저장소 루트
- 빌드 명령: `npm run build:cloudflare`
- 배포 명령: `npm run deploy:cloudflare`
- 선택적 빌드 변수: `SEONBIZ_SITE_URL`에 운영 주소 지정

## 상담 메일 운영

`CONTACT_EMAIL` 바인딩은 지정된 운영자 수신 주소로만 전송할 수 있습니다. 발신·수신 주소는 서버 설정을 사용하며 신청자가 바꿀 수 없습니다. 서버는 입력값·동의·요청 출처를 검증하고, 전화번호와 IP의 해시를 키로 짧은 시간의 반복 요청을 제한합니다. 상담 내용은 Worker 데이터베이스에 저장하지 않습니다.

메일 서비스의 수락 응답을 기다린 후에만 접수 완료를 표시합니다. 실패하면 입력을 유지하며 자동 재전송하지 않습니다. 같은 내용으로 다시 제출하면 같은 접수번호를 사용하지만, 응답이 유실된 경우 동일 번호의 메일이 중복 도착할 수 있습니다. 메일 서비스의 수락은 수신함 도착 보장과는 다르므로 실제 수신 상태도 확인해야 합니다.

운영자는 메일의 연락처로 1영업일 이내 카카오톡 또는 문자로 연락합니다. 상담 목적 달성·철회·취소 시 신청 메일을 휴지통을 포함해 삭제하고, 연락을 이어갈 수 없어 종료한 신청도 무기한 보관하지 않습니다. 개인정보를 로그에 출력하거나 별도 자료로 불필요하게 복사하지 않습니다.
