import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { getGenres, getTrendingMovies } from '../services/tmdb';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [minimumRating, setMinimumRating] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovies() {
      try {
        const movieData = await getTrendingMovies();
        const genreData = await getGenres();

        setMovies(movieData.results || []);
        setGenres(genreData.genres || []);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const hasSelectedGenre = selectedGenre === 'all'
      || (movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre)));
    const hasMinimumRating = movie.vote_average >= Number(minimumRating);

    return hasSelectedGenre && hasMinimumRating;
  });

  return (
    <main className="app">
      <header className="page-heading">
        <p>Movie Explorer</p>
        <h1>Trending Movies</h1>
        <Link className="search-link" to="/search">Search movies</Link>
        <Link className="search-link" to="/favorites">Favorites</Link>
      </header>

      <div className="movie-filters" aria-label="Filter trending movies">
        <label>
          <span>Genre</span>
          <select
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option value="all">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Minimum rating</span>
          <select
            value={minimumRating}
            onChange={(event) => setMinimumRating(event.target.value)}
          >
            <option value="0">Any rating</option>
            <option value="6">6 and up</option>
            <option value="7">7 and up</option>
            <option value="8">8 and up</option>
          </select>
        </label>
      </div>

      {loading && <p className="message">Loading movies...</p>}
      {error && <p className="message error">Could not load movies: {error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className="message">No movies found.</p>
      )}
      {!loading && !error && movies.length > 0 && filteredMovies.length === 0 && (
        <p className="message">No movies match these filters.</p>
      )}
      {!loading && !error && filteredMovies.length > 0 && (
        <section className="movie-grid" aria-label="Trending movies">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      )}
    </main>
  );
}
