'use client'

import {
    useContext,
    useEffect,
    useState
} from "react"

import {
    OverlayContext,
    type IOverlayContext
} from "@/entities/overlay"

const useOpenOverlay = () => {
    const {
        onClose,
        hasOpened
    }: IOverlayContext = useContext(OverlayContext)

    const [mounted, setMounted] = useState(hasOpened)

    useEffect(() => {
        if (hasOpened) {
            setMounted(true)
            return
        }

        const timer = setTimeout(() => {
            setMounted(false)
        }, 600)

        return () => clearTimeout(timer)
    }, [hasOpened])

    return {
        onClose,
        hasOpened,
        mounted
    }
}

export default useOpenOverlay