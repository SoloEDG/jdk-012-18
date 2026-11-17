import { Heart, Headphones, ArrowUpRight, Layers, Box } from "lucide-react";
import { artworkById, isComposite, partsOf } from "../../../shared/catalog";
export function ArtworkDetail({
  id,
  partId,
  saved,
  onFavorite,
  onListen,
  onGo,
}: {
  id: string | null;
  partId: string | null;
  saved: boolean;
  onFavorite: () => void;
  onListen: (partId?: string | null) => void;
  onGo: (partId?: string | null) => void;
}) {
  const a = artworkById(id);
  if (!a) return <div>靠近一件作品，开始探索。</div>;
  const composite = isComposite(a);
  const parts = partsOf(a);
  const current =
    composite && partId ? parts.find((p) => p.id === partId) : undefined;
  return (
    <section className="detail">
      <div className="eyebrow">
        ARTWORK INSIGHT <span>作品档案</span>
      </div>
      <div className={"art-preview art-" + a.id}>
        <span>{a.en}</span>
      </div>
      <div className="detail-heading">
        <h2>{a.title}</h2>
        <button
          className={saved ? "icon-button saved" : "icon-button"}
          aria-label={saved ? "取消收藏" : "收藏作品"}
          onClick={onFavorite}
        >
          <Heart size={20} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="artist">
        {a.artist} <span>/</span> {a.year}
      </p>
      <p className="medium">{a.medium}</p>
      <p className="description">{a.description}</p>
      {composite && (
        <div className="part-list">
          <div className="part-list-title">
            <Layers size={13} />
            这件作品由 {parts.length} 个部分组成
          </div>
          {parts.map((p) => (
            <button
              key={p.id}
              className={
                "part-row" + (current?.id === p.id ? " active" : "")
              }
              onClick={() => onGo(p.id)}
            >
              {p.kind === "sculpture" ? <Box size={13} /> : <Layers size={13} />}
              <span>
                <strong>{p.label}</strong>
                <small>{p.kind === "sculpture" ? "中央雕塑" : "图像"}</small>
              </span>
              <ArrowUpRight size={14} />
            </button>
          ))}
          {current && <p className="part-description">{current.description}</p>}
        </div>
      )}
      <div className="detail-actions">
        <button className="primary" onClick={() => onListen(null)}>
          <Headphones size={16} />
          {composite ? "收听整体讲解" : "收听作品讲解"}
        </button>
        {composite && current && (
          <button
            className="primary secondary"
            onClick={() => onListen(current.id)}
          >
            <Headphones size={16} />
            收听本部分 · {current.label}
          </button>
        )}
        <button className="text-button" onClick={() => onGo(null)}>
          {composite ? "前往整体观景点" : "前往作品"}
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}
