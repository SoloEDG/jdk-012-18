import type { GalleryDocument, Visit } from "./types";
import { artworkById, artworkByPartId, partsOf } from "./catalog";
const key = "yujing-gallery-v1";
export const emptyDocument = (): GalleryDocument => ({
  favorites: [],
  visits: [],
  notes: {},
});
function normalizeArtworkId(id: unknown): string | null {
  if (typeof id !== "string") return null;
  if (artworkById(id)) return id;
  return artworkByPartId(id)?.id ?? null;
}
function normalizeVisits(list: unknown): Visit[] {
  if (!Array.isArray(list)) return [];
  const merged = new Map<string, Visit>();
  for (const v of list as { id?: unknown; seconds?: unknown; at?: unknown; parts?: unknown }[]) {
    const id = normalizeArtworkId(v?.id);
    if (!id || typeof v.seconds !== "number" || !Number.isFinite(v.seconds))
      continue;
    const a = artworkById(id)!;
    const validParts = new Set(partsOf(a).map((p) => p.id));
    const parts: Record<string, number> = {};
    if (v.parts && typeof v.parts === "object")
      for (const [pid, s] of Object.entries(v.parts))
        if (validParts.has(pid) && typeof s === "number" && Number.isFinite(s))
          parts[pid] = (parts[pid] ?? 0) + s;
    const previous = merged.get(id);
    if (previous) {
      previous.seconds += v.seconds;
      previous.at = Math.max(previous.at, typeof v.at === "number" ? v.at : 0);
      const mergedParts = { ...(previous.parts ?? {}) };
      for (const [pid, s] of Object.entries(parts))
        mergedParts[pid] = (mergedParts[pid] ?? 0) + s;
      if (Object.keys(mergedParts).length) previous.parts = mergedParts;
      else delete previous.parts;
    } else {
      merged.set(id, {
        id,
        seconds: v.seconds,
        at: typeof v.at === "number" ? v.at : Date.now(),
        ...(Object.keys(parts).length ? { parts } : {}),
      });
    }
  }
  return [...merged.values()];
}
export function loadDocument(): GalleryDocument {
  try {
    const d = JSON.parse(localStorage.getItem(key) || "null");
    if (!d) return emptyDocument();
    const raw: unknown[] = Array.isArray(d.favorites) ? d.favorites : [];
    const favorites = raw
      .map(normalizeArtworkId)
      .filter((id): id is string => id !== null);
    const notes: Record<string, string> = {};
    if (typeof d.notes === "object" && d.notes)
      for (const [k, text] of Object.entries(d.notes)) {
        const id = normalizeArtworkId(k);
        if (id && typeof text === "string") notes[id] = notes[id] ?? text;
      }
    return {
      favorites: [...new Set(favorites)],
      visits: normalizeVisits(d.visits),
      notes,
    };
  } catch {
    return emptyDocument();
  }
}
export function saveDocument(d: GalleryDocument): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(d));
    return true;
  } catch {
    return false;
  }
}
