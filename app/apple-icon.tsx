import { ImageResponse } from "next/og";
import { MascotSvg } from "@/components/brand/Mascot";
import { svgDataUrl } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const mascot = svgDataUrl(<MascotSvg id="apple" animated={false} />);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #EFF4FF, #DBE6FE)",
        }}
      >
        <img src={mascot} width={132} height={132} alt="" />
      </div>
    ),
    size,
  );
}
