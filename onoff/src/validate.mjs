// 원고(content.json) 형식 검사. 문제 목록(문자열 배열)을 돌려준다.
const TYPES = ['cover', 'body', 'compare', 'points', 'outro', 'letter', 'meme', 'gallery'];

export function validate(doc) {
  const p = [];
  if (doc.style && !['classic', 'mag', 'mori'].includes(doc.style)) p.push('style 은 mori(기본) / classic / mag');
  if (!['on', 'off'].includes(doc.series)) p.push('series 는 on(오전 KNOW) / off(오후 -ISH) 중 하나');
  const n = doc.slides?.length || 0;
  const [min, max] = doc.series === 'on' ? [6, 9] : [5, 7];
  if (n < min || n > max) p.push(`슬라이드 ${n}장 — ${doc.series === 'on' ? 'KNOW' : '-ISH'} 는 ${min}~${max}장`);
  if (n > 10) p.push('인스타 API 캐러셀은 최대 10장');
  if (doc.slides?.[0]?.type !== 'cover') p.push('첫 장은 cover');
  if (doc.slides?.[n - 1]?.type !== 'outro') p.push('마지막 장은 outro');
  doc.slides?.forEach((s, i) => {
    const at = `${i + 1}장`;
    if (!TYPES.includes(s.type)) p.push(`${at}: 알 수 없는 type "${s.type}"`);
    if (!s.title && s.type !== 'meme') p.push(`${at}: title 없음`);
    if (s.type === 'letter' && (s.text || []).join('').length > (s.image ? 200 : 330)) p.push(`${at}: 레터 본문이 길어요 (${s.image ? '사진 있으면 200자' : '330자'} 이내)`);
    if (s.type === 'gallery') {
      if (!(s.images?.length >= 2 && s.images.length <= 4)) p.push(`${at}: 갤러리는 사진 2~4장`);
      s.images?.forEach((im, k) => { if (!im.src) p.push(`${at}: 갤러리 ${k + 1}번 사진 없음`); else if (!im.credit) p.push(`${at}: 갤러리 ${k + 1}번 출처 없음`); });
      if ((s.text || []).join('').length > 120) p.push(`${at}: 갤러리 설명은 120자 이내`);
    }
    [s.says, ...(s.images || []).map((im) => im.says)].flat().filter(Boolean).forEach((b) => {
      const t = typeof b === 'string' ? b : b.text;
      if ([...t.replace(/==|\*\*/g, '')].length > 24) p.push(`${at}: 말풍선은 한 줄 24자 이내 (${t})`);
    });
    if (s.type === 'meme') {
      if (!(s.panels?.length >= 2 && s.panels.length <= 3)) p.push(`${at}: 밈 보드는 사진 2~3칸`);
      s.panels?.forEach((pp, k) => { if (!pp.image?.src) p.push(`${at}: ${k + 1}번째 칸 사진 없음`); else if (!pp.image.credit) p.push(`${at}: ${k + 1}번째 칸 출처 없음`); });
    }
    if (s.type === 'cover') {
      if (s.says && doc.style !== 'mori') p.push(`${at}: 표지(썸네일)는 고정 — 말풍선 대신 chips 사용`);
      if ((s.chips || []).length > 3) p.push(`${at}: 칩은 최대 3개`);
      if (doc.style === 'mori' && doc.cover === 'busy' && !(s.images?.length >= 3)) p.push(`${at}: 빼곡 표지(cover:busy)는 images 3~4장`);
      (s.chips || []).forEach((c) => { const t = typeof c === 'string' ? c : c.text; if ([...t].length > 8) p.push(`${at}: 칩은 8자 이내 (${t})`); });
      if (!s.image) p.push(`${at}: 표지는 실사 이미지(image) 필수`);
      if (s.sticker && [...s.sticker].length > 8) p.push(`${at}: 스티커 문구 8자 이내 (${s.sticker})`);
      if (s.title.split('\n').length > 3) p.push(`${at}: 표지 제목 3줄 이내`);
    }
    if (s.type === 'body' && (s.text || []).join('').length > (s.image ? 140 : 260)) p.push(`${at}: 본문이 길어요 (${s.image ? '사진 있으면 140자' : '260자'} 이내)`);
    if (s.image && s.image.src && !s.image.credit) p.push(`${at}: 사진 출처(credit) 없음`);
    if (s.image && s.image.src && !s.image.license) p.push(`${at}: 사진 라이선스(license) 없음`);
    if (['body', 'compare', 'points', 'gallery'].includes(s.type) && !s.ref) p.push(`${at}: Ref.(출처) 없음`);
  });
  if (!doc.caption) p.push('caption 없음');
  else if (doc.caption.length > 2200) p.push('캡션 2,200자 초과');
  const capTags = (doc.caption?.match(/#[^\s#]+/g) || []).length;
  if (capTags > 5) p.push(`캡션 해시태그 ${capTags}개 — 5개 이내 (나머지는 commentTags 로)`);
  const ct = doc.commentTags || [];
  if (!ct.length) p.push('commentTags(댓글용 유입 태그) 없음');
  if (ct.length > 25) p.push(`댓글 태그 ${ct.length}개 — 25개 이내`);
  if (ct.some((t) => !/^#[^\s#]+$/.test(t))) p.push('commentTags 는 공백 없는 "#태그" 형식');
  const dup = ct.filter((t) => doc.caption?.includes(t + ' ') || doc.caption?.endsWith(t));
  if (dup.length) p.push(`캡션과 댓글 태그 중복: ${dup.join(' ')}`);
  if (!doc.sources?.length) p.push('sources(근거 링크) 없음');
  return p;
}
