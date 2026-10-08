import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { getMovieDetails } from '../services/tmdb';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const currentMovie = movie?.id === Number(id) ? movie : null;

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
      {currentMovie && <MovieInfo movie={currentMovie} />}
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