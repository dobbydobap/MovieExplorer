import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaPlay } from 'react-icons/fa'
import { getImageUrl } from '../../services/tmdbAPI'
import './HeroSection.css'

function HeroSection({ featured }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % featured.length)
        setIsTransitioning(false)
      }, 500)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [featured.length])
  
  const activeMovie = featured[activeIndex]
  
  if (!activeMovie) return null
  
  return (
    <section className="hero-section">
      <div className={`hero-backdrop ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <img
          src={getImageUrl(activeMovie.backdrop_path, 'original')}
          alt={activeMovie.title}
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content container">
        <div className={`hero-info ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          <h1 className="hero-title">{activeMovie.title}</h1>
          
          <div className="hero-meta">
            <span className="hero-rating">
              <FaStar className="star-icon" />
              {activeMovie.vote_average.toFixed(1)}
            </span>
            <span className="hero-year">
              {activeMovie.release_date ? new Date(activeMovie.release_date).getFullYear() : ''}
            </span>
          </div>
          
          <p className="hero-overview">{activeMovie.overview}</p>
          
          <div className="hero-actions">
            <Link to={`/movie/${activeMovie.id}`} className="btn btn-primary">
              <FaPlay className="btn-icon" /> Watch Trailer
            </Link>
            <Link to={`/movie/${activeMovie.id}`} className="btn btn-secondary">
              More Details
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hero-pagination">
        {featured.map((movie, index) => (
          <button
            key={movie.id}
            className={`hero-pagination-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setActiveIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            aria-label={`View ${movie.title}`}
          ></button>
        ))}
      </div>
    </section>
  )
}

export default HeroSection