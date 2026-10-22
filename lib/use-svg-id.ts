import { useId } from "react";

/** A `useId` value that is safe to use inside SVG `url(#...)` references. */
export function useSvgId() {
  return "m" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
}
