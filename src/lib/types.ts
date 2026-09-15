export type ProgramId = "dp" | "xcel" | "preteam";
export type Track =
  | "developmental"
  | "compulsory"
  | "optional"
  | "xcel"
  | "preteam";

export type EventId = "vault" | "bars" | "beam" | "floor" | "awards" | "wait";

export type RoleId = "parent" | "gymnast" | "coach";

export type PlanKind = "yearly" | "monthly" | "season" | "trial" | "free";

export type MeetKind = "sanctioned" | "in_house" | "unsure";

export type NumberType =
  | "consistency"
  | "benchmark"
  | "mobility_aa"
  | "mobility_aa_or_ies"
  | "execution"
  | "execution_composition"
  | "srs"
  | "decision";

export type Pack = {
  id: string;
  program: ProgramId | string;
  track: Track | string;
  label: string;
  shortLabel: string;
  minAge: number | null;
  helper: string;
  codeCycle: string | null;
  ship: "full" | "stub" | string;
  valueParts?: {
    A?: number;
    B?: number;
    C?: number;
    startValue?: number;
    compositionCreditMax?: number;
    bonusMax?: number;
  };
  mobility: {
    aa: number | null;
    ies: number | null;
    nextLevel?: string;
    fromDivision?: string;
    moveUpTarget?: number;
    note: string;
  };
  numberThatMatters: {
    type: NumberType | string;
    label: string;
    target?: number;
    ies?: number;
    moveUpTarget?: number;
    example?: string;
  };
  goals: { id: string; label: string }[];
  proofLine: string;
  paywallHeadline: string;
  chips: Record<string, string[]>;
  specialRequirements?: Record<string, string[]>;
};

export type ChipDef = { id: string; label: string };

export type Catalog = {
  version: string;
  updated: string;
  disclaimer: string;
  subscription: {
    yearly: { price: number; label: string; badge: string };
    monthly: { price: number };
    season: { price: number; months: number };
    closePathTrialDays: number;
    householdGymnasts: boolean;
  };
  sharedChips: ChipDef[];
  events: EventId[];
  seasonMoments: {
    id: string;
    label: string;
    minLevel?: number;
    programs?: string[];
  }[];
  programs: { id: ProgramId | string; label: string; levels: string[] }[];
  packs: Record<string, Pack>;
  planCards: { id: string; title: string; rules: string }[];
  meetDayPacking: string[];
  meetDayRules: string[];
};

export type Draft = {
  role: RoleId;
  name: string;
  programId: ProgramId | "";
  packId: string;
  momentId: string;
  meetDate: string;
  meetName: string;
  sessionTime: string;
  events: EventId[];
  chips: string[];
  hours: string;
  extras: string[];
  body: string[];
  panicId: string;
  goalId: string;
};

export type Gymnast = Draft & {
  id: string;
  createdAt: string;
};

export type MeetScore = {
  id: string;
  gymnastId: string;
  packId?: string;
  date: string;
  name: string;
  meetKind: MeetKind;
  vault: number | null;
  bars: number | null;
  beam: number | null;
  floor: number | null;
  notes: string;
  falls: string;
  video: string;
  iesEvent?: EventId | "";
};

export type PackedItem = {
  label: string;
  done: boolean;
};
