import type { Artwork, ArtworkPart, Route } from "./types";
export const artworks: Artwork[] = [
  {
    id: "a1",
    title: "山的另一种记忆",
    en: "MEMORY OF THE MOUNTAIN",
    artist: "林知远",
    year: "2025",
    medium: "生成艺术 / 数字微喷",
    color: "#a7c4ac",
    position: { x: -5.4, z: -4 },
    facing: Math.PI / 2,
    description:
      "山并非静止的风景，而是时间缓慢折叠后的形状。艺术家将地形数据转译成层叠的色域，让记忆在虚实之间生长。",
    transcript: [
      "请在这幅作品前稍作停留。层层叠叠的山脊，来自艺术家对故乡的记忆。",
      "画面中的每一条曲线，都是数据与情感的一次相遇。",
      "当你移动视线，山的轮廓也会在想象中重新组合。",
    ],
    duration: 42,
  },
  {
    id: "a2",
    title: "无声的潮汐",
    en: "A SILENT TIDE",
    artist: "陈以宁",
    year: "2024",
    medium: "算法绘画 / 光场",
    color: "#b9b6d6",
    position: { x: 0, z: -7.4 },
    facing: 0,
    description:
      "海浪被拆解为无数细小的光线，涨落不再有声音，只留下颜色的呼吸。这是一段关于消逝与重返的观察。",
    transcript: [
      "这里的海没有声音。",
      "艺术家捕捉了潮水退去后留下的纹理，将它们化成紫色的光。",
      "不妨想象，下一次潮汐到来之前，时间是什么形状。",
    ],
    duration: 36,
  },
  {
    id: "a3",
    title: "日光的切片",
    en: "FRAGMENTS OF LIGHT",
    artist: "周弥",
    year: "2025",
    medium: "数字构成 / 色彩研究",
    color: "#e1a474",
    position: { x: 5.4, z: -4 },
    facing: -Math.PI / 2,
    description:
      "午后的光被截取、平移、重新排列。几何之间的空白，让日常的温度成为可观看的结构。",
    transcript: [
      "这件作品记录了一整个下午的阳光。",
      "暖色的块面是时间留下的切片，边缘的阴影则标记着移动。",
      "你看到的是光，也可能是自己的某个午后。",
    ],
    duration: 39,
  },
  {
    id: "a4",
    title: "浮游之城",
    en: "A FLOATING CITY",
    artist: "何序",
    year: "2023",
    medium: "程序生成 / 建筑幻想",
    color: "#85b9c1",
    position: { x: -5.4, z: 2.5 },
    facing: Math.PI / 2,
    description:
      "城市被从地表轻轻托起，建筑像群岛一样悬浮。失去重力后，我们如何重新理解彼此的距离？",
    transcript: [
      "欢迎来到一座没有地面的城市。",
      "建筑以不可能的方式相连，像记忆中不断重写的街道。",
      "在这里，距离不再由地图决定。",
    ],
    duration: 45,
  },
  {
    id: "a5",
    title: "夜的生长",
    en: "GROWING IN THE DARK",
    artist: "许眠",
    year: "2024",
    medium: "粒子艺术 / 数字绘画",
    color: "#9ba46a",
    position: { x: 5.4, z: 2.5 },
    facing: -Math.PI / 2,
    description:
      "微小的光点在黑暗中聚集，形成介于植物与星系之间的生命。生长不需要被看见，却一直发生。",
    transcript: [
      "把视线放慢，你会看到黑暗也在生长。",
      "每一个光点都遵循简单的规则，而它们共同形成了复杂的生命。",
      "这是一次关于偶然与秩序的实验。",
    ],
    duration: 33,
  },
  {
    id: "a6",
    title: "时间的容器",
    en: "VESSELS OF TIME",
    artist: "苏望",
    year: "2025",
    medium: "三维雕塑 / 形态实验",
    color: "#d5c6b4",
    position: { x: 0, z: 5.5 },
    facing: Math.PI,
    description:
      "重复的圆环并不通向同一个终点。虚拟雕塑以不可能的空间关系，邀请你重新感受时间的流向。",
    transcript: [
      "时间能被装进一个容器吗？",
      "这些圆环彼此穿过，却始终保留独立的方向。",
      "绕行，停留，或者回望，都可以成为你理解这件作品的方式。",
    ],
    duration: 48,
  },
  {
    id: "a7",
    title: "岛屿的集会",
    en: "GATHERING OF ISLANDS",
    artist: "温屿",
    year: "2026",
    medium: "多幅图像与中央雕塑 / 空间装置",
    color: "#c2a878",
    position: { x: 0, z: -0.3 },
    facing: 0,
    overview: { position: { x: 2.2, z: 3.6 }, yaw: 0.51 },
    description:
      "三幅图像散落在展厅的不同方向，中央雕塑是它们共同的引力中心。图像记录同一片海域的初涨、满潮与回响，雕塑则是潮水凝固的形状。只有走过所有方向，这件作品才真正完成。",
    transcript: [
      "这件作品不止一个方向。请先站在中央，让雕塑与四周的图像同时进入视野。",
      "三幅图像记录同一片海域的不同时刻：初涨、满潮与回响。",
      "中央的雕塑是潮水凝固的形状，它把所有方向连接在一起。",
      "现在，你可以走向任何一幅图像，听听它自己的段落。",
    ],
    duration: 50,
    parts: [
      {
        id: "a7-north-1",
        label: "北岸 · 初涨",
        kind: "image",
        position: { x: -3.4, z: -7.4 },
        facing: 0,
        texture: "a7-north-1",
        description: "第一缕潮水越过沙洲，岛屿开始失去边界。",
        transcript: [
          "潮水刚刚到来，画面里的线条还保持着犹豫。",
          "浅浅的光，是水面第一次覆盖沙洲时的颜色。",
        ],
        duration: 24,
      },
      {
        id: "a7-north-2",
        label: "北岸 · 满潮",
        kind: "image",
        position: { x: 3.4, z: -7.4 },
        facing: 0,
        texture: "a7-north-2",
        description: "海面升到最高处，世界只剩下水的圆心。",
        transcript: [
          "满潮时刻，岛屿缩成一个个同心的圆。",
          "站在这里，你几乎能听见水面呼吸的声音。",
        ],
        duration: 24,
      },
      {
        id: "a7-west",
        label: "西岸 · 回响",
        kind: "image",
        position: { x: -5.4, z: -0.7 },
        facing: Math.PI / 2,
        texture: "a7-west",
        description: "潮水退去之后，岛屿重新浮现，却不再是原来的形状。",
        transcript: [
          "退潮留下的痕迹，像一封写给陆地的信。",
          "每一个光点，都是岛屿重新出现的瞬间。",
        ],
        duration: 24,
      },
      {
        id: "a7-sculpture",
        label: "潮核 · 中央雕塑",
        kind: "sculpture",
        position: { x: 0, z: -0.3 },
        facing: 0,
        texture: "a7-sculpture",
        description:
          "雕塑没有正面与背面——从任何方向绕行，你都在这件作品之中。",
        transcript: [
          "请绕着雕塑走一圈，它的每一个方向都不相同。",
          "金属的曲面收藏着光，也收藏着你走过的路径。",
          "即使走到它的背面，你仍然没有离开这件作品。",
        ],
        duration: 30,
      },
    ],
  },
];
export const routes: Route[] = [
  {
    id: "nature",
    name: "自然的回响",
    subtitle: "在山海与微光之间，寻找自然的另一种表达",
    stops: ["a1", "a2", "a5"],
  },
  {
    id: "space",
    name: "空间的诗学",
    subtitle: "穿行于光、建筑与时间的边界",
    stops: ["a3", "a4", "a6"],
  },
  {
    id: "water",
    name: "水的形状",
    subtitle: "潮汐、岛屿与凝固的时间，从片段走向完整",
    stops: ["a2", "a7", "a6"],
  },
];
export const artworkById = (id: string | null | undefined) =>
  artworks.find((a) => a.id === id);
