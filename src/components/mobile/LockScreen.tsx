import { motion } from 'framer-motion';
import { Lock, ChevronUp } from 'lucide-react';
import { useMobileStore } from '@/stores/useMobileStore';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { useEffect, useState } from 'react';

export const LockScreen = () => {
    const { unlock } = useMobileStore();
    const [currentTime, setCurrentTime] = useState(new Date());

    const swipeRef = useSwipeGesture<HTMLDivElement>({
        onSwipeUp: unlock,
        threshold: 100,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div
            ref={swipeRef}
            className="absolute inset-0 z-50 bg-gradient-to-br from-ctp-base via-ctp-mantle to-ctp-crust
                 flex flex-col items-center justify-center touch-manipulation">

            {/* Time Display */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-7xl font-bold text-[hsl(var(--ctp-text))] mb-2 tracking-tight">
                    {formatTime(currentTime)}
                </h1>
                <p className="text-xl text-[hsl(var(--ctp-subtext0))]">
                    {formatDate(currentTime)}
                </p>
            </motion.div>

            {/* Lock Icon */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center">
                    <Lock className="w-10 h-10 text-[hsl(var(--ctp-mauve))]" />
                </div>
            </motion.div>

            {/* Swipe Up Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0.4, 1, 0.4], y: [0, -10, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }}
                className="flex flex-col items-center gap-2 text-[hsl(var(--ctp-subtext0))]"
            >
                <ChevronUp className="w-6 h-6" />
                <span className="text-sm">Swipe up to unlock</span>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[hsl(var(--ctp-mauve))] rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
