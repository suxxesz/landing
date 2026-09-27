'use client'

import Main from '@/pages/landing'
import Header from '@/widgets/Header'
import AudioPopup from '@/features/player/audio-popup'
import Overlay from '@/features/open-overlay'
import Button from '@/shared/ui/Button'

import audio from '@/entities/audio'
import { OverlayProvider } from '@/entities/overlay'
import { audioData } from '@/shared/config'

import type { TAudio } from '@/entities/audio/model/types'
import Portal from '@/shared/ui/Portal'

const MainPage = () => {
    const { AudioProvider } = audio

    return (
        <AudioProvider audioData={audioData as TAudio}>
            <Portal>
                <AudioPopup />
            </Portal>

            <OverlayProvider>
                <Header isSongRequired />

                <Main
                    children="SUXXESZ"
                    subtitle="Web developer | UI/UX Designer"
                />

                <Portal>
                    <Overlay>
                        <Button
                            href="/core/form"
                            className="link"
                            unussual
                        >
                            Write message here...
                        </Button>
                    </Overlay>
                </Portal>
            </OverlayProvider>
        </AudioProvider>
    )
}

export default MainPage 