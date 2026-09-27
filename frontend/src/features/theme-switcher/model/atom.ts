import { atomWithStorage } from "jotai/utils";

export const isDarkThemeAtom = atomWithStorage<boolean>("isDarkTheme", true)