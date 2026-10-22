type Point = [number, number];

const round = (n: number) => Math.round(n * 100) / 100;

function toward(from: Point, to: Point, distance: number): Point {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  return [from[0] + (dx / len) * distance, from[1] + (dy / len) * distance];
}

/** Builds a star path with softly rounded tips and inner corners. */
export function roundedStarPath({
  cx,
  cy,
  outer,
  inner,
  points = 5,
  rotation = -90,
  tipRadius,
  innerRadius,
}: {
  cx: number;
  cy: number;
  outer: number;
  inner: number;
  points?: number;
  rotation?: number;
  tipRadius: number;
  innerRadius: number;
}) {
  const vertices: Point[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((rotation + (i * 180) / points) * Math.PI) / 180;
    vertices.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }

  let d = "";
  vertices.forEach((current, i) => {
    const prev = vertices[(i - 1 + vertices.length) % vertices.length];
    const next = vertices[(i + 1) % vertices.length];
    const radius = i % 2 === 0 ? tipRadius : innerRadius;
    const a = toward(current, prev, radius);
    const b = toward(current, next, radius);
    d += `${i === 0 ? "M" : "L"}${round(a[0])} ${round(a[1])}Q${round(current[0])} ${round(current[1])} ${round(b[0])} ${round(b[1])}`;
  });
  return `${d}Z`;
}

/** Deterministic pseudo-random numbers so server and client renders match. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
