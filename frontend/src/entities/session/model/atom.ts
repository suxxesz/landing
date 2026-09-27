import { atomWithStorage } from "jotai/utils";

export const sessionIdAtom = atomWithStorage<string | null>("session_id", null)