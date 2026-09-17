export const DEFAULT_DRAFT_TEXT =
  "Thanks Daniel. Before we finalise the quotation, could you confirm the required delivery date and whether material certification is required?";

export const DEMO_STATES = [
  "idle",
  "checking",
  "flags",
  "draft",
  "editing",
  "discarded",
  "approved",
] as const;

export type DemoState = (typeof DEMO_STATES)[number];

export const ADDRESSABLE_STEPS = [
  "idle",
  "checking",
  "flags",
  "draft",
  "approved",
] as const;

export type AddressableStep = (typeof ADDRESSABLE_STEPS)[number];

export type DemoAction =
  | { type: "check" }
  | { type: "showFlags" }
  | { type: "showDraft" }
  | { type: "approve" }
  | { type: "edit" }
  | { type: "saveEdit"; text: string }
  | { type: "discard" }
  | { type: "reset" };

export type DemoSnapshot = {
  state: DemoState;
  draftText: string;
};

export const DEMO_TEST_IDS = {
  root: "demo-root",
  checkRfq: "demo-check-rfq",
  reset: "demo-reset",
  missing: "demo-missing",
  draft: "demo-draft",
  approve: "demo-approve",
  edit: "demo-edit",
  discard: "demo-discard",
  final: "demo-final",
} as const;

export const DEMO_TIMING_MS = {
  checking: 400,
  flagsHoldInteractive: 700,
  playIdle: 8000,
  playFlags: 12000,
  playDraft: 14000,
} as const;

export function createInitialSnapshot(): DemoSnapshot {
  return {
    state: "idle",
    draftText: DEFAULT_DRAFT_TEXT,
  };
}

export function parseDemoStep(value: string | null): AddressableStep | null {
  if (value && ADDRESSABLE_STEPS.includes(value as AddressableStep)) {
    return value as AddressableStep;
  }

  return null;
}

export function parsePlay(value: string | null): boolean {
  return value === "1";
}

export function parseRecord(value: string | null): boolean {
  return value === "record";
}

export function snapshotFromStep(step: AddressableStep): DemoSnapshot {
  return {
    state: step,
    draftText: DEFAULT_DRAFT_TEXT,
  };
}

export function reduceDemo(
  snapshot: DemoSnapshot,
  action: DemoAction,
): DemoSnapshot {
  switch (action.type) {
    case "check":
      if (snapshot.state !== "idle") {
        return snapshot;
      }
      return { ...snapshot, state: "checking" };
    case "showFlags":
      if (snapshot.state !== "checking") {
        return snapshot;
      }
      return { ...snapshot, state: "flags" };
    case "showDraft":
      if (snapshot.state !== "flags") {
        return snapshot;
      }
      return { ...snapshot, state: "draft" };
    case "approve":
      if (snapshot.state !== "draft") {
        return snapshot;
      }
      return { ...snapshot, state: "approved" };
    case "edit":
      if (snapshot.state !== "draft") {
        return snapshot;
      }
      return { ...snapshot, state: "editing" };
    case "saveEdit":
      if (snapshot.state !== "editing") {
        return snapshot;
      }
      return {
        state: "draft",
        draftText: action.text,
      };
    case "discard":
      if (snapshot.state !== "draft") {
        return snapshot;
      }
      return { ...snapshot, state: "discarded" };
    case "reset":
      return createInitialSnapshot();
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export function shouldShowChecklist(state: DemoState): boolean {
  switch (state) {
    case "idle":
      return false;
    case "checking":
    case "flags":
    case "draft":
    case "editing":
    case "discarded":
    case "approved":
      return true;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

export function shouldShowFlags(state: DemoState): boolean {
  switch (state) {
    case "idle":
    case "checking":
      return false;
    case "flags":
    case "draft":
    case "editing":
    case "discarded":
    case "approved":
      return true;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

export function shouldShowDraft(state: DemoState): boolean {
  switch (state) {
    case "idle":
    case "checking":
    case "flags":
    case "discarded":
      return false;
    case "draft":
    case "editing":
    case "approved":
      return true;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
