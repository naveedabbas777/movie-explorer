import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import useFavorites from '../hooks/useFavorites';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="app">
      <header className="page-heading">
        <p>Movie Explorer</p>
        <h1>Favorites</h1>
        <Link className="search-link" to="/">Back to trending movies</Link>
      </header>

      {favorites.length === 0
        ? <p className="message">No favorites yet. Add one from a movie card.</p>
        : (
          <section className="movie-grid" aria-label="Favorite movies">
            {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </section>
        )}
    </main>
  );
}