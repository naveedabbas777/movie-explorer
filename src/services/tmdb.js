const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_ROOT = 'https://api.themoviedb.org/3';

async function request(path, params = {}) {
  const url = new URL(`${API_ROOT}${path}`);
  url.search = new URLSearchParams({ api_key: API_KEY, ...params });
  const response = await fetch(url);
  return response.json();
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

export async function searchMovies(query) {
  const url = new URL(`${API_ROOT}/search/movie`);
  url.search = new URLSearchParams({
    api_key: API_KEY,
    query,
  });

  const response = await fetch(url);
  return response.json();
}
