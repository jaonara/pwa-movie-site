function MovieCard({ movie, onMovieClick, isPriority }) {
  return (
    <div
      className="bg-panel border border-border rounded-md overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:border-accent"
      onClick={() => onMovieClick(movie.id)}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image'
        }
        alt={movie.title}
        width={200}
        height={300}
        loading={isPriority ? 'eager' : 'lazy'}
        fetchPriority={isPriority ? 'high' : 'auto'}
        className="w-full aspect-[2/3] object-cover block"
      />

      <div className="p-4">
        <h3 className="font-display text-[17px] mb-2 text-white">
          {movie.title}
        </h3>

        <p className="text-muted text-sm mt-1">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </p>

        <p className="text-muted text-sm mt-1">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard