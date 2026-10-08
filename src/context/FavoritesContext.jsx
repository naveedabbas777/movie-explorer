import { useEffect, useState } from 'react';
import FavoritesContext from './favoritesStore';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('movie-explorer-favorites') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('movie-explorer-favorites', JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some((favorite) => favorite.id === movie.id);

      return alreadySaved
        ? currentFavorites.filter((favorite) => favorite.id !== movie.id)
        : [...currentFavorites, movie];
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}