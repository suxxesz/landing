import { TActivities } from "./fetch.types"
export  interface IAudioContext  {
    song : HTMLAudioElement | null,
     isPaused : boolean,
        isStarted : boolean,
        image : string,
        title : string,
        play : () => void,
        pause : () => void,
        togglePlay : () => void,
        next : () => void,
        prev : () => void,
        preload : () => void,
        preloadState : boolean,
        iconSize : number
}