import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
import InquiryModal from '../components/InquiryModal'
import PhotoCarousel3D from '../components/PhotoCarousel3D'
import { getWhatsAppUrl, ProductData } from '../utils/whatsapp'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const featuredProducts: (ProductData & { image: string })[] = [
  {
    name: 'CMK Gold',
    desc: 'Our flagship feed for high-yield milking cows. Reduces metabolic stress, improves fat% and SNF for peak milk output. Steam-processed for maximum digestibility.',
    protein: '20%',
    energy: '13.8 MJ',
    image: '/images/cmk-gold-product.jpg',
  },
  {
    name: 'CMK Silver',
    desc: 'Complete balanced cattle feed for everyday nutrition. Perfect blend of crude protein, fiber, and essential minerals — delivering complete health for your animal at great value.',
    protein: '18%',
    energy: '12.5 MJ',
    image: '/images/cmk-silver-product.png',
  },
  {
    name: 'CMK Calf Starter',
    desc: 'High-energy probiotic-rich formula for calves aged 5 days to 4 months. Accelerates immunity, rumen development, and bone strengthening for the strongest herd foundation.',
    protein: '22%',
    energy: '14.8 MJ',
    image: '/images/cmk-gold-product.jpg',
  },
]

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

  // WhatsApp Logic State
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 901)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 901)
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

      // ═════════════════════════════════════════════
      //  FLOATING PRODUCT IMAGES (desktop only — scroll-driven)
      // ═════════════════════════════════════════════
      if (productFloatRef.current && window.innerWidth >= 901) {
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




  const handleOrder = (product: ProductData) => {
    const url = getWhatsAppUrl('ORDER', product)
    window.open(url, '_blank')
  }

  const handleInquiryClick = (product: ProductData) => {
    setSelectedProduct(product)
    setIsInquiryOpen(true)
  }

  const handleInquirySend = (message: string) => {
    if (selectedProduct) {
      const url = getWhatsAppUrl('INQUIRY', selectedProduct, message)
      window.open(url, '_blank')
    }
  }

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

      {/* ═══════ FLOATING PRODUCT IMAGES (Scroll-driven) ═══════ */}
      <section className="product-float" ref={productFloatRef}>
        <div className="product-float__sticky">
          <div className="container">
            <div className="product-float__text">
              <span className="label-tag">Our Collection</span>
              <h2 className="display-md">Feed built for<br />better growth.</h2>
              <p className="body-lg" style={{ marginTop: 20, maxWidth: 420, color: 'var(--on-surface-variant)' }}>
                From calves to high-yield milking cows — every stage of
                life, covered with precision nutrition.
              </p>

              {/* Mobile fallback grid — visible only on small screens */}
              <div className="product-float__mobile-grid">
                <div className="product-float__mobile-card">
                  <img src="/images/cmk-gold-product.jpg" alt="CMK Gold" />
                  <p className="product-float__mobile-label">CMK Gold</p>
                </div>
                <div className="product-float__mobile-card">
                  <img src="/images/cmk-silver-product.png" alt="CMK Silver" />
                  <p className="product-float__mobile-label">CMK Silver</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating product bags — desktop only */}
          <img
            ref={floatImg1}
            src="/images/cmk-gold-product.jpg"
            alt="CMK Gold"
            className="product-float__img product-float__img--1"
          />
          <img
            ref={floatImg2}
            src="/images/cmk-silver-product.png"
            alt="CMK Silver"
            className="product-float__img product-float__img--2"
          />
          <img
            ref={floatImg3}
            src="/images/cmk-gold-product.jpg"
            alt="CMK Calf Starter"
            className="product-float__img product-float__img--3"
          />
        </div>
      </section>

      {/* ═══════ PRODUCT SHOWCASE ═══════ */}
      {isMobile ? (
        /* ── Mobile: simple stacked cards, no GSAP horizontal scroll ── */
        <section style={{ background: 'var(--surface-container)', padding: '64px 0' }}>
          <div className="container">
            <span className="label-tag">Popular Mixes</span>
            <h2 className="display-sm" style={{ marginTop: 16, marginBottom: 40 }}>Our Products</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {featuredProducts.map((product, i) => (
                <div key={product.name} style={{
                  background: 'var(--surface-container-low)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{ height: 220, overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px 20px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900,
                      color: 'transparent', WebkitTextStroke: '1px rgba(126,181,214,0.3)' }}>0{i + 1}</span>
                    <h3 className="headline-md" style={{ marginTop: 8 }}>{product.name}</h3>
                    <p className="body-sm" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>{product.desc}</p>
                    <div style={{ display: 'flex', gap: 32, margin: '16px 0' }}>
                      <div><span className="label-sm" style={{ display: 'block', marginBottom: 4 }}>Protein</span>
                        <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--primary)' }}>{product.protein}</strong></div>
                      <div><span className="label-sm" style={{ display: 'block', marginBottom: 4 }}>Energy</span>
                        <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--primary)' }}>{product.energy}</strong></div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                      <button onClick={() => handleOrder(product)} className="btn btn--primary btn--sm">Order Now</button>
                      <button onClick={() => handleInquiryClick(product)} className="btn btn--outline btn--sm">Enquiry</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* ── Desktop: GSAP-pinned horizontal scroll ── */
        <section className="hscroll" ref={horizontalRef}>
          <div className="hscroll__track" ref={horizontalTrackRef}>
            <div className="hscroll__panel hscroll__intro">
              <div className="hscroll__intro-content">
                <span className="label-tag">Popular Mixes</span>
                <h2 className="display-md" style={{ marginTop: 16 }}>
                  Slide to explore<br />our feed →
                </h2>
              </div>
            </div>
            {featuredProducts.map((product, i) => (
              <div className="hscroll__panel hscroll-card" key={product.name} style={{ display: 'flex' }}>
                <div className="hscroll-card__img">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="hscroll-card__content">
                  <span className="product-num">0{i + 1}</span>
                  <h3 className="headline-lg">{product.name}</h3>
                  <p className="body-md">{product.desc}</p>
                  <div className="hscroll-card__stats">
                    <div><span className="label-sm">Protein</span><strong>{product.protein}</strong></div>
                    <div><span className="label-sm">Energy</span><strong>{product.energy}</strong></div>
                  </div>
                  <div className="hscroll-card__actions">
                    <MagneticButton>
                      <button onClick={() => handleOrder(product)} className="btn btn--primary btn--sm">Order Now</button>
                    </MagneticButton>
                    <MagneticButton>
                      <button onClick={() => handleInquiryClick(product)} className="btn btn--outline btn--sm">Enquiry</button>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
                Our 2,400-acre family ranch is where we test our feed and
                show how to farm responsibly.
              </p>
            </div>

            <div className="showcase__col showcase__col--offset">
              <div className="img-reveal" ref={revealImg2}>
                <div className="img-reveal__overlay" />
                <img src="/images/laboratory.png" alt="CMK Laboratory" />
              </div>
              <p className="body-lg" style={{ marginTop: 28 }}>
                Our modern lab makes sure every bag of feed is the
                best quality possible.
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
              <span className="stats__label">Years of History</span>
            </div>
            <div className="stats__item">
              <span className="counter-num" data-target="14" data-suffix="-pt">0</span>
              <span className="stats__label">Quality Tests</span>
            </div>
            <div className="stats__item">
              <span className="counter-num" data-target="98" data-suffix="%">0</span>
              <span className="stats__label">Waste Saved</span>
            </div>
            <div className="stats__item">
              <span className="counter-num" data-target="6" data-suffix="">0</span>
              <span className="stats__label">Places We Ship</span>
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

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={selectedProduct}
        onSend={handleInquirySend}
      />
    </div>
  )
}
