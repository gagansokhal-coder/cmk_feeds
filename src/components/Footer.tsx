import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="navbar__logo">
              <span className="navbar__logo-mark">CMK</span>
              <span className="navbar__logo-text">FEED</span>
            </Link>
            <p className="footer__tagline">
              The Gold Standard in Cattle Nutrition.
              <br />
              Farmers for Farmers. Since 1962.
            </p>
          </div>

          <div className="footer__columns">
            <div className="footer__col">
              <h4 className="footer__col-title">Our History</h4>
              <Link to="/" className="footer__link">Our Story</Link>
              <Link to="/products" className="footer__link">Our Products</Link>
              <Link to="/products" className="footer__link">Field Tests</Link>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Information</h4>
              <Link to="/sustainability" className="footer__link">Our Environment</Link>
              <Link to="/terms-conditions" className="footer__link">Terms of Service</Link>
              <Link to="/privacy-policy" className="footer__link">Privacy Policy</Link>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Get in Touch</h4>
              <Link to="/contact" className="footer__link">Talk to Us</Link>
              <Link to="/products" className="footer__link">Lab Services</Link>
              <Link to="/contact" className="footer__link">Custom Feed</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2024 CMK Feed. Farmers for Farmers. The Gold Standard in Cattle Nutrition.</p>
        </div>
      </div>
    </footer>
  )
}
