import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import LoginForm from './index'

const renderLogin = () =>
  render(
    <MemoryRouter>
      <LoginForm history={{replace: () => {}}} />
    </MemoryRouter>,
  )

const typeCredentials = (username, password) => {
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: {value: username},
  })
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: {value: password},
  })
}

describe('LoginForm credential mapping', () => {
  beforeEach(() => {
    Cookies.remove('jwt_token')
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({jwt_token: 'fake-token'}),
      }),
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('sends the real backend credentials when srikanth logs in', async () => {
    renderLogin()
    typeCredentials('srikanth', 'srikanth@123')
    fireEvent.click(screen.getByText('Login'))

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    const sentBody = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(sentBody).toEqual({username: 'rahul', password: 'rahul@2021'})
  })

  it('passes other usernames through unchanged', async () => {
    renderLogin()
    typeCredentials('someoneelse', 'pass123')
    fireEvent.click(screen.getByText('Login'))

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    const sentBody = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(sentBody).toEqual({username: 'someoneelse', password: 'pass123'})
  })
})
