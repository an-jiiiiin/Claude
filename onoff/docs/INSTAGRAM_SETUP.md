# 인스타그램 자동 게시 설정 (최초 1회)

승인된 카드뉴스를 API로 바로 올리려면 아래가 필요합니다. 설정 전에는 자동화가 **수동 업로드용 파일**을 대신 보내드립니다.

## 1. 계정 준비
1. 인스타 앱 → 설정 → 계정 유형 → **프로페셔널 계정(비즈니스 또는 크리에이터)** 으로 전환, 아이디 `@knowish.mag`
2. **페이스북 페이지**를 하나 만들고 (예: KNOW-ISH), 인스타 계정을 그 페이지에 연결
   (메타 비즈니스 스위트 → 설정 → 계정 → Instagram 계정 → 연결)

## 2. Meta 앱 만들기
1. https://developers.facebook.com → 내 앱 → 앱 만들기 → 유형 **비즈니스**
2. 제품 추가: **Instagram** (Instagram API with Facebook Login)
3. 권한: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`, `business_management`

## 3. 토큰과 계정 ID
1. 그래프 API 탐색기에서 위 권한으로 **사용자 토큰** 발급 → **장기 토큰(60일)** 으로 교환
   (운영이 안정되면 시스템 사용자 토큰으로 바꾸면 만료가 없습니다)
2. `GET /me/accounts` → 연결한 페이지의 `id` 확인
3. `GET /<페이지 id>?fields=instagram_business_account` → 나온 `id` 가 **IG_USER_ID**

## 4. Claude 환경에 넣기
- **토큰**: 채팅에 붙여넣지 마세요. Claude가 `graph.facebook.com` 용 자격 증명 입력 카드를 띄우면 거기에 넣습니다.
  (환경 네트워크 시크릿으로 저장되어 요청에만 주입되고, Claude도 값을 볼 수 없습니다)
- **IG_USER_ID**: 비밀값이 아니므로 환경 변수로 넣으면 됩니다.
- 환경 네트워크 허용 호스트에 `graph.facebook.com` 추가

## 5. 동작 방식
- 슬라이드 이미지는 공개 저장소의 raw URL(`raw.githubusercontent.com/...`)로 인스타에 전달됩니다.
  저장소가 공개라 승인 전 카드도 URL을 아는 사람은 볼 수 있다는 점 참고하세요.
- `posts/<id>/status.json` 이 `approved` 일 때만 게시합니다.
