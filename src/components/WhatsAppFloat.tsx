import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import './WhatsAppFloat.css'

export default function WhatsAppFloat() {
  const floatRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        floatRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 2, ease: 'back.out(1.7)' }
      )

      // Idle pulse animation
      gsap.to(floatRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    })
    return () => ctx.revert()
  }, [])

  const whatsappNumber = '919216796805'
  const message = 'Hello! I am visiting your website and have a general inquiry. How can you help me?'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float glass"
      ref={floatRef}
      aria-label="Contact support on WhatsApp"
    >
      <div className="whatsapp-float__ping" />
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31Z" fill="white"/>
        <path d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31Z" fill="url(#paint0_linear)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 28C22.0751 28 27 23.0751 27 17C27 10.9249 22.0751 6 16 6C9.92487 6 5 10.9249 5 17C5 19.3642 5.70509 21.5617 6.91971 23.3739L5.91971 27.0801L9.76699 26.1111C11.5365 27.2556 13.6863 28 16 28Z" fill="white"/>
        <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"/>
        <defs>
          <linearGradient id="paint0_linear" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5BD066"/>
            <stop offset="1" stopColor="#27B43E"/>
          </linearGradient>
        </defs>
      </svg>
    </a>
  )
}
