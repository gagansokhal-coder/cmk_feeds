import { useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
import PhotoCarousel3D from '../components/PhotoCarousel3D'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const heroOverlayRef = useRef<HTMLDivElement>(null)
  const titleLine1Ref = useRef<HTMLSpanElement>(null)
  const titleLine2Ref = useRef<HTMLSpanElement>(null)
  const heroTagRef = useRef<HTMLParagraphElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroActionsRef = useRef<HTMLDivElement>(null)
  const heroScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = () => {}
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ═══════════════════════════════════════════
      //  HERO — Cinematic entrance
      // ═══════════════════════════════════════════
      const heroTl = gsap.timeline({ delay: 0.2 })

      // Image scale-in from zoomed
      heroTl.fromTo(
        heroImgRef.current,
        { scale: 1.4, opacity: 0 },
        { scale: 1.1, opacity: 1, duration: 2, ease: 'power3.out' }
      )

      // Overlay fades from black
      heroTl.fromTo(
        heroOverlayRef.current,
        { opacity: 1 },
        { opacity: 0.7, duration: 1.5, ease: 'power2.out' },
        0
      )

      // Title line 1 — slide up from below with mask
      heroTl.fromTo(
        titleLine1Ref.current,
        { y: '110%', rotateX: -15 },
        { y: '0%', rotateX: 0, duration: 1.2, ease: 'power4.out' },
        0.5
      )

      // Title line 2
      heroTl.fromTo(
        titleLine2Ref.current,
        { y: '110%', rotateX: -15 },
        { y: '0%', rotateX: 0, duration: 1.2, ease: 'power4.out' },
        0.65
      )

      // Tag
      heroTl.fromTo(
        heroTagRef.current,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        1.0
      )

      // Subtitle
      heroTl.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        1.1
      )

      // Actions with stagger
      if (heroActionsRef.current) {
        heroTl.fromTo(
          heroActionsRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          1.3
        )
      }

      // Scroll indicator
      heroTl.fromTo(
        heroScrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.6
      )

      // Hero parallax on scroll — image moves up + zooms, content fades
      gsap.to(heroImgRef.current, {
        y: -120,
        scale: 1.25,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Fade out hero content on scroll
      gsap.to('.hero__content', {
        y: -80,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '20% top',
          end: '60% top',
          scrub: 1,
        },
      })

      // ═══════════════════════════════════════════
      //  PROTOCOL — Staggered reveal with 3D
      // ═══════════════════════════════════════════
      gsap.fromTo(
        '.protocol__text',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.protocol', start: 'top 75%' },
        }
      )

      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 80, rotateY: -8 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.protocol__cards', start: 'top 80%' },
        }
      )

      // ═══════════════════════════════════════════
      //  CTA BANNER — Parallax
      // ═══════════════════════════════════════════
      const ctaImg = document.querySelector('.cta-banner__bg img')
      if (ctaImg) {
        gsap.fromTo(
          ctaImg,
          { y: -60, scale: 1.15 },
          {
            y: 60,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.cta-banner',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }

      // CTA text reveal
      gsap.fromTo(
        '.cta-banner__content',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-banner', start: 'top 65%' },
        }
      )

    }) // end gsap.context

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-home">

      {/* ═══════ HERO ═══════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg">
          <img
            ref={heroImgRef}
            src="/images/rajasthan-hero.png"
            alt="Premium cattle ranch in Rajasthan at golden hour"
            className="hero__bg-img"
          />
          <div className="hero__overlay" ref={heroOverlayRef} />
          {/* Grain overlay */}
          <div className="hero__grain" />
        </div>

        <div className="hero__content container">
          <p className="hero__tag label-tag" ref={heroTagRef}>
            Est. 1962 · Rajasthan, India
          </p>

          <h1 className="hero__title display-lg">
            <span className="title-line-wrap">
              <span className="title-line" ref={titleLine1Ref}>THE GOLD</span>
            </span>
            <span className="title-line-wrap">
              <span className="title-line title-line--accent" ref={titleLine2Ref}>STANDARD.</span>
            </span>
          </h1>

          <p className="hero__sub body-lg" ref={heroSubRef}>
            The best food for your cattle. We combine long-time farm experience
            with modern science.
          </p>

          <div className="hero__actions" ref={heroActionsRef}>
            <MagneticButton>
              <Link to="/products" className="btn btn--primary btn--lg">
                <span>Explore Products</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact" className="btn btn--ghost btn--lg">
                Talk to Us
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="hero__scroll" ref={heroScrollRef}>
          <div className="hero__scroll-dot" />
          <span>Scroll to Discover</span>
        </div>
      </section>

      {/* ═══ 3D GALLERY ═══ */}
      <PhotoCarousel3D />

      {/* ═══════ MARQUEE BAND ═══════ */}
      <Marquee text="The Gold Standard" variant="outline" />

      {/* ═══════ PROTOCOL ═══════ */}
      <section className="protocol section">
        <div className="container">
          <div className="protocol__grid">
            <div className="protocol__text">
              <span className="label-tag">The CMK Way</span>
              <h2 className="display-md" style={{ marginTop: 20 }}>
                More than just feed.
              </h2>
              <p className="body-lg" style={{ marginTop: 24 }}>
                We test every grain to make sure your cattle get exactly what
                they need to grow strong and healthy. We never stop improving.
              </p>
            </div>

            <div className="protocol__cards">
              <div className="stat-card">
                <div className="stat-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0-4h18" />
                  </svg>
                </div>
                <h3 className="stat-card__title">Tested in Labs</h3>
                <p className="stat-card__desc">
                  Every batch is tested 14 ways to ensure it is pure and healthy.
                </p>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="stat-card__title">Healthy Soil</h3>
                <p className="stat-card__desc">
                  We get our ingredients from farms that take care of the
                  soil and the earth.
                </p>
              </div>

              <div className="stat-card stat-card--highlight">
                <span className="stat-card__code">#882-GOLD</span>
                <p className="stat-card__desc">
                  Full of important minerals. Specially made to keep
                  cattle healthy in winter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <Marquee text="Farmers for Farmers" separator="◆" />

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="cta-banner">
        <div className="cta-banner__bg">
          <img src="/images/ranch-landscape.png" alt="Ranch landscape" />
          <div className="cta-banner__overlay" />
        </div>
        <div className="container">
          <div className="cta-banner__content">
            <h2 className="display-md">Ready to help<br />your herd grow?</h2>
            <p className="body-lg" style={{ maxWidth: 540, margin: '20px auto 0' }}>
              Choose better food and better farming for a better future.
              Your farm is your legacy.
            </p>
            <div className="cta-banner__actions">
              <MagneticButton>
                <Link to="/contact" className="btn btn--primary btn--lg">
                  Talk to Us
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/sustainability" className="btn btn--ghost btn--lg">
                  Our Environment
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BOTTOM MARQUEE ═══════ */}
      <Marquee text="The Gold Standard in Cattle Nutrition" variant="muted" separator="✦" />
    </div>
  )
}
