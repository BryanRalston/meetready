import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { packById } from "./packs.ts";
import {
  aaOf,
  buildPlan,
  iesOf,
  mobilityBadge,
  srLineFlagged,
} from "./plan.ts";
import type { Gymnast } from "./types.ts";

function gym(patch: Partial<Gymnast>): Gymnast {
  return {
    id: "g1",
    createdAt: "2026-01-01",
    role: "parent",
    name: "Test",
    programId: "dp",
    packId: "dp_4",
    momentId: "",
    meetDate: "",
    meetName: "",
    sessionTime: "",
    events: [],
    chips: [],
    hours: "",
    extras: [],
    body: [],
    panicId: "",
    goalId: "",
    ...patch,
  };
}

describe("aaOf / iesOf", () => {
  it("AA needs four events", () => {
    assert.equal(aaOf({ vault: 8.5, bars: 8.5, beam: 8.5, floor: null }), null);
    assert.equal(aaOf({ vault: 8.6, bars: 8.5, beam: 8.4, floor: 8.5 }), 34);
  });
  it("IES is max of 1–3 events, never an average", () => {
    assert.equal(iesOf({ vault: 8.6, bars: 8.5, beam: 8.4, floor: null }), 8.6);
    assert.equal(iesOf({ vault: 8.6, bars: 8.5, beam: 8.4, floor: 8.5 }), null);
    assert.equal(iesOf({ vault: null, bars: null, beam: null, floor: null }), null);
  });
});

describe("mobilityBadge", () => {
  const l4 = packById("dp_4")!;
  const l3 = packById("dp_3")!;
  const gold = packById("xcel_gold")!;
  const diamond = packById("xcel_diamond")!;

  it("L4 34.00 sanctioned is mobility eligible", () => {
    const msg = mobilityBadge(l4, 34, null, "sanctioned");
    assert.match(msg ?? "", /mobility eligible/);
  });
  it("L4 33.10 is not eligible", () => {
    assert.equal(mobilityBadge(l4, 33.1, null, "sanctioned"), null);
  });
  it("L4 34.00 in-house is not mobility", () => {
    assert.equal(mobilityBadge(l4, 34, null, "in_house"), "In-house — not mobility");
  });
  it("unsure never badges mobility", () => {
    assert.equal(mobilityBadge(l4, 34, null, "unsure"), null);
    assert.equal(mobilityBadge(l4, 34, null, null), null);
  });
  it("L3 34.10 is a clean-meet benchmark, not mobility", () => {
    assert.equal(mobilityBadge(l3, 34.1, null, "sanctioned"), "Clean-meet benchmark — not mobility");
  });
  it("Diamond IES 8.5 on three events, sanctioned", () => {
    const ies = iesOf({ vault: 8.6, bars: 8.5, beam: 8.4, floor: null });
    const msg = mobilityBadge(diamond, null, ies, "sanctioned");
    assert.match(msg ?? "", /8\.5 IES/);
  });
  it("Gold 32.00 AA sanctioned badges without changing SR hero type", () => {
    assert.equal(gold.numberThatMatters.type, "srs");
    const msg = mobilityBadge(gold, 32, null, "sanctioned");
    assert.match(msg ?? "", /32\.00 AA/);
  });
});

describe("srLineFlagged", () => {
  it("does not flag every beam SR from one beam chip", () => {
    const chips = [{ event: "beam", label: "Dance leap min 155°" }];
    assert.equal(
      srLineFlagged(
        "SR 2: Dance series — two Grp 1/2/3 elements AND one jump or leap min 155°",
        "beam",
        chips,
      ),
      true,
    );
    assert.equal(srLineFlagged("SR 1: Min 1/1 turn on one foot", "beam", chips), false);
    assert.equal(srLineFlagged("SR 4: Dismount — salto or aerial", "beam", chips), false);
  });
});

describe("buildPlan drills", () => {
  it("caps at three drills and 12 minutes", () => {
    const pack = packById("dp_4")!;
    const plan = buildPlan(
      gym({
        events: ["vault", "bars", "beam", "floor", "wait", "awards"],
        chips: ["freeze"],
        body: ["wrists"],
      }),
      pack,
    );
    assert.ok(plan.drills.length <= 3);
    assert.ok(plan.weekMinutes <= 12);
  });
});

describe("DP 2026–2030 vault charts", () => {
  it("L6/L7 only list the three Appendix 3 timers", () => {
    const l6 = packById("dp_6")!.specialRequirements!.vault.join(" ");
    const l7 = packById("dp_7")!.specialRequirements!.vault.join(" ");
    assert.match(l6, /1\.111/);
    assert.match(l6, /3\.116/);
    assert.match(l6, /4\.111/);
    assert.match(l7, /on the back/);
    assert.match(l6, /VOID/);
  });
  it("L8 lists chart vaults and does not invent Group 2 saltos", () => {
    const l8 = packById("dp_8")!.specialRequirements!.vault.join(" ");
    assert.match(l8, /1\.101 HS 9\.0/);
    assert.match(l8, /3\.201 Tsuk tuck 10\.0/);
    assert.match(l8, /5\.312 2\/1 10\.0/);
    assert.match(l8, /Group 2 saltos/);
    assert.doesNotMatch(l8, /2\.301/);
  });
  it("L9 and L10 cite the 2026–2030 SV charts and L10 asterisk bonus exceptions", () => {
    const l9 = packById("dp_9")!.specialRequirements!.vault.join(" ");
    const l10 = packById("dp_10")!.specialRequirements!.vault.join(" ");
    assert.match(l9, /dp-appendix2-l9-vault/);
    assert.match(l9, /3\.304 Tsuk layout 10\.0/);
    assert.match(l10, /dp-appendix1-l10-vault/);
    assert.match(l10, /2\.302, 2\.311, 3\.407, 4\.306, 4\.309, 4\.403, 4\.407, 5\.301, 5\.408, 5\.409/);
  });
});

describe("Xcel Appendix 2 vaults", () => {
  it("Gold lists Appendix 2 allowed HS/Yama codes and forbids Tsuk", () => {
    const gold = packById("xcel_gold")!;
    const vt = gold.specialRequirements!.vault.join(" ");
    assert.match(vt, /Appendix 2/);
    assert.match(vt, /1\.101/);
    assert.match(vt, /no Tsuk/i);
    assert.match(vt, /VOID/);
  });
});

describe("Xcel 155° encoding", () => {
  it("Platinum floor and Diamond beam/floor still say 155°", () => {
    const plat = packById("xcel_platinum")!;
    const dia = packById("xcel_diamond")!;
    const gold = packById("xcel_gold")!;
    assert.match(plat.specialRequirements!.floor.join(" "), /155°/);
    assert.match(dia.specialRequirements!.beam.join(" "), /155°/);
    assert.match(dia.specialRequirements!.floor.join(" "), /155°/);
    assert.doesNotMatch(plat.specialRequirements!.floor.join(" "), /leap min 150°/);
    assert.match(gold.specialRequirements!.floor.join(" "), /120°/);
  });
});
