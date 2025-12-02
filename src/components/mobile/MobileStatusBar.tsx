import { useEffect, useState } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

export const MobileStatusBar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [batteryLevel, setBatteryLevel] = useState(85);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Simulate battery drain (optional fun effect)
        const batteryTimer = setInterval(() => {
            setBatteryLevel(prev => Math.max(20, prev - 1));
        }, 60000); // Decrease by 1% every minute

        return () => {
            clearInterval(timer);
            clearInterval(batteryTimer);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-12 safe-top z-50 
                    bg-[hsl(var(--ctp-crust))]/95 backdrop-blur-xl
                    flex items-center justify-between px-4 text-[hsl(var(--ctp-text))]">

            {/* Left: Time */}
            <div className="font-semibold text-sm">
                {formatTime(currentTime)}
            </div>

            {/* Right: Status Icons */}
            <div className="flex items-center gap-2">
                {/* Signal */}
                <Signal className="w-4 h-4" />

                {/* Wifi */}
                <Wifi className="w-4 h-4" />

                {/* Battery */}
                <div className="flex items-center gap-1">
                    <span className="text-xs">{batteryLevel}%</span>
                    <div className="relative w-6 h-3 border border-[hsl(var(--ctp-text))] rounded-sm">
                        <div
                            className={`absolute top-0.5 left-0.5 bottom-0.5 rounded-sm transition-all ${batteryLevel > 20
                                    ? 'bg-[hsl(var(--ctp-green))]'
                                    : 'bg-[hsl(var(--ctp-red))]'
                                }`}
                            style={{ width: `${Math.max(0, (batteryLevel - 5) / 95 * 100)}%` }}
                        />
                        {/* Battery tip */}
                        <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 
                          bg-[hsl(var(--ctp-text))] rounded-r" />
                    </div>
                </div>
            </div>
        </div>
    );
};
