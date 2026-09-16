import MovieCard from './MovieCard'

function MovieList({ movies, onMovieClick }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          isPriority={index === 0}
        />
      ))}
    </div>
  )
}

export default MovieList