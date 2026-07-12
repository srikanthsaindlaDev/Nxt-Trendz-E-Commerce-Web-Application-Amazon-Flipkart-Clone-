import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaTruck, FaCheckCircle, FaRegCreditCard} from 'react-icons/fa'

import CartContext from '../../context/CartContext'
import Header from '../Header'

import './index.css'

const paymentOptions = [
  {id: 'CARD', label: 'Card'},
  {id: 'NET_BANKING', label: 'Net Banking'},
  {id: 'UPI', label: 'UPI'},
  {id: 'COD', label: 'Cash on Delivery'},
]

class Payment extends Component {
  state = {
    selectedMethod: 'CARD',
    isOrderPlaced: false,
  }

  onChangeMethod = event => {
    this.setState({selectedMethod: event.target.value})
  }

  onPlaceOrder = removeAllCartItems => {
    removeAllCartItems()
    this.setState({isOrderPlaced: true})
  }

  getTotalAmount = cartList =>
    cartList.reduce(
      (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
      0,
    )

  getTotalItems = cartList =>
    cartList.reduce((acc, eachItem) => acc + eachItem.quantity, 0)

  renderSuccessView = () => (
    <div className="order-success-container">
      <div className="truck-road">
        <FaTruck className="moving-truck" />
      </div>
      <FaCheckCircle className="success-tick" />
      <h1 className="success-heading">Order Placed Successfully!</h1>
      <p className="success-text">
        Your order is on the way. Thank you for shopping with Nxt Trendz.
      </p>
      <Link to="/products">
        <button type="button" className="continue-shopping-btn">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderEmptyView = () => (
    <div className="payment-empty-container">
      <h1 className="payment-empty-heading">No items to pay for</h1>
      <p className="payment-empty-text">
        Add products to your cart before proceeding to payment.
      </p>
      <Link to="/products">
        <button type="button" className="continue-shopping-btn">
          Shop Now
        </button>
      </Link>
    </div>
  )

  renderPaymentView = (cartList, removeAllCartItems) => {
    const {selectedMethod} = this.state
    const totalAmount = this.getTotalAmount(cartList)
    const totalItems = this.getTotalItems(cartList)

    return (
      <div className="payment-card">
        <h1 className="payment-heading">Payment</h1>

        <div className="order-details-box">
          <div className="order-detail-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="order-detail-row order-detail-total">
            <span>Order Total</span>
            <span>Rs {totalAmount}/-</span>
          </div>
        </div>

        <h2 className="payment-method-heading">
          <FaRegCreditCard className="method-icon" /> Choose Payment Method
        </h2>
        <ul className="payment-methods-list">
          {paymentOptions.map(option => (
            <li className="payment-method-item" key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="paymentMethod"
                value={option.id}
                checked={selectedMethod === option.id}
                onChange={this.onChangeMethod}
                className="payment-radio"
              />
              <label htmlFor={option.id} className="payment-method-label">
                {option.label}
              </label>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="pay-now-btn"
          onClick={() => this.onPlaceOrder(removeAllCartItems)}
        >
          Pay Now
        </button>
        <p className="dummy-note">
          * This is a demo payment. No real money is charged.
        </p>
      </div>
    )
  }

  render() {
    const {isOrderPlaced} = this.state

    return (
      <>
        <Header />
        <div className="payment-page-container">
          <CartContext.Consumer>
            {value => {
              const {cartList, removeAllCartItems} = value

              if (isOrderPlaced) {
                return this.renderSuccessView()
              }
              if (cartList.length === 0) {
                return this.renderEmptyView()
              }
              return this.renderPaymentView(cartList, removeAllCartItems)
            }}
          </CartContext.Consumer>
        </div>
      </>
    )
  }
}

export default Payment
