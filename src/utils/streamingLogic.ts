export interface Movie {
  id: string;
  title: string;
  year: number | string;
  seasonInfo?: string;
  rating: number;
  reviewsCount: number;
  synopsis: string;
  director: string;
  cast: string[];
  genres: string[];
  backdrop: string;
  poster: string;
  trailerYoutubeId: string;
  is2026?: boolean;
  featured?: boolean;
}

export function filterMovies(
  movies: Movie[],
  query: string,
  categoryFilter?: string,
  genreFilter?: string
): Movie[] {
  const q = query.trim().toLowerCase();
  return movies.filter((m) => {
    const matchesQuery =
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q)) ||
      m.cast.some((c) => c.toLowerCase().includes(q));

    const matchesCategory =
      !categoryFilter ||
      categoryFilter === 'all' ||
      (categoryFilter === '2026' && (m.is2026 || String(m.year).includes('2026'))) ||
      (categoryFilter === 'movies' && (!m.seasonInfo || m.seasonInfo.includes('min') || m.seasonInfo.includes('h'))) ||
      (categoryFilter === 'tv' && m.seasonInfo && m.seasonInfo.includes('season'));

    const matchesGenre =
      !genreFilter || genreFilter === 'all' || m.genres.includes(genreFilter);

    return matchesQuery && matchesCategory && matchesGenre;
  });
}

export function toggleWatchlist(currentWatchlist: string[], movieId: string): {
  newList: string[];
  isAdded: boolean;
} {
  const exists = currentWatchlist.includes(movieId);
  if (exists) {
    return {
      newList: currentWatchlist.filter((id) => id !== movieId),
      isAdded: false,
    };
  } else {
    return {
      newList: [...currentWatchlist, movieId],
      isAdded: true,
    };
  }
}

export function formatReviewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
}
