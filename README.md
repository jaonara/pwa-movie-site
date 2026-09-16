# 🎬 MovieHub — PWA Movie Site

A Progressive Web App built with React and the TMDB API. Browse popular movies, search by title, and view full movie details — even offline.

## Features

- Browse popular movies from TMDB
- Search movies by title
- Click a movie to see full details (rating, runtime, genres, overview)
- Offline support via service worker + localStorage cache
- Installable as a PWA on mobile and desktop
- Lighthouse score: 100 Performance · 100 Accessibility · 100 Best Practices

## Tech Stack

- React (Vite)
- TMDB API
- PWA (vite-plugin-pwa, service worker, manifest)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/pwa-movie-site.git
cd pwa-movie-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your TMDB API key

- Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
- Sign up for a free account
- Go to **Settings → API → Create API Key**
- Copy your API key (v3 auth)

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then open `.env` and replace with your actual key:

```
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx              # Main component — holds all state
├── App.css              # App-wide styles
├── main.jsx             # Entry point, service worker registration
├── index.css            # Base/reset styles
├── components/
│   ├── Header.jsx       # App title and navigation
│   ├── SearchBar.jsx    # Search input and submit handler
│   ├── MovieList.jsx    # Maps movies array to MovieCard components
│   ├── MovieCard.jsx    # Displays poster, title, rating, year
│   └── MovieModal.jsx   # Full movie details modal
└── services/
    └── tmdb.js          # All TMDB API calls + offline cache logic
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_TMDB_API_KEY` | Your TMDB API v3 key |

## Notes

- Do **not** commit your `.env` file — it's listed in `.gitignore`
- Free TMDB tier: 40 requests/10 seconds, 1000/day