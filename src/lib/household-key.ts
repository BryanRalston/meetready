import { useRef, useState } from "react";

/** Not shown in the UI. Tap Pip five times on splash or paywall, then enter this. */
const HOUSEHOLD_KEY = "BLEACHERS";
const TAP_COUNT = 5;
const TAP_WINDOW_MS = 2500;

export function normalizeHouseholdKey(raw: string) {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function householdKeyMatches(raw: string) {
  return normalizeHouseholdKey(raw) === HOUSEHOLD_KEY;
}

export function useSecretPipTaps() {
  const [open, setOpen] = useState(false);
  const count = useRef(0);
  const timer = useRef<number | null>(null);

  function tapPip() {
    if (timer.current) window.clearTimeout(timer.current);
    count.current += 1;
    if (count.current >= TAP_COUNT) {
      count.current = 0;
      setOpen(true);
      return;
    }
    timer.current = window.setTimeout(() => {
      count.current = 0;
    }, TAP_WINDOW_MS);
  }

  return { tapPip, keyOpen: open, setKeyOpen: setOpen };
}
