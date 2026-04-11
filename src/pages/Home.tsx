import { useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
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

  // Pinned horizontal product section
  const horizontalRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)

  // Product float section
  const productFloatRef = useRef<HTMLDivElement>(null)
  const floatImg1 = useRef<HTMLImageElement>(null)
  const floatImg2 = useRef<HTMLImageElement>(null)
  const floatImg3 = useRef<HTMLImageElement>(null)

  // Stats
  const statsRef = useRef<HTMLDivElement>(null)

  // Image reveal refs
  const revealImg1 = useRef<HTMLDivElement>(null)
  const revealImg2 = useRef<HTMLDivElement>(null)

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
      //  HORIZONTAL SCROLL PRODUCT SHOWCASE
      // ═══════════════════════════════════════════
      if (horizontalTrackRef.current && horizontalRef.current && window.innerWidth >= 900) {
        const track = horizontalTrackRef.current
        const totalScroll = track.scrollWidth - window.innerWidth

        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Individual product cards animate as they enter viewport
        gsap.utils.toArray<HTMLElement>('.hscroll-card').forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.88, rotateY: 8 },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById?.('hscroll') || undefined,
                start: 'left 80%',
                end: 'left 40%',
                scrub: 1,
              },
            }
          )
        })
      }

      // ═══════════════════════════════════════════
      //  FLOATING PRODUCT IMAGES (scroll-driven)
      // ═══════════════════════════════════════════
      if (productFloatRef.current) {
        // Image 1 — floats up and rotates
        gsap.fromTo(
          floatImg1.current,
          { y: 200, rotation: -12, scale: 0.7, opacity: 0 },
          {
            y: -60,
            rotation: 5,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: productFloatRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 1.5,
            },
          }
        )

        // Image 2 — comes from right
        gsap.fromTo(
          floatImg2.current,
          { x: 200, y: 100, rotation: 8, scale: 0.6, opacity: 0 },
          {
            x: 0,
            y: -40,
            rotation: -3,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: productFloatRef.current,
              start: 'top 80%',
              end: 'bottom 30%',
              scrub: 2,
            },
          }
        )

        // Image 3 — rises from bottom center
        gsap.fromTo(
          floatImg3.current,
          { y: 300, rotation: 6, scale: 0.5, opacity: 0 },
          {
            y: -30,
            rotation: -2,
            scale: 1.05,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: productFloatRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        )
      }

      // ═══════════════════════════════════════════
      //  IMAGE REVEALS — Curtain wipe effect
      // ═══════════════════════════════════════════
      ;[revealImg1, revealImg2].forEach((ref) => {
        if (!ref.current) return
        const overlay = ref.current.querySelector('.img-reveal__overlay')
        const img = ref.current.querySelector('img')

        const revTl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        })

        revTl
          .to(overlay, { scaleX: 0, duration: 1, ease: 'power4.inOut', transformOrigin: 'right center' })
          .fromTo(img, { scale: 1.4 }, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0.3)
      })

      // ═══════════════════════════════════════════
      //  STATS COUNTER — Scrub-driven
      // ═══════════════════════════════════════════
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          }
        )

        const counters = statsRef.current.querySelectorAll('.counter-num')
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute('data-target') || '0')
          const suffix = counter.getAttribute('data-suffix') || ''
          gsap.fromTo(
            { val: 0 },
            { val: target },
            {
              val: target,
              duration: 2.5,
              ease: 'power2.out',
              scrollTrigger: { trigger: counter, start: 'top 85%' },
              onUpdate: function () {
                const el = counter as HTMLElement
                const v = this.targets()[0].val
                el.textContent = (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix
              },
            }
          )
        })
      }

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
            src="/images/hero-cattle.png"
            alt="Premium cattle grazing at golden hour"
            className="hero__bg-img"
          />
          <div className="hero__overlay" ref={heroOverlayRef} />
          {/* Grain overlay */}
          <div className="hero__grain" />
        </div>

        <div className="hero__content container">
          <p className="hero__tag label-tag" ref={heroTagRef}>
            Est. 1962 · Lancaster County, PA
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
            Cattle nutrition engineered for the elite producer,
            where heritage meets the precision of a laboratory.
          </p>

          <div className="hero__actions" ref={heroActionsRef}>
            <MagneticButton>
              <Link to="/products" className="btn btn--primary btn--lg">
                <span>Explore Formulas</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact" className="btn btn--ghost btn--lg">
                Contact the Estate
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="hero__scroll" ref={heroScrollRef}>
          <div className="hero__scroll-dot" />
          <span>Scroll to Discover</span>
        </div>
      </section>

      {/* ═══════ MARQUEE BAND ═══════ */}
      <Marquee text="The Gold Standard" variant="outline" />

      {/* ═══════ PROTOCOL ═══════ */}
      <section className="protocol section">
        <div className="container">
          <div className="protocol__grid">
            <div className="protocol__text">
              <span className="label-tag">The CMK Protocol</span>
              <h2 className="display-md" style={{ marginTop: 20 }}>
                Beyond the bag<br />lies a philosophy.
              </h2>
              <p className="body-lg" style={{ marginTop: 24 }}>
                Every grain is tested for bio-availability, ensuring your herd
                receives not just calories, but the building blocks of
                excellence. Obsessive refinement is our standard.
              </p>
            </div>

            <div className="protocol__cards">
              <div className="stat-card">
                <div className="stat-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0-4h18" />
                  </svg>
                </div>
                <h3 className="stat-card__title">Laboratory Verified</h3>
                <p className="stat-card__desc">
                  Every batch undergoes 14-point spectral analysis for purity
                  and bio-availability.
                </p>
              </div>

              <div className="stat-card">
                <div className="stat-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="stat-card__title">Regenerative Roots</h3>
                <p className="stat-card__desc">
                  Sustainable sourcing from certified heritage estates
                  practicing regenerative agriculture.
                </p>
              </div>

              <div className="stat-card stat-card--highlight">
                <span className="stat-card__code">#882-GOLD</span>
                <p className="stat-card__desc">
                  Rich in essential minerals and custom-blended for winter
                  peak performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FLOATING PRODUCT IMAGES (Scroll-driven) ═══════ */}
      <section className="product-float" ref={productFloatRef}>
        <div className="product-float__sticky">
          <div className="container">
            <div className="product-float__text">
              <span className="label-tag">The Collection</span>
              <h2 className="display-md">Feed that moves<br />with purpose.</h2>
            </div>
          </div>

          {/* Floating product bags */}
          <img
            ref={floatImg1}
            src="/images/feed-product.png"
            alt="Heritage Blend"
            className="product-float__img product-float__img--1"
          />
          <img
            ref={floatImg2}
            src="/images/feed-product.png"
            alt="Prime Lab Elite"
            className="product-float__img product-float__img--2"
          />
          <img
            ref={floatImg3}
            src="/images/feed-product.png"
            alt="Winter Reserve"
            className="product-float__img product-float__img--3"
          />
        </div>
      </section>

      {/* ═══════ HORIZONTAL SCROLL — PRODUCT SHOWCASE ═══════ */}
      <section className="hscroll" ref={horizontalRef}>
        <div className="hscroll__track" ref={horizontalTrackRef}>
          {/* Intro panel */}
          <div className="hscroll__panel hscroll__intro">
            <div className="hscroll__intro-content">
              <span className="label-tag">Featured Formulations</span>
              <h2 className="display-md" style={{ marginTop: 16 }}>
                Scroll to explore<br />our collection →
              </h2>
            </div>
          </div>

          {/* Product 1 */}
          <div className="hscroll__panel hscroll-card">
            <div className="hscroll-card__img">
              <img src="/images/feed-product.png" alt="Heritage Blend" />
            </div>
            <div className="hscroll-card__content">
              <span className="product-num">01</span>
              <h3 className="headline-lg">Heritage Blend</h3>
              <p className="body-md">
                The foundation of every champion herd. Precision-milled heritage barley
                and cold-pressed oils for rapid marbling and superior coat sheen.
              </p>
              <div className="hscroll-card__stats">
                <div><span className="label-sm">Protein</span><strong>18.5%</strong></div>
                <div><span className="label-sm">Energy</span><strong>13.2 MJ</strong></div>
              </div>
              <Link to="/products" className="btn btn--outline btn--sm">View Details →</Link>
            </div>
          </div>

          {/* Product 2 */}
          <div className="hscroll__panel hscroll-card">
            <div className="hscroll-card__img">
              <img src="/images/feed-product.png" alt="Prime Lab Elite" />
            </div>
            <div className="hscroll-card__content">
              <span className="product-num">02</span>
              <h3 className="headline-lg">Prime Lab Elite</h3>
              <p className="body-md">
                Scientifically optimized for maximum metabolic efficiency.
                Micro-pelleted nutrients complement native forage.
              </p>
              <div className="hscroll-card__stats">
                <div><span className="label-sm">Protein</span><strong>22.1%</strong></div>
                <div><span className="label-sm">Energy</span><strong>14.8 MJ</strong></div>
              </div>
              <Link to="/products" className="btn btn--outline btn--sm">View Details →</Link>
            </div>
          </div>

          {/* Product 3 */}
          <div className="hscroll__panel hscroll-card">
            <div className="hscroll-card__img">
              <img src="/images/feed-product.png" alt="Winter Reserve" />
            </div>
            <div className="hscroll-card__content">
              <span className="product-num">03</span>
              <h3 className="headline-lg">Winter Reserve</h3>
              <p className="body-md">
                Essential fat-dense blend for cold weather endurance. Infused with
                organic molasses and iron-rich particulates.
              </p>
              <div className="hscroll-card__stats">
                <div><span className="label-sm">Protein</span><strong>16.8%</strong></div>
                <div><span className="label-sm">Energy</span><strong>15.4 MJ</strong></div>
              </div>
              <Link to="/products" className="btn btn--outline btn--sm">View Details →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <Marquee text="Farmers for Farmers" separator="◆" />

      {/* ═══════ IMAGE REVEAL + STATS ═══════ */}
      <section className="showcase section">
        <div className="container">
          <div className="showcase__grid">
            <div className="showcase__col">
              <div className="img-reveal" ref={revealImg1}>
                <div className="img-reveal__overlay" />
                <img src="/images/ranch-landscape.png" alt="CMK Heritage Ranch" />
              </div>
              <p className="body-lg" style={{ marginTop: 28 }}>
                Our 2,400-acre heritage ranch in Lancaster County serves as both
                a testing ground and a living testament to regenerative agriculture.
              </p>
            </div>

            <div className="showcase__col showcase__col--offset">
              <div className="img-reveal" ref={revealImg2}>
                <div className="img-reveal__overlay" />
                <img src="/images/laboratory.png" alt="CMK Laboratory" />
              </div>
              <p className="body-lg" style={{ marginTop: 28 }}>
                Our state-of-the-art laboratory ensures every formula meets the
                exacting standards our heritage demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="stats section" ref={statsRef}>
        <div className="container">
          <div className="stats__grid">
            <div className="stats__item">
              <span className="counter-num" data-target="62" data-suffix="">0</span>
              <span className="stats__label">Years of Heritage</span>
            </div>
            <div className="stats__item">
              <span className="counter-num" data-target="14" data-suffix="-pt">0</span>
              <span className="stats__label">Lab Analysis</span>
            </div>
            <div className="stats__item">
              <span className="counter-num" data-target="98" data-suffix="%">0</span>
              <span className="stats__label">Waste Diversion</span>
            </div>
            <div className="stats__item">
              <span className="counter-num" data-target="6" data-suffix="">0</span>
              <span className="stats__label">Continents Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="cta-banner">
        <div className="cta-banner__bg">
          <img src="/images/ranch-landscape.png" alt="Ranch landscape" />
          <div className="cta-banner__overlay" />
        </div>
        <div className="container">
          <div className="cta-banner__content">
            <h2 className="display-md">Ready to elevate<br />your herd?</h2>
            <p className="body-lg" style={{ maxWidth: 540, margin: '20px auto 0' }}>
              Join the movement toward heritage-grade nutrition and planetary
              stewardship. Your ranch is your legacy.
            </p>
            <div className="cta-banner__actions">
              <MagneticButton>
                <Link to="/contact" className="btn btn--primary btn--lg">
                  Request a Consultation
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/sustainability" className="btn btn--ghost btn--lg">
                  Our Stewardship
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
