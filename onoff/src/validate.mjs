// 원고(content.json) 형식 검사. 문제 목록(문자열 배열)을 돌려준다.
const TYPES = ['cover', 'body', 'compare', 'points', 'outro'];

export function validate(doc) {
  const p = [];
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
    if (!s.title) p.push(`${at}: title 없음`);
    if (s.type === 'cover') {
      if (!s.image) p.push(`${at}: 표지는 실사 이미지(image) 필수`);
      if (s.sticker && [...s.sticker].length > 8) p.push(`${at}: 스티커 문구 8자 이내 (${s.sticker})`);
      if (s.title.split('\n').length > 3) p.push(`${at}: 표지 제목 3줄 이내`);
    }
    if (s.type === 'body' && (s.text || []).join('').length > (s.image ? 140 : 260)) p.push(`${at}: 본문이 길어요 (${s.image ? '사진 있으면 140자' : '260자'} 이내)`);
    if (s.image && s.image.src && !s.image.credit) p.push(`${at}: 사진 출처(credit) 없음`);
    if (s.image && s.image.src && !s.image.license) p.push(`${at}: 사진 라이선스(license) 없음`);
    if (['body', 'compare', 'points'].includes(s.type) && !s.ref) p.push(`${at}: Ref.(출처) 없음`);
  });
  if (!doc.caption) p.push('caption 없음');
  else if (doc.caption.length > 2200) p.push('캡션 2,200자 초과');
  if ((doc.caption?.match(/#/g) || []).length > 30) p.push('해시태그 30개 초과');
  if (!doc.sources?.length) p.push('sources(근거 링크) 없음');
  return p;
}
