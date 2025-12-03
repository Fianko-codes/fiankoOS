import { useEffect, useState } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

interface MobileStatusBarProps {
    isVisible?: boolean;
}

export const MobileStatusBar = ({ isVisible = true }: MobileStatusBarProps) => {
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
        <div className={`fixed top-0 left-0 right-0 h-10 safe-top z-50 
                    flex items-center justify-between px-6 text-[hsl(var(--ctp-text))]
                    bg-gradient-to-b from-black/20 to-transparent
                    transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            {/* Left: Time */}
            <div className="font-semibold text-xs tracking-wide">
                {formatTime(currentTime)}
            </div>

            {/* Right: Status Icons */}
            <div className="flex items-center gap-2">
                {/* Signal */}
                <Signal className="w-3.5 h-3.5" />

                {/* Wifi */}
                <Wifi className="w-3.5 h-3.5" />

                {/* Battery */}
                <div className="flex items-center gap-1">
                    <span className="text-[10px] font-medium">{batteryLevel}%</span>
                    <div className="relative w-5 h-2.5 border border-[hsl(var(--ctp-text))] rounded-[2px] opacity-80">
                        <div
                            className={`absolute top-[1px] left-[1px] bottom-[1px] rounded-[1px] transition-all ${batteryLevel > 20
                                ? 'bg-[hsl(var(--ctp-text))]'
                                : 'bg-[hsl(var(--ctp-red))]'
                                }`}
                            style={{ width: `${Math.max(0, (batteryLevel - 5) / 95 * 100)}%` }}
                        />
                        {/* Battery tip */}
                        <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 
                          bg-[hsl(var(--ctp-text))] rounded-r-[1px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};
