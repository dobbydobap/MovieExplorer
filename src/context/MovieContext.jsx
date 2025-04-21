import { createContext, useContext, useState, useCallback } from 'react'
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchMovieDetails, searchMovies } from '../services/tmdbAPI'

const MovieContext = createContext()

export const useMovies = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [movieDetails, setMovieDetails] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('movieFavorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load trending movies
  const loadTrending = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTrendingMovies()
      setTrending(data.results)
    } catch (err) {
      setError('Failed to load trending movies')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load popular movies
  const loadPopular = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPopularMovies()
      setPopular(data.results)
    } catch (err) {
      setError('Failed to load popular movies')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load top rated movies
  const loadTopRated = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTopRatedMovies()
      setTopRated(data.results)
    } catch (err) {
      setError('Failed to load top rated movies')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load movie details
  const loadMovieDetails = useCallback(async (movieId) => {
    setLoading(true)
    setError(null)
    setMovieDetails(null)
    try {
      const data = await fetchMovieDetails(movieId)
      setMovieDetails(data)
    } catch (err) {
      setError('Failed to load movie details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Search movies
  const handleSearch = useCallback(async (query, options = {}) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      const data = await searchMovies(query, options)
      setSearchResults(data.results)
    } catch (err) {
      setError('Failed to search movies')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Toggle favorite movie
  const toggleFavorite = useCallback((movie) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(m => m.id === movie.id)
      
      const newFavorites = exists
        ? prevFavorites.filter(m => m.id !== movie.id)
        : [...prevFavorites, movie]
      
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  // Check if a movie is in favorites
  const isFavorite = useCallback((movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }, [favorites])

  const value = {
    trending,
    popular,
    topRated,
    movieDetails,
    searchResults,
    favorites,
    loading,
    error,
    loadTrending,
    loadPopular,
    loadTopRated,
    loadMovieDetails,
    handleSearch,
    toggleFavorite,
    isFavorite
  }

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}