'use client'

import Button from '@/shared/ui/Button'
import Icon from '@/shared/ui/Icon'
import './LoudBar.scss'
import useLoudBar from '../model/useLoudBar'
import { Volume2Icon, VolumeXIcon , Volume1  } from 'lucide-react' 
import  ILoudBar  from '../model/types'
import { useAtomValue } from 'jotai'
import  audio  from '@/entities/audio'

export default function LoudBar() {

  const song = useAtomValue(audio.songAtom) 
                           
  const { handleVolumeChange , toggleMute , volume , muted  } : ILoudBar = useLoudBar(song)
  return (
    <div className="loud-bar">
      <div className="loud-bar__wrapper">
        <Button
          className="loud-bar__button"
          type="button"
          onClick={toggleMute}
        >
          <Icon
            Component={volume > 50 ? <Volume2Icon /> : volume === 0 ? <VolumeXIcon /> : <Volume1 />}
            className="loud-bar__icon icon-switcher"
            size={24}
          />
        </Button>

        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : volume}
          className="loud-bar__slider"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}