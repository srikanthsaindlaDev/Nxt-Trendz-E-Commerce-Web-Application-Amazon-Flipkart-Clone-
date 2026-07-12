import {Link} from 'react-router-dom'
import {FaGithub, FaTwitter, FaInstagram, FaLinkedinIn} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="footer logo"
          className="footer-logo"
        />
        <p className="footer-tagline">
          Trendz — clothes, gadgets and more that get you noticed.
        </p>
        <div className="footer-social">
          <a href="/" className="footer-social-icon" aria-label="github">
            <FaGithub />
          </a>
          <a href="/" className="footer-social-icon" aria-label="twitter">
            <FaTwitter />
          </a>
          <a href="/" className="footer-social-icon" aria-label="instagram">
            <FaInstagram />
          </a>
          <a href="/" className="footer-social-icon" aria-label="linkedin">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="footer-links">
        <h1 className="footer-links-heading">Quick Links</h1>
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/products" className="footer-link">
          Products
        </Link>
        <Link to="/cart" className="footer-link">
          Cart
        </Link>
      </div>
    </div>

    <p className="footer-copyright">© 2026 Trendz. Built for demo purposes.</p>
  </footer>
)

export default Footer
