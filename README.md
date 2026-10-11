# VidTube

A YouTube clone built with React 18, Material UI, React Router 6 and the YouTube Data API v3.
Browse trending videos by category, search, and watch videos with channel info, comments and related videos.

## Features

- **Trending feed** filtered by category, with the selection kept in the URL so it survives refresh and back navigation
- **Working search** backed by the YouTube search endpoint
- **Watch page** with embedded player, like/dislike, share (native share sheet or copy link), subscribe toggle, expandable description with clickable links, comments and related videos
- **Material UI** components throughout (AppBar, Drawer, Chip, Button, Skeleton, Avatar, Tooltip) styled by a custom theme in `src/theme`
- **Light and dark themes** that follow the system preference and can be toggled from the navbar; the choice is remembered
- **Responsive layout**: expanded or icon-rail sidebar on desktop, slide-in drawer on mobile and on the watch page
- **Skeleton loaders, error states and retry** for every network request; results from outdated requests are ignored when you navigate away
- **Material icons** from `@mui/icons-material`, no icon images to load
- Keyboard accessible: focus rings, `Escape` closes the drawer, buttons have labels

## Getting started

```bash
npm install
cp .env.example .env   # then paste your API key into .env
npm start
```

The app runs at <http://localhost:3000>.

### API key

1. Open the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a project, enable **YouTube Data API v3**, and create an API key.
3. Put it in `.env`:

   ```
   REACT_APP_YOUTUBE_API_KEY=your_key_here
   REACT_APP_REGION_CODE=US
   ```

`.env` is git-ignored. Restart `npm start` after changing it.

## Scripts

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm start`     | Dev server with hot reload           |
| `npm run build` | Production build in `build/`         |
| `npm test`      | Jest test runner                     |

## Project structure

```
src/
├── components/     # Reusable UI (Navbar, Sidebar, VideoCard, Comments, ui primitives…)
├── config/         # App constants and environment variables
├── constants/      # Category and subscription data
├── context/        # ThemeContext (light/dark)
├── hooks/          # useAsync, useMediaQuery, useLocalStorage, useDocumentTitle
├── layouts/        # MainLayout (navbar + sidebar + outlet)
├── pages/          # Home, Watch, Search, NotFound
├── services/       # YouTube API client
├── theme/          # MUI theme (palette, typography, component overrides) and sx helpers
└── utils/          # Formatting helpers
```

## Routes

| Path                          | Page                              |
| ----------------------------- | --------------------------------- |
| `/`                           | Trending feed (`?c=<categoryId>`) |
| `/watch/:videoId`             | Watch page                        |
| `/search?q=<query>`           | Search results                    |
| `/video/:categoryId/:videoId` | Legacy link, redirects to `/watch`|
