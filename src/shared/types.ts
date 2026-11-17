export type Point = { x: number; z: number };
export type PartKind = "image" | "sculpture";
export type ArtworkPart = {
  id: string;
  label: string;
  kind: PartKind;
  position: Point;
  facing: number;
  texture: string;
  description: string;
  transcript: string[];
  duration: number;
};
export type Artwork = {
  id: string;
  title: string;
  en: string;
  artist: string;
  year: string;
  medium: string;
  color: string;
  position: Point;
  facing: number;
  description: string;
  transcript: string[];
  duration: number;
  overview?: { position: Point; yaw: number };
  parts?: ArtworkPart[];
};
export type Route = {
  id: string;
  name: string;
  subtitle: string;
  stops: string[];
};
export type Visit = {
  id: string;
  seconds: number;
  at: number;
  parts?: Record<string, number>;
};
export type GalleryDocument = {
  favorites: string[];
  visits: Visit[];
  notes: Record<string, string>;
};
export type TourState = {
  routeId: string | null;
  step: number;
  phase: "idle" | "walking" | "listening" | "paused" | "done";
};
export type AudioState = {
  artworkId: string | null;
  partId: string | null;
  elapsed: number;
  playing: boolean;
  rate: number;
};
export type Command =
  { type: "focus"; id: string } | { type: "favorite"; id: string };
