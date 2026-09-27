export type TAudioData = {
    src: string
    title: string
    image: string
}
export type AudioPlayerState = {
    index: number
    isPaused: boolean
    isStarted: boolean
    preloadState: boolean
}