import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartActions'

const productA = {id: 1, title: 'Shirt', price: 500, quantity: 1}
const productB = {id: 2, title: 'Watch', price: 2000, quantity: 2}

describe('addToCart', () => {
  it('adds a new product to an empty cart', () => {
    const result = addToCart([], productA)
    expect(result).toEqual([productA])
  })

  it('appends a distinct product', () => {
    const result = addToCart([productA], productB)
    expect(result).toEqual([productA, productB])
  })

  it('merges quantity when the same product is added again', () => {
    const result = addToCart([productA], {...productA, quantity: 3})
    expect(result).toHaveLength(1)
    expect(result[0].quantity).toBe(4)
  })

  it('does not mutate the original cart list', () => {
    const original = [productA]
    addToCart(original, {...productA, quantity: 2})
    expect(original[0].quantity).toBe(1)
  })
})

describe('removeFromCart', () => {
  it('removes the matching product', () => {
    const result = removeFromCart([productA, productB], 1)
    expect(result).toEqual([productB])
  })

  it('leaves the cart unchanged when id is absent', () => {
    const result = removeFromCart([productA], 99)
    expect(result).toEqual([productA])
  })
})

describe('incrementQuantity', () => {
  it('increases the quantity of the matching product by one', () => {
    const result = incrementQuantity([productA, productB], 2)
    expect(result[1].quantity).toBe(3)
    expect(result[0].quantity).toBe(1)
  })
})

describe('decrementQuantity', () => {
  it('decreases the quantity when above one', () => {
    const result = decrementQuantity([productB], 2)
    expect(result[0].quantity).toBe(1)
  })

  it('removes the product when its quantity hits zero', () => {
    const result = decrementQuantity([productA, productB], 1)
    expect(result).toEqual([productB])
  })
})
