'use client'

import './HeaderNavigation.scss'
import { linksData } from '@/entities/nav-item'

import {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
    memo,
} from 'react'

import clsx from 'clsx'
import gsap from 'gsap'
import { InfoIcon } from 'lucide-react'

import Button from '@/shared/ui/Button'

import {
    NavItem,
    useNavItem,
} from '@/entities/nav-item'


import type {
    NavItemHandle,
} from '@/entities/nav-item'



NavItem.displayName = 'NavItem'



const HeaderNavigation = memo(function HeaderNavigation(props: { onLeftSide: boolean }) {
    const {usePrefersReducedMotion} = useNavItem()
    const { onLeftSide } = props
    const reduced = usePrefersReducedMotion()
    const [opened, setIsOpened] = useState<boolean>(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const scanRef = useRef<HTMLSpanElement>(null)
    const itemsWrapRef = useRef<HTMLDivElement>(null)
    const itemHandles = useRef<(NavItemHandle | null)[]>([])
    const ctx = useRef<gsap.Context | null>(null)

    const onOpen = useCallback((): void => {
        setIsOpened(prev => !prev)
    }, [])


    const rootClassName = useMemo(
        () => clsx('navigation', onLeftSide && 'unreversed'),
        [onLeftSide]
    )

    const buttonClassName = useMemo(
        () => clsx('navigation__open', opened && 'is-open'),
        [opened]
    )

    useEffect(() => {
        if (!opened) return
        const handleClick = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setIsOpened(false)
            }
        }
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpened(false)
        }
        document.addEventListener('mousedown', handleClick)
        document.addEventListener('keydown', handleKey)
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('keydown', handleKey)
        }
    }, [opened])

    useEffect(() => {
        ctx.current = gsap.context(() => { }, rootRef)
        return () => ctx.current?.revert()
    }, [])

    useEffect(() => {
        const panel = panelRef.current
        const scan = scanRef.current
        const items = itemsWrapRef.current
            ? (Array.from(itemsWrapRef.current.children) as HTMLElement[])
            : []
        if (!panel || !scan || items.length === 0) return

        if (!opened) {
            itemHandles.current.forEach(h => h?.resetHover())
        }

        if (reduced) {
            gsap.set(panel, { autoAlpha: opened ? 1 : 0, clipPath: 'inset(0% 0% 0% 0%)' })
            gsap.set(items, { autoAlpha: opened ? 1 : 0, y: 0, rotateX: 0 })
            panel.style.pointerEvents = opened ? 'auto' : 'none'
            return
        }

        const tl = gsap.timeline()

        if (opened) {
            panel.style.pointerEvents = 'auto'
            tl.fromTo(panel,
                { clipPath: 'inset(0% 0% 100% 0% round 10px)', autoAlpha: 1, filter: 'blur(6px)' },
                { clipPath: 'inset(0% 0% 0% 0% round 10px)', filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
            )
            tl.fromTo(scan,
                { yPercent: -40, autoAlpha: 0 },
                { yPercent: 340, autoAlpha: 0.9, duration: 0.5, ease: 'power1.in' },
                0
            )
            tl.to(scan, { autoAlpha: 0, duration: 0.12 }, '-=0.08')
            tl.fromTo(items,
                { autoAlpha: 0, y: -10, rotateX: -70 },
                { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.45, stagger: 0.06, ease: 'back.out(1.8)' },
                '-=0.35'
            )
        } else {
            tl.to(items, { autoAlpha: 0, y: -6, duration: 0.15, stagger: 0.02, ease: 'power1.in' })
            tl.to(panel, {
                clipPath: 'inset(0% 0% 100% 0% round 10px)',
                filter: 'blur(4px)',
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => { panel.style.pointerEvents = 'none' }
            }, '-=0.05')
        }

        return () => { tl.kill() }
    }, [opened, reduced])

    return (
        <div ref={rootRef} className={rootClassName}>
            <Button
                className={buttonClassName}
                onClick={onOpen}
                title="Open nav dropdown"
                aria-expanded={opened}
            >
                <InfoIcon className="navigation__open--icon icon-switcher" />
            </Button>

            <div ref={panelRef} className="navigation__dropdown">
                <span ref={scanRef} className="navigation__dropdown-scan" />
                <div ref={itemsWrapRef} className="navigation__dropdown-items">
                    {linksData.map((item, i) => (
                        <NavItem
                            key={item.title}
                            item={item}
                            ref={(el) => { itemHandles.current[i] = el }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
})

HeaderNavigation.displayName = 'HeaderNavigation'

export default HeaderNavigation     