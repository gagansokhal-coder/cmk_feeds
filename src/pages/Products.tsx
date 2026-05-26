import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealOnScroll from '../components/RevealOnScroll'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import InquiryModal from '../components/InquiryModal'
import { getWhatsAppUrl, ProductData } from '../utils/whatsapp'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

interface CMKProduct extends ProductData {
  features: string[]
  target: string
  weight: string
  color: string
  image: string
}

const products: CMKProduct[] = [
  {
    name: 'CMK Gold',
    desc: 'Our flagship balanced cattle feed engineered for high-yield milking cows. Advanced nutrition formula that reduces metabolic stress, improves fat% and SNF, and sustains peak milk output season after season. Made with premium steam-processed ingredients for maximum digestibility and nutrient absorption.',
    protein: '20%',
    energy: '13.8 MJ',
    badge: 'Best Seller',
    badgeClass: '',
    features: ['Steamed Pallet', 'Toxins <20 PPB', 'Highly Nutrient', 'No Urea'],
    target: 'Cows producing up to 20 L/day',
    weight: '50 kg',
    color: '#e8a422',
    image: '/images/cmk-gold-product.jpg',
  },
  {
    name: 'CMK Silver',
    desc: 'A complete balanced cattle feed designed for everyday nutrition and optimal health. CMK Silver provides the perfect blend of crude protein, fiber, and essential minerals to keep your cattle in peak condition. Ideal for farms looking for reliable, high-quality feed at great value — delivering complete health for your animal.',
    protein: '18%',
    energy: '12.5 MJ',
    badge: 'Value Pick',
    badgeClass: 'badge--silver',
    features: ['Balanced Formula', 'Natural Ingredients', 'Complete Minerals', 'No Urea'],
    target: 'All breeds — daily balanced nutrition',
    weight: '50 kg',
    color: '#1a6fcc',
    image: '/images/cmk-silver-product.png',
  },
  {
    name: 'CMK Calf Starter',
    desc: 'Specially crafted for calves from 5 days to 4 months old. High-energy probiotic-rich formula that accelerates immunity, rumen development, and early solid feeding — building the strongest possible foundation for your herd. Enriched with bone-strengthening calcium and essential vitamins for rapid, healthy growth.',
    protein: '22%',
    energy: '14.8 MJ',
    badge: 'Young Herd',
    badgeClass: 'badge--green',
    features: ['Probiotic Enriched', 'Bone Strengthening', 'Rumen Development', 'High Immunity'],
    target: 'Calves aged 5 days – 4 months',
    weight: '40 kg',
    color: '#3aaa6e',
    image: '/images/cmk-gold-product.jpg',
  },
]

export default function Products() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)

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

      // Product Cards stagger reveal
      const cards = gsap.utils.toArray<HTMLElement>('.pcard')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  const handleOrder = (product: ProductData) => window.open(getWhatsAppUrl('ORDER', product), '_blank')
  const handleInquiryClick = (product: ProductData) => { setSelectedProduct(product); setIsInquiryOpen(true) }
  const handleInquirySend = (message: string) => {
    if (selectedProduct) window.open(getWhatsAppUrl('INQUIRY', selectedProduct, message), '_blank')
  }

  return (
    <div className="page-products">

      {/* ═══ HERO ═══ */}
      <section className="products-hero" ref={heroRef}>
        <div className="products-hero__bg">
          <img ref={heroImgRef} src="/images/cmk-silver-product.png" alt="CMK Silver Balanced Cattle Feed" />
          <div className="products-hero__overlay" />
          <div className="hero__grain" />
        </div>
        <div className="container products-hero__content">
          <RevealOnScroll>
            <span className="label-tag">Our Products</span>
            <SplitText as="h1" className="display-lg" delay={0.2}>
              Premium Feed.<br />Proven Results.
            </SplitText>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: 520 }}>
              Every bag is engineered for one purpose — to make your cattle
              healthier, stronger, and more productive.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ PRODUCT SHOWCASE ═══ */}
      <section className="products-showcase section">
        <div className="container">
          <div className="products-showcase__list">
            {products.map((product, i) => (
              <div className="pcard" key={product.name}>

                {/* Index number */}
                <span className="pcard__index">0{i + 1}</span>

                {/* Image side */}
                <div className="pcard__img-wrap">
                  <div className="pcard__img-glow" style={{ '--glow': product.color } as React.CSSProperties} />
                  <img src={product.image} alt={product.name} className="pcard__img" />
                </div>

                {/* Content side */}
                <div className="pcard__body">
                  <div className="pcard__top">
                    <span className={`featured-card__badge ${product.badgeClass}`}>{product.badge}</span>
                    <span className="pcard__weight">{product.weight} Bag</span>
                  </div>

                  <h2 className="pcard__name">{product.name}</h2>
                  <p className="pcard__target">🐄 {product.target}</p>
                  <p className="pcard__desc">{product.desc}</p>

                  {/* Feature pills */}
                  <div className="pcard__features">
                    {product.features.map(f => (
                      <span key={f} className="pcard__feature-pill">✓ {f}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pcard__actions">
                    <MagneticButton>
                      <button onClick={() => handleOrder(product)} className="btn btn--primary">
                        Order on WhatsApp
                      </button>
                    </MagneticButton>
                    <MagneticButton>
                      <button onClick={() => handleInquiryClick(product)} className="btn btn--outline">
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


      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={selectedProduct}
        onSend={handleInquirySend}
      />
    </div>
  )
}
