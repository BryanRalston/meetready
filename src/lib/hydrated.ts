import { useEffect, useState } from "react";
import { useMeet } from "@/lib/store";

/** True only after Zustand persist has rehydrated — avoids unlocked-user bounce to splash. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(() => useMeet.persist.hasHydrated());
  useEffect(() => {
    if (useMeet.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useMeet.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
