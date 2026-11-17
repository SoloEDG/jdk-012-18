import { useState, useEffect, useRef } from "react";
import type { AudioState } from "../../../shared/types";
import { segmentOf } from "../../../shared/catalog";
import { captionAt, segmentStartAt } from "../lib/timeline";
import { speak, stopSpeech } from "../lib/speech";
export type NarrationEnd = { artworkId: string; partId: string | null };
export type OverallBookmark = { artworkId: string; elapsed: number };
export function useNarration(onEnd: (ended: NarrationEnd) => void) {
  const [state, setState] = useState<AudioState>({
    artworkId: null,
    partId: null,
    elapsed: 0,
    playing: false,
    rate: 1,
  });
  const [bookmark, setBookmark] = useState<OverallBookmark | null>(null);
  const callback = useRef(onEnd);
  callback.current = onEnd;
  const ref = useRef(state);
  ref.current = state;
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    if (!state.playing) return;
    let previous = performance.now();
    const t = setInterval(() => {
      const now = performance.now();
      const delta = (now - previous) / 1000;
      previous = now;
      setState((s) => ({ ...s, elapsed: s.elapsed + delta * s.rate }));
    }, 150);
    return () => clearInterval(t);
  }, [state.playing]);
  const segment = segmentOf(state.artworkId, state.partId);
  const caption = segment ? captionAt(segment, state.elapsed) : "";
  useEffect(() => {
    if (state.playing && caption) setSupported(speak(caption, state.rate));
    else stopSpeech();
    return stopSpeech;
  }, [caption, state.playing, state.rate]);
  useEffect(() => {
    if (segment && state.playing && state.elapsed >= segment.duration) {
      const ended = {
        artworkId: state.artworkId!,
        partId: state.partId,
      };
      setState((s) => ({ ...s, playing: false, elapsed: segment.duration }));
      if (!ended.partId || ended.partId === ended.artworkId)
        setBookmark((b) => (b && b.artworkId === ended.artworkId ? null : b));
      callback.current(ended);
    }
  }, [state.elapsed, state.playing, segment, state.artworkId, state.partId]);
  const play = (artworkId: string, partId: string | null = null) => {
    const s = ref.current;
    const current = segmentOf(s.artworkId, s.partId);
    const isOverallTarget = partId === null || partId === artworkId;
    const leavingOverall =
      s.artworkId &&
      (!s.partId || s.partId === s.artworkId) &&
      !isOverallTarget &&
      current &&
      s.elapsed > 0.5 &&
      s.elapsed < current.duration - 0.2;
    if (leavingOverall)
      setBookmark({ artworkId: s.artworkId!, elapsed: s.elapsed });
    const resume = isOverallTarget && bookmark?.artworkId === artworkId;
    setState((prev) => {
      const same = prev.artworkId === artworkId && prev.partId === partId;
      let elapsed = same ? prev.elapsed : 0;
      if (!same && resume) {
        const seg = segmentOf(artworkId, null);
        if (seg) elapsed = segmentStartAt(seg, bookmark!.elapsed);
      }
      return { ...prev, artworkId, partId, elapsed, playing: true };
    });
    if (resume) setBookmark(null);
  };
  return {
    state,
    caption,
    supported,
    segment,
    bookmark,
    play,
    resumeOverall: () => {
      if (bookmark) play(bookmark.artworkId, null);
    },
    pause: () => setState((s) => ({ ...s, playing: false })),
    toggle: () => setState((s) => ({ ...s, playing: !s.playing })),
    seek: (elapsed: number) => setState((s) => ({ ...s, elapsed })),
    rate: (rate: number) => setState((s) => ({ ...s, rate })),
  };
}
