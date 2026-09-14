import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Draft, Gymnast, MeetScore, PackedItem, PlanKind, RoleId } from "@/lib/types";
import { uid } from "@/lib/utils";

export const emptyDraft = (): Draft => ({
  role: "parent",
  name: "",
  programId: "",
  packId: "",
  momentId: "",
  meetDate: "",
  meetName: "",
  events: [],
  chips: [],
  hours: "",
  extras: [],
  body: [],
  panicId: "",
  goalId: "",
});

type State = {
  draft: Draft;
  gymnasts: Gymnast[];
  activeId: string | null;
  unlocked: boolean;
  planKind: PlanKind | null;
  scores: MeetScore[];
  packing: PackedItem[];
  setDraft: (patch: Partial<Draft>) => void;
  resetDraft: () => void;
  toggleDraftList: (key: "events" | "chips" | "extras" | "body", value: string) => void;
  unlock: (kind: PlanKind) => void;
  commitDraft: () => string;
  setActive: (id: string) => void;
  addGymnast: (g: Draft) => string;
  removeGymnast: (id: string) => void;
  addScore: (score: Omit<MeetScore, "id">) => void;
  removeScore: (id: string) => void;
  setPacking: (items: PackedItem[]) => void;
  togglePacked: (label: string) => void;
  loadSample: () => void;
  resetAll: () => void;
};

function sampleGymnast(): Gymnast {
  const meet = new Date();
  meet.setDate(meet.getDate() + 11);
  const iso = meet.toISOString().slice(0, 10);
  return {
    id: "sample-emma",
    createdAt: new Date().toISOString(),
    role: "parent",
    name: "Emma",
    programId: "dp",
    packId: "dp_4",
    momentId: "first_meet",
    meetDate: iso,
    meetName: "Spring Classic",
    events: ["bars", "beam"],
    chips: [
      "bars::Glide kip",
      "beam::Vertical handstand",
      "freeze",
    ],
    hours: "7-10",
    extras: ["privates", "home_beam"],
    body: ["fear"],
    panicId: "arrive",
    goalId: "mobility",
  };
}

export const useMeet = create<State>()(
  persist(
    (set, get) => ({
      draft: emptyDraft(),
      gymnasts: [],
      activeId: null,
      unlocked: false,
      planKind: null,
      scores: [],
      packing: [],
      setDraft: (patch) => set({ draft: { ...get().draft, ...patch } }),
      resetDraft: () => set({ draft: emptyDraft() }),
      toggleDraftList: (key, value) => {
        const list = get().draft[key] as string[];
        const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
        if (key === "body" && value === "none") {
          set({ draft: { ...get().draft, body: list.includes("none") ? [] : ["none"] } });
          return;
        }
        if (key === "body") {
          set({
            draft: {
              ...get().draft,
              body: next.filter((v) => v !== "none"),
            },
          });
          return;
        }
        set({ draft: { ...get().draft, [key]: next } });
      },
      unlock: (kind) => set({ unlocked: true, planKind: kind }),
      commitDraft: () => {
        const d = get().draft;
        const g: Gymnast = { ...d, id: uid(), createdAt: new Date().toISOString() };
        set({
          gymnasts: [...get().gymnasts, g],
          activeId: g.id,
          draft: emptyDraft(),
        });
        return g.id;
      },
      setActive: (id) => set({ activeId: id }),
      addGymnast: (d) => {
        const g: Gymnast = { ...d, id: uid(), createdAt: new Date().toISOString() };
        set({ gymnasts: [...get().gymnasts, g], activeId: g.id });
        return g.id;
      },
      removeGymnast: (id) => {
        const gymnasts = get().gymnasts.filter((g) => g.id !== id);
        const activeId =
          get().activeId === id ? (gymnasts[0]?.id ?? null) : get().activeId;
        set({
          gymnasts,
          activeId,
          scores: get().scores.filter((s) => s.gymnastId !== id),
        });
      },
      addScore: (score) =>
        set({ scores: [{ ...score, id: uid() }, ...get().scores] }),
      removeScore: (id) =>
        set({ scores: get().scores.filter((s) => s.id !== id) }),
      setPacking: (items) => set({ packing: items }),
      togglePacked: (label) =>
        set({
          packing: get().packing.map((p) =>
            p.label === label ? { ...p, done: !p.done } : p,
          ),
        }),
      loadSample: () => {
        const g = sampleGymnast();
        set({
          gymnasts: [g],
          activeId: g.id,
          unlocked: true,
          planKind: "yearly",
          draft: emptyDraft(),
          packing: [],
          scores: [
            {
              id: uid(),
              gymnastId: g.id,
              date: new Date(Date.now() - 86400000 * 28).toISOString().slice(0, 10),
              name: "In-house mock",
              vault: 8.4,
              bars: 8.1,
              beam: 8.0,
              floor: 8.6,
              notes: "Kip still spotting. Beam freeze after the leap.",
              falls: "Beam — after leap",
              video: "",
            },
          ],
        });
      },
      resetAll: () =>
        set({
          draft: emptyDraft(),
          gymnasts: [],
          activeId: null,
          unlocked: false,
          planKind: null,
          scores: [],
          packing: [],
        }),
    }),
    { name: "meetready-v2" },
  ),
);

export function useActiveGymnast() {
  return useMeet((s) => s.gymnasts.find((g) => g.id === s.activeId) ?? s.gymnasts[0] ?? null);
}

export const ROLES: { id: RoleId; label: string; hint: string }[] = [
  { id: "parent", label: "Parent / guardian", hint: "You run the household season" },
  { id: "gymnast", label: "Gymnast", hint: "This is your plan" },
  { id: "coach", label: "Coach", hint: "Tag only — this app is for families" },
];
