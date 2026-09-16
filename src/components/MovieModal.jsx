function MovieModal({ movie, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-5 z-[1000]"
      onClick={onClose}
    >
      <div
        className="relative flex gap-8 w-[900px] max-w-full max-h-[90vh] overflow-y-auto bg-panel border border-border rounded-lg p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 w-10 h-10 border-none rounded-full bg-danger text-white text-2xl z-10 cursor-pointer"
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          width={280}
          height={420}
          className="w-[280px] h-[420px] object-cover rounded shrink-0"
        />

        <div className="flex-1">
          <h2 className="font-display italic text-3xl text-white mb-4">
            {movie.title}
          </h2>

          <p className="text-accent text-lg mb-3">
            ⭐ {movie.vote_average != null ? movie.vote_average.toFixed(1) : 'N/A'}
          </p>

          <p className="text-muted leading-relaxed mb-3">
            <strong className="text-white">Release Date:</strong>{' '}
            {movie.release_date || 'Unknown'}
          </p>

          <p className="text-muted leading-relaxed mb-3">
            <strong className="text-white">Runtime:</strong>{' '}
            {movie.runtime ? `${movie.runtime} minutes` : 'Unknown'}
          </p>

          <p className="text-muted leading-relaxed mb-3">
            <strong className="text-white">Genres:</strong>{' '}
            {movie.genres?.length
              ? movie.genres.map((g) => g.name).join(', ')
              : 'Unknown'}
          </p>

          <h3 className="font-display text-white mt-6 mb-2">Overview</h3>

          <p className="text-muted leading-relaxed text-base">
            {movie.overview || 'No overview available.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieModal