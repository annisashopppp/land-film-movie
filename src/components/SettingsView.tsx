import React, { useState } from 'react';
import { Settings, Sliders, Shield, Monitor, Volume2, Globe, Save } from 'lucide-react';

interface SettingsViewProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onShowToast: (msg: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  darkMode,
  onToggleDarkMode,
  onShowToast,
}) => {
  const [quality, setQuality] = useState('4K Ultra HD (2160p)');
  const [audioTrack, setAudioTrack] = useState('English [Original] 5.1');
  const [subtitles, setSubtitles] = useState('English [CC]');
  const [autoplay, setAutoplay] = useState(true);

  const handleSave = () => {
    onShowToast('Streaming preferences updated successfully!');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-slate-800/60 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-red-500" />
          <span>Playback & Account Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize video bitrate, default audio, subtitle languages, and interface theme.
        </p>
      </div>

      <div className="space-y-4 text-xs">
        {/* Visual Theme */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Monitor className="w-4 h-4 text-red-500" />
              <div>
                <p className="font-bold text-sm text-slate-200">Theme Appearance</p>
                <p className="text-slate-400">Toggle between Dark Cinema mode and Light mode</p>
              </div>
            </div>
            <button
              onClick={onToggleDarkMode}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {darkMode ? 'Night Mode Active' : 'Light Mode Active'}
            </button>
          </div>
        </div>

        {/* Video Quality */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-red-500" />
              <div>
                <p className="font-bold text-sm text-slate-200">Default Stream Quality</p>
                <p className="text-slate-400">Automatic bandwidth adaptation with HDR10+ support</p>
              </div>
            </div>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className={`p-2 rounded-lg border text-xs ${darkMode ? 'bg-black border-slate-700 text-white' : 'bg-slate-100 border-slate-300'}`}
            >
              <option>4K Ultra HD (2160p)</option>
              <option>Full HD (1080p)</option>
              <option>HD (720p)</option>
              <option>Auto (Data Saver)</option>
            </select>
          </div>
        </div>

        {/* Audio Language */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-red-500" />
              <div>
                <p className="font-bold text-sm text-slate-200">Default Audio Track</p>
                <p className="text-slate-400">Spatial Audio and Dolby Atmos surround format</p>
              </div>
            </div>
            <select
              value={audioTrack}
              onChange={(e) => setAudioTrack(e.target.value)}
              className={`p-2 rounded-lg border text-xs ${darkMode ? 'bg-black border-slate-700 text-white' : 'bg-slate-100 border-slate-300'}`}
            >
              <option>English [Original] 5.1</option>
              <option>Spanish [Español Latino]</option>
              <option>Indonesian [Bahasa Indonesia]</option>
              <option>Japanese [Original Dub]</option>
            </select>
          </div>
        </div>

        {/* Subtitles */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-red-500" />
              <div>
                <p className="font-bold text-sm text-slate-200">Closed Captions & Subtitles</p>
                <p className="text-slate-400">High-contrast accessibility subtitles</p>
              </div>
            </div>
            <select
              value={subtitles}
              onChange={(e) => setSubtitles(e.target.value)}
              className={`p-2 rounded-lg border text-xs ${darkMode ? 'bg-black border-slate-700 text-white' : 'bg-slate-100 border-slate-300'}`}
            >
              <option>English [CC]</option>
              <option>Indonesian (Bahasa)</option>
              <option>Spanish (Español)</option>
              <option>Off</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};
