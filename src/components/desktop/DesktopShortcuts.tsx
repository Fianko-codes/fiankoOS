import { motion } from 'framer-motion';
import { BookOpen, FileText } from 'lucide-react';
import { useWMStore } from '@/stores/useWMStore';

interface DesktopShortcut {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: string;
  defaultSize: { w: number; h: number };
}

const shortcuts: DesktopShortcut[] = [
  {
    id: 'blogs',
    name: 'Blogs',
    icon: <BookOpen className="w-12 h-12" />,
    component: 'Blogs',
    defaultSize: { w: 600, h: 450 },
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: <FileText className="w-12 h-12" />,
    component: 'Resume',
    defaultSize: { w: 900, h: 700 },
  },
];

export const DesktopShortcuts = () => {
  const { openWindow, windows } = useWMStore();

  const handleDoubleClick = (shortcut: DesktopShortcut) => {
    const existingWindow = windows.find(w => w.id === shortcut.id);
    
    if (existingWindow) {
      return;
    }
    
    openWindow({
      id: shortcut.id,
      title: shortcut.name,
      component: shortcut.component,
      isMinimized: false,
      isMaximized: false,
      position: { 
        x: 100 + Math.random() * 200, 
        y: 80 + Math.random() * 100 
      },
      size: shortcut.defaultSize,
      icon: shortcut.id,
    });
  };

  return (
    <div className="fixed inset-0 pt-8 pb-24 pointer-events-none z-0">
      <div className="h-full p-8">
        <div className="flex flex-col gap-6 items-start">
          {shortcuts.map((shortcut, index) => (
            <motion.div
              key={shortcut.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onDoubleClick={() => handleDoubleClick(shortcut)}
              className="flex flex-col items-center gap-2 cursor-pointer pointer-events-auto group"
            >
              <div className="w-16 h-16 rounded-xl bg-ctp-surface0/50 border border-ctp-surface1/50
                            flex items-center justify-center text-ctp-text
                            group-hover:bg-ctp-surface1/70 group-hover:border-ctp-mauve/30
                            transition-all duration-200 group-hover:scale-110">
                {shortcut.icon}
              </div>
              <span className="text-xs text-ctp-text px-2 py-0.5 rounded
                             bg-ctp-surface0/50 backdrop-blur-sm
                             group-hover:bg-ctp-surface0/70 transition-colors">
                {shortcut.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

