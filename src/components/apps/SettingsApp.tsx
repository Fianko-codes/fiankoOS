import { motion } from 'framer-motion';
import { useWMStore } from '@/stores/useWMStore';
import { Monitor, Palette, Check } from 'lucide-react';
import { wallpapers } from '../desktop/Wallpaper';

export const SettingsApp = () => {
  const { wallpaper, setWallpaper } = useWMStore();
  
  return (
    <div className="h-full p-6 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-ctp-text mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-ctp-mauve" />
          Appearance
        </h1>
        
        {/* Wallpaper Selection */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-ctp-subtext0 mb-4 flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Wallpaper
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            {wallpapers.map((wp, i) => (
              <button
                key={i}
                onClick={() => setWallpaper(i)}
                className={`
                  relative aspect-video rounded-lg overflow-hidden border-2 transition-all
                  ${wallpaper === i 
                    ? 'border-ctp-mauve ring-2 ring-ctp-mauve/30' 
                    : 'border-ctp-surface1 hover:border-ctp-surface2'
                  }
                `}
              >
                <div 
                  className="absolute inset-0"
                  style={{ background: wp }}
                />
                {wallpaper === i && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ctp-crust/40">
                    <div className="w-6 h-6 rounded-full bg-ctp-mauve flex items-center justify-center">
                      <Check className="w-4 h-4 text-ctp-crust" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Theme Info */}
        <div className="p-4 rounded-lg bg-ctp-surface0/50 border border-ctp-surface1">
          <h3 className="text-sm font-medium text-ctp-text mb-2">Current Theme</h3>
          <p className="text-ctp-subtext0 text-sm">Catppuccin Mocha</p>
          <div className="flex gap-2 mt-3">
            {['ctp-rosewater', 'ctp-mauve', 'ctp-blue', 'ctp-teal', 'ctp-green', 'ctp-yellow', 'ctp-peach', 'ctp-red'].map((color) => (
              <div 
                key={color}
                className={`w-5 h-5 rounded-full bg-${color}`}
                style={{ backgroundColor: `hsl(var(--${color}))` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
