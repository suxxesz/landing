'use client'
import { createContext } from 'react'
import useOverlay from "../model/useOverlay"
import { IOverlayContext } from "../model/types"
import React  from "react"

export const OverlayContext = createContext({
    hasOpened: false,
    onClose: () => {},
})



export  function OverlayProvider({ children } : { children: React.ReactNode }) {
    const { hasOpened, onClose } : IOverlayContext = useOverlay()

    return (
        <OverlayContext.Provider value={{ hasOpened, onClose }}>
            {children}
        </OverlayContext.Provider>
    )
}