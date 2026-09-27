'use client'

import { useEffect, useState } from 'react'
import type ILoudBar from './types'

const DEFAULT_VOLUME = 100

const useLoudBar = (song: HTMLAudioElement | null) => {
    const [volume, setVolume] = useState(DEFAULT_VOLUME)
    const [muted, setMuted] = useState(false)
    const [prevVolume, setPrevVolume] = useState(DEFAULT_VOLUME)

    useEffect(() => {
        const savedVolume = localStorage.getItem('volume')
        const savedMuted = localStorage.getItem('isMuted')
        const savedPrevVolume = localStorage.getItem('prevVolume')

        if (savedVolume !== null) {
            setVolume(Number(savedVolume))
        }

        if (savedMuted !== null) {
            setMuted(savedMuted === 'true')
        }

        if (savedPrevVolume !== null) {
            setPrevVolume(Number(savedPrevVolume))
        }
    }, [])

    useEffect(() => {
        if (!song) return

        song.volume = muted ? 0 : volume / 100
    }, [song, volume, muted])

    useEffect(() => {
        if (!song) return

        const handleVolume = () => {
            const newVolume = song.volume * 100

            setVolume(newVolume)
            setMuted(song.volume === 0)
        }

        song.addEventListener('volumechange', handleVolume)

        return () => {
            song.removeEventListener('volumechange', handleVolume)
        }
    }, [song])

    const toggleMute = () => {
        setMuted(prev => {
            const newMuted = !prev

            if (newMuted) {
                setPrevVolume(volume)

                localStorage.setItem(
                    'prevVolume',
                    volume.toString()
                )
            } else {
                const restoredVolume = prevVolume || DEFAULT_VOLUME

                setVolume(restoredVolume)

                localStorage.setItem(
                    'volume',
                    restoredVolume.toString()
                )
            }

            localStorage.setItem(
                'isMuted',
                newMuted.toString()
            )

            return newMuted
        })
    }

    const handleVolumeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newVolume = Number(e.target.value)

        setVolume(newVolume)

        localStorage.setItem(
            'volume',
            newVolume.toString()
        )

        if (newVolume > 0) {
            setPrevVolume(newVolume)
            setMuted(false)

            localStorage.setItem(
                'prevVolume',
                newVolume.toString()
            )

            localStorage.setItem(
                'isMuted',
                'false'
            )
        }
    }

    return {
        handleVolumeChange,
        toggleMute,
        volume,
        muted,
        prevVolume,
    } satisfies ILoudBar
}

export default useLoudBar