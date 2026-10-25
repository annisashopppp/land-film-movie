import React, { useState } from 'react';
import { WATCH_PARTIES, DIRECT_LINK } from '../data/moviesData';
import { Tv, Users, MessageCircle, Play, Send, Radio } from 'lucide-react';

interface PartiesViewProps {
  onShowToast: (msg: string) => void;
  darkMode?: boolean;
}

export const PartiesView: React.FC<PartiesViewProps> = ({ onShowToast, darkMode = true }) => {
  const [activePartyId, setActivePartyId] = useState<string | null>('party-1');
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Tokyo: The police are surrounding the building!',
    'Professor: Stay calm, plan Paris is now in motion.',
    'Berlin: Bella Ciao, my friends!',
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, `You: ${chatInput.trim()}`]);
    setChatInput('');
  };

  const handleEnterRoom = (title: string) => {
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onShowToast(`Connected to synchronized watch party: "${title}"`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            <span>Live Watch Parties</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Synchronized cinema rooms with real-time viewer chat, voice audio reactions, and synchronized playback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parties list */}
        <div className="lg:col-span-2 space-y-3">
          {WATCH_PARTIES.map((party) => (
            <div
              key={party.id}
              className={`p-4 rounded-xl border transition-all ${
                activePartyId === party.id
                  ? 'border-red-500 bg-red-950/20'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      {party.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Users className="w-3 h-3 text-red-400" />
                      {party.viewers.toLocaleString()} watching
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{party.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Streaming: <strong className="text-slate-300">{party.movie}</strong> · Hosted by {party.host}</p>
                </div>

                <button
                  onClick={() => handleEnterRoom(party.title)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-red-600/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Join Room</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Party Chat simulation */}
        <div
          className={`p-4 rounded-xl border flex flex-col h-[380px] ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-red-400">
              <MessageCircle className="w-3.5 h-3.5" />
              Live Room Chat
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">1.4k online</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                <p className="text-slate-200">{msg}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="pt-3 flex gap-2">
            <input
              type="text"
              placeholder="React to this scene..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className={`flex-1 px-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-red-500 ${
                darkMode ? 'bg-black/50 border-slate-700 text-white' : 'bg-slate-100 border-slate-300'
              }`}
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
