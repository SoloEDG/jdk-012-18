import * as THREE from "three";
import { artworks, partsOf } from "../../../shared/catalog";
import { artTexture, fallbackTexture } from "./artTexture";
export function buildScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#d7d5ce");
  scene.fog = new THREE.Fog("#d7d5ce", 14, 32);
  scene.add(new THREE.HemisphereLight("#fff8e8", "#74675a", 2.2));
  const sun = new THREE.DirectionalLight("#fff2d7", 3);
  sun.position.set(3, 9, 4);
  scene.add(sun);
  const box = (
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    color: string,
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color, roughness: 0.82 }),
    );
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  };
  box(12, 0.15, 16, 0, -0.08, 0, "#b4b0a7");
  box(0.3, 5.8, 16, -6, 2.9, 0, "#e2ded4");
  box(0.3, 5.8, 16, 6, 2.9, 0, "#e2ded4");
  box(12, 5.8, 0.3, 0, 2.9, -8, "#d7d5cb");
  box(12, 5.8, 0.3, 0, 2.9, 8, "#e2ded4");
  for (let z = -8; z <= 8; z += 2) {
    box(12, 0.012, 0.018, 0, 0.01, z, "#9d9b93");
  }
  for (let x = -6; x <= 6; x += 2) box(0.018, 0.012, 16, x, 0.01, 0, "#9d9b93");
  for (let z = -5; z <= 5; z += 5) {
    box(10, 0.16, 0.2, 0, 5.1, z, "#b7b4aa");
    box(7, 0.03, 0.12, 0, 5, z, "#fff6d9");
  }
  const pickables: THREE.Mesh[] = [];
  let sculpture: THREE.Mesh | null = null;
  for (const a of artworks) {
    for (const part of partsOf(a)) {
      if (part.kind === "sculpture") {
        box(1.8, 0.7, 1.5, part.position.x, 0.35, part.position.z, "#d3cfc4");
        const mesh = new THREE.Mesh(
          new THREE.TorusKnotGeometry(0.65, 0.14, 100, 16),
          new THREE.MeshStandardMaterial({
            color: "#a88f63",
            metalness: 0.72,
            roughness: 0.25,
          }),
        );
        mesh.position.set(part.position.x, 1.7, part.position.z);
        mesh.userData.artworkId = a.id;
        mesh.userData.partId = part.id;
        scene.add(mesh);
        pickables.push(mesh);
        sculpture = mesh;
        continue;
      }
      const group = new THREE.Group();
      group.position.set(part.position.x, 2.45, part.position.z);
      group.rotation.y = part.facing;
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 2.9, 0.12),
        new THREE.MeshStandardMaterial({ color: "#423e35" }),
      );
      group.add(frame);
      let texture: THREE.Texture;
      try {
        texture = artTexture(a, part);
      } catch {
        texture = fallbackTexture(a);
      }
      const image = new THREE.Mesh(
        new THREE.PlaneGeometry(2.13, 2.73),
        new THREE.MeshBasicMaterial({ map: texture }),
      );
      image.position.z = 0.07;
      image.userData.artworkId = a.id;
      image.userData.partId = part.id;
      group.add(image);
      pickables.push(image);
      const plaque = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 0.13),
        new THREE.MeshBasicMaterial({ color: "#f2eee3" }),
      );
      plaque.position.set(0.7, -1.66, 0.08);
      group.add(plaque);
      scene.add(group);
    }
  }
  return { scene, pickables, sculpture };
}
export function disposeScene(scene: THREE.Scene) {
  scene.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        for (const v of Object.values(m))
          if (v instanceof THREE.Texture) v.dispose();
        m.dispose();
      }
    }
  });
}
