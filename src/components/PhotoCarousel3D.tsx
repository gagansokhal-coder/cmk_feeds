import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './PhotoCarousel3D.css'

const slides = [
  {
    image: '/images/rajasthan-hero.png',
    title: 'Heritage in Every Grain',
    desc: 'Inspired by the spirit of Rajasthan, we bring traditional wisdom to modern cattle nutrition.'
  },
  {
    image: '/images/ranch-bull.png',
    title: 'The Gold Standard',
    desc: 'Our feed is trusted by the top ranches across the country for superior performance.'
  },
  {
    image: '/images/feed-grains.png',
    title: 'Pure Quality',
    desc: 'Only the finest barley and essential oils make it into our signature blends.'
  }
]

export default function PhotoCarousel3D() {
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])

  const next = () => {
    if (isAnimating) return
    const nextIdx = (index + 1) % slides.length
    animate(nextIdx, 'next')
  }

  const prev = () => {
    if (isAnimating) return
    const prevIdx = (index - 1 + slides.length) % slides.length
    animate(prevIdx, 'prev')
  }

  const animate = (targetIdx: number, direction: 'next' | 'prev') => {
    setIsAnimating(true)
    const currentSlide = slidesRef.current[index]
    const nextSlide = slidesRef.current[targetIdx]

    if (!currentSlide || !nextSlide) return

    const tl = gsap.timeline({
      onComplete: () => {
        setIndex(targetIdx)
        setIsAnimating(false)
      }
    })

    // 3D Flip/Morph Animation
    tl.to(currentSlide, {
      rotateY: direction === 'next' ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power3.inOut'
    })

    tl.fromTo(nextSlide, 
      { 
        rotateY: direction === 'next' ? 90 : -90, 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        rotateY: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power3.inOut' 
      },
      '-=0.7'
    )
  }

  useEffect(() => {
    // Initial reveal
    if (slidesRef.current[0]) {
      gsap.set(slidesRef.current[0], { opacity: 1, rotateY: 0, scale: 1 })
    }
  }, [])

  return (
    <section className="carousel-3d section">
      <div className="container">
        <div className="carousel-3d__header" style={{ marginBottom: 40, textAlign: 'center' }}>
          <span className="label-tag">Our Legacy</span>
          <h2 className="display-md" style={{ marginTop: 16 }}>The CMK Experience</h2>
        </div>

        <div className="carousel-3d__container" ref={containerRef}>
          {slides.map((slide, i) => (
            <div 
              key={i} 
              className={`carousel-3d__slide ${i === index ? 'carousel-3d__slide--active' : ''}`}
              ref={el => slidesRef.current[i] = el}
            >
              <div className="carousel-3d__inner">
                <img src={slide.image} alt={slide.title} className="carousel-3d__img" />
                <div className="carousel-3d__overlay">
                  <div className="carousel-3d__content">
                    <h3 className="headline-lg">{slide.title}</h3>
                    <p className="body-md" style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-3d__controls">
          <button className="carousel-nav-btn" onClick={prev} aria-label="Previous slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="carousel-3d__dots">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`carousel-3d__dot ${i === index ? 'carousel-3d__dot--active' : ''}`}
                onClick={() => i !== index && animate(i, i > index ? 'next' : 'prev')}
              />
            ))}
          </div>

          <button className="carousel-nav-btn" onClick={next} aria-label="Next slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
