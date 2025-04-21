import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaHeart, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Handle scroll event to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            MovieExplorer
          </Link>
        </div>
        
        <nav className={`navbar-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : ''}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
                <FaHeart className="nav-icon" /> Favorites
              </NavLink>
            </li>
          </ul>
          
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">
              <FaSearch />
            </button>
          </form>
          
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </nav>
        
        <div className="navbar-mobile-buttons">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          
          <button
            className="navbar-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar