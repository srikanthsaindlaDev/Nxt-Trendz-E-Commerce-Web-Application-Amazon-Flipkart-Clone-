import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import SimilarProductItem from './index'

const productDetails = {
  id: 42,
  title: 'Mixer Grinder',
  brand: 'Lifelong',
  imageUrl: '',
  rating: '3.9',
  price: 1699,
}

describe('SimilarProductItem', () => {
  it('links to the correct product details route', () => {
    render(
      <MemoryRouter>
        <SimilarProductItem productDetails={productDetails} />
      </MemoryRouter>,
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/42')
    expect(screen.getByText('Mixer Grinder')).toBeInTheDocument()
  })
})
