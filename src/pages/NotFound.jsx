import { Link } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <FaHome className="btn-icon" /> Back to Home
          </Link>
          <Link to="/search" className="btn btn-secondary">
            <FaSearch className="btn-icon" /> Search Movies
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound