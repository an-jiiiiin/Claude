# KNOW-ISH (노이쉬) — 우리, 아는 척 좀 해봅시다

- **KNOW (오전 08:00, 시사·경제)**: 깊게. 카드 7~9장
- **-ISH (오후 18:00, 마케팅)**: 가볍게. 카드 5~7장
- 썸네일은 사진을 꽉 채운 배경에 스티커 문구와 2줄 헤드라인을 올린 형태, 본문은 종이 배경에 헤드라인, 형광펜 강조, Ref. 표기
- 실사 이미지는 출처 필수. 이모지·일러스트는 AI 생성 가능

## 구조
- `brand/`: 프로필 이미지, 로고, 브랜드 시트 (`node src/brand.mjs`)
- `content/*.json`: 카드뉴스 원고 (`**굵게**`, `==강조==`, `\n`)
- `src/templates.mjs`: 카드 레이아웃 (cover / body / compare / points / outro)
- `src/render.mjs`: JSON을 1080x1350 PNG로 렌더링

```bash
npm install
node src/render.mjs content/2026-11-19-am.json samples/2026-11-19-am
```

슬라이드의 `image.src`에 사진 경로나 URL을 넣으면 플레이스홀더 대신 실사 이미지가 들어갑니다. 출처는 `image.credit`에 적습니다.

## 자동화
- 하루 두 번 예약 작업이 새 세션을 열어 `AUTOMATION.md` 런북대로 수집, 원고, 이미지, 빌드, 승인 요청까지 진행합니다.
- 게시물 하나 = `posts/<YYYY-MM-DD-am|pm>/` (content.json, images/, slides/, review.png, status.json)
- `node src/build.mjs posts/<id>`: 렌더링, 형식 검사, 검수 시트 생성
- `node src/publish.mjs posts/<id> [--dry-run]`: 승인된 게시물만 인스타 캐러셀로 게시
- 인스타 연결: `docs/INSTAGRAM_SETUP.md`

## 원할 때 만들기 (요청형)
- 이 저장소로 연 세션에서 `/knowish <주제나 링크> [KNOW|-ISH] [장수] [요청사항]`
  - 예: `/knowish 스타벅스 겨울 프리퀀시 굿즈 반응`
  - 예: `/knowish https://기사링크 KNOW 숫자 위주로`
- 스킬 정의: `.claude/skills/knowish/SKILL.md` — 게시물은 `posts/YYYY-MM-DD-req-<슬러그>/`
