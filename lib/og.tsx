/* eslint-disable @next/next/no-img-element -- next/og renders plain <img> elements, not next/image */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Fragment, isValidElement, type ReactNode } from "react";
import { ImageResponse } from "next/og";
import { DogArtSvg } from "@/components/art/DogArt";
import { MascotSvg } from "@/components/brand/Mascot";
import { MENTION } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Memeify — Your next meme coin starts with a comment.";

// SVG attributes that keep their camelCase spelling.
const CAMEL_ATTRS = new Set(["viewBox", "preserveAspectRatio", "gradientUnits", "gradientTransform", "textLength", "lengthAdjust", "startOffset"]);

const attrName = (name: string) =>
  name === "className"
    ? "class"
    : CAMEL_ATTRS.has(name) || name.includes("-")
      ? name
      : name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Serializes a hook-free SVG element tree to markup (react-dom/server is unavailable here). */
function toSvgMarkup(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(toSvgMarkup).join("");
  if (typeof node === "string" || typeof node === "number") return escape(String(node));
  if (!isValidElement<Record<string, unknown>>(node)) return "";

  const { type, props } = node;
  if (type === Fragment) return toSvgMarkup(props.children as ReactNode);
  if (typeof type === "function") return toSvgMarkup((type as (p: unknown) => ReactNode)(props));
  if (typeof type !== "string") return "";

  const attrs = Object.entries(props)
    .filter(([k, v]) => k !== "children" && (typeof v === "string" || typeof v === "number"))
    .map(([k, v]) => ` ${attrName(k)}="${escape(String(v))}"`)
    .join("");
  return `<${type}${attrs}>${toSvgMarkup(props.children as ReactNode)}</${type}>`;
}

/** Turns one of the site's SVG renderers into a data URL usable by `next/og`. */
export function svgDataUrl(node: ReactNode) {
  const markup = toSvgMarkup(node).replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  return `data:image/svg+xml;base64,${Buffer.from(markup).toString("base64")}`;
}

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans", file));

const [regular, semibold, bold] = await Promise.all([
  font("Geist-Regular.ttf"),
  font("Geist-SemiBold.ttf"),
  font("Geist-Bold.ttf"),
]);

export function renderOgImage() {

  const mascot = svgDataUrl(<MascotSvg id="og-mascot" animated={false} />);
  const dog = svgDataUrl(<DogArtSvg id="og-dog" />);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(115deg, #FAFAFC 0%, #FAFAFC 48%, #E6EEFF 78%, #EEE8FF 100%)",
          fontFamily: "Geist",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* copy */}
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 64px 72px", width: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={mascot} width={60} height={60} alt="" />
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.8, color: "#111827" }}>Memeify</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 52,
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3.6,
              color: "#111827",
            }}
          >
            <span>Your next meme coin starts with&nbsp;</span>
            <span style={{ color: "#2563EB" }}>a comment.</span>
          </div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 28, color: "#6B7280", letterSpacing: -0.5 }}>
            Tag {MENTION}. Pick a ticker. Get a coin.
          </div>
          <div style={{ display: "flex", marginTop: "auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 999,
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                fontSize: 22,
                fontWeight: 600,
                color: "#374151",
              }}
            >
              From Mention to Mint.
              <span style={{ color: "#2563EB" }}>· Prelaunch</span>
            </div>
          </div>
        </div>

        {/* product art */}
        <div style={{ display: "flex", flexDirection: "column", position: "absolute", right: 64, top: 70, width: 430 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFFFF",
              borderRadius: 28,
              padding: 18,
              boxShadow: "0 30px 60px -30px rgba(15,23,42,0.35)",
              border: "1px solid rgba(15,23,42,0.06)",
              transform: "rotate(2deg)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: 34, background: "linear-gradient(140deg,#60A5FA,#2563EB)" }} />
              <span style={{ fontWeight: 600, color: "#111827" }}>Alex</span>
              <span style={{ color: "#64748B" }}>@alexbuilds · 2m</span>
            </div>
            <div style={{ display: "flex", marginTop: 14, borderRadius: 18, overflow: "hidden", height: 180 }}>
              <img src={dog} width={394} height={394} style={{ marginTop: -107 }} alt="" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: -22,
              marginLeft: -24,
              background: "#FFFFFF",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 22,
              color: "#111827",
              boxShadow: "0 0 0 4px rgba(37,99,235,0.14), 0 18px 40px -14px rgba(37,99,235,0.55)",
            }}
          >
            <span style={{ color: "#2563EB", fontWeight: 600 }}>{MENTION}</span>
            <span>&nbsp;make this&nbsp;</span>
            <span style={{ color: "#2563EB", fontWeight: 700 }}>$DOGGO</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 18,
              marginLeft: 30,
              padding: 18,
              borderRadius: 28,
              background: "#0B1120",
              border: "1px solid rgba(124,165,255,0.6)",
              boxShadow: "0 30px 60px -20px rgba(37,99,235,0.6)",
            }}
          >
            <div style={{ display: "flex", width: 112, height: 112, borderRadius: 20, overflow: "hidden" }}>
              <img src={dog} width={112} height={112} alt="" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(52,211,153,0.12)",
                  color: "#6EE7B7",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                PREVIEW READY
              </div>
              <span style={{ marginTop: 10, fontSize: 48, fontWeight: 700, letterSpacing: -2, color: "#FFFFFF", lineHeight: 1 }}>
                DOGGO
              </span>
              <span style={{ marginTop: 4, fontSize: 24, fontWeight: 600, color: "#94A3B8" }}>$DOGGO</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
