import { motion } from 'framer-motion';
import { useWMStore } from '@/stores/useWMStore';
import { Terminal, User, FolderKanban, Settings, Code } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DockApp {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: string;
  iconName: string;
  defaultSize: { w: number; h: number };
}

const dockApps: DockApp[] = [
  {
    id: 'terminal',
    title: 'Terminal',
    icon: <Terminal className="w-8 h-8" />,
    component: 'Terminal',
    iconName: 'terminal',
    defaultSize: { w: 700, h: 450 },
  },
  {
    id: 'about',
    title: 'About Me',
    icon: <User className="w-8 h-8" />,
    component: 'About',
    iconName: 'user',
    defaultSize: { w: 600, h: 500 },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <FolderKanban className="w-8 h-8" />,
    component: 'Projects',
    iconName: 'folder',
    defaultSize: { w: 800, h: 550 },
  },
  {
    id: 'code',
    title: 'Code',
    icon: <Code className="w-8 h-8" />,
    component: 'CodeViewer',
    iconName: 'code',
    defaultSize: { w: 750, h: 500 },
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings className="w-8 h-8" />,
    component: 'SettingsApp',
    iconName: 'settings',
    defaultSize: { w: 500, h: 400 },
  },
];

export const Dock = () => {
  const { openWindow, windows, focusWindow, restoreWindow } = useWMStore();
  const [isHidden, setIsHidden] = useState(false);
  const [mouseNearBottom, setMouseNearBottom] = useState(false);
  
  // Check if any window overlaps with Dock area
  useEffect(() => {
    const checkOverlap = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Check if any window is maximized - if so, hide Dock (unless mouse is near bottom)
      const hasMaximizedWindow = windows.some(win => win.isMaximized && !win.isMinimized);
      if (hasMaximizedWindow) {
        setIsHidden(!mouseNearBottom);
        return;
      }
      
      // Dock area: bottom 16px (bottom-4) + ~80px height = ~96px from bottom
      const dockAreaTop = viewportHeight - 96;
      const dockAreaBottom = viewportHeight - 16;
      
      // Dock is centered horizontally
      const dockCenterX = viewportWidth / 2;
      const dockWidth = 400; // approximate Dock width
      const dockLeft = dockCenterX - dockWidth / 2;
      const dockRight = dockCenterX + dockWidth / 2;
      
      const hasOverlap = windows.some(win => {
        if (win.isMinimized) return false;
        
        const winBottom = win.position.y + win.size.h;
        const winTop = win.position.y;
        const winLeft = win.position.x;
        const winRight = win.position.x + win.size.w;
        
        // Check if window overlaps with Dock area vertically
        const verticalOverlap = winBottom > dockAreaTop && winTop < dockAreaBottom;
        
        // Check if window overlaps horizontally with Dock
        const horizontalOverlap = winRight > dockLeft && winLeft < dockRight;
        
        return verticalOverlap && horizontalOverlap;
      });
      
      setIsHidden(hasOverlap && !mouseNearBottom);
    };
    
    checkOverlap();
    const interval = setInterval(checkOverlap, 100);
    
    return () => clearInterval(interval);
  }, [windows, mouseNearBottom]);
  
  // Track mouse position near bottom of screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const distanceFromBottom = window.innerHeight - e.clientY;
      setMouseNearBottom(distanceFromBottom < 120); // Show Dock when mouse is within 120px of bottom
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const handleAppClick = (app: DockApp) => {
    const existingWindow = windows.find(w => w.id === app.id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        restoreWindow(app.id);
      } else {
        focusWindow(app.id);
      }
      return;
    }
    
    openWindow({
      id: app.id,
      title: app.title,
      component: app.component,
      isMinimized: false,
      isMaximized: false,
      position: { 
        x: 100 + Math.random() * 200, 
        y: 80 + Math.random() * 100 
      },
      size: app.defaultSize,
      icon: app.iconName,
    });
  };
  
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0, x: '-50%' }}
      animate={{ 
        y: isHidden ? 100 : 0, 
        opacity: isHidden ? 0 : 1, 
        x: '-50%' 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-1/2 z-50"
      onMouseEnter={() => setIsHidden(false)}
      onMouseLeave={() => {
        // Check if any window is maximized - if so, hide Dock (unless mouse is near bottom)
        const hasMaximizedWindow = windows.some(win => win.isMaximized && !win.isMinimized);
        if (hasMaximizedWindow) {
          setIsHidden(!mouseNearBottom);
          return;
        }
        
        // Only hide if there's overlap and mouse is not near bottom
        const viewportHeight = window.innerHeight;
        const dockAreaTop = viewportHeight - 96;
        
        const hasOverlap = windows.some(win => {
          if (win.isMinimized) return false;
          const winBottom = win.position.y + win.size.h;
          return winBottom > dockAreaTop;
        });
        if (hasOverlap && !mouseNearBottom) {
          setIsHidden(true);
        }
      }}
    >
      <div className="glass-strong rounded-2xl px-4 py-3 flex items-end gap-2">
        {dockApps.map((app) => {
          const isOpen = windows.some(w => w.id === app.id);
          const isMinimized = windows.find(w => w.id === app.id)?.isMinimized;
          
          return (
            <motion.button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="dock-item relative group"
              whileHover={{ scale: 1.2, y: -12 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center
                bg-ctp-surface0/50 border border-ctp-surface1/50
                transition-all duration-200
                ${isOpen ? 'text-ctp-mauve' : 'text-ctp-text'}
                hover:bg-ctp-surface1/70 hover:border-ctp-mauve/30
                ${isMinimized ? 'opacity-60' : ''}
              `}>
                {app.icon}
              </div>
              
              {/* App name tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md
                            bg-ctp-surface0 text-ctp-text text-xs whitespace-nowrap
                            opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {app.title}
              </div>
              
              {/* Running indicator */}
              {isOpen && (
                <motion.div 
                  layoutId={`indicator-${app.id}`}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ctp-mauve"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
