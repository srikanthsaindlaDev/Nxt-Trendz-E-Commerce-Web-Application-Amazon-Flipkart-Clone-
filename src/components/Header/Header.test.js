import {render, screen, fireEvent} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'

import Header from './index'
import ThemeContext from '../../context/ThemeContext'

const renderHeader = (isDarkMode, toggleTheme) =>
  render(
    <MemoryRouter>
      <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
        <Header />
      </ThemeContext.Provider>
    </MemoryRouter>,
  )

describe('Header theme toggle', () => {
  it('renders the theme toggle buttons', () => {
    renderHeader(false, () => {})
    // one in the mobile bar, one in the desktop bar
    expect(screen.getAllByLabelText('toggle theme').length).toBeGreaterThan(0)
  })

  it('calls toggleTheme when clicked', () => {
    let toggled = 0
    const toggleTheme = () => {
      toggled += 1
    }
    renderHeader(false, toggleTheme)

    fireEvent.click(screen.getAllByLabelText('toggle theme')[0])
    expect(toggled).toBe(1)
  })
})
