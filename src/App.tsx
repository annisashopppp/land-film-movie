import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, SidebarMenuId } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { HeroSection } from './components/HeroSection';
import { MovieCard } from './components/MovieCard';
import { VideoModal } from './components/VideoModal';
import { AdBannerHorizontal } from './components/AdBannerHorizontal';
import { Toast } from './components/Toast';
import { WatchListView } from './components/WatchListView';
import { ComingSoonView } from './components/ComingSoonView';
import { DiscoveryView } from './components/DiscoveryView';
import { FriendsView } from './components/FriendsView';
import { PartiesView } from './components/PartiesView';
import { MediaView } from './components/MediaView';
import { SettingsView } from './components/SettingsView';
import { MOVIES_DATABASE, DIRECT_LINK } from './data/moviesData';
import { Movie, filterMovies, toggleWatchlist } from './utils/streamingLogic';
import { ChevronRight, Sparkles, Film, ArrowRight, ExternalLink } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeMenu, setActiveMenu] = useState<SidebarMenuId>('home');
  const [activeNavCategory, setActiveNavCategory] = useState<'all' | 'movies' | 'tv' | 'watchlist'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Movie & Watchlist State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [heroMovie, setHeroMovie] = useState<Movie>(MOVIES_DATABASE[0]); // Money Heist
  const [watchlist, setWatchlist] = useState<string[]>(['money-heist', 'love-death-robots']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAllInCarousel, setShowAllInCarousel] = useState<boolean>(false);
  const [activeSubFilter, setActiveSubFilter] = useState<'all' | 'new_release' | '2026'>('all');

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Toggle watchlist
  const handleToggleFavorite = (movieId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const { newList, isAdded } = toggleWatchlist(watchlist, movieId);
    setWatchlist(newList);
    const movie = MOVIES_DATABASE.find((m) => m.id === movieId);
    const title = movie ? movie.title : 'Movie';
    showToast(isAdded ? `Added "${title}" to your Watch List` : `Removed "${title}" from Watch List`);
  };

  // Movie selection (dual action: opens modal + triggers direct link in new tab)
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Filtered movies according to search query and sub-filters
  const filteredMovies = useMemo(() => {
    let result = filterMovies(
      MOVIES_DATABASE,
      searchQuery,
      activeNavCategory === 'watchlist' ? undefined : activeNavCategory
    );

    if (activeSubFilter === 'new_release') {
      result = result.filter((m) => m.year === '2021' || m.year === '2020' || m.is2026);
    } else if (activeSubFilter === '2026') {
      result = result.filter((m) => m.is2026 || String(m.year).includes('2026'));
    }

    return result;
  }, [searchQuery, activeNavCategory, activeSubFilter]);

  // Navbar category click
  const handleSelectNavCategory = (cat: string) => {
    if (cat === 'watchlist') {
      setActiveMenu('watchlist');
    } else if (cat === 'movies') {
      setActiveMenu('home');
      setActiveNavCategory('movies');
      showToast('Showing Movies catalog');
    } else if (cat === 'tv') {
      setActiveMenu('home');
      setActiveNavCategory('tv');
      showToast('Showing TV Shows catalog');
    } else {
      setActiveMenu('home');
      setActiveNavCategory('all');
    }
  };

  // View more toggle in carousel
  const handleViewMore = () => {
    setShowAllInCarousel(!showAllInCarousel);
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    showToast(showAllInCarousel ? 'Showing top recommended' : 'Expanded all available titles & 2026 releases!');
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-200 ${
        darkMode ? 'bg-[#0b0b0e] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* 1. TOP NAVBAR */}
      <Navbar
        activeNav={activeNavCategory}
        onSelectNav={handleSelectNavCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        unreadNotifications={2}
        onShowToast={showToast}
      />

      {/* 2. MAIN LAYOUT WITH 3-COLUMN FLEX: LEFT SIDEBAR + MAIN CONTENT + RIGHT SIDEBAR */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        {/* Left Sidebar Menu */}
        <Sidebar
          activeMenu={activeMenu}
          onSelectMenu={(menu) => {
            setActiveMenu(menu);
            if (menu === 'home') {
              setActiveNavCategory('all');
            }
          }}
          watchlistCount={watchlist.length}
          darkMode={darkMode}
        />

        {/* Dynamic Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-full">
          {/* HOME VIEW (Matches the attached photo) */}
          {activeMenu === 'home' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Hero Banner: Money Heist */}
              <HeroSection
                movie={heroMovie}
                onPlayMovie={handleSelectMovie}
                isFavorite={watchlist.includes(heroMovie.id)}
                onToggleFavorite={handleToggleFavorite}
                darkMode={darkMode}
              />

              {/* Section Header: "You May Interested" */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3
                      className={`text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2 ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      <span>You May Interested</span>
                    </h3>
                  </div>

                  {/* Filter tabs & View More */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center gap-1 p-1 rounded-lg text-xs ${
                        darkMode ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-200/80'
                      }`}
                    >
                      <button
                        onClick={() => setActiveSubFilter('all')}
                        className={`px-3 py-1 rounded-md font-medium transition-colors ${
                          activeSubFilter === 'all'
                            ? 'bg-red-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setActiveSubFilter('new_release')}
                        className={`px-3 py-1 rounded-md font-medium transition-colors ${
                          activeSubFilter === 'new_release'
                            ? 'bg-red-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        New Release
                      </button>
                      <button
                        onClick={() => setActiveSubFilter('2026')}
                        className={`px-3 py-1 rounded-md font-medium transition-colors ${
                          activeSubFilter === '2026'
                            ? 'bg-red-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        2026 Lineup
                      </button>
                    </div>

                    <button
                      onClick={handleViewMore}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <span>{showAllInCarousel ? 'Show Less' : 'View More'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Cards row matching the photo cards exactly:
                    1. The Queen's Gambit
                    2. Love, Death & Robots (featured with active red outline)
                    3. Lucifer
                    4. Black Widow
                    5. Snowpiercer
                    + 2026 Upcoming Covers
                */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {(showAllInCarousel ? filteredMovies : filteredMovies.slice(0, 5)).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isActive={movie.id === 'love-death-robots'} // Highlights active red border from screenshot
                      onSelectMovie={(m) => {
                        setHeroMovie(m);
                        handleSelectMovie(m);
                      }}
                      isFavorite={watchlist.includes(movie.id)}
                      onToggleFavorite={handleToggleFavorite}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>

              {/* 2. BANNER_HORIZONTAL PLACED PERSIS DI BAWAH SECTION NEW RELEASE */}
              <div className="pt-2">
                <AdBannerHorizontal darkMode={darkMode} />
              </div>

              {/* 2026 Featured Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <h3
                      className={`text-lg font-bold ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      2026 Upcoming Movie Premieres
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveMenu('coming_soon')}
                    className="text-xs font-semibold text-red-400 hover:underline flex items-center gap-1"
                  >
                    <span>View 2026 Schedule</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {MOVIES_DATABASE.filter((m) => m.is2026).slice(0, 4).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSelectMovie={(m) => {
                        setHeroMovie(m);
                        handleSelectMovie(m);
                      }}
                      isFavorite={watchlist.includes(movie.id)}
                      onToggleFavorite={handleToggleFavorite}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WATCH LIST VIEW */}
          {activeMenu === 'watchlist' && (
            <div className="animate-in fade-in duration-200">
              <WatchListView
                allMovies={MOVIES_DATABASE}
                watchlistIds={watchlist}
                onSelectMovie={handleSelectMovie}
                onToggleFavorite={handleToggleFavorite}
                onClearWatchlist={() => {
                  setWatchlist([]);
                  showToast('Watchlist cleared');
                }}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* COMING SOON VIEW (2026 Blockbusters) */}
          {activeMenu === 'coming_soon' && (
            <div className="animate-in fade-in duration-200">
              <ComingSoonView
                allMovies={MOVIES_DATABASE}
                onSelectMovie={handleSelectMovie}
                watchlistIds={watchlist}
                onToggleFavorite={handleToggleFavorite}
                onShowToast={showToast}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* DISCOVERY VIEW (Live API lookup & filters) */}
          {activeMenu === 'discovery' && (
            <div className="animate-in fade-in duration-200">
              <DiscoveryView
                allMovies={MOVIES_DATABASE}
                onSelectMovie={handleSelectMovie}
                watchlistIds={watchlist}
                onToggleFavorite={handleToggleFavorite}
                onShowToast={showToast}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* FRIENDS VIEW */}
          {activeMenu === 'friends' && (
            <div className="animate-in fade-in duration-200">
              <FriendsView onShowToast={showToast} darkMode={darkMode} />
            </div>
          )}

          {/* PARTIES VIEW */}
          {activeMenu === 'parties' && (
            <div className="animate-in fade-in duration-200">
              <PartiesView onShowToast={showToast} darkMode={darkMode} />
            </div>
          )}

          {/* MEDIA VIEW */}
          {activeMenu === 'media' && (
            <div className="animate-in fade-in duration-200">
              <MediaView
                allMovies={MOVIES_DATABASE}
                onSelectMovie={handleSelectMovie}
                darkMode={darkMode}
              />
            </div>
          )}

          {/* SETTING VIEW */}
          {activeMenu === 'setting' && (
            <div className="animate-in fade-in duration-200">
              <SettingsView
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
                onShowToast={showToast}
              />
            </div>
          )}

          {/* Clean Corporate Footer with Backlink */}
          <footer className="mt-16 pt-8 pb-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-slate-400">LOVE MOVIER Cinema Corporation © 2026</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://www.aannisaputriiiiy.store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold transition-colors flex items-center gap-1"
              >
                <span>aannisaputriiiiystore</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">20Backlink_Gratis</span>
              <span className="text-slate-600">·</span>
              <span>Ultra HD 4K HDR Streaming</span>
            </div>
          </footer>
        </main>

        {/* Right Sidebar: Popular Movies, BANNER_KOTAK (320x50), Favorites */}
        <RightSidebar
          onSelectMovieById={(movieId) => {
            const found = MOVIES_DATABASE.find((m) => m.id === movieId);
            if (found) {
              setHeroMovie(found);
              handleSelectMovie(found);
            }
          }}
          darkMode={darkMode}
        />
      </div>

      {/* 3. VIDEO PLAYER POPUP MODAL */}
      <VideoModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isFavorite={selectedMovie ? watchlist.includes(selectedMovie.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onShowToast={showToast}
        darkMode={darkMode}
      />

      {/* 4. TOAST NOTIFICATIONS */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
