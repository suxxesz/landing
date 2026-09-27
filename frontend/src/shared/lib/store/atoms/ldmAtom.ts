import { atomWithStorage } from "jotai/utils";

export const LDM = atomWithStorage<boolean | null>("lowmode", null)