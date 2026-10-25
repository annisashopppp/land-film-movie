import React from 'react';
import {
  Home,
  Bookmark,
  Calendar,
  Compass,
  Users,
  Tv,
  Film,
  Settings,
  Flame,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export type SidebarMenuId =
  | 'home'
  | 'watchlist'
  | 'coming_soon'
  | 'discovery'
  | 'friends'
  | 'parties'
  | 'media'
  | 'setting';

interface SidebarProps {
  activeMenu: SidebarMenuId;
  onSelectMenu: (menu: SidebarMenuId) => void;
  watchlistCount: number;
  darkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  onSelectMenu,
  watchlistCount,
  darkMode = true,
}) => {
  const menuItems = [
    { id: 'home' as SidebarMenuId, label: 'Home', icon: Home },
    {
      id: 'watchlist' as SidebarMenuId,
      label: 'Watch List',
      icon: Bookmark,
      badge: watchlistCount > 0 ? watchlistCount : undefined,
    },
    { id: 'coming_soon' as SidebarMenuId, label: 'Coming Soon', icon: Calendar, badge: '2026' },
    { id: 'discovery' as SidebarMenuId, label: 'Discovery', icon: Compass },
    { id: 'friends' as SidebarMenuId, label: 'Friends', icon: Users },
    { id: 'parties' as SidebarMenuId, label: 'Parties', icon: Tv, badge: 'Live' },
    { id: 'media' as SidebarMenuId, label: 'Media', icon: Film },
    { id: 'setting' as SidebarMenuId, label: 'Setting', icon: Settings },
  ];

  return (
    <aside
      className={`w-60 shrink-0 border-r min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between transition-colors hidden md:flex ${
        darkMode ? 'bg-[#0d0e12] border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}
    >
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 px-3 mb-2 block">
            Navigation Menu
          </span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectMenu(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : darkMode
                      ? 'hover:bg-slate-800/60 hover:text-white text-slate-400'
                      : 'hover:bg-slate-200/60 hover:text-slate-900 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-red-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-red-600'
                          : item.badge === 'Live'
                          ? 'bg-red-500/20 text-red-400 animate-pulse'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Highlights Badge */}
        <div
          className={`p-3 rounded-xl border ${
            darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-red-400">
            <Flame className="w-3.5 h-3.5" />
            <span>2026 Movie Season</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Stream exclusive 4K HDR trailers & premier releases directly on Love Movier.
          </p>
        </div>
      </div>

      {/* Backlink & Attribution Section (as required in prompt) */}
      <div className="pt-4 border-t border-slate-800/60 space-y-2">
        <div className="text-[11px] text-slate-500 flex flex-col gap-1 px-1">
          <span className="font-medium text-slate-400">Partner & Support:</span>
          <a
            href="https://www.aannisaputriiiiy.store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center justify-between"
          >
            <span>aannisaputriiiiystore</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span className="text-[10px] text-slate-500">20Backlink_Gratis Certified</span>
        </div>
      </div>
    </aside>
  );
};
