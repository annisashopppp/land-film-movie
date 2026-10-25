import React, { useState } from 'react';
import { FRIENDS_ACTIVITY, DIRECT_LINK } from '../data/moviesData';
import { Users, Tv, MessageSquare, Play, Heart, UserPlus } from 'lucide-react';

interface FriendsViewProps {
  onShowToast: (msg: string) => void;
  darkMode?: boolean;
}

export const FriendsView: React.FC<FriendsViewProps> = ({ onShowToast, darkMode = true }) => {
  const [friendsList, setFriendsList] = useState(FRIENDS_ACTIVITY);
  const [friendNameInput, setFriendNameInput] = useState('');

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendNameInput.trim()) return;
    const newFriend = {
      name: friendNameInput.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      action: 'just joined your circle',
      movie: 'Love Movier Cinema',
      time: 'Just now',
    };
    setFriendsList([newFriend, ...friendsList]);
    setFriendNameInput('');
    onShowToast(`Friend "${newFriend.name}" added to your streaming circle!`);
  };

  const handleJoinFriend = (friendName: string, movie: string) => {
    window.open(DIRECT_LINK, '_blank', 'noopener,noreferrer');
    onShowToast(`Joining ${friendName}'s synchronized stream for "${movie}"!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            <span>Friends & Social Activity</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            See what your friends are watching, review discussions, and hop into live synced viewing sessions.
          </p>
        </div>
      </div>

      {/* Add Friend bar */}
      <form onSubmit={handleAddFriend} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Invite friend by username..."
          value={friendNameInput}
          onChange={(e) => setFriendNameInput(e.target.value)}
          className={`flex-1 px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 ${
            darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Activity Feed */}
      <div className="space-y-3">
        {friendsList.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
              darkMode ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60' : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  <span className="text-white font-bold">{item.name}</span>{' '}
                  <span className="text-slate-400 font-normal">{item.action}</span>{' '}
                  <span className="text-red-400 font-semibold">{item.movie}</span>
                </p>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleJoinFriend(item.name, item.movie)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-semibold transition-all"
              >
                <Tv className="w-3 h-3" />
                <span>Watch Along</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
