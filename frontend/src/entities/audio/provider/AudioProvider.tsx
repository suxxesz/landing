'use client'

import React, {
  createContext,
  useMemo,
} from 'react'

import useAudio from '../model/useAudio'
import {
  IAudioContext,
  TAudio,
} from '../model/types'

export const AudioContext =
  createContext<Partial<IAudioContext> | null>(null)

export default function AudioProvider({
  children,
  audioData,
}: {
  children: React.ReactNode
  audioData: TAudio
}) {
  const audio = useAudio(audioData)

  const value = useMemo(
    () => ({
      isPaused: audio.isPaused,
      isStarted: audio.isStarted,

      image: audio.image,
      title: audio.title,

      play: audio.play,
      pause: audio.pause,
      togglePlay: audio.togglePlay,
      next: audio.next,
      prev: audio.prev,
      preload: audio.preload,

      preloadState: audio.preloadState,
      iconSize: audio.iconSize,
    }),
    [
      audio.isPaused,
      audio.isStarted,
      audio.image,
      audio.title,
      audio.play,
      audio.pause,
      audio.togglePlay,
      audio.next,
      audio.prev,
      audio.preload,
      audio.preloadState,
      audio.iconSize,
    ],
  )

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}