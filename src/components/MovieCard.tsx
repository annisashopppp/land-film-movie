import React from 'react';
import { Movie } from '../utils/streamingLogic';
import { Play, Star, Plus, Check } from 'lucide-react';
import { DIRECT_LINK } from '../data/moviesData';

interface MovieCardProps {
  movie: Movie;
  isActive?: boolean;
  onSelectMovie: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movieId: string, e: React.MouseEvent) => void;
  darkMode?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isActive = false,
  onSelectMovie,
  isFavorite,
  onToggleFavorite,
  darkMode = true,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Dual function as specified in prompt rules
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onSelectMovie(movie);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl ${
        isActive ? 'ring-2 ring-red-600 shadow-lg shadow-red-900/40' : ''
      }`}
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* 2026 Badge if upcoming */}
        {movie.is2026 && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md">
              2026 New
            </span>
          </div>
        )}

        {/* Watchlist Quick Toggle Button */}
        <button
          onClick={(e) => onToggleFavorite(movie.id, e)}
          aria-label={isFavorite ? 'Remove from watchlist' : 'Add to watchlist'}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-red-600 text-white'
              : 'bg-black/60 text-slate-300 hover:bg-red-600 hover:text-white'
          }`}
        >
          {isFavorite ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </button>

        {/* Play Circle Icon */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:bg-red-600 group-hover:border-red-600 transition-colors shadow-md">
            <Play className="w-3.5 h-3.5 text-white fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
        )}
      </div>

      {/* Info Details Below Card */}
      <div className="pt-2 px-0.5 space-y-1">
        <h4
          className={`text-sm font-semibold truncate group-hover:text-red-500 transition-colors ${
            darkMode ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          {movie.title}
        </h4>

        {/* Stars Rating and Reviews count matching screenshot */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(movie.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-amber-400/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-400 tabular-nums">
            {movie.reviewsCount} reviews
          </span>
        </div>
      </div>
    </div>
  );
};
