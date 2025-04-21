import { useEffect } from 'react'
import { useMovies } from '../context/MovieContext'
import MovieGrid from '../components/common/MovieGrid'
import { FaHeart } from 'react-icons/fa'
import './Favorites.css'

function Favorites() {
  const { favorites } = useMovies()
  
  useEffect(() => {
    document.title = 'My Favorites - MovieExplorer'
  }, [])
  
  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>
          <FaHeart className="favorites-icon" />
          My Favorite Movies
        </h1>
        <p>Keep track of all your favorite movies in one place</p>
      </div>
      
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="empty-favorites">
          <div className="empty-content">
            <h2>No favorites yet</h2>
            <p>Start adding movies to your favorites by clicking the heart icon on any movie card.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites