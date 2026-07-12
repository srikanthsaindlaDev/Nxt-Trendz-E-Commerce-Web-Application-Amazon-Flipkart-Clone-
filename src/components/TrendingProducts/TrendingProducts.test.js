import {render, screen, waitFor} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import TrendingProducts from './index'

const productsResponse = {
  products: [
    {
      id: 1,
      title: 'Trending Shirt',
      brand: 'Nike',
      price: 999,
      image_url: '',
      rating: '4.5',
    },
    {
      id: 2,
      title: 'Trending Watch',
      brand: 'Fossil',
      price: 4999,
      image_url: '',
      rating: '4.2',
    },
  ],
}

describe('TrendingProducts', () => {
  afterEach(() => jest.restoreAllMocks())

  it('renders fetched products on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(productsResponse),
      }),
    )

    render(
      <MemoryRouter>
        <TrendingProducts />
      </MemoryRouter>,
    )

    await waitFor(() =>
      expect(screen.getByText('Trending Shirt')).toBeInTheDocument(),
    )
    expect(screen.getByText('Trending Now 🔥')).toBeInTheDocument()
  })

  it('renders nothing when the request fails', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ok: false}))

    const {container} = render(
      <MemoryRouter>
        <TrendingProducts />
      </MemoryRouter>,
    )

    await waitFor(() => expect(container).toBeEmptyDOMElement())
  })
})
