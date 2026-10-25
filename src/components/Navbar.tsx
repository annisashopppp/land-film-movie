import React, { useState, useEffect } from 'react';
import { Film, Search, Bell, Sun, Moon, CheckCircle, Clock } from 'lucide-react';

interface NavbarProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  unreadNotifications: number;
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  onSelectNav,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
  unreadNotifications,
  onShowToast,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format time e.g. 12:30 PM
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      // Format date e.g. 17th June 2026
      const day = now.getDate();
      const month = now.toLocaleDateString('en-US', { month: 'short' });
      const year = 2026; // Highlight 2026 as in design
      setCurrentTime(timeStr);
      setCurrentDate(`${day}th ${month} ${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors border-b backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between gap-4 ${
        darkMode
          ? 'bg-[#0b0b0e]/90 border-slate-800/80 text-white'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* Brand Logo matching photo: LOVE MOVIER */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onSelectNav('home')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:bg-red-500 transition-colors">
            <Film className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span
              className={`text-lg font-black tracking-wider leading-none font-['Outfit',sans-serif] ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              LOVE <span className="text-red-600">MOVIER</span>
            </span>
          </div>
        </button>

        {/* Center Navigation: Movies, TV Shows, My List */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectNav('movies')}
            className={`transition-colors relative py-1 ${
              activeNav === 'movies'
                ? 'text-red-500 font-semibold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Movies
            {activeNav === 'movies' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectNav('tv')}
            className={`transition-colors relative py-1 ${
              activeNav === 'tv'
                ? 'text-red-500 font-semibold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TV Shows
            {activeNav === 'tv' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectNav('watchlist')}
            className={`transition-colors relative py-1 ${
              activeNav === 'watchlist'
                ? 'text-red-500 font-semibold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My List
            {activeNav === 'watchlist' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
            )}
          </button>
        </nav>
      </div>

      {/* Right Controls: Real-time clock, Live Search, Night/Light Mode, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Real-time Clock display matching photo: "12:30 PM, 17th June 2026" */}
        <div className="hidden lg:flex flex-col text-right pr-2 border-r border-slate-700/50">
          <span
            className={`text-xs font-bold tracking-wide font-mono tabular-nums ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {currentTime || '12:30 PM'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {currentDate || '17th June 2026'}
          </span>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search movie, director, actor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-36 sm:w-56 md:w-64 pl-9 pr-3 py-1.5 text-xs rounded-full border transition-all focus:w-72 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              darkMode
                ? 'bg-slate-900/90 border-slate-700/80 text-white placeholder-slate-500 focus:bg-slate-900'
                : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
            }`}
          />
        </div>

        {/* Night / Light Mode Toggle Button */}
        <button
          onClick={onToggleDarkMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
            darkMode
              ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? (
            <>
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Night</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            aria-label="Notifications"
            className={`p-2 rounded-full border transition-colors relative ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-black'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotificationMenu && (
            <div
              className={`absolute right-0 mt-2 w-72 rounded-xl shadow-2xl border p-3 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                darkMode
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/50">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[10px] text-red-500 font-semibold cursor-pointer" onClick={() => onShowToast('All notifications marked as read')}>
                  Clear all
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div
                  onClick={() => {
                    onShowToast('Premiering Dune: Messiah 2026!');
                    setShowNotificationMenu(false);
                  }}
                  className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 cursor-pointer hover:bg-red-500/20 transition-colors"
                >
                  <p className="font-semibold text-red-400">🔥 New 2026 Release Ready!</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dune: Part Three Official Trailer is now live in 4K HDR.</p>
                </div>
                <div
                  onClick={() => {
                    onShowToast('Your friend Marcus started a Watch Party');
                    setShowNotificationMenu(false);
                  }}
                  className="p-2 rounded-lg hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <p className="font-semibold">Friends Stream Invite</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Marcus invited you to join Money Heist Season Finale Party.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <button
          onClick={() => onSelectNav('setting')}
          className="relative focus:outline-none"
          title="Account Settings"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-red-500/50 hover:ring-red-500 transition-all"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
};
