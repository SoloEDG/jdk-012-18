import { artworks, partsOf } from "../../../shared/catalog";
import type { Point } from "../../../shared/types";
export type NearbyRef = {
  artworkId: string;
  partId: string;
  distance: number;
};
export function nearbyPart(p: Point): NearbyRef | null {
  let best: NearbyRef | null = null;
  for (const a of artworks) {
    for (const part of partsOf(a)) {
      const d = Math.hypot(part.position.x - p.x, part.position.z - p.z);
      if (d < 3.1 && (!best || d < best.distance))
        best = { artworkId: a.id, partId: part.id, distance: d };
    }
  }
  return best;
}
