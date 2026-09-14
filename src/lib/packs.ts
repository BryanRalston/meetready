import catalogJson from "@/data/level-packs.json";
import type { Catalog, EventId, Pack, ProgramId } from "@/lib/types";

export const catalog = catalogJson as unknown as Catalog;

export const EVENTS: { id: EventId; label: string; hint: string }[] = [
  { id: "vault", label: "Vault", hint: "Run, board, block" },
  { id: "bars", label: "Bars", hint: "Kips, casts, circles" },
  { id: "beam", label: "Beam", hint: "The four-inch wait" },
  { id: "floor", label: "Floor", hint: "Passes and dance" },
  { id: "awards", label: "Awards", hint: "The long sit" },
  { id: "wait", label: "The wait", hint: "Between events" },
];

export function packById(id: string): Pack | undefined {
  return catalog.packs[id];
}

export function packsForProgram(programId: string): Pack[] {
  const prog = catalog.programs.find((p) => p.id === programId);
  if (!prog) return [];
  return prog.levels.map((id) => catalog.packs[id]).filter(Boolean);
}

export function programLabel(id: ProgramId | string) {
  return catalog.programs.find((p) => p.id === id)?.label ?? id;
}

export function dpLevelNumber(packId: string): number | null {
  const m = /^dp_(\d+)$/.exec(packId);
  return m ? Number(m[1]) : null;
}

export function visibleMoments(programId: string, packId: string) {
  const n = dpLevelNumber(packId);
  return catalog.seasonMoments.filter((m) => {
    if (m.programs && !m.programs.includes(programId)) return false;
    if (m.minLevel != null) {
      if (programId !== "dp") return false;
      if (n == null || n < m.minLevel) return false;
    }
    return true;
  });
}

export function chipKey(event: string, label: string) {
  return `${event}::${label}`;
}

export function parseChipKey(key: string): { event: string; label: string } {
  const i = key.indexOf("::");
  if (i < 0) return { event: "shared", label: key };
  return { event: key.slice(0, i), label: key.slice(i + 2) };
}

export function hoursOptions() {
  return [
    { id: "4-6", label: "4–6 hours / week" },
    { id: "7-10", label: "7–10 hours / week" },
    { id: "11-15", label: "11–15 hours / week" },
    { id: "16-20", label: "16–20 hours / week" },
    { id: "20+", label: "20+ hours / week" },
  ];
}

export function extrasOptions() {
  return [
    { id: "privates", label: "Privates" },
    { id: "kip_stretch", label: "Extra kip / stretch class" },
    { id: "home_beam", label: "Home beam" },
    { id: "open_gym", label: "Open gym" },
    { id: "second_gym", label: "Second gym" },
  ];
}

export function bodyOptions() {
  return [
    { id: "ankles", label: "Ankles" },
    { id: "wrists", label: "Wrists" },
    { id: "back", label: "Back" },
    { id: "fear", label: "Fear after a fall" },
    { id: "scores_talk", label: "Shuts down if we talk scores" },
    { id: "growth", label: "Growth-spurt flexibility drop" },
    { id: "none", label: "None of these right now" },
  ];
}

export const DISCLAIMER = catalog.disclaimer;
