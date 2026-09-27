'use client'

import {
    useCallback,
    type RefObject,
} from 'react'

import type { TAudioData } from './types'

type UseAudioPlayerParams = {
    audioData: TAudioData[]
    audioRef: RefObject<HTMLAudioElement | null>

    isPaused: boolean

    setIsPaused: React.Dispatch<
        React.SetStateAction<boolean>
    >

    setIndex: React.Dispatch<
        React.SetStateAction<number>
    >

    setIsStarted: React.Dispatch<
        React.SetStateAction<boolean>
    >

    setPreloadState: React.Dispatch<
        React.SetStateAction<boolean>
    >
}

export const useAudioPlayer = ({
    audioData,
    audioRef,
    isPaused,
    setIsPaused,
    setIndex,
    setIsStarted,
    setPreloadState,
}: UseAudioPlayerParams) => {

    const play = useCallback(() => {
        if (!audioRef.current) return

        audioRef.current
            .play()
            .catch(() => {})

        setIsPaused(false)
    }, [
        audioRef,
        setIsPaused,
    ])

    const pause = useCallback(() => {
        if (!audioRef.current) return

        audioRef.current.pause()

        setIsPaused(true)
    }, [
        audioRef,
        setIsPaused,
    ])

    const togglePlay = useCallback(() => {
        if (isPaused) {
            play()
        } else {
            pause()
        }
    }, [
        isPaused,
        play,
        pause,
    ])

    const next = useCallback(() => {
        setIndex(
            i => (i + 1) % audioData.length
        )

        setIsPaused(false)
        setIsStarted(true)
    }, [
        audioData.length,
        setIndex,
        setIsPaused,
        setIsStarted,
    ])

    const prev = useCallback(() => {
        setIndex(
            i =>
                i === 0
                    ? audioData.length - 1
                    : i - 1
        )

        setIsPaused(false)
        setIsStarted(true)
    }, [
        audioData.length,
        setIndex,
        setIsPaused,
        setIsStarted,
    ])

    const preload = useCallback(() => {
        setIsPaused(false)
        setIsStarted(true)

        setPreloadState(
            prev => !prev
        )
    }, [
        setIsPaused,
        setIsStarted,
        setPreloadState,
    ])

    return {
        play,
        pause,
        togglePlay,
        next,
        prev,
        preload,
    }
}