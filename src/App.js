import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import Payment from './components/Payment'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import ThemeContext from './context/ThemeContext'
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './context/cartActions'

import './App.css'
import './theme.css'

class App extends Component {
  state = {
    cartList: [],
    isDarkMode: false,
  }

  componentDidMount() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      this.setState({isDarkMode: true})
      document.body.classList.add('dark-theme')
    }
  }

  toggleTheme = () => {
    this.setState(prevState => {
      const isDarkMode = !prevState.isDarkMode
      if (isDarkMode) {
        document.body.classList.add('dark-theme')
        localStorage.setItem('theme', 'dark')
      } else {
        document.body.classList.remove('dark-theme')
        localStorage.setItem('theme', 'light')
      }
      return {isDarkMode}
    })
  }

  addCartItem = product => {
    this.setState(prevState => ({
      cartList: addToCart(prevState.cartList, product),
    }))
  }

  deleteCartItem = id => {
    this.setState(prevState => ({
      cartList: removeFromCart(prevState.cartList, id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: incrementQuantity(prevState.cartList, id),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: decrementQuantity(prevState.cartList, id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, isDarkMode} = this.state

    return (
      <BrowserRouter>
        <ThemeContext.Provider
          value={{isDarkMode, toggleTheme: this.toggleTheme}}
        >
          <CartContext.Provider
            value={{
              cartList,
              addCartItem: this.addCartItem,
              deleteCartItem: this.deleteCartItem,
              incrementCartItemQuantity: this.incrementCartItemQuantity,
              decrementCartItemQuantity: this.decrementCartItemQuantity,
              removeAllCartItems: this.removeAllCartItems,
            }}
          >
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/products" component={Products} />
              <ProtectedRoute
                exact
                path="/products/:id"
                component={ProductItemDetails}
              />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/payment" component={Payment} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </CartContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
