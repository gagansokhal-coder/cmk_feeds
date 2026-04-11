import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  style?: React.CSSProperties
  delay?: number
  stagger?: number
  duration?: number
  triggerOnScroll?: boolean
}

export default function SplitText({
  children,
  className = '',
  as: Tag = 'div',
  style,
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  triggerOnScroll = true,
}: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const text = el.textContent || ''
    el.innerHTML = ''

    // Create word containers
    const words = text.split(' ')
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span')
      wordSpan.style.display = 'inline-block'
      wordSpan.style.overflow = 'hidden'

      const chars = word.split('')
      chars.forEach((char) => {
        const charSpan = document.createElement('span')
        charSpan.textContent = char
        charSpan.style.display = 'inline-block'
        charSpan.style.transform = 'translateY(120%)'
        charSpan.style.opacity = '0'
        charSpan.classList.add('split-char')
        wordSpan.appendChild(charSpan)
      })

      el.appendChild(wordSpan)

      // Add space between words
      if (wordIndex < words.length - 1) {
        const space = document.createElement('span')
        space.innerHTML = '&nbsp;'
        space.style.display = 'inline-block'
        el.appendChild(space)
      }
    })

    const allChars = el.querySelectorAll('.split-char')

    const animConfig: gsap.TweenVars = {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    }

    if (triggerOnScroll) {
      gsap.registerPlugin(ScrollTrigger)
      ;(animConfig as any).scrollTrigger = {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }

    gsap.to(allChars, animConfig)

    return () => {
      gsap.killTweensOf(allChars)
    }
  }, [delay, stagger, duration, triggerOnScroll, children])

  return (
    <Tag ref={containerRef as any} className={`split-text ${className}`} style={style}>
      {children}
    </Tag>
  )
}
