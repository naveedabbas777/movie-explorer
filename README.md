# Movie Explorer: Fetching Movies

This beginner-friendly app requests trending movies, searches TMDB as you type, saves favorites in local storage, displays results with one reusable movie card, and opens a details page when a card is selected.

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

## How the App Works

1. `src/main.jsx` starts React and displays the `App`.
2. `src/App.jsx` shows the navigation and chooses a page based on the URL.
3. A page calls a function from `src/services/tmdb.js` to get movie data.
4. The page stores that data with React `useState` and displays it.
5. `src/components/MovieCard.jsx` shows one movie. Pages reuse it to show lists of movies.
6. `src/context/FavoritesContext.jsx` shares favorites between pages and saves them in the browser's local storage.

## React Ideas to Practise

- **Components:** Each page and movie card is a reusable piece of the interface.
- **State:** `useState` remembers values such as the search text, movies, and favorites.
- **Effects:** `useEffect` loads information from TMDB when a page needs it.
- **Props:** A page gives a movie to `MovieCard` with `<MovieCard movie={movie} />`.
- **Routes:** React Router displays the page that matches the current URL.
- **Local storage:** Favorites and the selected theme remain saved in this browser.

Search runs when you type. The pages fetch data directly from TMDB without handling request errors. If a request fails or the API key is missing, the movie data will not load.
