import React from 'react';
import { Movie } from '../utils/streamingLogic';
import { MovieCard } from './MovieCard';
import { Bookmark, Film, Trash2 } from 'lucide-react';

interface WatchListViewProps {
  allMovies: Movie[];
  watchlistIds: string[];
  onSelectMovie: (movie: Movie) => void;
  onToggleFavorite: (movieId: string, e: React.MouseEvent) => void;
  onClearWatchlist: () => void;
  darkMode?: boolean;
}

export const WatchListView: React.FC<WatchListViewProps> = ({
  allMovies,
  watchlistIds,
  onSelectMovie,
  onToggleFavorite,
  onClearWatchlist,
  darkMode = true,
}) => {
  const savedMovies = allMovies.filter((m) => watchlistIds.includes(m.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-red-500 fill-current" />
            <span>My Streaming Watch List</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {savedMovies.length} saved movies and TV series ready for your next session.
          </p>
        </div>

        {savedMovies.length > 0 && (
          <button
            onClick={onClearWatchlist}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {savedMovies.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400">
            <Film className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-base font-semibold">Your Watch List is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Click the heart icon or "+" button on any movie card to add it to your personal watchlist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {savedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelectMovie={onSelectMovie}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
