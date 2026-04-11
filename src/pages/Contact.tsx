import { useState, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
              Establish a Private Line.
            </SplitText>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 600 }}>
              Whether discussing large-scale nutritional strategy or bespoke
              feed formulations, our laboratory and estate managers are
              available for distinguished consultation.
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
                <h3 className="title-lg">The CMK Estate</h3>
                <div className="contact-detail__items">
                  <div className="contact-detail__item">
                    <span className="contact-detail__label">Global Headquarters</span>
                    <span className="contact-detail__value">
                      772 Heritage Ridge Road,
                      <br />
                      Lancaster County, PA 17601
                    </span>
                  </div>
                  <div className="contact-detail__item">
                    <span className="contact-detail__label">Direct Line</span>
                    <span className="contact-detail__value">+1 (800) CMK-FEED</span>
                  </div>
                  <div className="contact-detail__item">
                    <span className="contact-detail__label">Estate Liaison</span>
                    <span className="contact-detail__value">liaison@cmkfeed.com</span>
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
                  <strong className="title-md">The Gold Standard Seal</strong>
                  <p className="body-md" style={{ marginTop: 4 }}>
                    Every inquiry is handled with laboratory-grade precision
                    and estate-level confidentiality.
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact-map">
                <div className="contact-map__inner">
                  <div className="contact-map__pin">
                    <div className="contact-map__ping" />
                  </div>
                  <span className="label-sm">Lancaster County, PA</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Form Column */}
            <RevealOnScroll delay={0.2} className="contact-form-wrap">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="headline-md">Request a Consultation</h3>

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
                  <label htmlFor="ranch">Ranch / Estate Name</label>
                </div>

                <div className="form-group form-group--select">
                  <select id="herdSize" name="herdSize" required defaultValue="">
                    <option value="" disabled>Select Herd Size</option>
                    <option value="under100">Under 100 head</option>
                    <option value="100-500">100 – 500 head</option>
                    <option value="500-1000">500 – 1,000 head</option>
                    <option value="over1000">Over 1,000 head</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea id="message" name="message" rows={4} required placeholder=" " />
                  <label htmlFor="message">Your Inquiry</label>
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    className={`btn btn--primary btn--full ${submitted ? 'btn--success' : ''}`}
                    style={{ width: '100%', marginTop: 12 }}
                  >
                    {submitted ? '✓ Inquiry Submitted' : 'Submit Private Inquiry'}
                  </button>
                </MagneticButton>

                {submitted && (
                  <p className="form-success">
                    Thank you. Our estate manager will respond within 24 hours.
                  </p>
                )}
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Marquee text="Global Distribution Network" separator="✦" />

      {/* ═══ NETWORK ═══ */}
      <section className="network section">
        <div className="container">
          <RevealOnScroll className="network__inner">
            <span className="label-tag">Logistics</span>
            <h2 className="headline-lg" style={{ marginTop: 16 }}>
              Preserving Freshness
            </h2>
            <p className="body-lg" style={{ marginTop: 16, maxWidth: 560 }}>
              Our nutritional solutions are distributed across six continents,
              maintaining maximum bio-availability from Pennsylvania to the world.
            </p>
            <div className="network__stats">
              <div className="network__stat">
                <span className="network__stat-num">6</span>
                <span className="network__stat-label">Continents</span>
              </div>
              <div className="network__stat">
                <span className="network__stat-num">24</span>
                <span className="network__stat-label">Countries</span>
              </div>
              <div className="network__stat">
                <span className="network__stat-num">48h</span>
                <span className="network__stat-label">Avg. Delivery</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
