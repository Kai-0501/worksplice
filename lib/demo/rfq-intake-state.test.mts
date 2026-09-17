import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { rfqIntakeCopy } from "../../data/demo-001-rfq-intake.ts";
import {
  DEFAULT_DRAFT_TEXT,
  createInitialSnapshot,
  parseDemoStep,
  parsePlay,
  parseRecord,
  reduceDemo,
  snapshotFromStep,
  shouldShowChecklist,
  shouldShowDraft,
  shouldShowFlags,
} from "./rfq-intake-state.ts";

describe("rfq intake reducer", () => {
  it("starts idle with the canonical draft", () => {
    const start = createInitialSnapshot();
    assert.equal(start.state, "idle");
    assert.equal(DEFAULT_DRAFT_TEXT, rfqIntakeCopy.draft);
    assert.equal(start.draftText, rfqIntakeCopy.draft);
  });

  it("follows the deterministic Approve path", () => {
    let snapshot = createInitialSnapshot();
    snapshot = reduceDemo(snapshot, { type: "check" });
    assert.equal(snapshot.state, "checking");
    snapshot = reduceDemo(snapshot, { type: "showFlags" });
    assert.equal(snapshot.state, "flags");
    snapshot = reduceDemo(snapshot, { type: "showDraft" });
    assert.equal(snapshot.state, "draft");
    snapshot = reduceDemo(snapshot, { type: "approve" });
    assert.equal(snapshot.state, "approved");
  });

  it("ignores out-of-order actions", () => {
    const start = createInitialSnapshot();
    assert.equal(reduceDemo(start, { type: "approve" }).state, "idle");
    assert.equal(reduceDemo(start, { type: "showFlags" }).state, "idle");
    assert.equal(reduceDemo(start, { type: "discard" }).state, "idle");
  });

  it("supports edit, save, discard, and reset identity", () => {
    let snapshot = snapshotFromStep("draft");
    snapshot = reduceDemo(snapshot, { type: "edit" });
    assert.equal(snapshot.state, "editing");
    snapshot = reduceDemo(snapshot, {
      type: "saveEdit",
      text: "Edited clarification for Daniel.",
    });
    assert.equal(snapshot.state, "draft");
    assert.equal(snapshot.draftText, "Edited clarification for Daniel.");

    snapshot = reduceDemo(snapshot, { type: "discard" });
    assert.equal(snapshot.state, "discarded");

    const reset = reduceDemo(snapshot, { type: "reset" });
    assert.deepEqual(reset, createInitialSnapshot());
  });

  it("parses addressable steps and recording query values", () => {
    assert.equal(parseDemoStep("idle"), "idle");
    assert.equal(parseDemoStep("checking"), "checking");
    assert.equal(parseDemoStep("flags"), "flags");
    assert.equal(parseDemoStep("draft"), "draft");
    assert.equal(parseDemoStep("approved"), "approved");
    assert.equal(parseDemoStep("editing"), null);
    assert.equal(parseDemoStep("nope"), null);
    assert.equal(parsePlay("1"), true);
    assert.equal(parsePlay("true"), false);
    assert.equal(parseRecord("record"), true);
    assert.equal(parseRecord("1"), false);
  });

  it("keeps visual gates aligned with state", () => {
    assert.equal(shouldShowChecklist("idle"), false);
    assert.equal(shouldShowChecklist("checking"), true);
    assert.equal(shouldShowFlags("checking"), false);
    assert.equal(shouldShowFlags("flags"), true);
    assert.equal(shouldShowDraft("flags"), false);
    assert.equal(shouldShowDraft("draft"), true);
    assert.equal(shouldShowDraft("approved"), true);
    assert.equal(shouldShowDraft("discarded"), false);
  });
});
