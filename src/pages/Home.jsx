import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import MovieGrid from '../components/common/MovieGrid'
import Loader from '../components/common/Loader'
import ErrorDisplay from '../components/common/ErrorDisplay'
import HeroSection from '../components/home/HeroSection'
import './Home.css'

function Home() {
  const { 
    trending, 
    popular, 
    topRated, 
    loading, 
    error, 
    loadTrending, 
    loadPopular, 
    loadTopRated 
  } = useMovies()

  useEffect(() => {
    // Load all movie categories on mount
    loadTrending()
    loadPopular()
    loadTopRated()
    
    // Update document title
    document.title = 'MovieExplorer - Discover Amazing Movies'
  }, [loadTrending, loadPopular, loadTopRated])

  // Show loader while fetching initial data
  if (loading && !trending.length && !popular.length && !topRated.length) {
    return <Loader />
  }

  // Show error message if fetching failed
  if (error && !trending.length && !popular.length && !topRated.length) {
    return <ErrorDisplay message={error} retry={() => {
      loadTrending()
      loadPopular()
      loadTopRated()
    }} />
  }

  return (
    <div className="home-page">
      {trending.length > 0 && (
        <HeroSection featured={trending.slice(0, 5)} />
      )}
      
      <div className="home-content">
        {trending.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Trending Movies</h2>
              <Link to="/search?category=trending" className="section-link">
                View All
              </Link>
            </div>
            <MovieGrid movies={trending.slice(0, 8)} />
          </section>
        )}
        
        {popular.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Popular Movies</h2>
              <Link to="/search?category=popular" className="section-link">
                View All
              </Link>
            </div>
            <MovieGrid movies={popular.slice(0, 8)} />
          </section>
        )}
        
        {topRated.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Top Rated Movies</h2>
              <Link to="/search?category=top_rated" className="section-link">
                View All
              </Link>
            </div>
            <MovieGrid movies={topRated.slice(0, 8)} />
          </section>
        )}
      </div>
    </div>
  )
}

export default Home