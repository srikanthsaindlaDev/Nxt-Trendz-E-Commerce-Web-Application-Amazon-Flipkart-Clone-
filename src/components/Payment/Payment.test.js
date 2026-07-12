import {render, screen, fireEvent} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import Payment from './index'
import CartContext from '../../context/CartContext'

const cartList = [
  {id: 1, title: 'Shirt', brand: 'Nike', price: 500, quantity: 2, imageUrl: ''},
  {
    id: 2,
    title: 'Watch',
    brand: 'Fossil',
    price: 2000,
    quantity: 1,
    imageUrl: '',
  },
]

const renderPayment = (value = {}) =>
  render(
    <MemoryRouter>
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: () => {},
          ...value,
        }}
      >
        <Payment />
      </CartContext.Provider>
    </MemoryRouter>,
  )

describe('Payment page', () => {
  it('shows the order total and item count', () => {
    renderPayment()
    // 2*500 + 1*2000 = 3000
    expect(screen.getByText('Rs 3000/-')).toBeInTheDocument()
    expect(screen.getByText('Pay Now')).toBeInTheDocument()
  })

  it('places the order and clears the cart on Pay Now', () => {
    let cleared = false
    const removeAllCartItems = () => {
      cleared = true
    }
    renderPayment({removeAllCartItems})

    fireEvent.click(screen.getByText('Pay Now'))

    expect(cleared).toBe(true)
    expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument()
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument()
  })

  it('shows an empty prompt when there are no items', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider
          value={{cartList: [], removeAllCartItems: () => {}}}
        >
          <Payment />
        </CartContext.Provider>
      </MemoryRouter>,
    )
    expect(screen.getByText('No items to pay for')).toBeInTheDocument()
  })
})
