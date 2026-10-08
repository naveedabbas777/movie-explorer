import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { getMovieDetails } from '../services/tmdb';

export default function MovieDetails() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const currentResult = result?.id === id ? result : null;

  useEffect(() => {
    let isCurrentRequest = true;

    getMovieDetails(id)
      .then((movie) => {
        if (isCurrentRequest) setResult({ id, movie });
      })
      .catch((error) => {
        if (isCurrentRequest) setResult({ id, error: error.message });
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [id]);

  return (
    <main className="app details-page">
      <Link className="back-link" to="/">← Back to trending movies</Link>

      {!currentResult && <p className="message" role="status">Loading movie details...</p>}
      {currentResult?.error && <p className="message error" role="alert">Could not load this movie: {currentResult.error}</p>}
      {currentResult?.movie && <MovieInfo movie={currentResult.movie} />}
    </main>
  );
}

function MovieInfo({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  return (
    <article className="movie-details">
      {movie.poster_path && (
        <img
          className="details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
      )}
      <div>
        <p className="details-year">{movie.release_date?.slice(0, 4) || 'Release date unknown'}</p>
        <h1>{movie.title}</h1>
        <p className="details-rating">Rating: {Number(movie.vote_average || 0).toFixed(1)} / 10</p>
        <p className="details-genres">{movie.genres?.map((genre) => genre.name).join(' · ')}</p>
        <button
          className="favorite-action"
          type="button"
          onClick={() => toggleFavorite(movie)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥ Remove from favorites' : '♡ Add to favorites'}
        </button>
        <h2>Overview</h2>
        <p className="details-overview">{movie.overview || 'No overview is available for this movie.'}</p>
      </div>
    </article>
  );
}