// Pure helpers for cart state transitions.
// Kept side-effect free so they are easy to reason about and unit test.
// App.js calls these inside setState updaters.

export const addToCart = (cartList, product) => {
  const existingProduct = cartList.find(eachItem => eachItem.id === product.id)

  if (existingProduct) {
    return cartList.map(eachItem =>
      eachItem.id === product.id
        ? {...eachItem, quantity: eachItem.quantity + product.quantity}
        : eachItem,
    )
  }

  return [...cartList, product]
}

export const removeFromCart = (cartList, id) =>
  cartList.filter(eachItem => eachItem.id !== id)

export const incrementQuantity = (cartList, id) =>
  cartList.map(eachItem =>
    eachItem.id === id
      ? {...eachItem, quantity: eachItem.quantity + 1}
      : eachItem,
  )

export const decrementQuantity = (cartList, id) => {
  const targetItem = cartList.find(eachItem => eachItem.id === id)

  // Dropping below 1 removes the item from the cart entirely.
  if (targetItem && targetItem.quantity === 1) {
    return cartList.filter(eachItem => eachItem.id !== id)
  }

  return cartList.map(eachItem =>
    eachItem.id === id
      ? {...eachItem, quantity: eachItem.quantity - 1}
      : eachItem,
  )
}
