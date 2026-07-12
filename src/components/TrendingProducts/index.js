import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FiArrowRight} from 'react-icons/fi'

import ProductCard from '../ProductCard'
import ProductsShimmer from '../ProductsShimmer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingProducts extends Component {
  state = {
    products: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingProducts()
  }

  getTrendingProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products?sort_by=PRICE_HIGH'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.slice(0, 4).map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        products: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderContent = () => {
    const {apiStatus, products} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <ul className="trending-products-list">
            {products.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )
      case apiStatusConstants.inProgress:
        return <ProductsShimmer count={4} />
      case apiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    // Hide the whole section if the request failed, so Home stays clean.
    if (apiStatus === apiStatusConstants.failure) {
      return null
    }

    return (
      <section className="trending-section">
        <div className="trending-header">
          <h1 className="trending-heading">Trending Now 🔥</h1>
          <Link to="/products" className="trending-view-all">
            View All <FiArrowRight />
          </Link>
        </div>
        {this.renderContent()}
      </section>
    )
  }
}

export default TrendingProducts
