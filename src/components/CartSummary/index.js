import {Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = cartList.reduce(
        (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
        0,
      )
      const totalItems = cartList.reduce(
        (acc, eachItem) => acc + eachItem.quantity,
        0,
      )

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-value">
            <span className="order-total-label">Order Total:</span> Rs{' '}
            {totalAmount}/-
          </h1>
          <p className="total-items">{totalItems} Items in cart</p>
          <Link to="/payment" className="checkout-link">
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
