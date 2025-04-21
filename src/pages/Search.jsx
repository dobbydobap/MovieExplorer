import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMovies } from '../context/MovieContext'
import SearchForm from '../components/common/SearchForm'
import MovieGrid from '../components/common/MovieGrid'
import Loader from '../components/common/Loader'
import ErrorDisplay from '../components/common/ErrorDisplay'
import './Search.css'

function Search() {
  const location = useLocation()
  const [searchPerformed, setSearchPerformed] = useState(false)
  const { searchResults, loading, error, handleSearch } = useMovies()
  
  useEffect(() => {
    document.title = 'Search Movies - MovieExplorer'
    
    // Parse query parameters on mount and when URL changes
    const params = new URLSearchParams(location.search)
    const query = params.get('query')
    const genre = params.get('genre')
    const year = params.get('year')
    
    if (query) {
      handleSearch(query, { genre, year })
      setSearchPerformed(true)
    }
  }, [location.search, handleSearch])
  
  const onSearch = async (query, options) => {
    await handleSearch(query, options)
    setSearchPerformed(true)
  }
  
  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Movies</h1>
        <p>Find your favorite movies by title, genre, or year</p>
      </div>
      
      <SearchForm onSearch={onSearch} />
      
      {loading && <Loader />}
      
      {error && <ErrorDisplay message={error} />}
      
      {!loading && !error && searchPerformed && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            <>
              <h2 className="results-title">
                Found {searchResults.length} results
              </h2>
              <MovieGrid movies={searchResults} />
            </>
          ) : (
            <div className="no-results">
              <h2>No movies found</h2>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}
      
      {!searchPerformed && !loading && (
        <div className="search-prompt">
          <h2>Looking for a movie?</h2>
          <p>Use the search form above to find movies by title, genre, or year.</p>
          <div className="search-tips">
            <h3>Search Tips:</h3>
            <ul>
              <li>Enter a movie title like "Star Wars" or "Inception"</li>
              <li>Filter by genre to narrow down results</li>
              <li>Add a year to find movies released in that year</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search