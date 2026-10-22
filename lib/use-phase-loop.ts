"use client";

import { useEffect, useState } from "react";

/**
 * Steps through animation phases, waiting `durations[i]` ms on phase i,
 * and loops while `active` is true. Pass a module-level array.
 */
export function usePhaseLoop(durations: readonly number[], active: boolean) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => window.clearTimeout(id);
  }, [phase, active, durations]);

  return phase;
}
