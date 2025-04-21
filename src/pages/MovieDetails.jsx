import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaStar, FaCalendarAlt, FaClock, FaTag, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useMovies } from '../context/MovieContext'
import { getImageUrl, getTrailerUrl } from '../services/tmdbAPI'
import Loader from '../components/common/Loader'
import ErrorDisplay from '../components/common/ErrorDisplay'
import MovieGrid from '../components/common/MovieGrid'
import './MovieDetails.css'

function MovieDetails() {
  const { id } = useParams()
  const { 
    movieDetails, 
    loading, 
    error, 
    loadMovieDetails, 
    isFavorite, 
    toggleFavorite 
  } = useMovies()
  
  useEffect(() => {
    window.scrollTo(0, 0)
    loadMovieDetails(id)
  }, [id, loadMovieDetails])
  
  useEffect(() => {
    if (movieDetails) {
      document.title = `${movieDetails.title} - MovieExplorer`
    }
  }, [movieDetails])
  
  if (loading) {
    return <Loader />
  }
  
  if (error) {
    return <ErrorDisplay message={error} retry={() => loadMovieDetails(id)} />
  }
  
  if (!movieDetails) {
    return null
  }
  
  const trailerUrl = getTrailerUrl(movieDetails.videos)
  const favorite = isFavorite(movieDetails.id)
  
  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }
  
  return (
    <div className="movie-details-page">
      <div className="movie-backdrop" style={{ 
        backgroundImage: `url(${getImageUrl(movieDetails.backdrop_path, 'original')})` 
      }}>
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-details-content">
        <div className="movie-details-main">
          <div className="movie-poster-container">
            <img 
              src={getImageUrl(movieDetails.poster_path)} 
              alt={movieDetails.title} 
              className="movie-poster"
            />
          </div>
          
          <div className="movie-info">
            <h1 className="movie-title">
              {movieDetails.title} 
              <span className="movie-year">
                {movieDetails.release_date 
                  ? `(${new Date(movieDetails.release_date).getFullYear()})` 
                  : ''}
              </span>
            </h1>
            
            <div className="movie-meta">
              <div className="meta-item">
                <FaStar className="meta-icon star" />
                <span>{movieDetails.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>
                  {movieDetails.release_date 
                    ? new Date(movieDetails.release_date).toLocaleDateString() 
                    : 'Unknown'}
                </span>
              </div>
              
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>{formatRuntime(movieDetails.runtime)}</span>
              </div>
            </div>
            
            <div className="movie-genres">
              {movieDetails.genres?.map((genre) => (
                <Link 
                  key={genre.id} 
                  to={`/search?genre=${genre.id}`} 
                  className="genre-tag"
                >
                  <FaTag className="genre-icon" />
                  {genre.name}
                </Link>
              ))}
            </div>
            
            <div className="movie-actions">
              <button 
                className={`btn ${favorite ? 'btn-accent' : 'btn-primary'}`}
                onClick={() => toggleFavorite(movieDetails)}
              >
                {favorite ? (
                  <>
                    <FaHeart className="btn-icon" /> Remove from Favorites
                  </>
                ) : (
                  <>
                    <FaRegHeart className="btn-icon" /> Add to Favorites
                  </>
                )}
              </button>
            </div>
            
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movieDetails.overview || 'No overview available.'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {trailerUrl && (
        <section className="movie-section trailer-section">
          <h2 className="section-title">Trailer</h2>
          <div className="trailer-container">
            <iframe
              src={trailerUrl}
              title={`${movieDetails.title} trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="trailer-iframe"
            ></iframe>
          </div>
        </section>
      )}
      
      {movieDetails.credits?.cast?.length > 0 && (
        <section className="movie-section">
          <h2 className="section-title">Cast</h2>
          <div className="cast-container">
            {movieDetails.credits.cast.slice(0, 8).map((person) => (
              <div key={person.id} className="cast-card">
                <div className="cast-image-container">
                  <img
                    src={
                      person.profile_path
                        ? getImageUrl(person.profile_path)
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                    alt={person.name}
                    className="cast-image"
                  />
                </div>
                <div className="cast-info">
                  <h3 className="cast-name">{person.name}</h3>
                  <p className="cast-character">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {movieDetails.reviews?.results?.length > 0 && (
        <section className="movie-section">
          <h2 className="section-title">Reviews</h2>
          <div className="reviews-container">
            {movieDetails.reviews.results.slice(0, 3).map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3 className="review-author">{review.author}</h3>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-content">
                  {review.content.length > 300
                    ? `${review.content.slice(0, 300)}...`
                    : review.content}
                </p>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-link"
                >
                  Read full review
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {movieDetails.similar?.results?.length > 0 && (
        <MovieGrid movies={movieDetails.similar.results.slice(0, 8)} title="Similar Movies" />
      )}
    </div>
  )
}

export default MovieDetails