import './shimmer.css'
import './index.css'

const ProductCardShimmer = () => (
  <li className="shimmer-card" data-testid="product-card-shimmer">
    <div className="shimmer shimmer-thumbnail" />
    <div className="shimmer shimmer-line shimmer-title" />
    <div className="shimmer shimmer-line shimmer-brand" />
    <div className="shimmer-details-row">
      <div className="shimmer shimmer-line shimmer-price" />
      <div className="shimmer shimmer-rating" />
    </div>
  </li>
)

const ProductsShimmer = props => {
  const {count} = props
  const placeholders = Array.from({length: count}, (_, index) => index)

  return (
    <ul className="products-list shimmer-list">
      {placeholders.map(each => (
        <ProductCardShimmer key={each} />
      ))}
    </ul>
  )
}

ProductsShimmer.defaultProps = {
  count: 6,
}

export default ProductsShimmer
