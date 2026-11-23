"""Turn the light markup in posts/src/*.txt into Naver-paste-ready HTML.

Every style is inline so it survives a copy/paste into the Naver SmartEditor.
Brand colours live in BRAND below; change them once and rebuild.
"""
import html
import json
import re
import sys
from pathlib import Path

BRAND = {
    "main": "#E5322D",   # 바른생각 키컬러 (placeholder — confirm with the brand guide)
    "deep": "#B4231F",
    "tint": "#FDECEA",
    "ink": "#222222",
    "sub": "#8A8A8A",
}

ROOT = Path(__file__).parent
FONT = "font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;"
P = f"margin:0;text-align:center;font-size:15px;line-height:1.9;color:{BRAND['ink']};{FONT}"


def inline(s: str) -> str:
    s = html.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", rf'<b style="color:{BRAND["main"]};">\1</b>', s)
    s = re.sub(r"==(.+?)==", rf'<span style="background-color:{BRAND["tint"]};font-weight:700;">\1</span>', s)
    return s


def build(src: Path):
    lines = src.read_text(encoding="utf-8").splitlines()
    title = lines[0].removeprefix("@title ").strip()
    out, plain, imgs = [], [], []
    info_rows = []

    def flush_info():
        if not info_rows:
            return
        rows = "".join(
            f'<tr><td style="padding:10px 12px;border-bottom:1px solid {BRAND["tint"]};font-size:15px;'
            f'font-weight:700;color:{BRAND["main"]};white-space:nowrap;{FONT}">{html.escape(k)}</td>'
            f'<td style="padding:10px 12px;border-bottom:1px solid {BRAND["tint"]};font-size:15px;'
            f'color:{BRAND["ink"]};{FONT}">{html.escape(v)}</td></tr>'
            for k, v in info_rows
        )
        out.append(
            f'<table style="margin:8px auto;border-collapse:collapse;border-top:3px solid {BRAND["main"]};'
            f'width:100%;max-width:520px;text-align:left;"><tbody>{rows}</tbody></table>'
        )
        info_rows.clear()

    for raw in lines[1:]:
        line = raw.rstrip()
        if not line.startswith("INFO "):
            flush_info()
        if line == "":
            out.append(f'<p style="{P}">&nbsp;</p>')
            plain.append("")
        elif line.startswith("NOTE "):
            t = line[5:]
            out.append(f'<p style="margin:0;text-align:center;font-size:13px;color:{BRAND["sub"]};{FONT}">{html.escape(t)}</p>')
            plain.append(t)
        elif line.startswith("IMG|"):
            _, num, cap = line.split("|", 2)
            imgs.append((num, cap))
            label = f"카드뉴스 {num}" if re.fullmatch(r"\d-\d", num) else num
            out.append(
                f'<div style="margin:12px auto;max-width:520px;border:2px dashed {BRAND["main"]};border-radius:8px;'
                f'padding:28px 12px;text-align:center;background:{BRAND["tint"]};{FONT}">'
                f'<span style="font-size:14px;font-weight:700;color:{BRAND["main"]};">📷 사진 넣는 자리 · {label}</span><br>'
                f'<span style="font-size:13px;color:{BRAND["sub"]};">{html.escape(cap)}</span></div>'
            )
            plain.append(f"[📷 {label} : {cap}]")
        elif line.startswith("## "):
            t = line[3:]
            out.append(
                f'<p style="margin:0;text-align:center;font-size:21px;font-weight:800;line-height:1.6;color:{BRAND["ink"]};{FONT}">'
                f'<span style="border-bottom:4px solid {BRAND["main"]};padding-bottom:2px;">{inline(t)}</span></p>'
            )
            plain.append(f"■ {t}")
        elif line.startswith("QUOTE "):
            t = line[6:].replace("\\n", "\n")
            body = "<br>".join(html.escape(x) for x in t.split("\n"))
            out.append(
                f'<div style="margin:12px auto;max-width:520px;padding:18px 16px;text-align:center;'
                f'border-top:2px solid {BRAND["main"]};border-bottom:2px solid {BRAND["main"]};{FONT}">'
                f'<span style="font-size:28px;line-height:1;color:{BRAND["main"]};font-weight:900;">“</span><br>'
                f'<span style="font-size:18px;font-weight:700;line-height:1.7;color:{BRAND["ink"]};">{body}</span></div>'
            )
            plain.append(f"“{t.replace(chr(10), ' ')}”")
        elif line.startswith("!!"):
            t = line[2:]
            out.append(
                f'<p style="{P}"><span style="background-color:{BRAND["main"]};color:#ffffff;font-weight:700;'
                f'padding:2px 6px;">{html.escape(t)}</span></p>'
            )
            plain.append(t)
        elif line.startswith("INFO "):
            k, v = line[5:].split("|", 1)
            info_rows.append((k, v))
            plain.append(f"{k} : {v}")
        elif line.startswith("LINK "):
            k, url = line[5:].split("|", 1)
            out.append(
                f'<p style="margin:0;text-align:center;font-size:14px;line-height:1.8;color:{BRAND["ink"]};{FONT}">'
                f'{html.escape(k)} : <a href="{html.escape(url)}" style="color:{BRAND["main"]};">{html.escape(url)}</a></p>'
            )
            plain.append(f"{k} : {url}")
        elif line.startswith("TAGS "):
            t = line[5:]
            out.append(f'<p style="margin:0;text-align:center;font-size:14px;color:{BRAND["main"]};{FONT}">{html.escape(t)}</p>')
            plain.append(t)
        else:
            out.append(f'<p style="{P}">{inline(line)}</p>')
            plain.append(re.sub(r"\*\*|==", "", line))
    flush_info()

    body_plain = "\n".join(
        x for x in plain if not x.startswith("[📷") and not x.startswith("#") and "http" not in x
    )
    count_with_spaces = len(body_plain.replace("\n", ""))
    count_no_spaces = len(re.sub(r"\s", "", body_plain))
    return {
        "title": title,
        "html": "".join(out),
        "plain": title + "\n\n" + "\n".join(plain),
        "chars": count_with_spaces,
        "chars_nospace": count_no_spaces,
        "images": imgs,
    }


if __name__ == "__main__":
    posts = [build(ROOT / "src" / f"post{i}.txt") for i in (1, 2, 3, 4, 5)]
    for i, p in enumerate(posts, 1):
        (ROOT / f"post{i}.html").write_text(
            f'<!doctype html><meta charset="utf-8"><title>{html.escape(p["title"])}</title>'
            f'<h1 style="font-size:22px;{FONT}">{html.escape(p["title"])}</h1>{p["html"]}',
            encoding="utf-8",
        )
        (ROOT / f"post{i}.txt").write_text(p["plain"], encoding="utf-8")
        print(f"post{i}: {p['chars']} chars (공백 포함) / {p['chars_nospace']} (공백 제외), {len(p['images'])} images")
    (ROOT / "posts.json").write_text(json.dumps(posts, ensure_ascii=False), encoding="utf-8")
