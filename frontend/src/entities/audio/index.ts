import  AudioProvider , { AudioContext }   from "./provider/AudioProvider";
import { songAtom } from './model/atom'
import useAudio from "./model/useAudio";
import { type  TAudio , TAudioData ,IAudioContext  } from "./model/types";

export default {
    AudioProvider , 
    songAtom , 
    AudioContext , 
    useAudio , 
}
export type {TAudio , TAudioData , IAudioContext}