import { useContext } from 'react';
import FavoritesContext from '../context/favoritesStore';

export default function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}