# Movie Explorer: Fetching Movies

This beginner version requests trending movies, searches TMDB after you pause typing, saves favorites in local storage, displays results with one reusable movie card, and opens a details page when a card is selected.

## Run It

Install packages, put your TMDB API key in the project-root `.env.local` file, then start Vite:

```sh
npm install
npm run dev
```

Your `.env.local` should contain:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Restart Vite after changing the key. Browser-based apps expose `VITE_` values to the browser, so use a TMDB client API key, not a private credential. The `.env.local` file is ignored by Git.

## Follow the Data

1. `src/services/tmdb.js` sends the request and returns TMDB's response.
2. `src/pages/Home.jsx` calls the service when the page loads and saves the returned movie array in React state.
3. `src/pages/Search.jsx` holds the search input and renders matching movies.
4. `src/hooks/useDebounce.js` waits 400 ms after typing stops before changing the value used for searching.
5. `src/components/MovieCard.jsx` displays each movie and links it to `/movie/:id`.
6. `src/pages/MovieDetails.jsx` reads the ID from the route and asks `src/services/tmdb.js` for that movie's details.
7. `src/context/FavoritesContext.jsx` shares favorites between pages and saves them in the browser's local storage.

The `loading` and `error` states control what the pages display while a request is in progress or if it fails. React Router connects the URL to the correct page component.
