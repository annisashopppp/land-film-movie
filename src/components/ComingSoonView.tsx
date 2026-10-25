import React from 'react';
import { Movie } from '../utils/streamingLogic';
import { MovieCard } from './MovieCard';
import { Sparkles, Calendar, Film, BellRing, Play } from 'lucide-react';
import { DIRECT_LINK } from '../data/moviesData';

interface ComingSoonViewProps {
  allMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  watchlistIds: string[];
  onToggleFavorite: (movieId: string, e: React.MouseEvent) => void;
  onShowToast: (msg: string) => void;
  darkMode?: boolean;
}

export const ComingSoonView: React.FC<ComingSoonViewProps> = ({
  allMovies,
  onSelectMovie,
  watchlistIds,
  onToggleFavorite,
  onShowToast,
  darkMode = true,
}) => {
  const movies2026 = allMovies.filter((m) => m.is2026 || String(m.year).includes('2026'));

  const handleRemindMe = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onShowToast(`Reminder set! You will be notified when "${title}" premieres in 2026.`);
  };

  return (
    <div className="space-y-8">
      {/* 2026 Season Banner */}
      <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-red-950/80 via-slate-900 to-black border border-red-900/40">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official 2026 Cinema Lineup</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Upcoming Blockbusters 2026
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Experience the next era of high-definition cinema with the most anticipated releases of 2026, including Dune: Messiah, Avatar 3, Beyond the Spider-Verse, and Avengers: Doomsday.
          </p>
        </div>
      </div>

      {/* Grid of 2026 Releases */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>2026 Premiere Calendar</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {movies2026.length} Major Titles
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies2026.map((movie) => (
            <div key={movie.id} className="flex flex-col">
              <MovieCard
                movie={movie}
                onSelectMovie={onSelectMovie}
                isFavorite={watchlistIds.includes(movie.id)}
                onToggleFavorite={onToggleFavorite}
                darkMode={darkMode}
              />
              <button
                onClick={(e) => handleRemindMe(movie.title, e)}
                className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-[11px] font-semibold transition-all"
              >
                <BellRing className="w-3 h-3" />
                <span>Pre-Register & Watch Teaser</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
