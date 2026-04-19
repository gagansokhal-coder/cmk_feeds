import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import InquiryModal from '../components/InquiryModal'
import { getWhatsAppUrl, ProductData } from '../utils/whatsapp'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

const products: ProductData[] = [
  {
    name: 'The Gilded Grain',
    desc: 'A high-quality mix of barley and oils. Made for better growth and a shiny coat.',
    protein: '18.5%',
    energy: '13.2 MJ',
    badge: 'Best Seller',
    badgeClass: '',
  },
  {
    name: 'Pasture Prime',
    desc: 'Small nutrient pellets that work well with natural grass. The start of a great farm.',
    protein: '15.8%',
    energy: '12.6 MJ',
    badge: 'Foundation',
    badgeClass: 'badge--green',
  },
  {
    name: 'Young Herd Mix',
    desc: 'High-protein food for the first 100 days. With minerals for strong bones.',
    protein: '22.1%',
    energy: '14.8 MJ',
    badge: 'Young Herd',
    badgeClass: 'badge--amber',
  },
  {
    name: 'Power Growth Blend',
    desc: 'Our strongest feed for finishing. With healthy molasses and minerals to help cattle keep their weight.',
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

  // WhatsApp Logic State
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)

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
              High-Quality Feed.
            </SplitText>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 560 }}>
              Explore our collection of advanced feed mixes.
              We build them for top-quality herds. Every grain counts.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ PRODUCT GRID ═══ */}
      <section className="products-list section">
        <div className="container">
          <div className="products-list__grid">
            {products.map((product, i) => (
              <div className="product-detail-card" key={product.name}>
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
                  
                  <div className="product-detail-card__actions">
                    <MagneticButton style={{ flex: 1 }}>
                      <button 
                        onClick={() => handleOrder(product)} 
                        className="btn btn--primary btn--sm btn--full"
                      >
                        Order Now
                      </button>
                    </MagneticButton>
                    <MagneticButton style={{ flex: 1 }}>
                      <button 
                        onClick={() => handleInquiryClick(product)} 
                        className="btn btn--outline btn--sm btn--full"
                      >
                        Enquiry
                      </button>
                    </MagneticButton>
                  </div>
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
              <span className="label-tag">Custom Feed</span>
              <h2 className="headline-lg" style={{ marginTop: 16 }}>
                Custom Feed for Your Farm
              </h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                For herds larger than 500 animals, our experts can make
                a custom mix just for your farm's soil and water.
                Give your cattle exactly what they need.
              </p>
              <p className="bespoke__quote">
                &ldquo;The best nutrition for the best cattle.&rdquo;
              </p>
              <MagneticButton style={{ marginTop: 32 }}>
                <Link to="/contact" className="btn btn--primary">
                  Ask for a Custom Mix
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

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        product={selectedProduct}
        onSend={handleInquirySend}
      />
    </div>
  )
}
