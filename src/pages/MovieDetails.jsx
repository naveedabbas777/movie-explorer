import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { getMovieDetails } from '../services/tmdb';

export default function MovieDetails() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const currentMovie = movie?.id === Number(id) ? movie : null;
  const isFavorite = favorites.some((favorite) => favorite.id === currentMovie?.id);

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError('');

      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  return (
    <main className="app details-page">
      <Link className="back-link" to="/">← Back to trending movies</Link>

      {loading && <p className="message">Loading movie details...</p>}
      {error && <p className="message error">Could not load this movie: {error}</p>}
      {currentMovie && (
        <article className="movie-details">
          {currentMovie.poster_path && (
            <img
              className="details-poster"
              src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              alt={`${currentMovie.title} poster`}
            />
          )}
          <div>
            <p className="details-year">
              {currentMovie.release_date?.slice(0, 4) || 'Release date unknown'}
            </p>
            <h1>{currentMovie.title}</h1>
            <p className="details-rating">
              Rating: {Number(currentMovie.vote_average || 0).toFixed(1)} / 10
            </p>
            <p className="details-genres">
              {currentMovie.genres?.map((genre) => genre.name).join(' · ')}
            </p>
            <button
              className="favorite-action"
              type="button"
              onClick={() => toggleFavorite(currentMovie)}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '♥ Remove from favorites' : '♡ Add to favorites'}
            </button>
            <h2>Overview</h2>
            <p className="details-overview">
              {currentMovie.overview || 'No overview is available for this movie.'}
            </p>
          </div>
        </article>
      )}
    </main>
  );
}