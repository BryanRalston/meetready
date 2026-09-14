import type { Draft } from "@/lib/types";
import { packById } from "@/lib/packs";

export const PANIC_OPTIONS = [
  { id: "gel", label: "Hair gel in a hotel bathroom at 6:40am" },
  { id: "leo", label: "The leo is still in the dryer" },
  { id: "grips", label: "I have forgotten grips. Once is enough." },
  { id: "arrive", label: "I never know when to actually arrive" },
  { id: "gp", label: "Grandparents asking what a kip is" },
  { id: "bleacher", label: "I want to coach from the bleachers — and I know I shouldn't" },
  { id: "fine", label: "I'm fine. I just want the list." },
] as const;

export function pipLineForStep(step: string, draft: Draft): { pose: "idle" | "whisper" | "warn" | "bag"; text: string } | null {
  const name = draft.name.trim() || "she";
  switch (step) {
    case "name":
      if (!draft.name.trim()) return null;
      return {
        pose: "whisper",
        text: `Noted. I don't keep last names. Parking-lot moms already know too much about ${name}.`,
      };
    case "events":
      if (!draft.events.length) return null;
      if (draft.events.includes("beam")) {
        return { pose: "whisper", text: "Beam freeze. Classic. We'll write around it, not yell at it." };
      }
      if (draft.events.includes("wait")) {
        return { pose: "whisper", text: "The wait is the meet. Routines are the short part." };
      }
      return { pose: "whisper", text: "Good. Naming it is the whole job." };
    case "chips":
      if (draft.chips.includes("freeze")) {
        return { pose: "whisper", text: "Fear after a fall is a nervous system thing. Home is breath, not the skill." };
      }
      return { pose: "idle", text: "Tap what's leaking points. This is the audit, not a report card." };
    case "panic":
      return { pose: "bag", text: "This is the part nobody puts on the club app." };
    case "goal":
      return {
        pose: "warn",
        text: "Last question. Then I'm going to ask you for money. Fair warning.",
      };
    default:
      return null;
  }
}

export function personalizedFacts(draft: Draft) {
  const pack = packById(draft.packId);
  const bits = [
    draft.name.trim() || "Her",
    pack?.label ?? "season",
  ];
  if (pack?.id === "dp_4") bits.push("table-vault season");
  if (draft.meetName.trim()) bits.push(draft.meetName.trim());
  if (draft.meetDate) bits.push(draft.meetDate);
  return bits.join(" · ");
}
