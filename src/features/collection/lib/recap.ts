import type { Artwork, GalleryDocument, Visit } from "../../../shared/types";
import { artworkById, isComposite, partsOf } from "../../../shared/catalog";
export function recapStats(d: GalleryDocument) {
  return {
    seen: d.visits.filter((v) => v.seconds >= 2).length,
    seconds: Math.round(d.visits.reduce((n, v) => n + v.seconds, 0)),
    saved: d.favorites.length,
  };
}
export function partProgress(
  a: Artwork,
  visit: Visit | undefined,
): { seen: string[]; unseen: string[]; total: number } {
  const parts = partsOf(a);
  if (!isComposite(a))
    return {
      seen: visit && visit.seconds >= 2 ? [parts[0].label] : [],
      unseen: visit && visit.seconds >= 2 ? [] : [parts[0].label],
      total: 1,
    };
  const seen: string[] = [];
  const unseen: string[] = [];
  for (const p of parts) {
    const seconds = visit?.parts?.[p.id] ?? 0;
    (seconds >= 2 ? seen : unseen).push(p.label);
  }
  return { seen, unseen, total: parts.length };
}
export function createRecap(d: GalleryDocument): string {
  const stats = recapStats(d);
  return [
    "余境 · 我的参观回顾",
    `观看 ${stats.seen} 件作品 · 停留 ${stats.seconds} 秒`,
    "",
    ...d.favorites.map((id) => {
      const a = artworkById(id);
      if (!a) return "";
      const visit = d.visits.find((v) => v.id === id);
      const lines = [
        `${a.title} / ${a.artist}`,
        d.notes[id] || "未添加感想",
        `停留 ${Math.round(visit?.seconds || 0)} 秒`,
      ];
      if (isComposite(a)) {
        const progress = partProgress(a, visit);
        lines.push(
          `已看 ${progress.seen.length}/${progress.total} 个部分` +
            (progress.seen.length
              ? `（${progress.seen.join("、")}）`
              : ""),
          progress.unseen.length
            ? `尚未走近：${progress.unseen.join("、")}`
            : "已走遍这件作品的每个方向",
        );
      }
      return lines.join("\n");
    }),
  ].join("\n\n");
}
