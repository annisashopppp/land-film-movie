import React from 'react';
import { Film, Play, Sparkles, Video } from 'lucide-react';
import { DIRECT_LINK } from '../data/moviesData';
import { Movie } from '../utils/streamingLogic';

interface MediaViewProps {
  allMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  darkMode?: boolean;
}

export const MediaView: React.FC<MediaViewProps> = ({ allMovies, onSelectMovie, darkMode = true }) => {
  const handleWatchTrailer = (movie: Movie) => {
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onSelectMovie(movie);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/60 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Film className="w-6 h-6 text-red-500" />
          <span>Exclusive Media & Trailers Gallery</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Stream high-definition teasers, director commentaries, and behind-the-scenes footage in Dolby Vision.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {allMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleWatchTrailer(movie)}
            className={`group rounded-xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1 ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                </div>
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                HD Trailer
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                {movie.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{movie.director} · {movie.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
