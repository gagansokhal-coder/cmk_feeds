import { useState, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
import { getGeneralWhatsAppUrl } from '../utils/whatsapp'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Inputs stagger in
      gsap.fromTo(
        '.form-group',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      ranch: formData.get('ranch') as string,
      herdSize: formData.get('herdSize') as string,
      message: formData.get('message') as string,
    }

    const whatsappUrl = getGeneralWhatsAppUrl(data)
    window.open(whatsappUrl, '_blank')
    
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="page-contact">
      {/* ═══ HERO ═══ */}
      <section className="contact-hero" ref={heroRef}>
        <div className="container contact-hero__content">
          <RevealOnScroll>
            <span className="label-tag">Private Inquiry</span>
            <SplitText as="h1" className="display-lg" delay={0.2} style={{ marginTop: 20 }}>
              Get in Touch.
            </SplitText>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 600 }}>
              Whether you need a full feed plan or a custom mix, our experts
              are here to help your farm.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ CONTACT GRID ═══ */}
      <section className="contact-main section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Column */}
            <RevealOnScroll className="contact-info">
              <div className="contact-detail">
                <h3 className="title-lg">CMK</h3>
                <div className="contact-detail__items">
                  <div className="contact-detail__item">
                    <span className="contact-detail__label">Headquarters</span>
                    <span className="contact-detail__value">
                      1 Bnw Hakmabad, 4 Bgs,
                      <br />
                      Rajasthan 335062
                    </span>
                  </div>
                  <div className="contact-detail__item">
                    <span className="contact-detail__label">Phone</span>
                    <span className="contact-detail__value">+91 92167 96805</span>
                  </div>
                  <div className="contact-detail__item">
                    <span className="contact-detail__label">Email</span>
                    <span className="contact-detail__value">hello@cmkfeed.com</span>
                  </div>
                </div>
              </div>

              <div className="contact-seal">
                <div className="contact-seal__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <strong className="title-md">Our Quality Seal</strong>
                  <p className="body-md" style={{ marginTop: 4 }}>
                    We keep your information private and handle every message with care.
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact-map">
                <div className="contact-map__inner">
                  <div className="contact-map__pin">
                    <div className="contact-map__ping" />
                  </div>
                  <span className="label-sm">Rajasthan, India</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Form Column */}
            <RevealOnScroll delay={0.2} className="contact-form-wrap">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="headline-md">Talk to Our Experts</h3>

                <div className="form-group">
                  <input type="text" id="fullName" name="fullName" required placeholder=" " />
                  <label htmlFor="fullName">Full Name</label>
                </div>

                <div className="form-group">
                  <input type="email" id="email" name="email" required placeholder=" " />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="form-group">
                  <input type="text" id="ranch" name="ranch" placeholder=" " />
                  <label htmlFor="ranch">Farm Name</label>
                </div>

                <div className="form-group form-group--select">
                  <select id="herdSize" name="herdSize" required defaultValue="">
                    <option value="" disabled>How many cattle do you have?</option>
                    <option value="under100">Under 100 animals</option>
                    <option value="100-500">100 – 500 animals</option>
                    <option value="500-1000">500 – 1,000 animals</option>
                    <option value="over1000">Over 1,000 animals</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea id="message" name="message" rows={4} required placeholder=" " />
                  <label htmlFor="message">How can we help?</label>
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    className={`btn btn--primary btn--full ${submitted ? 'btn--success' : ''}`}
                    style={{ width: '100%', marginTop: 12 }}
                  >
                    {submitted ? '✓ Message Sent' : 'Send Message'}
                  </button>
                </MagneticButton>

                {submitted && (
                  <p className="form-success">
                    Thank you. We will get back to you within 24 hours.
                  </p>
                )}
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>


    </div>
  )
}
