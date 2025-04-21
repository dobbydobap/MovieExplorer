import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { fetchGenres } from '../../services/tmdbAPI'

function SearchForm({ onSearch }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [year, setYear] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await fetchGenres()
        setGenres(genreData)
      } catch (error) {
        console.error('Failed to load genres:', error)
      }
    }
    
    loadGenres()
  }, [])

  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search)
      setQuery(params.get('query') || '')
      setSelectedGenre(params.get('genre') || '')
      setYear(params.get('year') || '')
    }
  }, [location])

  const validateForm = () => {
    const newErrors = {}
    
    if (!query.trim()) {
      newErrors.query = 'Please enter a search term'
    }
    
    if (year && !/^\d{4}$/.test(year)) {
      newErrors.year = 'Year must be a 4-digit number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    const searchParams = new URLSearchParams()
    searchParams.append('query', query)
    if (selectedGenre) searchParams.append('genre', selectedGenre)
    if (year) searchParams.append('year', year)
    
    if (location.pathname !== '/search') {
      navigate(`/search?${searchParams.toString()}`)
    }
    
    if (onSearch) {
      onSearch(query, { genre: selectedGenre, year })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (errors.query) setErrors({ ...errors, query: '' })
            }}
            className={`w-full pl-10 pr-3 py-3 border-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
              errors.query ? 'border-accent' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        </div>
        {errors.query && <span className="text-sm text-accent mt-1 block">{errors.query}</span>}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value)
              if (errors.year) setErrors({ ...errors, year: '' })
            }}
            className={`w-full px-3 py-2 border-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
              errors.year ? 'border-accent' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.year && <span className="text-sm text-accent mt-1 block">{errors.year}</span>}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed md:w-auto w-full"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchForm