'use client'

import React from 'react'
import Button from '@/shared/ui/Button'
import { clsx } from 'clsx'
import './ThemeSwitcher.scss'
import useThemeSwitcher from '../model/useThemeSwitcher'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideProps, Moon, Sun } from 'lucide-react'
import Portal from '@/shared/ui/Portal'

export default function ThemeSwitcher() {
  const {
    isDarkTheme,
    toggleTheme,
    isAnimating,
    isClickBlocked,
    coords,
    completeAnimation,
  } = useThemeSwitcher()

  const CurrentIcon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> &
    React.RefAttributes<SVGSVGElement>
  > = isDarkTheme ? Moon : Sun

  return (
    <>
      <Portal>
        <div className="dark-theme-animation-container">
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                key={isDarkTheme ? 'dark-wave' : 'light-wave'}
                className={clsx(
                  'dark-theme-switcher-circle',
                  isDarkTheme
                    ? 'dark-theme-switcher-circle-black'
                    : 'dark-theme-switcher-circle-white'
                )}
                style={{
                  top: coords.y,
                  left: coords.x,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 0.2,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                onAnimationComplete={completeAnimation}
              />
            )}
          </AnimatePresence>
        </div>
      </Portal>

      <Button
        className={clsx(
          'dark-theme-switcher',
          isClickBlocked && 'dark-theme-switcher--disabled'
        )}
        type="button"
        isDisabeled={isClickBlocked}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          toggleTheme(e)
        }
      >
        <CurrentIcon
          className="icon-switcher"
          width={44}
          height={44}
        />
      </Button>
    </>
  )
}