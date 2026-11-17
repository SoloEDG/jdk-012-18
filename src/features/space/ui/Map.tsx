import type { Point } from "../../../shared/types";
import { artworks, isComposite, partsOf } from "../../../shared/catalog";
const px = (p: Point) => ({ x: 80 + p.x * 10, y: 90 + p.z * 10 });
function convexHull(points: Point[]): Point[] {
  const pts = [...points].sort((a, b) => a.x - b.x || a.z - b.z);
  if (pts.length <= 2) return pts;
  const cross = (o: Point, a: Point, b: Point) =>
    (a.x - o.x) * (b.z - o.z) - (a.z - o.z) * (b.x - o.x);
  const half = (list: Point[]) => {
    const hull: Point[] = [];
    for (const p of list) {
      while (
        hull.length >= 2 &&
        cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0
      )
        hull.pop();
      hull.push(p);
    }
    return hull;
  };
  const lower = half(pts);
  const upper = half([...pts].reverse());
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
export function Map({
  position,
  active,
  onSelect,
  large = false,
}: {
  position: Point;
  active: string | null;
  onSelect: (id: string) => void;
  large?: boolean;
}) {
  let index = 0;
  return (
    <svg
      className={large ? "map large" : "map"}
      viewBox="0 0 160 190"
      aria-label="展馆平面导航"
    >
      <rect x="12" y="10" width="136" height="165" rx="2" fill="#e6e2d7" />
      <path d="M12 65H148M12 120H148M57 10V175M103 10V175" stroke="#d4d0c5" />
      <rect x="67" y="88" width="26" height="20" fill="#b8ad94" />
      {artworks.map((a) => {
        const i = index++;
        if (isComposite(a)) {
          const parts = partsOf(a);
          const hull = convexHull(parts.map((p) => p.position));
          const isActive = active === a.id;
          return (
            <g
              key={a.id}
              onClick={() => onSelect(a.id)}
              role="button"
              tabIndex={0}
              aria-label={"前往" + a.title}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelect(a.id);
              }}
            >
              <polygon
                className="map-extent"
                points={hull
                  .map((p) => {
                    const q = px(p);
                    return `${q.x},${q.y}`;
                  })
                  .join(" ")}
                fill={isActive ? "#c5a66d33" : "#797c7218"}
                stroke={isActive ? "#c5a66d" : "#797c72"}
                strokeWidth="0.8"
                strokeDasharray="2.5 2"
              />
              {parts.map((p) => {
                const q = px(p.position);
                return (
                  <circle
                    key={p.id}
                    cx={q.x}
                    cy={q.y}
                    r={p.kind === "sculpture" ? 3.6 : 2.8}
                    fill={isActive ? "#c5a66d" : "#797c72"}
                    stroke={p.kind === "sculpture" ? "#fff" : "none"}
                    strokeWidth="0.8"
                  />
                );
              })}
              {(() => {
                const c = px(a.position);
                return (
                  <>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isActive ? 8 : 6.4}
                      fill="none"
                      stroke={isActive ? "#c5a66d" : "#797c72"}
                      strokeWidth="1"
                    />
                    <text
                      x={c.x}
                      y={c.y + 2.6}
                      textAnchor="middle"
                      fill={isActive ? "#c5a66d" : "#797c72"}
                      fontSize="7"
                    >
                      {i + 1}
                    </text>
                  </>
                );
              })()}
            </g>
          );
        }
        const c = px(a.position);
        return (
          <g
            key={a.id}
            onClick={() => onSelect(a.id)}
            role="button"
            tabIndex={0}
            aria-label={"前往" + a.title}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(a.id);
            }}
          >
            <circle
              cx={c.x}
              cy={c.y}
              r={active === a.id ? 9 : 7}
              fill={active === a.id ? "#c5a66d" : "#797c72"}
            />
            <text
              x={c.x}
              y={c.y + 3}
              textAnchor="middle"
              fill="white"
              fontSize="8"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
      <circle
        data-testid="map-position"
        cx={80 + position.x * 10}
        cy={90 + position.z * 10}
        r="5"
        fill="#282c26"
        stroke="white"
        strokeWidth="2"
      />
      <text x="80" y="187" textAnchor="middle" fontSize="9" fill="#77796d">
        南入口 · SOUTH ENTRANCE
      </text>
    </svg>
  );
}
