import {Link, NavLink, withRouter} from 'react-router-dom'
import {FiSun, FiMoon} from 'react-icons/fi'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderThemeToggle = () => (
    <ThemeContext.Consumer>
      {themeValue => {
        const {isDarkMode, toggleTheme} = themeValue
        return (
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="toggle theme"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        )
      }}
    </ThemeContext.Consumer>
  )

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>

          <div className="nav-mobile-actions">
            {renderThemeToggle()}
            <button type="button" className="nav-mobile-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout"
                className="nav-bar-image"
                onClick={onClickLogout}
              />
            </button>
          </div>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="nav-link-active"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink
                to="/products"
                className="nav-link"
                activeClassName="nav-link-active"
              >
                Products
              </NavLink>
            </li>

            <li className="nav-menu-item">
              <NavLink
                to="/cart"
                className="nav-link"
                activeClassName="nav-link-active"
              >
                Cart
                {renderCartItemsCount()}
              </NavLink>
            </li>
          </ul>
          <div className="nav-desktop-actions">
            {renderThemeToggle()}
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <NavLink
              exact
              to="/"
              className="nav-link nav-link-mobile"
              activeClassName="nav-link-mobile-active"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-image"
              />
            </NavLink>
          </li>

          <li className="nav-menu-item-mobile">
            <NavLink
              to="/products"
              className="nav-link nav-link-mobile"
              activeClassName="nav-link-mobile-active"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-image"
              />
            </NavLink>
          </li>
          <li className="nav-menu-item-mobile">
            <NavLink
              to="/cart"
              className="nav-link nav-link-mobile"
              activeClassName="nav-link-mobile-active"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-image"
              />
              {renderCartItemsCount()}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
