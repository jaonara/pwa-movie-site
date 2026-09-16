import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'

import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
} from './services/tmdb'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'

const MovieModal = lazy(() => import('./components/MovieModal'))

function App() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searching, setSearching] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies()
        setMovies(data.results)
      } catch (err) {
        console.error(err)
        setError('Failed to load movies.')
      } finally {
        setLoading(false)
      }
    }
    loadMovies()
  }, [])

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return

    try {
      setSearching(true)
      setError('')
      const data = await searchMovies(query)
      setMovies(data.results)
      document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      setError('Failed to search movies.')
    } finally {
      setSearching(false)
    }
  }

  async function showPopularMovies() {
    try {
      setLoading(true)
      setError('')
      setSelectedMovie(null)
      setQuery('')
      const data = await getPopularMovies()
      setMovies(data.results)
    } catch (err) {
      console.error(err)
      setError('Failed to load popular movies.')
    } finally {
      setLoading(false)
    }
  }

  async function handleMovieClick(movieId) {
    try {
      setDetailsLoading(true)
      setError('')
      setSelectedMovie(null)
      const movie = await getMovieDetails(movieId)
      setSelectedMovie(movie)
    } catch (err) {
      console.error(err)
      if (!navigator.onLine) {
        setError('You are offline. Movie details are not available yet.')
      } else {
        setError('Failed to load movie details.')
      }
    } finally {
      setDetailsLoading(false)
    }
  }

  function closeMovieDetails() {
    setSelectedMovie(null)
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <Header onPopularClick={showPopularMovies} />

      <main>
        {/* HERO */}
        <section
          id="home"
          className="min-h-[420px] flex items-center justify-center text-center px-5 py-[50px]"
          style={{
            background: `linear-gradient(rgba(12,11,16,0.4), rgba(12,11,16,0.5)),
              url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=75&auto=format') center/cover`
          }}
        >
          <div className="max-w-[700px]">
            <h2 className="font-display italic text-5xl font-semibold text-white mb-4">
              Discover Your Next Movie
            </h2>

            <p className="text-muted mb-8">
              Search for movies and discover something new to watch.
            </p>

            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              searching={searching}
            />
          </div>
        </section>

        {/* MOVIES */}
        <section id="popular" className="px-[6%] py-[50px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-[28px] text-white">
              {query.trim() ? `Search Results for "${query}"` : 'Popular Movies'}
            </h2>

            {query.trim() && (
              <button
                type="button"
                onClick={showPopularMovies}
                className="bg-transparent border border-accent text-accent px-4 py-2 rounded cursor-pointer hover:bg-accent hover:text-accent-ink transition-colors"
              >
                Back to Popular
              </button>
            )}
          </div>

          {loading && (
            <div className="text-center py-10">
              <div className="spinner" />
              <p className="text-muted">Loading movies...</p>
            </div>
          )}

          {error && (
            <p className="text-center py-10 text-danger">{error}</p>
          )}

          {!loading && !error && movies.length === 0 && (
            <p className="text-center py-10 text-muted">No movies found.</p>
          )}

          {!loading && !error && movies.length > 0 && (
            <MovieList movies={movies} onMovieClick={handleMovieClick} />
          )}
        </section>
      </main>

      {/* Details loading overlay */}
      {detailsLoading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000]">
          <div className="text-center">
            <div className="spinner" />
            <p className="text-muted">Loading movie details...</p>
          </div>
        </div>
      )}

      {/* Movie Modal */}
      {selectedMovie && (
        <Suspense fallback={null}>
          <MovieModal movie={selectedMovie} onClose={closeMovieDetails} />
        </Suspense>
      )}
    </div>
  )
}

export default App