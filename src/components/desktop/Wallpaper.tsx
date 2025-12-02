import { useWMStore } from '@/stores/useWMStore';
import { useEffect } from 'react';

const wallpapers = [
  // Gradient wallpapers inspired by Catppuccin
  'linear-gradient(135deg, hsl(240 21% 12%) 0%, hsl(267 84% 20%) 50%, hsl(240 21% 15%) 100%)',
  'linear-gradient(135deg, hsl(240 23% 9%) 0%, hsl(170 57% 20%) 50%, hsl(240 21% 12%) 100%)',
  'linear-gradient(135deg, hsl(240 21% 15%) 0%, hsl(217 92% 25%) 50%, hsl(267 84% 15%) 100%)',
  'linear-gradient(135deg, hsl(240 21% 12%) 0%, hsl(343 81% 25%) 30%, hsl(267 84% 20%) 70%, hsl(240 21% 15%) 100%)',
  'radial-gradient(ellipse at 20% 80%, hsl(267 84% 25%) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(170 57% 25%) 0%, transparent 50%), hsl(240 21% 12%)',
];

export const Wallpaper = () => {
  const { wallpaper, setWallpaper } = useWMStore();
  
  useEffect(() => {
    const saved = localStorage.getItem('fianko-wallpaper');
    if (saved) {
      setWallpaper(parseInt(saved));
    }
  }, [setWallpaper]);
  
  return (
    <div 
      className="fixed inset-0 transition-all duration-1000"
      style={{ background: wallpapers[wallpaper % wallpapers.length] }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full animate-spin-slow"
          style={{
            background: 'radial-gradient(circle, hsl(267 84% 81% / 0.1) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, hsl(170 57% 73% / 0.1) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
          }}
        />
      </div>
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export { wallpapers };
