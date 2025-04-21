import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useMovies } from '../../context/MovieContext'
import { getImageUrl } from '../../services/tmdbAPI'

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useMovies()
  const [imageLoaded, setImageLoaded] = useState(false)
  
  if (!movie) return null

  const favorite = isFavorite(movie.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
      <Link to={`/movie/${movie.id}`} className="block h-full text-gray-900 dark:text-white no-underline">
        <div className="relative overflow-hidden aspect-[2/3]">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center" />
          )}
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
              setImageLoaded(true)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between">
            <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded self-start">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <button 
              className={`w-9 h-9 rounded-full bg-black/70 flex items-center justify-center self-end hover:scale-110 transition-transform duration-300 ${favorite ? 'text-accent' : 'text-white'}`}
              onClick={handleFavoriteClick}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-lg font-medium mb-1 truncate">{movie.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard