'use client'

import { X, Bell } from "lucide-react"
import clsx from "clsx"

import Button from "@/shared/ui/Button"
import useOpenOverlay from "../model/useOpenOverlay"

import "./Overlay.scss"

export default function Overlay({
    children
}: {
    children: React.ReactNode
}) {
    const {
        hasOpened,
        onClose,
        mounted
    } = useOpenOverlay()

    if (!mounted) {
        return null
    }

    return (
        <figure
            className={clsx(
                "overlay",
                hasOpened && "overlay--visible"
            )}
        >
            <div className="overlay__icon">
                <Bell size={18} />
            </div>

            <div className="overlay__content">
                <h3 className="overlay__title">
                    Need to contact with me as fast as possible?
                </h3>

                <div className="overlay__subtitle-wrapper">
                    <span className="overlay__subtitle">
                        {children}
                    </span>

                    <div className="overlay__dot" />
                </div>
            </div>

            <Button
                className="overlay__close-button"
                onClick={onClose}
            >
                <X
                    className="overlay__close-button-icon"
                    size={12}
                />
            </Button>
        </figure>
    )
}