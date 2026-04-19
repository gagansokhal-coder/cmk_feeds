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

  const whatsappNumber = '919929696199'
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-2.32 0-4.519 1.132-5.877 3.028-1.358 1.897-1.575 4.31-.579 6.42l-.634 2.316 2.378-.624c.954.514 2.02.784 3.111.784 4.097 0 7.431-3.334 7.431-7.431 0-4.097-3.334-7.431-7.431-7.431zm3.626 10.155c-.15.421-.861.802-1.258.854-.33.043-.761.077-1.229-.074-.3-.097-.68-.231-1.168-.435-2.072-.861-3.414-2.964-3.517-3.1-.103-.137-.838-1.116-.838-2.129 0-1.013.531-1.51.72-1.714.188-.205.41-.256.547-.256.137 0 .274.001.393.007.125.006.294-.047.461.353.167.4.57 1.385.619 1.482.049.096.082.208.017.33-.065.122-.097.208-.194.318-.097.113-.204.251-.291.336-.097.094-.199.196-.086.39.113.194.502.827 1.077 1.339.739.658 1.362.861 1.554.957.194.097.307.081.42-.047.114-.128.484-.563.613-.755.129-.192.259-.161.437-.097.178.065 1.127.531 1.32.628.194.097.323.145.37.227.047.082.047.47-.103.891z" />
      </svg>
    </a>
  )
}
