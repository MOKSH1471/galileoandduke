"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 350,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioningRef = useRef(false)

  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    if (!mounted || isTransitioningRef.current) return

    const nextTheme = isDark ? "light" : "dark"

    // If View Transitions API is not available or reduced motion is preferred, switch instantly
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme)
      return
    }

    // Read button coordinates BEFORE starting the transition to prevent forced layout reflow
    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    isTransitioningRef.current = true

    // Non-blocking transition (no flushSync main-thread freeze)
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
    })

    transition.ready
      .then(() => {
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        )

        animation.finished.finally(() => {
          isTransitioningRef.current = false
        })
      })
      .catch(() => {
        isTransitioningRef.current = false
      })
  }, [isDark, duration, setTheme, mounted])

  if (!mounted) return null

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "p-2 md:p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 text-foreground hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
