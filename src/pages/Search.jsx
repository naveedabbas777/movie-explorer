import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import useDebounce from '../hooks/useDebounce';
import { searchMovies } from '../services/tmdb';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('query') || '');
  const [result, setResult] = useState(null);
  const debouncedQuery = useDebounce(query.trim());
  const currentResult = result?.query === debouncedQuery ? result : null;
  const isWaitingForDebounce = query.trim() !== debouncedQuery;
  const isLoading = Boolean(query.trim()) && (isWaitingForDebounce || !currentResult);

  useEffect(() => {
    if (!debouncedQuery) return undefined;

    let isCurrentRequest = true;

    searchMovies(debouncedQuery)
      .then((data) => {
        if (isCurrentRequest) {
          setResult({ query: debouncedQuery, movies: data.results || [] });
        }
      })
      .catch((error) => {
        if (isCurrentRequest) {
          setResult({ query: debouncedQuery, error: error.message });
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [debouncedQuery]);

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
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Start typing a movie title..."
        />
      </label>

      {isLoading && <p className="message" role="status">Searching movies...</p>}
      {currentResult?.error && <p className="message error" role="alert">Could not search movies: {currentResult.error}</p>}
      {currentResult?.movies?.length === 0 && <p className="message">No movies found. Try another title.</p>}
      {currentResult?.movies?.length > 0 && (
        <section className="movie-grid" aria-label="Search results">
          {currentResult.movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </section>
      )}
      {!query.trim() && <p className="message">Enter a title to search.</p>}
    </main>
  );
}