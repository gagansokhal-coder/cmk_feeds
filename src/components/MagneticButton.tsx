import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  speed?: number
}

export default function MagneticButton({ children, className = '', style, speed = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * speed
      const deltaY = (e.clientY - centerY) * speed
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      setTimeout(() => {
        el.style.transition = ''
      }, 500)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [speed])

  return (
    <div ref={ref} className={`magnetic ${className}`} style={{ display: 'inline-block', ...style }}>
      {children}
    </div>
  )
}
