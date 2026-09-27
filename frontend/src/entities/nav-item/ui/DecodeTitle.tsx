'use client'

import {
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    forwardRef,
    memo,
} from 'react'

import gsap from 'gsap'

import { DecodeHandle } from '../model/types'
import { GLYPHS } from '../model/constants'

type DecodeTitleProps = {
    text: string
    reduced: boolean
}

export const DecodeTitle = memo(
    forwardRef<DecodeHandle, DecodeTitleProps>(
        ({ text, reduced }, ref) => {
            const chars = useMemo(
                () => text.split(''),
                [text]
            )

            const spans = useRef<(HTMLSpanElement | null)[]>([])
            const tl = useRef<gsap.core.Timeline | null>(null)

            useImperativeHandle(
                ref,
                () => ({
                    start: () => {
                        if (reduced) return

                        tl.current?.kill()

                        const timeline = gsap.timeline()

                        chars.forEach((char, i) => {
                            const span = spans.current[i]

                            if (!span || char === ' ') return

                            const state = { p: 0 }

                            timeline.to(
                                state,
                                {
                                    p: 1,
                                    duration: 0.35,
                                    ease: 'power1.out',

                                    onUpdate: () => {
                                        span.textContent =
                                            state.p > 0.75
                                                ? char
                                                : GLYPHS[
                                                    (Math.random() *
                                                        GLYPHS.length) | 0
                                                ]
                                    },

                                    onComplete: () => {
                                        span.textContent = char
                                    },
                                },
                                i * 0.026
                            )
                        })

                        tl.current = timeline
                    },

                    reset: () => {
                        tl.current?.kill()

                        spans.current.forEach(
                            (span, i) => {
                                if (span) {
                                    span.textContent = chars[i]
                                }
                            }
                        )
                    },
                }),
                [chars, reduced]
            )

            useEffect(() => {
                return () => {
                    tl.current?.kill()
                }
            }, [])

            return (
                <span
                    className="decode-title"
                    aria-label={text}
                >
                    {chars.map((char, i) => (
                        <span
                            key={i}
                            ref={(el) => {
                                spans.current[i] = el
                            }}
                            className="decode-title__char"
                            aria-hidden="true"
                        >
                            {char}
                        </span>
                    ))}
                </span>
            )
        }
    )
)

DecodeTitle.displayName = 'DecodeTitle'