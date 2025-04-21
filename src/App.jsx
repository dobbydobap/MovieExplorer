import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/common/Loader'

// Lazy loaded pages for better performance
const Home = lazy(() => import('./pages/Home'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))
const Search = lazy(() => import('./pages/Search'))
const Favorites = lazy(() => import('./pages/Favorites'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App