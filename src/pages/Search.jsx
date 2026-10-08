import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/tmdb';

export default function Search() {
  const [searchParams] = useSearchParams();

  const startingQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(startingQuery);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  function handleQueryChange(event) {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === '') {
      setMovies([]);
      setError('');
    }
  }

  useEffect(() => {
    const searchText = query.trim();
    if (searchText === '') return;

    searchMovies(searchText)
      .then((response) => {
        setMovies(response.results || []);
        setError('');
      })
      .catch((searchError) => {
        setError(searchError.message);
        setMovies([]);
      });
  }, [query]);

  return (
    <main className="app">
      <header className="page-heading">
        <p>Movie Explorer</p>
        <h1>Search Movies</h1>
        <Link className="search-link" to="/">Back to trending movies</Link>
        {' · '}
        <Link className="search-link" to="/favorites">Favorites</Link>
      </header>

      <label className="search-label">
        <span>Movie title</span>
        <input
          type="search"
          value={query}
          onChange={handleQueryChange}
          placeholder="Start typing a movie title..."
        />
      </label>

      {error && (
        <p className="message error" role="alert">
          Could not search movies: {error}
        </p>
      )}

      {movies.length > 0 && (
        <section className="movie-grid" aria-label="Search results">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </section>
      )}
    </main>
  );
}