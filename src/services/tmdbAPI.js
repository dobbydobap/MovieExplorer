import axios from 'axios'

// Base URL and params for TMDB API
const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '262460daac26e5cefa3e818b98648e7c'
const DEFAULT_PARAMS = {
  api_key: API_KEY,
  language: 'en-US',
}

// Create axios instance
const tmdbAxios = axios.create({
  baseURL: API_BASE_URL,
  params: DEFAULT_PARAMS,
})

// Get trending movies
export const fetchTrendingMovies = async (timeWindow = 'day') => {
  try {
    const response = await tmdbAxios.get(`/trending/movie/${timeWindow}`)
    return response.data
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    throw error
  }
}

// Get popular movies
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbAxios.get('/movie/popular', {
      params: { page },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}

// Get top-rated movies
export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdbAxios.get('/movie/top_rated', {
      params: { page },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching top-rated movies:', error)
    throw error
  }
}

// Get movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await tmdbAxios.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,reviews,similar',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

// Search movies
export const searchMovies = async (query, options = {}) => {
  try {
    const { page = 1, year, genre } = options
    const response = await tmdbAxios.get('/search/movie', {
      params: {
        query,
        page,
        year,
        with_genres: genre,
        include_adult: false,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

// Get movie genres
export const fetchGenres = async () => {
  try {
    const response = await tmdbAxios.get('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw error
  }
}

// Image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

// Get movie trailer
export const getTrailerUrl = (videos) => {
  if (!videos || !videos.results || videos.results.length === 0) return null
  
  // First look for official trailers
  const officialTrailer = videos.results.find(
    video => video.type === 'Trailer' && video.official && video.site === 'YouTube'
  )
  
  // If no official trailer, get any trailer
  const anyTrailer = videos.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  )
  
  // If no trailer, get any video
  const anyVideo = videos.results.find(
    video => video.site === 'YouTube'
  )
  
  const video = officialTrailer || anyTrailer || anyVideo
  
  return video ? `https://www.youtube.com/embed/${video.key}` : null
}