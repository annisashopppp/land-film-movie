import React, { useState } from 'react';
import { Movie } from '../utils/streamingLogic';
import { Play, Heart, Star, Sparkles, ExternalLink, Info } from 'lucide-react';
import { DIRECT_LINK } from '../data/moviesData';

interface HeroSectionProps {
  movie: Movie;
  onPlayMovie: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movieId: string) => void;
  darkMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  movie,
  onPlayMovie,
  isFavorite,
  onToggleFavorite,
  darkMode = true,
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'director' | 'reviews'>('story');

  const handleWatchClick = () => {
    // Dual function as required
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onPlayMovie(movie);
  };

  return (
    <section className="relative w-full min-h-[460px] md:min-h-[520px] rounded-2xl overflow-hidden flex flex-col justify-end p-6 md:p-12 mb-8 select-none">
      {/* Background Poster / Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdrop || '/assets/aistudio/original-4bc427960ed2e1b849ef14cae71c454a_90e92c24.webp'}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0e] via-[#0b0b0e]/80 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-[#0b0b0e]/80" />
      </div>

      {/* Hero Content Overlays */}
      <div className="relative z-10 max-w-2xl space-y-4">
        {/* Optional 2026 / Featured Tag */}
        {movie.is2026 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Upcoming Blockbuster</span>
          </div>
        )}

        {/* Movie Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          {movie.title}
        </h1>

        {/* Subtitle / Metadata (e.g. 2017, 4 seasons, 31 episodes) */}
        <p className="text-sm md:text-base font-medium text-slate-300 flex items-center gap-2">
          <span>{movie.year}</span>
          <span className="text-slate-500">·</span>
          <span>{movie.seasonInfo || 'Featured Film'}</span>
          <span className="text-slate-500">·</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="tabular-nums font-semibold">{movie.rating.toFixed(1)}</span>
          </span>
        </p>

        {/* Hero Tabs matching the photo: The Story, Director, Reviews (147) */}
        <div className="flex items-center gap-6 pt-2 border-b border-white/10 pb-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('story')}
            className={`transition-colors relative pb-1 ${
              activeTab === 'story'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            The Story
            {activeTab === 'story' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('director')}
            className={`transition-colors relative pb-1 ${
              activeTab === 'director'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Director
            {activeTab === 'director' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`transition-colors relative pb-1 ${
              activeTab === 'reviews'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reviews ({movie.reviewsCount})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
        </div>

        {/* Tab Description Paragraph */}
        <div className="min-h-[56px] text-sm md:text-[15px] leading-relaxed text-slate-300">
          {activeTab === 'story' && (
            <p className="animate-in fade-in duration-200">{movie.synopsis}</p>
          )}
          {activeTab === 'director' && (
            <p className="animate-in fade-in duration-200">
              <span className="font-semibold text-white">{movie.director}</span> (Creator & Director). Starring{' '}
              {movie.cast.join(', ')}. Produced by top-tier European & Hollywood studios.
            </p>
          )}
          {activeTab === 'reviews' && (
            <p className="animate-in fade-in duration-200">
              Rated <span className="text-amber-400 font-bold">{movie.rating.toFixed(1)} / 5.0</span> based on{' '}
              {movie.reviewsCount} international critics. Acclaimed for visionary pacing, high-stakes character arcs, and iconic cinematographic direction.
            </p>
          )}
        </div>

        {/* Buttons: Red "Continue watching" pill + Heart button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleWatchClick}
            className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-red-600/30 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
            <span>Continue watching</span>
          </button>

          <button
            onClick={() => onToggleFavorite(movie.id)}
            aria-label="Add to watchlist"
            className={`p-3 rounded-full backdrop-blur-md border transition-all ${
              isFavorite
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-red-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleWatchClick}
            className="hidden sm:flex items-center gap-1.5 px-4 py-3 rounded-full bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold backdrop-blur-md transition-all"
          >
            <Info className="w-4 h-4" />
            <span>Trailer & Details</span>
          </button>
        </div>
      </div>
    </section>
  );
};
