export type NavItemData = {
    href: string
    title: string
}

export type NavItemHandle = {
    resetHover: () => void
}

export type DecodeHandle = {
    start: () => void
    reset: () => void
}