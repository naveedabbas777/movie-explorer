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
      const isAlreadyFavorite = currentFavorites.some((favorite) => {
        return favorite.id === movie.id;
      });

      if (isAlreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== movie.id);
      }

      return [...currentFavorites, movie];
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}