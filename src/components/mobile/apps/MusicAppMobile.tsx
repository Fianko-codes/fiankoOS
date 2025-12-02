import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from 'lucide-react';

const playlist = [
    { title: 'Lofi Beats', artist: 'Chillhop', duration: '3:45' },
    { title: 'Synthwave Nights', artist: 'RetroWave', duration: '4:12' },
    { title: 'Jazz Café', artist: 'Smooth Jazz', duration: '5:23' },
];

export const MusicAppMobile = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const currentSong = playlist[currentTrack];

    const handleNext = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    const handlePrevious = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-[hsl(var(--ctp-base))] via-[hsl(var(--ctp-mantle))] to-[hsl(var(--ctp-crust))]">

            {/* Album Art */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    key={currentTrack}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]
                   flex items-center justify-center shadow-2xl"
                >
                    <div className="text-[hsl(var(--ctp-crust))] text-6xl">
                        🎵
                    </div>
                </motion.div>
            </div>

            {/* Song Info & Controls */}
            <div className="p-8 space-y-6">
                {/* Song Info */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-[hsl(var(--ctp-text))]">
                            {currentSong.title}
                        </h2>
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="touch-manipulation"
                        >
                            <Heart
                                className={`w-6 h-6 ${isLiked ? 'fill-[hsl(var(--ctp-red))] text-[hsl(var(--ctp-red))]' : 'text-[hsl(var(--ctp-subtext0))]'}`}
                            />
                        </button>
                    </div>
                    <p className="text-[hsl(var(--ctp-subtext0))]">{currentSong.artist}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="h-1.5 bg-[hsl(var(--ctp-surface0))] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[hsl(var(--ctp-mauve))] rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: isPlaying ? '70%' : '0%' }}
                            transition={{ duration: 3 }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-[hsl(var(--ctp-subtext0))]">
                        <span>1:23</span>
                        <span>{currentSong.duration}</span>
                    </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={handlePrevious}
                        className="w-14 h-14 flex items-center justify-center rounded-full
                     bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))]
                     active:scale-95 transition-all touch-manipulation"
                    >
                        <SkipBack className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 flex items-center justify-center rounded-full
                     bg-gradient-to-br from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]
                     text-[hsl(var(--ctp-crust))] active:scale-95 transition-all
                     shadow-lg touch-manipulation"
                    >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>

                    <button
                        onClick={handleNext}
                        className="w-14 h-14 flex items-center justify-center rounded-full
                     bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))]
                     active:scale-95 transition-all touch-manipulation"
                    >
                        <SkipForward className="w-6 h-6" />
                    </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-[hsl(var(--ctp-subtext0))]" />
                    <div className="flex-1 h-1.5 bg-[hsl(var(--ctp-surface0))] rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-[hsl(var(--ctp-mauve))] rounded-full" />
                    </div>
                </div>

                {/* Playlist */}
                <div className="pt-4 border-t border-[hsl(var(--ctp-surface1))]">
                    <h3 className="text-sm font-semibold text-[hsl(var(--ctp-text))] mb-3">Up Next</h3>
                    <div className="space-y-2">
                        {playlist.map((song, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTrack(index)}
                                className={`w-full p-3 rounded-lg flex items-center justify-between
                         transition-colors touch-manipulation ${index === currentTrack
                                        ? 'bg-[hsl(var(--ctp-surface1))] text-[hsl(var(--ctp-text))]'
                                        : 'text-[hsl(var(--ctp-subtext0))] active:bg-[hsl(var(--ctp-surface0))]'
                                    }`}
                            >
                                <div className="text-left">
                                    <div className="text-sm font-medium">{song.title}</div>
                                    <div className="text-xs">{song.artist}</div>
                                </div>
                                <span className="text-xs">{song.duration}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
