import { motion } from 'framer-motion';
import { useWMStore } from '@/stores/useWMStore';
import { Terminal, User, FolderKanban, Settings, Music, Code } from 'lucide-react';

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
    id: 'music',
    title: 'Music',
    icon: <Music className="w-8 h-8" />,
    component: 'Music',
    iconName: 'music',
    defaultSize: { w: 350, h: 450 },
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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
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
