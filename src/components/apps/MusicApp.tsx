import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

const playlist = [
  { title: 'Lo-Fi Chill', artist: 'Chillhop', duration: '3:24' },
  { title: 'Midnight Jazz', artist: 'Jazz Vibes', duration: '4:12' },
  { title: 'Coding Focus', artist: 'Deep Work', duration: '5:30' },
  { title: 'Synthwave Dreams', artist: 'Retro Beats', duration: '3:45' },
  { title: 'Ambient Rain', artist: 'Nature Sounds', duration: '6:00' },
];

export const MusicApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(35);
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-ctp-surface0/50 to-ctp-crust">
      {/* Album Art */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
          className="w-40 h-40 rounded-full bg-gradient-to-br from-ctp-mauve via-ctp-pink to-ctp-teal shadow-2xl flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-ctp-crust" />
        </motion.div>
      </div>
      
      {/* Track Info */}
      <div className="px-6 text-center">
        <h2 className="text-lg font-semibold text-ctp-text">{playlist[currentTrack].title}</h2>
        <p className="text-ctp-subtext0 text-sm">{playlist[currentTrack].artist}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="h-1 bg-ctp-surface1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-ctp-mauve"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-ctp-subtext0 mt-1">
          <span>1:12</span>
          <span>{playlist[currentTrack].duration}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-center gap-6">
          <button className="text-ctp-subtext0 hover:text-ctp-text transition-colors">
            <Shuffle className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentTrack(prev => (prev - 1 + playlist.length) % playlist.length)}
            className="text-ctp-subtext0 hover:text-ctp-text transition-colors"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-ctp-mauve text-ctp-crust flex items-center justify-center hover:bg-ctp-pink transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <button 
            onClick={() => setCurrentTrack(prev => (prev + 1) % playlist.length)}
            className="text-ctp-subtext0 hover:text-ctp-text transition-colors"
          >
            <SkipForward className="w-6 h-6" />
          </button>
          <button className="text-ctp-subtext0 hover:text-ctp-text transition-colors">
            <Repeat className="w-5 h-5" />
          </button>
        </div>
        
        {/* Volume */}
        <div className="flex items-center gap-2 mt-4 justify-center">
          <Volume2 className="w-4 h-4 text-ctp-subtext0" />
          <div className="w-24 h-1 bg-ctp-surface1 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-ctp-subtext0" />
          </div>
        </div>
      </div>
      
      {/* Playlist */}
      <div className="border-t border-ctp-surface1 max-h-40 overflow-auto">
        {playlist.map((track, i) => (
          <button
            key={track.title}
            onClick={() => setCurrentTrack(i)}
            className={`w-full px-4 py-2 flex items-center justify-between text-sm hover:bg-ctp-surface0/50 transition-colors ${
              i === currentTrack ? 'bg-ctp-surface0/50 text-ctp-mauve' : 'text-ctp-text'
            }`}
          >
            <span>{track.title}</span>
            <span className="text-ctp-subtext0 text-xs">{track.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
