import MovieCard from './MovieCard'

function MovieGrid({ movies, title }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-12 text-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg my-8">
        <h3>{title ? `No ${title.toLowerCase()} movies found` : 'No movies found'}</h3>
      </div>
    )
  }

  return (
    <section className="my-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-[3px] after:bg-accent">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieGrid