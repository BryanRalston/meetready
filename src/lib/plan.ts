import { catalog, parseChipKey } from "@/lib/packs";
import type { EventId, Gymnast, MeetKind, Pack } from "@/lib/types";
import { daysUntil } from "@/lib/utils";

export type Drill = {
  id: string;
  title: string;
  minutes: number;
  why: string;
  how: string;
};

export type Plan = {
  drills: Drill[];
  requirementTitle: string;
  requirements: { event: string; items: { label: string; flagged: boolean }[] }[];
  meet: {
    date: string;
    name: string;
    days: number | null;
    packing: string[];
    rules: string[];
  } | null;
  number: Pack["numberThatMatters"];
  mobilityNote: string;
  coachPrompt: string;
  weekMinutes: number;
  weekLead: string | null;
  goalKicker: string | null;
};

function drillBank(pack: Pack): Record<string, Drill> {
  const l3 = pack.id === "dp_3";
  const xcel = pack.track === "xcel";
  const preTable = pack.id === "dp_1" || pack.id === "dp_2" || l3;
  return {
  vault: {
    id: "vault",
    title: "Run–hurdle rehearsal",
    minutes: 4,
    why: preTable
      ? "Most vault tenths leak before she hits the stack. L3 is a resi / raised-mat handspring, not a table."
      : "Most vault tenths leak before she ever hits the table.",
    how: "Mark a hurdle line on the floor. Six slow run-hurdle-punch shapes. No flipping. Film the punch from the side if you want the coach to see it.",
  },
  bars: {
    id: "bars",
    title: "Hollow and arch shapes",
    minutes: 4,
    why: xcel
      ? "Xcel does not use DP cast-angle deductions in any division. Home is for the shape, not the skill."
      : l3
        ? "Casts and glides are shapes first. L3 has no cast-angle requirement, and pullover or kip both start from 10.0. Home is for the shape, not the skill."
        : "Casts and kips are shapes first. Home is for the shape, not the skill.",
    how: "10 hollow holds (8 seconds) and 10 arch rocks. Rest. Repeat twice. Stop if wrists complain.",
  },
  beam: {
    id: "beam",
    title: "Handstand line",
    minutes: 4,
    why: l3
      ? "L3 beam is a marked cross handstand, no hold. A wall still does more than a four-inch surface at home."
      : "Vertical is the beam score. A wall does more than a four-inch surface at home.",
    how: "Wall handstands, nose off the wall, 3 × 20 seconds. Eyes on one spot. Come down on purpose.",
  },
  floor: {
    id: "floor",
    title: "Snap-downs",
    minutes: 4,
    why: l3
      ? "Power for the round-off back-handspring rebound stick — not an isolated BHS in the living room."
      : "Power for round-offs and handsprings without throwing a new skill in the living room.",
    how: "Handstand snap-downs onto a mat or carpet, 8 controlled reps. Tight from shoulders to toes.",
  },
  wait: {
    id: "wait",
    title: "The wait, 90 seconds",
    minutes: 3,
    why: "Meet day is mostly waiting. Practice the in-between, not just the routine.",
    how: "Sit. Breathe 4 in / 6 out. Picture the next event start, not the last score. One sentence she can say to herself.",
  },
  freeze: {
    id: "freeze",
    title: "Beam breath",
    minutes: 3,
    why: "Freeze after a fall is a nervous system thing. Do not drill the fall at home.",
    how: "Stand on a line. Inhale for four, exhale for six, then a simple releve walk. If she wants off, she gets off. No speeches.",
  },
  awards: {
    id: "awards",
    title: "One non-score sentence",
    minutes: 2,
    why: "Awards and the car ride write the season more than the AA does.",
    how: "Agree the sentence now. Example: “You fought the beam.” Say it after the last event, before anyone asks what she scored.",
  },
  wrists: {
    id: "wrists",
    title: "Wrist and calf mobility",
    minutes: 4,
    why: "Sore joints change how she punches and casts. This is maintenance, not rehab.",
    how: "Gentle wrist circles, palm stretches, and calf wall stretches. Two minutes each. Pain = stop. Coach / PT owns anything sharp.",
  },
  };
}

export function buildPlan(g: Gymnast, pack: Pack): Plan {
  const DRILL_BANK = drillBank(pack);
  const flagged = g.chips.map(parseChipKey);
  const eventSet = new Set(g.events);
  const drills: Drill[] = [];
  const used = new Set<string>();

  const push = (id: string) => {
    const d = DRILL_BANK[id];
    if (!d || used.has(id) || drills.length >= 3) return;
    used.add(id);
    drills.push(d);
  };

  if (g.chips.some((c) => c.includes("freeze") || c.includes("Fear") || c.includes("freezes"))) {
    push("freeze");
  }
  if (g.body.includes("fear")) push("freeze");
  if (g.body.includes("wrists") || g.body.includes("ankles") || g.body.includes("back")) {
    push("wrists");
  }

  const eventOrder: EventId[] = ["beam", "bars", "vault", "floor", "wait", "awards"];
  for (const e of eventOrder) {
    if (eventSet.has(e)) push(e);
  }
  if (drills.length === 0) {
    push("beam");
    push("bars");
    push("wait");
  }

  const eventKeys = ["vault", "bars", "beam", "floor"] as const;
  const flaggedSet = new Set(g.chips);
  const useSr = Boolean(pack.specialRequirements) && pack.track !== "developmental" && pack.track !== "compulsory";

  const requirements = eventKeys.map((event) => {
    const items = useSr
      ? (pack.specialRequirements?.[event] ?? []).map((label) => ({
          label,
          flagged: srLineFlagged(label, event, flagged),
        }))
      : (pack.chips[event] ?? []).map((label) => ({
          label,
          flagged: flaggedSet.has(`${event}::${label}`),
        }));
    return { event, items };
  });

  const firstFlagged = flagged.find((f) => f.event !== "shared") ?? flagged[0];
  const coachPrompt = firstFlagged
    ? `Ask coach about ${firstFlagged.label.toLowerCase()} this week — not in the parking lot on Saturday.`
    : `Ask coach what “consistent” means for ${pack.shortLabel} this month. Write it down.`;

  const days = daysUntil(g.meetDate);
  const meet =
    g.meetDate || g.meetName
      ? {
          date: g.meetDate,
          name: g.meetName || "Next meet",
          days,
          packing: catalog.meetDayPacking,
          rules: catalog.meetDayRules,
        }
      : null;

  return {
    drills: drills.slice(0, 3),
    requirementTitle: useSr ? "Special requirements" : "Skill map",
    requirements,
    meet,
    number: pack.numberThatMatters,
    mobilityNote: pack.mobility.note,
    coachPrompt,
    weekMinutes: drills.slice(0, 3).reduce((s, d) => s + d.minutes, 0),
    weekLead: weekLead(g),
    goalKicker: goalKicker(g, pack),
  };
}

export function srLineFlagged(
  srLabel: string,
  event: string,
  chips: { event: string; label: string }[],
) {
  const sr = srLabel.toLowerCase();
  return chips.some((f) => {
    if (f.event !== event) return false;
    const chip = f.label.toLowerCase();
    if (sr.includes(chip) || chip.includes(sr.slice(0, 28))) return true;
    const tokens = chip.split(/[^a-z0-9°]+/i).filter((t) => t.length >= 4 || /\d/.test(t));
    const hits = tokens.filter((t) => sr.includes(t));
    return hits.length >= 2 || (hits.length === 1 && hits[0].length >= 6);
  });
}

function weekLead(g: Gymnast) {
  if (g.hours === "16-20" || g.hours === "20+") return "Home is recovery, not extra skills.";
  if (g.goalId === "fun") return "Stay in the division happily. The number is still the number.";
  if (g.goalId === "mobility" || g.goalId === "platinum" || g.goalId === "diamond") {
    return "Mobility is the number. Technique stays with coach.";
  }
  return null;
}

function goalKicker(g: Gymnast, pack: Pack) {
  const goal = pack.goals.find((x) => x.id === g.goalId);
  return goal?.label ?? null;
}

export function orderPacking(list: string[], panicId: string) {
  const needle =
    panicId === "grips" ? "grip" : panicId === "leo" ? "leo" : panicId === "gel" ? "hair" : null;
  if (!needle) return list;
  const hit = list.filter((l) => l.toLowerCase().includes(needle));
  const rest = list.filter((l) => !hit.includes(l));
  return [...hit, ...rest];
}

export function aaOf(score: {
  vault: number | null;
  bars: number | null;
  beam: number | null;
  floor: number | null;
}) {
  const parts = [score.vault, score.bars, score.beam, score.floor];
  let sum = 0;
  for (const p of parts) {
    if (p == null) return null;
    sum += p;
  }
  return sum;
}

/** IES = three events or less (R&P Ch.7). Returns the highest event score, or null if 0 or 4 events. No average, no extra formula. */
export function iesOf(score: {
  vault: number | null;
  bars: number | null;
  beam: number | null;
  floor: number | null;
}) {
  const parts = [score.vault, score.bars, score.beam, score.floor].filter(
    (n): n is number => n != null,
  );
  if (parts.length === 0 || parts.length > 3) return null;
  return Math.max(...parts);
}

function formatIes(n: number) {
  return String(Number.parseFloat(n.toFixed(2)));
}

export function moveUpAa(pack: Pack) {
  return pack.mobility.aa ?? pack.mobility.moveUpTarget ?? pack.numberThatMatters.moveUpTarget ?? null;
}

export function moveUpIes(pack: Pack) {
  return pack.mobility.ies ?? pack.numberThatMatters.ies ?? null;
}

function mobilityHit(pack: Pack, aa: number | null, ies?: number | null) {
  const type = pack.numberThatMatters.type;
  if (type === "mobility_aa" && aa != null && pack.mobility.aa != null && aa >= pack.mobility.aa) {
    return `${pack.numberThatMatters.label} — mobility eligible`;
  }
  if (type === "mobility_aa_or_ies") {
    if (aa != null && pack.mobility.aa != null && aa >= pack.mobility.aa) {
      return `${pack.mobility.aa.toFixed(2)} AA — mobility eligible`;
    }
    if (ies != null && pack.mobility.ies != null && ies >= pack.mobility.ies) {
      return `${formatIes(pack.mobility.ies)} IES — mobility eligible`;
    }
  }
  if (type === "srs") {
    const aaGate = moveUpAa(pack);
    const iesGate = moveUpIes(pack);
    if (aa != null && aaGate != null && aa >= aaGate) {
      return `${aaGate.toFixed(2)} AA — mobility eligible`;
    }
    if (ies != null && iesGate != null && ies >= iesGate) {
      return `${formatIes(iesGate)} IES — mobility eligible`;
    }
  }
  if (aa != null && (type === "benchmark" || type === "consistency") && aa >= 34) {
    return "Clean-meet benchmark — not mobility";
  }
  return null;
}

export function mobilityBadge(
  pack: Pack,
  aa: number | null,
  ies?: number | null,
  meetKind?: MeetKind | null,
) {
  const hit = mobilityHit(pack, aa, ies);
  if (!hit) return null;
  if (hit.startsWith("Clean-meet")) return hit;
  if (meetKind !== "sanctioned") {
    if (meetKind === "in_house") return "In-house — not mobility";
    return null;
  }
  return hit;
}

export function showIes(pack: Pack) {
  return moveUpIes(pack) != null;
}

export function numberHero(pack: Pack) {
  const n = pack.numberThatMatters;
  if (n.target != null) return n.target.toFixed(2);
  if (n.type === "benchmark") return "not 34.00";
  if (n.type === "consistency") return "coach call";
  if (n.type === "srs") return "SRs";
  if (n.type === "decision") return "decide";
  if (n.type === "execution" || n.type === "execution_composition") return "hit";
  return "—";
}
