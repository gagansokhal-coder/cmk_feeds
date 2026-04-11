import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'

interface Props {
  children: ReactNode
}

export default function PageTransition({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return <div ref={ref}>{children}</div>
}
