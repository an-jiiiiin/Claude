"""Assemble the artifact page (index.html) from posts/posts.json + cardnews/png."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).parent
posts = json.loads((ROOT / "posts" / "posts.json").read_text(encoding="utf-8"))
CAPTIONS = {}
for i, p in enumerate(posts, 1):
    for num, cap in p["images"]:
        CAPTIONS[num] = cap

TABS = [("미션 1 · 1회차", "컬처클럽 소개"), ("미션 1 · 2회차", "브랜드 제대로 알기"),
        ("미션 1 · 3회차", "캠페인 연대기"), ("미션 2", "바른생각 젤"), ("미션 3", "올리브영 콘돔")]
REVIEWS = json.loads((ROOT / "posts" / "reviews.json").read_text(encoding="utf-8"))

panels, tabs = [], []
for i, p in enumerate(posts, 1):
    tabs.append(
        f'<a class="tab" href="#ep{i}" data-ep="ep{i}"><span class="tab-n">{TABS[i-1][0]}</span>'
        f'<span class="tab-t">{TABS[i-1][1]}</span></a>'
    )
    extra = ""
    if i <= 3:
        cards = "".join(
            f'<figure class="cn"><img src="png/c{i}-{n}.png" alt="카드뉴스 {i}-{n}: {html.escape(CAPTIONS.get(f"{i}-{n}", ""))}" '
            f'width="1080" height="1350" loading="lazy"><figcaption><b>{i}-{n}</b> {html.escape(CAPTIONS.get(f"{i}-{n}", ""))}</figcaption></figure>'
            for n in range(1, 6)
        )
        n_photo = "카드뉴스 5장"
    else:
        m = i - 2
        cards = (f'<figure class="cn"><img src="png/m{m}-cover.png" alt="미션 {m} 표지 카드뉴스" width="1080" height="1350" loading="lazy">'
                 f'<figcaption><b>표지</b> 글 맨 위 대표 이미지</figcaption></figure>')
        n_photo = f"표지 1장 + 직접 찍은 사진 {len(p['images']) - 1}장"
        revs = [r for r in REVIEWS if r["mission"] == m]
        items = "".join(
            f'<div class="rv"><div class="rv-head"><div><p class="rv-p">{html.escape(r["product"])}</p>'
            f'<p class="rv-s" aria-label="별점 {r["stars"]}점">{"★" * r["stars"]}</p></div>'
            f'<button class="btn ghost" data-copy="review" data-i="{REVIEWS.index(r)}">리뷰 복사</button></div>'
            f'<p class="rv-t">{html.escape(r["text"]).replace(chr(10), "<br>")}</p>'
            f'<p class="rv-c">{len(r["text"].replace(chr(10), " "))}자</p></div>'
            for r in revs
        )
        extra = f'''
  <div class="block">
    <div class="block-head"><h2>올리브영 앱 리뷰</h2><span class="hint">리뷰 작성 후 캡처해서 제출</span></div>
    <div class="rv-list">{items}</div>
  </div>'''
    panels.append(f'''
<section class="panel" id="panel-ep{i}" data-ep="ep{i}" hidden>
  <div class="meta">
    <span class="pill">공백 포함 {p["chars"]:,}자</span>
    <span class="pill">공백 제외 {p["chars_nospace"]:,}자</span>
    <span class="pill">{n_photo}</span>
  </div>
  <div class="block">
    <div class="block-head"><h2>제목</h2><button class="btn ghost" data-copy="title" data-i="{i-1}">제목 복사</button></div>
    <p class="post-title">{html.escape(p["title"])}</p>
  </div>
  <div class="block">
    <div class="block-head"><h2>본문</h2>
      <div class="btns"><button class="btn" data-copy="rich" data-i="{i-1}">서식 포함 복사</button>
      <button class="btn ghost" data-copy="plain" data-i="{i-1}">텍스트만 복사</button></div>
    </div>
    <div class="paper"><div class="post" id="post-{i-1}">{p["html"]}</div></div>
  </div>{extra}
  <div class="block">
    <div class="block-head"><h2>카드뉴스</h2><span class="hint">이미지를 길게 눌러 저장하세요</span></div>
    <div class="cn-grid">{cards}</div>
  </div>
</section>''')

DATA = json.dumps([{"title": p["title"], "plain": p["plain"]} for p in posts], ensure_ascii=False)
REV = json.dumps([r["text"] for r in REVIEWS], ensure_ascii=False)

page = f'''<title>바른생각 서포터즈 원고</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Layout: 한 열 작업대 — 상단 회차 탭, 아래로 제목 · 본문(블로그 미리보기) · 카드뉴스 그리드 */
@font-face{{font-family:Pretendard;font-weight:400;src:url(fonts/Pretendard-Regular.woff2) format("woff2");font-display:swap}}
@font-face{{font-family:Pretendard;font-weight:700;src:url(fonts/Pretendard-Bold.woff2) format("woff2");font-display:swap}}
@font-face{{font-family:Pretendard;font-weight:800;src:url(fonts/Pretendard-ExtraBold.woff2) format("woff2");font-display:swap}}
:root{{
  --brand:#E5322D; --brand-ink:#B4231F; --tint:#FDECEA;
  --bg:#F7F4F3; --surface:#FFFFFF; --fg:#1E1C1C; --muted:#7A7170; --line:#E9E1DF;
  --paper:#FFFFFF;
  --sans:Pretendard,"Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;
}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]){{
  --brand:#FF5A52; --brand-ink:#FF8A84; --tint:#3A1E1D;
  --bg:#171414; --surface:#221E1E; --fg:#F3EEEE; --muted:#A79C9B; --line:#3A3332; color-scheme:dark}}}}
:root[data-theme="dark"]{{
  --brand:#FF5A52; --brand-ink:#FF8A84; --tint:#3A1E1D;
  --bg:#171414; --surface:#221E1E; --fg:#F3EEEE; --muted:#A79C9B; --line:#3A3332; color-scheme:dark}}
*{{box-sizing:border-box}}
[hidden]{{display:none!important}}
body{{background:var(--bg);color:var(--fg);font-family:var(--sans);font-size:15px;line-height:1.6;word-break:keep-all}}
.wrap{{max-width:860px;margin:0 auto;padding-block:28px 64px;
  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}}
header.top h1{{margin:0;font-size:clamp(24px,5vw,32px);font-weight:800;letter-spacing:-.02em;text-wrap:balance}}
header.top h1 b{{color:var(--brand)}}
header.top p{{margin:6px 0 0;color:var(--muted)}}
.tabs{{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin:22px 0 18px}}
.tab{{display:flex;flex-direction:column;gap:2px;padding:12px 14px;border-radius:12px;border:1.5px solid var(--line);
  background:var(--surface);color:var(--fg);text-decoration:none;min-width:0}}
.tab-n{{font-size:12px;font-weight:800;color:var(--brand);letter-spacing:.04em}}
.tab-t{{font-weight:700;font-size:14px;line-height:1.35}}
.tab[aria-current="page"]{{background:var(--brand);border-color:var(--brand);color:#fff}}
.tab[aria-current="page"] .tab-n{{color:rgba(255,255,255,.8)}}
.tab:focus-visible,.btn:focus-visible{{outline:3px solid var(--brand);outline-offset:2px}}
.panel{{display:flex;flex-direction:column;gap:18px}}
.meta{{display:flex;flex-wrap:wrap;gap:6px}}
.pill{{font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;background:var(--tint);color:var(--brand-ink);font-variant-numeric:tabular-nums}}
.block{{display:flex;flex-direction:column;gap:10px}}
.block-head{{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px}}
.block-head h2{{margin:0;font-size:13px;font-weight:800;letter-spacing:.06em;color:var(--muted)}}
.btns{{display:flex;gap:6px;flex-wrap:wrap}}
.btn{{font:inherit;font-size:13px;font-weight:700;padding:8px 14px;border-radius:999px;border:1.5px solid var(--brand);
  background:var(--brand);color:#fff;cursor:pointer}}
.btn.ghost{{background:transparent;color:var(--brand)}}
.btn.done{{background:var(--fg);border-color:var(--fg);color:var(--bg)}}
.post-title{{margin:0;padding:14px 16px;background:var(--surface);border:1.5px solid var(--line);border-radius:12px;font-weight:800;font-size:17px;line-height:1.45}}
/* 블로그 본문 미리보기는 실제 붙여 넣을 모습 그대로 — 항상 흰 종이 */
.paper{{background:#FFFFFF;border-radius:14px;border:1.5px solid var(--line);padding:28px 16px;overflow-x:auto}}
.post{{max-width:560px;margin:0 auto;color-scheme:light}}
.hint{{font-size:12px;color:var(--muted)}}
.cn-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}}
.cn{{margin:0;display:flex;flex-direction:column;gap:6px;min-width:0}}
.cn img{{width:100%;height:auto;aspect-ratio:4/5;border-radius:8px;border:1px solid var(--line);display:block;max-width:100%}}
.cn figcaption{{font-size:12px;line-height:1.4;color:var(--muted)}}
.cn figcaption b{{color:var(--brand)}}
.rv-list{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}}
.rv{{background:var(--surface);border:1.5px solid var(--line);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px;min-width:0}}
.rv-head{{display:flex;justify-content:space-between;align-items:start;gap:10px}}
.rv-p{{margin:0;font-weight:800;line-height:1.4}}
.rv-s{{margin:2px 0 0;color:var(--brand);letter-spacing:2px}}
.rv-t{{margin:0;line-height:1.75}}
.rv-c{{margin:0;font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}}
.notes{{margin-top:36px;padding:18px;border-radius:14px;background:var(--surface);border:1.5px solid var(--line);font-size:14px}}
.notes h3{{margin:0 0 8px;font-size:15px}}
.notes ul{{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px}}
.toast{{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(20px + env(safe-area-inset-bottom,0px));
  background:var(--fg);color:var(--bg);padding:10px 18px;border-radius:999px;font-weight:700;font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none}}
.toast.show{{opacity:1}}
@media (prefers-reduced-motion:reduce){{.toast{{transition:none}}}}
</style>
<div class="wrap">
  <header class="top">
    <h1><b>바른생각</b> 서포터즈 11월 미션</h1>
    <p>미션 1 컬처클럽 3회 연재 · 미션 2 바른생각 젤 · 미션 3 올리브영 콘돔 · 업로드 기한 11/30(월) 23:59</p>
  </header>
  <nav class="tabs" aria-label="회차">{"".join(tabs)}</nav>
  {"".join(panels)}
  <aside class="notes">
    <h3>붙여 넣기 전에 확인해 주세요</h3>
    <ul>
      <li>'서식 포함 복사'는 PC 네이버 블로그 에디터에서 서식이 가장 잘 유지돼요. 모바일 앱은 굵기·색 일부가 빠질 수 있어요.</li>
      <li>점선 박스는 사진 넣는 자리예요. 같은 번호의 카드뉴스로 바꿔 넣으면 돼요.</li>
      <li>필수 키워드: 제목 '바른생각 컬처클럽', 본문 '바른생각 · 바른 도파민 클럽 · 바른생각 컬처클럽'이 세 편 모두 들어 있어요.</li>
      <li>컬처클럽 이전 회차 테마(연기·토크·다이닝)와 브랜드 키컬러는 공식 자료로 한 번 더 확인해 주세요.</li>
      <li>미션 2 본문 키워드: 올리브영 마사지젤 · 마사지젤 · 마사지젤 추천 · 수용성젤이 들어 있고 '러브젤' '윤활제'는 쓰지 않았어요.</li>
      <li>미션 3 본문 키워드: 편의점 콘돔 · 올리브영 콘돔 · 초박형 콘돔(에어핏) · 극초박형 콘돔(익스트림 에어핏)이 들어 있어요.</li>
      <li>올리브영 리뷰는 패키지 문구와 구매 이유 위주로 썼어요. 실제로 써 본 느낌을 한두 줄 더하면 더 자연스러워요.</li>
    </ul>
  </aside>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
const DATA = {DATA};
const REV = {REV};
const toast = document.getElementById("toast");
let tt;
function say(msg){{ toast.textContent = msg; toast.classList.add("show"); clearTimeout(tt); tt = setTimeout(()=>toast.classList.remove("show"), 1800); }}
function show(){{
  const ep = /^#ep[1-5]$/.test(location.hash) ? location.hash.slice(1) : "ep1";
  document.querySelectorAll(".panel").forEach(p => p.hidden = p.dataset.ep !== ep);
  document.querySelectorAll(".tab").forEach(t => {{ if (t.dataset.ep === ep) t.setAttribute("aria-current","page"); else t.removeAttribute("aria-current"); }});
}}
window.addEventListener("hashchange", show); show();
function selectAndCopy(el){{
  const r = document.createRange(); r.selectNodeContents(el);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  let ok = false; try {{ ok = document.execCommand("copy"); }} catch(e) {{}}
  if (!ok) say("선택해 두었어요. 직접 복사해 주세요"); else {{ s.removeAllRanges(); return true; }}
  return false;
}}
async function copyText(text){{
  try {{ await navigator.clipboard.writeText(text); return true; }} catch(e) {{
    const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly",""); ta.style.position="fixed"; ta.style.opacity="0";
    document.body.appendChild(ta); ta.select(); let ok=false; try {{ ok = document.execCommand("copy"); }} catch(_){{}} ta.remove(); return ok;
  }}
}}
document.addEventListener("click", async e => {{
  const b = e.target.closest("[data-copy]"); if (!b) return;
  const i = +b.dataset.i, kind = b.dataset.copy; let ok = false;
  if (kind === "title") ok = await copyText(DATA[i].title);
  else if (kind === "review") ok = await copyText(REV[i]);
  else if (kind === "plain") ok = await copyText(DATA[i].plain);
  else {{
    const el = document.getElementById("post-" + i);
    try {{
      await navigator.clipboard.write([new ClipboardItem({{
        "text/html": new Blob([el.innerHTML], {{type:"text/html"}}),
        "text/plain": new Blob([DATA[i].plain], {{type:"text/plain"}})
      }})]); ok = true;
    }} catch(err) {{ ok = selectAndCopy(el); }}
  }}
  if (ok) {{ say("복사했어요"); const t = b.textContent; b.classList.add("done"); b.textContent = "복사 완료"; setTimeout(()=>{{b.classList.remove("done"); b.textContent=t;}},1500); }}
}});
</script>
'''
(ROOT / "index.html").write_text(page, encoding="utf-8")
print("index.html written", len(page))