export const isComposite = (a: Artwork) => !!a.parts && a.parts.length > 0;
export function partsOf(a: Artwork): ArtworkPart[] {
  return (
    a.parts ?? [
      {
        id: a.id,
        label: a.title,
        kind: "image" as const,
        position: a.position,
        facing: a.facing,
        texture: a.id,
        description: a.description,
        transcript: a.transcript,
        duration: a.duration,
      },
    ]
  );
}
export const artworkByPartId = (partId: string | null | undefined) =>
  artworks.find((a) => partsOf(a).some((p) => p.id === partId));
export const partById = (a: Artwork, partId: string | null | undefined) =>
  partsOf(a).find((p) => p.id === partId);
export function overviewOf(a: Artwork): {
  position: { x: number; z: number };
  yaw: number;
} {
  return (
    a.overview ?? {
      position: {
        x: a.position.x + Math.sin(a.facing) * 2,
        z: a.position.z + Math.cos(a.facing) * 2,
      },
      yaw: a.facing,
    }
  );
}
export type Segment = {
  key: string;
  label: string;
  transcript: string[];
  duration: number;
};
export function segmentOf(
  artworkId: string | null,
  partId: string | null,
): Segment | null {
  const a = artworkById(artworkId);
  if (!a) return null;
  if (!partId || partId === a.id)
    return {
      key: a.id,
      label: "整体讲解",
      transcript: a.transcript,
      duration: a.duration,
    };
  const p = partById(a, partId);
  return p
    ? { key: p.id, label: p.label, transcript: p.transcript, duration: p.duration }
    : null;
}
