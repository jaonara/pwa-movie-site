const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = 'https://api.themoviedb.org/3'

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  return response.json()
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error('Failed to search movies')
  }

  return response.json()
}

export async function getMovieDetails(movieId) {
  const cacheKey = `movie-details-${movieId}`

  // If offline, use saved movie details
  if (!navigator.onLine) {
    const cachedMovie = localStorage.getItem(cacheKey)

    if (cachedMovie) {
      return JSON.parse(cachedMovie)
    }

    throw new Error('OFFLINE')
  }

  // If online, get fresh details from TMDB
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }

  const movie = await response.json()

  // Save details for offline use
  localStorage.setItem(cacheKey, JSON.stringify(movie))

  return movie
}