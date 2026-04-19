import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MagneticButton from './MagneticButton'
import './InquiryModal.css'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    desc: string
    protein: string
    energy: string
  } | null
  onSend: (message: string) => void
}

export default function InquiryModal({ isOpen, onClose, product, onSend }: InquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        gsap.fromTo(
          modalRef.current,
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        )
      })
      return () => ctx.revert()
    }
  }, [isOpen])

  const handleSend = () => {
    if (textRef.current) {
      onSend(textRef.current.value)
      onClose()
    }
  }

  if (!isOpen || !product) return null

  return (
    <div className="inquiry-overlay" ref={overlayRef} onClick={onClose}>
      <div className="inquiry-modal glass" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="inquiry-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="inquiry-header">
          <span className="label-tag">Product Inquiry</span>
          <h2 className="headline-md" style={{ marginTop: 12 }}>{product.name}</h2>
          <p className="body-sm" style={{ opacity: 0.7 }}>Specify your requirements below.</p>
        </div>

        <div className="inquiry-body">
          <div className="inquiry-field">
            <label htmlFor="inquiry-msg" className="label-sm">Special Requirements / Message</label>
            <textarea
              id="inquiry-msg"
              ref={textRef}
              placeholder="How many head of cattle are you feeding? Any specific goals for this mix?"
              autoFocus
            />
          </div>
        </div>

        <div className="inquiry-footer">
          <MagneticButton style={{ width: '100%' }}>
            <button className="btn btn--primary btn--full" onClick={handleSend}>
              Send Inquiry via WhatsApp
            </button>
          </MagneticButton>
          <p className="inquiry-note">
            This will open WhatsApp to message our inquiry line (+91 97997 62014)
          </p>
        </div>
      </div>
    </div>
  )
}
