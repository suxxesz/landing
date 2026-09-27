'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useAtom } from 'jotai'

import { iconSizeAtom, songAtom } from './atom'
import { TAudioData } from './types'

const useAudio = (audioData: TAudioData[]) => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [isStarted, setIsStarted] = useState(false)
  const [preloadState, setPreloadState] = useState(false)

  const [song, setSong] = useAtom(songAtom)
  const [iconSize, setIconSize] = useAtom(iconSizeAtom)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    if (!audioRef.current) return

    audioRef.current.play().catch(() => {})
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    if (!audioRef.current) return

    audioRef.current.pause()
    setIsPaused(true)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPaused) {
      play()
    } else {
      pause()
    }
  }, [isPaused, play, pause])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % audioData.length)
    setIsPaused(false)
    setIsStarted(true)
  }, [audioData.length])

  const prev = useCallback(() => {
    setIndex((i) =>
      i === 0
        ? audioData.length - 1
        : i - 1
    )

    setIsPaused(false)
    setIsStarted(true)
  }, [audioData.length])

  const preload = useCallback(() => {
    setIsPaused(false)
    setIsStarted(true)
    setPreloadState((prev) => !prev)
  }, [])

  /*
   * Responsive icon size
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth === 500) {
        setIconSize(16)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setIconSize])

  /*
   * Create / replace audio
   */
  useEffect(() => {
    if (!audioData.length) return

    audioRef.current?.pause()

    const audio = new Audio(audioData[index].src)

    audioRef.current = audio
    setSong(audio)

    const onPlay = () => {
      setIsPaused(false)
    }

    const onPause = () => {
      setIsPaused(true)
    }

    const onEnded = () => {
      next()
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    if (isStarted) {
      audio.play().catch(() => {})
    }

    return () => {
      audio.pause()

      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [
    index,
    isStarted,
    audioData,
    next,
    setSong,
  ])

  return {
    isPaused,
    isStarted,

    image: audioData[index]?.image,
    title: audioData[index]?.title,

    play,
    pause,
    togglePlay,
    next,
    prev,
    preload,

    preloadState,
    iconSize,
  }
}

export default useAudio