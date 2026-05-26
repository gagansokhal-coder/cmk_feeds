import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Feed' },
  { path: '/sustainability', label: 'Environment' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/images/cmk-logo.png" alt="CMK Logo" className="navbar__logo-img" />
            <span className="navbar__logo-mark">CMK</span>
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <div 
                key={link.path} 
                className={`navbar__link-wrapper ${link.label === 'Feed' ? 'navbar__link-wrapper--has-dropdown' : ''}`}
              >
                <Link
                  to={link.path}
                  className={`navbar__link ${
                    location.pathname === link.path ? 'navbar__link--active' : ''
                  }`}
                >
                  {link.label}
                  {link.label === 'Feed' && <span className="dropdown-arrow">▾</span>}
                </Link>
                
                {link.label === 'Feed' && (
                  <div className="navbar__dropdown glass">
                    <Link to="/products#calf" className="navbar__dropdown-link">Calf & Grower Feed</Link>
                    <Link to="/products#milking" className="navbar__dropdown-link">Milking Cow Feed</Link>
                    <Link to="/products#buffalo" className="navbar__dropdown-link">Buffalo Feed</Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link to="/contact" className="navbar__cta btn btn--primary btn--sm">
            Talk to Us
          </Link>

          <button
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__content">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-menu__link"
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn--primary" style={{ marginTop: 32 }}>
            Talk to Us
          </Link>
        </div>
      </div>
    </>
  )
}
