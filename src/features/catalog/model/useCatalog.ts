import { useRef, useState } from "react";
import type { Point } from "../../../shared/types";
import { nearbyPart } from "../lib/proximity";
export type ActiveRef = { artworkId: string; partId: string };
const HOLD_MS = 8000;
export function useCatalog() {
  const [active, setActive] = useState<ActiveRef | null>({
    artworkId: "a1",
    partId: "a1",
  });
  const [nearby, setNearby] = useState<ActiveRef | null>(null);
  const holdUntil = useRef(0);
  return {
    active: active?.artworkId ?? null,
    activePart: active?.partId ?? null,
    nearby: nearby?.artworkId ?? null,
    nearbyPart: nearby?.partId ?? null,
    select: (artworkId: string, partId?: string | null) => {
      holdUntil.current = Date.now() + HOLD_MS;
      setActive({ artworkId, partId: partId || artworkId });
    },
    observe: (p: Point, engaged: boolean) => {
      const near = nearbyPart(p);
      setNearby(near ? { artworkId: near.artworkId, partId: near.partId } : null);
      if (!near) return;
      if (engaged || Date.now() < holdUntil.current) return;
      setActive({ artworkId: near.artworkId, partId: near.partId });
    },
  };
}
