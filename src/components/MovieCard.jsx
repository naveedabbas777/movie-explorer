import { Link } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  return (
    <article className="movie-card">
      <Link className="movie-card-link" to={`/movie/${movie.id}`}>
        {movie.poster_path
          ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
          : <div className="poster-placeholder">Poster unavailable</div>}
        <h2>{movie.title}</h2>
        <p>Year: {movie.release_date?.slice(0, 4) || 'Unknown'}</p>
        <p>Rating: {Number(movie.vote_average || 0).toFixed(1)} / 10</p>
      </Link>
      <button
        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
        type="button"
        onClick={() => toggleFavorite(movie)}
        aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        aria-pressed={isFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </article>
  );
}