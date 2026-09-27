import { atom } from "jotai";

export const iconSizeAtom = atom<number>(16)
export const songAtom = atom<HTMLAudioElement | null>(null)