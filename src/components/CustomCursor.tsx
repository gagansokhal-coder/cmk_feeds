import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let followerX = 0
    let followerY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      if (!cursor || !follower) return
      // Cursor follows immediately
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`

      // Follower lags behind
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`

      requestAnimationFrame(animate)
    }

    const onLinkEnter = () => {
      cursor.classList.add('cursor--hover')
      follower.classList.add('follower--hover')
    }

    const onLinkLeave = () => {
      cursor.classList.remove('cursor--hover')
      follower.classList.remove('follower--hover')
    }

    window.addEventListener('mousemove', onMove)
    animate()

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, .magnetic, input, textarea, select')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onLinkEnter)
      el.addEventListener('mouseleave', onLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onLinkEnter)
        el.removeEventListener('mouseleave', onLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      <div className="custom-cursor-follower" ref={followerRef} />
    </>
  )
}
