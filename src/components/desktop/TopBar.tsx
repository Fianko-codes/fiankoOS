import { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Bell } from 'lucide-react';

export const TopBar = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 h-8 glass-strong z-50 flex items-center justify-between px-4">
      {/* Left - System */}
      <div className="flex items-center gap-4">
        <span className="text-ctp-mauve font-semibold text-sm">fiankoOS</span>
        <span className="text-ctp-subtext0 text-xs">Arch Linux x86_64</span>
      </div>
      
      {/* Center - Time */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-ctp-text text-sm font-medium">{formatDate(time)}</span>
        <span className="text-ctp-mauve text-sm font-semibold">{formatTime(time)}</span>
      </div>
      
      {/* Right - Status Icons */}
      <div className="flex items-center gap-3">
        <Bell className="w-4 h-4 text-ctp-subtext0 hover:text-ctp-text transition-colors cursor-pointer" />
        <Volume2 className="w-4 h-4 text-ctp-subtext0 hover:text-ctp-text transition-colors cursor-pointer" />
        <Wifi className="w-4 h-4 text-ctp-green" />
        <div className="flex items-center gap-1">
          <Battery className="w-4 h-4 text-ctp-green" />
          <span className="text-ctp-subtext0 text-xs">100%</span>
        </div>
      </div>
    </div>
  );
};
