import { Play, Pause, Headphones, RotateCcw } from "lucide-react";
import type { AudioState } from "../../../shared/types";
import { artworkById, partById, segmentOf } from "../../../shared/catalog";
import { formatTime, remainingSegments } from "../lib/timeline";
import type { OverallBookmark } from "../model/useNarration";
export function AudioPlayer({
  state,
  caption,
  supported,
  bookmark,
  onToggle,
  onSeek,
  onRate,
  onResumeOverall,
}: {
  state: AudioState;
  caption: string;
  supported: boolean;
  bookmark: OverallBookmark | null;
  onToggle: () => void;
  onSeek: (n: number) => void;
  onRate: (n: number) => void;
  onResumeOverall: () => void;
}) {
  const a = artworkById(state.artworkId);
  const part = a && state.partId ? partById(a, state.partId) : undefined;
  const segment = segmentOf(state.artworkId, state.partId);
  const bookmarkArtwork = artworkById(bookmark?.artworkId);
  const bookmarkSegment = segmentOf(bookmark?.artworkId ?? null, null);
  const remaining =
    bookmark && bookmarkSegment
      ? remainingSegments(bookmarkSegment, bookmark.elapsed)
      : 0;
  return (
    <div className="audio-player">
      <div className="audio-icon">
        <Headphones size={20} />
      </div>
      <div className="audio-title">
        <small>语音讲解 · AUDIO GUIDE</small>
        <strong>
          {a
            ? part && part.id !== a.id
              ? `${a.title} · ${part.label}`
              : a.title
            : "让艺术，有声可循"}
        </strong>
      </div>
      <button
        aria-label={state.playing ? "暂停讲解" : "播放讲解"}
        className="play-button"
        onClick={onToggle}
        disabled={!a}
      >
        {state.playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <span className="time">{formatTime(state.elapsed)}</span>
      <input
        aria-label="讲解进度"
        type="range"
        min="0"
        max={segment?.duration || 1}
        step=".1"
        value={state.elapsed}
        onChange={(e) => onSeek(Number(e.target.value))}
      />
      <span className="time">{formatTime(segment?.duration || 0)}</span>
      <select
        aria-label="讲解速度"
        value={state.rate}
        onChange={(e) => onRate(Number(e.target.value))}
      >
        <option value="1">1.0×</option>
        <option value="1.25">1.25×</option>
        <option value="1.5">1.5×</option>
      </select>
      {bookmark && bookmarkArtwork && remaining > 0 && (
        <button
          className="resume-overall"
          onClick={onResumeOverall}
          title={`回到《${bookmarkArtwork.title}》尚未讲完的整体段落`}
        >
          <RotateCcw size={13} />
          回到整体讲解 · 剩 {remaining} 段
        </button>
      )}
      <div className="caption">
        {!supported
          ? "设备不支持语音，请阅读字幕"
          : caption || "选择一件作品，听见它背后的故事"}
      </div>
    </div>
  );
}
