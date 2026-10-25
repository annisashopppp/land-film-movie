import React from 'react';
import { POPULAR_MOVIES_SIDEBAR, FAVORITES_SIDEBAR, DIRECT_LINK } from '../data/moviesData';
import { AdBannerKotak } from './AdBannerKotak';
import { Star, Eye, Play, TrendingUp, Sparkles } from 'lucide-react';
import { Movie } from '../utils/streamingLogic';

interface RightSidebarProps {
  onSelectMovieById: (movieId: string) => void;
  darkMode?: boolean;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onSelectMovieById,
  darkMode = true,
}) => {
  const handleItemClick = (movieId: string) => {
    // Dual action: opens direct link and selects movie
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onSelectMovieById(movieId);
  };

  return (
    <aside
      className={`w-72 shrink-0 border-l min-h-[calc(100vh-65px)] p-4 flex flex-col gap-5 transition-colors hidden xl:flex ${
        darkMode ? 'bg-[#0d0e12] border-slate-800/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}
    >
      {/* 1. POPULAR MOVIES SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-red-500" />
            <span>Popular Movies</span>
          </div>
          <span className="text-[10px] text-red-400 font-semibold cursor-pointer hover:underline">
            Top Hits
          </span>
        </div>

        <div className="space-y-2">
          {POPULAR_MOVIES_SIDEBAR.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all group ${
                darkMode ? 'hover:bg-slate-800/80' : 'hover:bg-white shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-slate-500 font-mono w-4">
                  0{idx + 1}
                </span>
                <div>
                  <h5 className="text-xs font-semibold group-hover:text-red-400 transition-colors line-clamp-1">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-slate-400">{item.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center text-[10px] text-amber-400 font-bold">
                  <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                  {item.rating}
                </span>
                <div className="w-5 h-5 rounded-full bg-red-600/20 group-hover:bg-red-600 text-red-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BANNER_KOTAK (320x50) PLACED PRECISELY BETWEEN POPULAR MOVIES & FAVORITES */}
      <div className="py-1">
        <AdBannerKotak darkMode={darkMode} />
      </div>

      {/* 3. FAVORITES SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Favorites</span>
          </div>
          <span className="text-[10px] text-slate-400">Global Likes</span>
        </div>

        <div className="space-y-2">
          {FAVORITES_SIDEBAR.map((fav) => (
            <div
              key={fav.id}
              onClick={() => handleItemClick(fav.id)}
              className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all group ${
                darkMode ? 'hover:bg-slate-800/80' : 'hover:bg-white shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <h5 className="text-xs font-semibold group-hover:text-red-400 transition-colors line-clamp-1">
                  {fav.title}
                </h5>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <Eye className="w-3 h-3 text-slate-500" />
                <span>{fav.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
