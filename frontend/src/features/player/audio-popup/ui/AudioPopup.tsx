'use client'

import './AudioPopup.scss'
import  { useContext } from 'react'
import audio from '@/entities/audio'
import clsx from 'clsx'


export default function AudioPopup() {
  const audioContext = useContext(audio.AudioContext)
  const { preload, preloadState } = audioContext ?? {}

  return (
    <div className={preloadState ? clsx('audio-popup', 'hide') : clsx('audio-popup', 'show-popup')} onClick={preload}>
      <div className="audio-popup__content">
        <p>Click to enter</p>
      </div>
    </div>
  )
}