'use client'

import {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    forwardRef,
    memo,
} from 'react'

import gsap from 'gsap'
import Link from 'next/link'

import {
    DecodeHandle,
    NavItemData,
    NavItemHandle,
} from '../model/types'

import { useNavItem } from '../model/useNavItem'

import { DecodeTitle } from './DecodeTitle'

type NavItemProps = {
    item: NavItemData
}
const  {usePrefersReducedMotion} = useNavItem()

export const NavItem = memo(
    forwardRef<NavItemHandle, NavItemProps>(
        ({ item }, ref) => {
            const reduced = usePrefersReducedMotion()

            const itemRef =
                useRef<HTMLDivElement>(null)

            const barRef =
                useRef<HTMLSpanElement>(null)

            const decodeRef =
                useRef<DecodeHandle>(null)

            const yTween =
                useRef<gsap.QuickToFunc | null>(null)

            const barTween =
                useRef<gsap.QuickToFunc | null>(null)

            useEffect(() => {
                if (
                    !itemRef.current ||
                    !barRef.current
                ) {
                    return
                }

                yTween.current = gsap.quickTo(
                    itemRef.current,
                    'y',
                    {
                        duration: 0.25,
                        ease: 'power2.out',
                    }
                )

                barTween.current = gsap.quickTo(
                    barRef.current,
                    'scaleX',
                    {
                        duration: 0.3,
                        ease: 'power3.out',
                    }
                )
            }, [])

            const onEnter = useCallback(() => {
                decodeRef.current?.start()

                if (reduced) return

                yTween.current?.(-2)
                barTween.current?.(1)
            }, [reduced])

            const onLeave = useCallback(() => {
                decodeRef.current?.reset()

                if (reduced) return

                yTween.current?.(0)
                barTween.current?.(0)
            }, [reduced])

            useImperativeHandle(
                ref,
                () => ({
                    resetHover: () => {
                        decodeRef.current?.reset()
                        yTween.current?.(0)
                        barTween.current?.(0)
                    },
                }),
                []
            )

            const onLocateMove = useCallback(
                (
                    e: React.MouseEvent<HTMLAnchorElement>
                ) => {
                    e.preventDefault()

                    const href =
                        e.currentTarget.href

                    setTimeout(() => {
                        window.location.href = href
                    }, 1000)
                },
                []
            )

            return (
                <div
                    ref={itemRef}
                    className="navigation__item"
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    onFocus={onEnter}
                    onBlur={onLeave}
                >
                    <div
                        className="navigation__item--title"
                        title={item.title}
                    >
                        <Link
                            href={item.href}
                            target="_blank"
                            onClick={onLocateMove}
                        >
                            <DecodeTitle
                                ref={decodeRef}
                                text={item.title}
                                reduced={reduced}
                            />
                        </Link>
                    </div>

                    <span
                        ref={barRef}
                        className="navigation__item--bar"
                    />
                </div>
            )
        }
    )
)

NavItem.displayName = 'NavItem'