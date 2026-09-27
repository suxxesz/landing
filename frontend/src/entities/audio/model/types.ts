export type TAudioData = {
    src: string , 
    image : string , 
    title : string , 
    end : string , 
}

export type TAudio = Array<TAudioData>
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