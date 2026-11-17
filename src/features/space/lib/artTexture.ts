import * as THREE from "three";
import type { Artwork, ArtworkPart } from "../../../shared/types";
export function artTexture(
  a: Artwork,
  part?: ArtworkPart,
): THREE.CanvasTexture {
  const key = part?.texture ?? a.id;
  const c = document.createElement("canvas");
  c.width = 700;
  c.height = 850;
  const g = c.getContext("2d");
  if (!g) throw new Error("canvas unavailable");
  g.fillStyle = "#e3dfd4";
  g.fillRect(0, 0, 700, 850);
  let seed =
    [...key].reduce((n, ch) => n + ch.charCodeAt(0), 0) * 7919 || 7919;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  if (key === "a1") {
    for (let n = 0; n < 11; n++) {
      g.beginPath();
      g.moveTo(0, 850);
      for (let x = 0; x <= 700; x += 4)
        g.lineTo(
          x,
          210 + n * 48 + Math.sin(x / 115 + n) * 90 + Math.sin(x / 40 + n) * 20,
        );
      g.lineTo(700, 850);
      g.fillStyle = [
        "#d1d9c9",
        "#bac8b6",
        "#a6bca8",
        "#88a18e",
        "#678a79",
        "#436d60",
      ][n % 6];
      g.fill();
    }
  } else if (key === "a2") {
    g.fillStyle = "#b6b0c6";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 100; n++) {
      g.beginPath();
      for (let x = 0; x <= 700; x += 5) {
        const y = 200 + n * 7 + Math.sin(x / 130 + n / 14) * 85;
        x ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.strokeStyle = `rgba(244,236,255,${0.1 + rnd() * 0.5})`;
      g.stroke();
    }
  } else if (key === "a3") {
    g.fillStyle = "#e2c4a5";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 18; n++) {
      g.fillStyle = ["#c66d45", "#edab70", "#8b4939", "#e6ce9f"][n % 4];
      g.fillRect(rnd() * 650, rnd() * 800, 30 + rnd() * 230, 40 + rnd() * 330);
    }
  } else if (key === "a4") {
    g.fillStyle = "#a2bac0";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 100; n++) {
      let x = rnd() * 700,
        y = rnd() * 850;
      g.fillStyle = ["#29464f", "#527983", "#d5d8c9"][n % 3];
      g.fillRect(x, y, 20 + rnd() * 80, 40 + rnd() * 140);
      g.strokeStyle = "#c2dddd";
      g.strokeRect(x, y, 20, 65);
    }
  } else if (key === "a5") {
    g.fillStyle = "#18261f";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 3500; n++) {
      const t = rnd() * Math.PI * 2,
        r = Math.sqrt(rnd()) * 280;
      g.fillStyle = ["#c7d297", "#768953", "#d8b76d"][n % 3];
      g.globalAlpha = rnd();
      g.beginPath();
      g.arc(
        350 + Math.cos(t) * r,
        425 + Math.sin(t) * r * 1.2,
        rnd() * 2.5,
        0,
        Math.PI * 2,
      );
      g.fill();
    }
    g.globalAlpha = 1;
  } else if (key === "a6") {
    g.fillStyle = "#c9bcab";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 9; n++) {
      g.save();
      g.translate(350, 420);
      g.rotate(n * 0.22);
      g.strokeStyle = n % 2 ? "#736b62" : "#eee4d8";
      g.lineWidth = 18;
      g.beginPath();
      g.ellipse(0, 0, 95 + n * 15, 240, 0, 0, Math.PI * 2);
      g.stroke();
      g.restore();
    }
  } else if (key === "a7-north-1") {
    g.fillStyle = "#cfd8d2";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 26; n++) {
      g.beginPath();
      const base = 130 + n * 28;
      for (let x = 0; x <= 700; x += 6) {
        const y = base + Math.sin(x / 160 + n * 0.7) * 26 + rnd() * 6;
        x ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.strokeStyle = `rgba(${n % 2 ? "94,128,138" : "176,150,110"},${0.25 + rnd() * 0.45})`;
      g.lineWidth = 1 + rnd() * 2.5;
      g.stroke();
    }
    g.fillStyle = "rgba(238,232,216,0.55)";
    g.fillRect(0, 0, 700, 150);
  } else if (key === "a7-north-2") {
    g.fillStyle = "#5d7580";
    g.fillRect(0, 0, 700, 850);
    for (let n = 0; n < 22; n++) {
      g.beginPath();
      g.ellipse(
        350 + Math.sin(n * 2.1) * 30,
        430 + Math.cos(n * 1.7) * 24,
        40 + n * 17,
        26 + n * 12,
        n * 0.06,
        0,
        Math.PI * 2,
      );
      g.strokeStyle = n % 3 ? "rgba(226,220,200,0.5)" : "rgba(196,168,120,0.65)";
      g.lineWidth = 1 + (n % 4);
      g.stroke();
    }
  } else if (key === "a7-west") {
    g.fillStyle = "#22303a";
    g.fillRect(0, 0, 700, 850);
    const isles: [number, number][] = [];
    for (let n = 0; n < 40; n++)
      isles.push([60 + rnd() * 580, 90 + rnd() * 670]);
    g.strokeStyle = "rgba(190,170,130,0.28)";
    for (let n = 1; n < isles.length; n++) {
      g.beginPath();
      g.moveTo(isles[n - 1][0], isles[n - 1][1]);
      g.lineTo(isles[n][0], isles[n][1]);
      g.stroke();
    }
    for (const [x, y] of isles) {
      g.fillStyle = ["#d8c9a4", "#9fb4ac", "#e8e2d2"][Math.floor(rnd() * 3)];
      g.globalAlpha = 0.5 + rnd() * 0.5;
      g.beginPath();
      g.arc(x, y, 2 + rnd() * 7, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
  } else {
    throw new Error("unknown texture: " + key);
  }
  return new THREE.CanvasTexture(c);
}
export function fallbackTexture(a: Artwork): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 700;
  c.height = 850;
  const g = c.getContext("2d")!;
  g.fillStyle = "#b9b4a8";
  g.fillRect(0, 0, 700, 850);
  g.strokeStyle = "#8d887c";
  g.lineWidth = 6;
  g.strokeRect(30, 30, 640, 790);
  g.fillStyle = "#6e6a5f";
  g.font = "44px serif";
  g.textAlign = "center";
  g.fillText("图像暂未加载", 350, 400);
  g.font = "30px serif";
  g.fillText(a.title, 350, 470);
  return new THREE.CanvasTexture(c);
}
