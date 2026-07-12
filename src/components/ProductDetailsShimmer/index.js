import '../ProductsShimmer/shimmer.css'
import './index.css'

const ProductDetailsShimmer = () => (
  <div
    className="details-shimmer-container"
    data-testid="product-details-shimmer"
  >
    <div className="shimmer details-shimmer-image" />
    <div className="details-shimmer-info">
      <div className="shimmer shimmer-line details-shimmer-name" />
      <div className="shimmer shimmer-line details-shimmer-price" />
      <div className="shimmer shimmer-line details-shimmer-rating" />
      <div className="shimmer shimmer-line details-shimmer-text" />
      <div className="shimmer shimmer-line details-shimmer-text short" />
      <div className="shimmer shimmer-line details-shimmer-label" />
      <div className="shimmer shimmer-line details-shimmer-label" />
      <div className="shimmer details-shimmer-button" />
    </div>
  </div>
)

export default ProductDetailsShimmer
