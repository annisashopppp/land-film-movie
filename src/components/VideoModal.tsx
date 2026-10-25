import React, { useState } from 'react';
import { Movie } from '../utils/streamingLogic';
import { DIRECT_LINK } from '../data/moviesData';
import { X, Play, Heart, Star, Share2, Volume2, VolumeX, Maximize2, ShieldCheck, Film, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  movie: Movie | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (movieId: string) => void;
  onShowToast: (msg: string) => void;
  darkMode?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  movie,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast,
  darkMode = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'trailer' | 'details' | 'episodes'>('trailer');

  if (!movie) return null;

  const handleWatchFullStream = () => {
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onShowToast(`Opening VIP 4K Stream for "${movie.title}"`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast(`Link to "${movie.title}" copied to clipboard!`);
    } else {
      onShowToast(`Sharing "${movie.title}"`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all ${
          darkMode ? 'bg-[#0f1015] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Control Bar with Close */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(movie.id)}
            aria-label="Add to favorites"
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
              isFavorite
                ? 'bg-red-600/90 text-white border-red-500 shadow-lg shadow-red-500/30'
                : 'bg-black/60 text-slate-200 border-white/20 hover:bg-black/80 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share movie"
            className="p-2.5 rounded-full bg-black/60 text-slate-200 border border-white/20 hover:bg-black/80 hover:text-white transition-all backdrop-blur-md"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {isPlaying && movie.trailerYoutubeId ? (
            <iframe
              className="w-full h-full border-none"
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&rel=0&modestbranding=1`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-base shadow-xl transition-all hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Resume Trailer</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick HUD Badge on Trailer */}
          <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-600/90 text-white text-[11px] font-bold tracking-wide uppercase backdrop-blur-sm">
              Official HD Trailer
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 text-slate-300 text-[11px] font-medium backdrop-blur-sm">
              4K HDR · 5.1 Audio
            </span>
          </div>

          <div className="absolute bottom-3 right-4 flex items-center gap-2 z-20">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Modal Info & Tabs Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-2xl font-bold tracking-tight">{movie.title}</h2>
                {movie.is2026 && (
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-bold uppercase tracking-wider">
                    2026 Premiere
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  {movie.rating.toFixed(1)}
                </span>
                <span>·</span>
                <span>{movie.year}</span>
                <span>·</span>
                <span>{movie.seasonInfo || '2h 15m'}</span>
                <span>·</span>
                <span>{movie.genres.join(', ')}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleWatchFullStream}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Full Movie (HD)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>
          </div>

          {/* Sub Navigation tabs */}
          <div className="flex items-center gap-6 border-b border-slate-700/40 pb-2 text-sm">
            <button
              onClick={() => setActiveTab('trailer')}
              className={`pb-2 font-medium transition-colors ${
                activeTab === 'trailer'
                  ? 'text-red-500 border-b-2 border-red-500 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              The Story
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 font-medium transition-colors ${
                activeTab === 'details'
                  ? 'text-red-500 border-b-2 border-red-500 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Director & Cast
            </button>
            <button
              onClick={() => setActiveTab('episodes')}
              className={`pb-2 font-medium transition-colors ${
                activeTab === 'episodes'
                  ? 'text-red-500 border-b-2 border-red-500 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Streaming Servers
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'trailer' && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-slate-300">
                {movie.synopsis}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    className={`text-xs px-2.5 py-1 rounded-md ${
                      darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">
                  Director / Creator
                </span>
                <p className="font-medium text-slate-200">{movie.director}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">
                  Leading Cast
                </span>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span
                      key={actor}
                      className={`text-xs px-2.5 py-1 rounded border ${
                        darkMode
                          ? 'bg-slate-900 border-slate-700 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'episodes' && (
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-semibold text-slate-100">Server 1 - 4K Dolby Atmos (High Speed)</p>
                    <p className="text-xs text-slate-400">Direct CDN Node · Zero Buffering</p>
                  </div>
                </div>
                <button
                  onClick={handleWatchFullStream}
                  className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                >
                  Connect
                </button>
              </div>

              <div className="p-3 rounded-lg border border-slate-700/60 bg-slate-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-semibold text-slate-200">Server 2 - 1080p Multilingual Dubs</p>
                    <p className="text-xs text-slate-400">English, Spanish, Indonesian, Japanese</p>
                  </div>
                </div>
                <button
                  onClick={handleWatchFullStream}
                  className="px-4 py-1.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold"
                >
                  Connect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
