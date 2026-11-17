import { useEffect, useRef } from "react";
import { useWalker, distance, viewingPoint } from "../features/space";
import { useCatalog } from "../features/catalog";
import { useNarration } from "../features/narration";
import { useTour } from "../features/tours";
import { useCollection } from "../features/collection";
import { artworkById, overviewOf, partById } from "../shared/catalog";
export function useGallery() {
  const catalog = useCatalog();
  const tour = useTour();
  const collection = useCollection();
  const engaged = useRef(false);
  const walker = useWalker((p) => catalog.observe(p, engaged.current));
  const narration = useNarration((ended) => {
    if (
      tour.state.phase === "listening" &&
      (!ended.partId || ended.partId === ended.artworkId)
    )
      tour.next();
  });
  engaged.current = narration.state.playing;
  const go = (id: string, partId?: string | null) => {
    const a = artworkById(id);
    if (!a) return;
    const part = partId ? partById(a, partId) : undefined;
    catalog.select(id, part?.id);
    if (part && part.id !== a.id) {
      walker.go(viewingPoint(part.position, part.facing));
      walker.yaw.current = part.facing;
    } else {
      const ov = overviewOf(a);
      walker.go(ov.position);
      walker.yaw.current = ov.yaw;
    }
  };
  useEffect(() => {
    if (tour.state.phase === "walking" && tour.target) go(tour.target);
  }, [tour.state.phase, tour.target]);
  useEffect(() => {
    if (tour.state.phase !== "walking" || !tour.target) return;
    const a = artworkById(tour.target)!;
    if (distance(walker.position, overviewOf(a).position) < 0.15) {
      tour.arrive();
      narration.play(a.id);
    }
  }, [walker.position, tour.state.phase, tour.target]);
  const current = useRef({
    nearby: null as { artworkId: string; partId: string } | null,
    record: collection.record,
  });
  current.current = {
    nearby:
      catalog.nearby && catalog.nearbyPart
        ? { artworkId: catalog.nearby, partId: catalog.nearbyPart }
        : null,
    record: collection.record,
  };
  useEffect(() => {
    const t = setInterval(() => {
      const near = current.current.nearby;
      if (near) current.current.record(near.artworkId, 1, near.partId);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return {
    catalog,
    tour,
    collection,
    walker,
    narration,
    go,
    pauseTour: () => {
      tour.pause();
      walker.stop();
      narration.pause();
    },
    stopTour: () => {
      tour.stop();
      walker.stop();
      narration.pause();
    },
    nextTour: () => {
      walker.stop();
      narration.pause();
      tour.next();
    },
  };
}
