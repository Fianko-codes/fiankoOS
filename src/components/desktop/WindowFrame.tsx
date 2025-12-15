import { motion } from 'framer-motion';
import { useWMStore, WindowState } from '@/stores/useWMStore';
import { X, Square, Maximize2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export const WindowFrame = ({ window, children }: WindowFrameProps) => {
  const {
    closeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    activeWindowId,
  } = useWMStore();

  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isActive = activeWindowId === window.id;

  if (window.isMinimized) {
    return null;
  }

  const handleMaximize = () => {
    if (window.isMaximized) {
      restoreWindow(window.id);
    } else {
      maximizeWindow(window.id);
    }
  };

  return (
    <>
      {/* Drag constraints container */}
      <div ref={constraintsRef} className="fixed inset-0 pt-8 pb-24 pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: window.isMaximized ? 0 : window.position.x,
          y: window.isMaximized ? 0 : window.position.y,
          width: window.isMaximized ? '100%' : window.size.w,
          height: window.isMaximized ? '100%' : window.size.h,
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        drag={!window.isMaximized}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          updateWindowPosition(window.id, {
            x: window.position.x + info.offset.x,
            y: window.position.y + info.offset.y,
          });
        }}
        onMouseDown={() => focusWindow(window.id)}
        style={{
          zIndex: window.zIndex,
          position: window.isMaximized ? 'fixed' : 'absolute',
          top: window.isMaximized ? '32px' : 0,
          left: window.isMaximized ? 0 : 0,
          right: window.isMaximized ? 0 : 'auto',
          bottom: window.isMaximized ? '96px' : 'auto',
        }}
        className={`
          pointer-events-auto rounded-xl overflow-hidden
          glass window-chrome
          ${isActive ? 'ring-1 ring-ctp-mauve/50' : ''}
          ${isDragging ? 'cursor-grabbing' : 'cursor-default'}
        `}
      >
        {/* Window Title Bar */}
        <div
          className={`
            h-12 flex items-center justify-between px-3
            bg-ctp-mantle/80 border-b border-ctp-surface0/50
            ${!window.isMaximized ? 'cursor-grab active:cursor-grabbing' : ''}
          `}
          onDoubleClick={handleMaximize}
        >
          {/* Window Title (Left aligned mostly, but let's keep it centered if that was the intent, or left with icon? 
             Previous code had it absolute centered. Let's keep it that way but ensure z-index if buttons cover it.
             Actually, standard windows usually put title on left or center.
             The previous code had controls on Left (Mac style).
             The NEW requirement implies controls on RIGHT (like Windows/PC vibe).
             Wait, BlogsApp has controls on RIGHT. 
             The previous WindowFrame had controls on LEFT.
             If I am matching BlogsApp PC vibe, I should move controls to RIGHT.
             
             Let's check previous code again:
             Previous: Controls (Left) - Title (Center) - Spacer (Right)
             
             If I just swap the controls block to be after the title, and change the spacer...
             
             Let's enable PC vibe fully: Title Left, Controls Right.
          */}

          <div className="flex items-center gap-2">
            <span className="text-ctp-text text-sm font-medium select-none">
              {window.title}
            </span>
          </div>

          {/* Window Controls (Right) */}
          <div className="flex items-center gap-1" onMouseDown={e => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-ctp-surface1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
            >
              {window.isMaximized ? (
                <Square className="w-5 h-5 text-ctp-subtext0" />
              ) : (
                <Maximize2 className="w-5 h-5 text-ctp-subtext0" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-ctp-red hover:text-white rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div className="h-[calc(100%-40px)] overflow-auto bg-ctp-base/90">
          {children}
        </div>
      </motion.div>
    </>
  );
};
