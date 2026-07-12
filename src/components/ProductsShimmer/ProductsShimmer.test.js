import {render, screen} from '@testing-library/react'

import ProductsShimmer from './index'
import ProductDetailsShimmer from '../ProductDetailsShimmer'

describe('Shimmer loaders', () => {
  it('renders the default number of product card skeletons', () => {
    render(<ProductsShimmer />)
    expect(screen.getAllByTestId('product-card-shimmer')).toHaveLength(6)
  })

  it('renders the requested number of skeletons', () => {
    render(<ProductsShimmer count={3} />)
    expect(screen.getAllByTestId('product-card-shimmer')).toHaveLength(3)
  })

  it('renders the product details skeleton', () => {
    render(<ProductDetailsShimmer />)
    expect(screen.getByTestId('product-details-shimmer')).toBeInTheDocument()
  })
})
