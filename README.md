# CineScope — Movie & Web-Series Discovery

**A collaborative React frontend project by Krish, Agastya, Hardik and Nehal.**

CineScope helps users discover a curated collection of movies and web series, explore title information, search and filter the catalogue, and save favourites to a personal watchlist.

## Project highlights
- Curated catalogue of 12 requested titles: Game of Thrones, Money Heist, Incantation, Stranger Things, KGF: Chapter 2, Ramayana (2026), True Detective, Jawan, Ek Tha Tiger, Breaking Bad, Peaky Blinders and The Conjuring.
- Search titles by name with a debounce delay.
- Filter by Movies / Web series and genre.
- Sort by popularity, rating or release year.
- Individual detail pages with synopsis, cast, runtime, trailer and poster-reference credit.
- Add or remove titles from a watchlist; saved locally in the browser.
- Infinite scroll, responsive layouts and URL-based search/filter state.
- Team showcase section and project highlights on the home page.

## Team
The following is the proposed work split displayed in the project. Adjust it to match the actual work completed by each member before submission.

| Member | Suggested responsibility |
|---|---|
| Krish | Project planning and research |
| Agastya | UI design and frontend layout |
| Hardik | React components and functionality |
| Nehal | Testing, content and documentation |

## Technology used
- React 18
- Vite
- React Router
- Context API
- JavaScript (ES6+)
- CSS3
- Lucide React icons
- Browser localStorage

## Run the project
1. Extract the ZIP file.
2. Open the `CineScope_Movie_Discovery` folder in VS Code.
3. Open Terminal in that folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown in the terminal (usually `http://localhost:5173/`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
CineScope_Movie_Discovery/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── data/titles.js
    ├── hooks/
    │   ├── useDebounce.js
    │   └── useInfiniteScroll.js
    ├── state/WatchlistContext.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── PosterImage.jsx
    │   ├── MovieCard.jsx
    │   └── TitleGrid.jsx
    └── pages/
        ├── Home.jsx
        ├── Detail.jsx
        └── Watchlist.jsx
```

## Poster and artwork credits
Poster artwork is third-party copyrighted material and remains the property of its respective studios / rights holders. This student project links to external poster reference pages for attribution and verification. Image availability depends on the source site and internet access. Where a direct image cannot be reliably loaded, CineScope displays a designed poster-style fallback instead of a broken image.

The catalogue includes poster reference links from a mix of sources such as IMP Awards, IMDb, CineMaterial, Fandango and Posterica. The poster reference for Ramayana (2026) is also included. Please retain these credits and use official/licensed artwork if the project is published publicly.

## Notes for presentation
- This is a frontend-focused project; it does not require an API key or backend server.
- Watchlist data is stored in browser localStorage.
- Trailer links require an internet connection.
- Ratings are catalogue display values, not live ratings.
- Ramayana is shown as a 2026 release entry; its catalogue details can be updated as official information changes.

## Suggested viva explanation
**Problem statement:** Movie and series viewers often browse multiple platforms to decide what to watch. CineScope provides one simple interface to explore a selected catalogue and keep a personal list of titles.

**How it works:** React renders the catalogue from a JavaScript data file. Search, genre and type filters narrow the list. React Router opens a separate details page for each title. Context API shares watchlist state between pages, and localStorage keeps saved titles after refreshing the browser.

**Future scope:** Connect a movie database API, add user login, store watchlists in a cloud database, and provide personalised recommendations.


## Poster loading
The four previously missing posters now use alternate image hosts and the PosterImage component automatically tries backup URLs if the primary host fails. The other eight poster entries are retained. For fully offline/reliable display, save poster files under `public/posters/` and change each `poster` value in `src/data/titles.js` to `/posters/filename.jpg`. External poster hosts may still restrict hotlinking.
