import { useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
import './Sustainability.css'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Water Care',
    desc: 'We use special fences and solar wells to keep our streams clean and protected.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'No-Waste Feed',
    desc: 'We make our feed so that nothing is wasted. Almost 100% of our leftover material is used again.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c1.657 0 3-4.03 3-9s-1.343-9-3-9" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Farmers for Farmers',
    desc: 'We give 15% of our profits back to help local family farms get the tools they need.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

export default function Sustainability() {
  const heroImgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intense Parallax for hero image
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          y: 120,
          scale: 1.25,
          scrollTrigger: {
            trigger: '.sustain-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Animate progress bars
      const bars = gsap.utils.toArray<HTMLElement>('.progress-bar__fill')
      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0%'
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
            },
          }
        )
      })

      // 3D Pillar Cards
      const cards = gsap.utils.toArray<HTMLElement>('.pillar-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotationX: -15, transformOrigin: 'top center' },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        )
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-sustainability">
      {/* ═══ HERO ═══ */}
      <section className="sustain-hero">
        <div className="sustain-hero__bg">
          <img ref={heroImgRef} src="/images/ranch-landscape.png" alt="CMK Feed sustainable ranch" />
          <div className="sustain-hero__overlay" />
          <div className="hero__grain" />
        </div>
        <div className="container sustain-hero__content">
          <RevealOnScroll>
            <span className="label-tag">Our Stewardship</span>
            <SplitText as="h1" className="display-lg" delay={0.2} style={{ marginTop: 20 }}>
              Caring for the Land.
            </SplitText>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 600 }}>
              &ldquo;We do more than just make feed. We help protect the
              land so it stays healthy for the next generation of
              farmers.&rdquo;
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ REGENERATIVE LEGACY ═══ */}
      <section className="regen section">
        <div className="container">
          <div className="regen__grid">
            <RevealOnScroll className="regen__text">
              <h2 className="display-md">Better Farming for the Future</h2>
              <p className="body-lg" style={{ marginTop: 24 }}>
                At CMK Feed, we care about the whole environment. Our farming
                ways help keep the soil healthy and save water. We believe
                healthy cattle need a healthy earth.
              </p>
              <div className="regen__badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                100% Ethical Sourcing from Local Farms
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2} className="regen__metrics">
              <div className="metric">
                <div className="metric__header">
                  <span className="metric__label">Healthy Soil Build-up</span>
                  <span className="metric__value">87%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" data-width="87%" />
                </div>
              </div>
              <div className="metric">
                <div className="metric__header">
                  <span className="metric__label">Water Saved in Soil</span>
                  <span className="metric__value">72%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill progress-bar__fill--secondary" data-width="72%" />
                </div>
              </div>
              <div className="metric">
                <div className="metric__header">
                  <span className="metric__label">Waste Saved</span>
                  <span className="metric__value">98%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" data-width="98%" />
                </div>
              </div>
              <div className="metric">
                <div className="metric__header">
                  <span className="metric__label">Profit Reinvested Locally</span>
                  <span className="metric__value">15%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill progress-bar__fill--secondary" data-width="15%" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Marquee text="100% Ethical Sourcing" variant="outline" separator="◆" />

      {/* ═══ PILLARS ═══ */}
      <section className="pillars section" style={{ perspective: 1000 }}>
        <div className="container">
          <RevealOnScroll>
            <span className="label-tag">Our Promises</span>
            <h2 className="display-md" style={{ marginTop: 20 }}>
              Our Three Big Promises
            </h2>
          </RevealOnScroll>

          <div className="pillars__grid">
            {pillars.map((pillar, i) => (
              <div className="pillar-card" key={i}>
                <div className="pillar-card__icon">{pillar.icon}</div>
                <span className="pillar-card__number">{pillar.number}</span>
                <h3 className="headline-md">{pillar.title}</h3>
                <p className="body-md" style={{ marginTop: 12 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="sustain-cta section">
        <div className="container">
          <RevealOnScroll className="sustain-cta__inner">
            <h2 className="headline-lg">Ready to help your herd grow?</h2>
            <p className="body-lg" style={{ marginTop: 16, maxWidth: 520 }}>
              Choose better feed and better farming for a better future.
              Your farm is your legacy.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <MagneticButton>
                <Link to="/contact" className="btn btn--primary">
                  Talk to Us
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/products" className="btn btn--ghost">
                  View Products
                </Link>
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
