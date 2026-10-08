const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_ROOT = 'https://api.themoviedb.org/3';

async function request(path, params = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env.local file, then restart the dev server.');
  }

  const url = new URL(`${API_ROOT}${path}`);
  url.search = new URLSearchParams({ api_key: API_KEY, ...params });
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error('Could not connect to TMDB. Please try again.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || 'TMDB could not complete this request.');
  }

  return data;
}

export function getTrendingMovies() {
  return request('/trending/movie/week');
}

export function getGenres() {
  return request('/genre/movie/list');
}

export function getMovieDetails(id) {
  return request(`/movie/${id}`);
}

export function searchMovies(query) {
  return request('/search/movie', { query, include_adult: 'false' });
}
