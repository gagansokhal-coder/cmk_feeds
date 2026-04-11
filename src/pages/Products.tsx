import { useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    name: 'The Gilded Grain',
    desc: 'A precision-milled blend of heritage barley and cold-pressed oils. Engineered for rapid marbling and superior coat sheen.',
    protein: '18.5%',
    energy: '13.2 MJ',
    badge: 'Best Seller',
    badgeClass: '',
  },
  {
    name: 'Pasture Prime+',
    desc: 'Micro-pelleted nutrients designed to complement native forage. The foundation of the agrarian legacy.',
    protein: '15.8%',
    energy: '12.6 MJ',
    badge: 'Foundation',
    badgeClass: 'badge--green',
  },
  {
    name: 'The Foundation Pellet',
    desc: 'A high-protein nursery formula for the crucial first 100 days. Fortified with chelated minerals for skeletal structural integrity.',
    protein: '22.1%',
    energy: '14.8 MJ',
    badge: 'Nursery',
    badgeClass: 'badge--amber',
  },
  {
    name: 'Oxblood Vitality Blend',
    desc: 'Our most powerful performance finisher. Infused with organic molasses and iron-rich particulates for maximum mass retention.',
    protein: '20.4%',
    energy: '15.4 MJ',
    badge: 'Performance',
    badgeClass: '',
  },
]

export default function Products() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const bespokeImgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Hero Parallax
      if (heroImgRef.current && heroRef.current) {
        gsap.to(heroImgRef.current, {
          y: 100,
          scale: 1.15,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // 3D Card Reveals
      const cards = gsap.utils.toArray<HTMLElement>('.product-detail-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotateX: 10, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )
      })

      // Bespoke Curtain Wipe
      if (bespokeImgRef.current) {
        const overlay = bespokeImgRef.current.querySelector('.img-reveal__overlay')
        const img = bespokeImgRef.current.querySelector('img')

        const revTl = gsap.timeline({
          scrollTrigger: {
            trigger: bespokeImgRef.current,
            start: 'top 80%',
          },
        })

        revTl
          .to(overlay, { scaleX: 0, duration: 1.2, ease: 'power4.inOut', transformOrigin: 'right center' })
          .fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.5, ease: 'power3.out' }, 0.2)
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="page-products">
      {/* ═══ HERO ═══ */}
      <section className="products-hero" ref={heroRef}>
        <div className="products-hero__bg">
          <img ref={heroImgRef} src="/images/feed-product.png" alt="Premium cattle feed" />
          <div className="products-hero__overlay" />
          <div className="hero__grain" />
        </div>
        <div className="container products-hero__content">
          <RevealOnScroll>
            <span className="label-tag">The Collection</span>
            <SplitText as="h1" className="display-lg" delay={0.2}>
              Nutritional Excellence.
            </SplitText>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 560 }}>
              Discover our collection of scientifically advanced feed formulas,
              designed for the world's most prestigious livestock lineages. Every
              grain is a commitment to legacy.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ PRODUCT GRID ═══ */}
      <section className="products-list section">
        <div className="container">
          <div className="products-list__grid">
            {products.map((product, i) => (
              <div className="product-detail-card" key={i}>
                <div className="product-detail-card__img">
                  <img src="/images/feed-product.png" alt={product.name} />
                </div>
                <div className="product-detail-card__content">
                  <span className={`featured-card__badge ${product.badgeClass}`}>
                    {product.badge}
                  </span>
                  <h3 className="headline-lg">{product.name}</h3>
                  <p className="body-md">{product.desc}</p>
                  <div className="product-detail-card__stats">
                    <div className="product-stat">
                      <span className="product-stat__label">Protein</span>
                      <span className="product-stat__value">{product.protein}</span>
                    </div>
                    <div className="product-stat">
                      <span className="product-stat__label">Energy (ME)</span>
                      <span className="product-stat__value">{product.energy}</span>
                    </div>
                  </div>
                  <MagneticButton>
                    <Link to="/contact" className="btn btn--primary btn--sm">
                      Order Now
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BESPOKE CTA ═══ */}
      <section className="bespoke section">
        <div className="container">
          <div className="bespoke__card">
            <RevealOnScroll className="bespoke__text">
              <span className="label-tag">Bespoke Rations</span>
              <h2 className="headline-lg" style={{ marginTop: 16 }}>
                Bespoke Estate Rations
              </h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                For elite herds exceeding 500 head, our nutritionists can
                craft a custom ledger based on your specific soil and water
                profile. Invest in a truly unique genetic expression.
              </p>
              <p className="bespoke__quote">
                &ldquo;The intersection of genetic potential and nutritional
                artistry.&rdquo;
              </p>
              <MagneticButton style={{ marginTop: 32 }}>
                <Link to="/contact" className="btn btn--primary">
                  Request Custom Blend
                </Link>
              </MagneticButton>
            </RevealOnScroll>
            
            <div className="bespoke__img">
              <div className="img-reveal" ref={bespokeImgRef} style={{ height: '100%', borderRadius: 0 }}>
                <div className="img-reveal__overlay" />
                <img src="/images/laboratory.png" alt="CMK Feed Laboratory" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
