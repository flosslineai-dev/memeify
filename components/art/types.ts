import type { SVGProps } from "react";

export type ArtProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Accessible description. Omit when the art is decorative. */
  label?: string;
  /** Drop meme captions and busy details (used inside coin emblems). */
  clean?: boolean;
};

export function artA11y(label?: string) {
  return label
    ? ({ role: "img", "aria-label": label } as const)
    : ({ "aria-hidden": true, focusable: "false" } as const);
}
