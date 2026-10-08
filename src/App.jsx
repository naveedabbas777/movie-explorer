import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('movie-explorer-theme') || 'light');

  useEffect(() => {
    localStorage.setItem('movie-explorer-theme', theme);
  }, [theme]);

  function handleSearch(event) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get('query') || '').trim();
    if (query) navigate(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="site-header">
        <Link className="site-brand" to="/">Movie Explorer</Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/">Trending</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        {location.pathname !== '/search' && (
          <form className="global-search" role="search" onSubmit={handleSearch}>
            <label className="visually-hidden" htmlFor="global-movie-search">Search movies</label>
            <input id="global-movie-search" name="query" type="search" placeholder="Search movies..." />
            <button type="submit">Search</button>
          </form>
        )}
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <main className="app not-found">
      <p className="page-kicker">404</p>
      <h1>Page not found</h1>
      <p className="message">That address doesn't lead to a movie page.</p>
      <Link className="search-link" to="/">Back to trending movies</Link>
    </main>
  );
}