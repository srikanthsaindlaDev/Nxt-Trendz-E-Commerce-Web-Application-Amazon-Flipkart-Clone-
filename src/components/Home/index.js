import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiRefreshCw,
} from 'react-icons/fi'

import Header from '../Header'
import TrendingProducts from '../TrendingProducts'
import Footer from '../Footer'

import './index.css'

const categories = [
  {id: '1', name: 'Clothing', emoji: '👕'},
  {id: '2', name: 'Electronics', emoji: '📱'},
  {id: '3', name: 'Appliances', emoji: '🧺'},
  {id: '4', name: 'Grocery', emoji: '🥦'},
  {id: '5', name: 'Toys', emoji: '🧸'},
]

const features = [
  {
    id: 'shipping',
    icon: <FiTruck />,
    title: 'Free Shipping',
    text: 'On all orders over Rs 500',
  },
  {
    id: 'secure',
    icon: <FiShield />,
    title: 'Secure Payments',
    text: '100% protected checkout',
  },
  {
    id: 'support',
    icon: <FiHeadphones />,
    title: '24/7 Support',
    text: 'We are here to help',
  },
  {
    id: 'returns',
    icon: <FiRefreshCw />,
    title: 'Easy Returns',
    text: '30-day return policy',
  },
]

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />

      <div className="home-container">
        <div className="home-content">
          <span className="home-eyebrow">NEW SEASON COLLECTION</span>
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              Shop Now <FiArrowRight className="shop-now-arrow" />
            </button>
          </Link>

          <div className="home-stats">
            <div className="home-stat">
              <span className="home-stat-value">1000+</span>
              <span className="home-stat-label">Products</span>
            </div>
            <span className="home-stat-divider" />
            <div className="home-stat">
              <span className="home-stat-value">Free</span>
              <span className="home-stat-label">Delivery</span>
            </div>
            <span className="home-stat-divider" />
            <div className="home-stat">
              <span className="home-stat-value">Easy</span>
              <span className="home-stat-label">Returns</span>
            </div>
          </div>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>

      <section className="home-section categories-section">
        <h2 className="home-section-heading">Shop by Category</h2>
        <ul className="categories-row">
          {categories.map(category => (
            <li className="category-card" key={category.id}>
              <Link to="/products" className="category-card-link">
                <span className="category-emoji">{category.emoji}</span>
                <span className="category-card-name">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TrendingProducts />

      <section className="features-section">
        <ul className="features-row">
          {features.map(feature => (
            <li className="feature-card" key={feature.id}>
              <span className="feature-icon">{feature.icon}</span>
              <div className="feature-text-group">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  )
}

export default Home
