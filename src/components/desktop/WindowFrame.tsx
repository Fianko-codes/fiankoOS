import { motion } from 'framer-motion';
import { useWMStore, WindowState } from '@/stores/useWMStore';
import { X, Square, Maximize2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
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
    updateWindowSize,
    activeWindowId,
  } = useWMStore();

  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeDir, setResizeDir] = useState<string | null>(null);

  const isActive = activeWindowId === window.id;

  // Resize logic
  useEffect(() => {
    if (!resizeDir) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = window.position;
      const { w, h } = window.size;
      const dx = e.movementX;
      const dy = e.movementY;

      let newW = w;
      let newH = h;
      let newX = x;
      let newY = y;

      if (resizeDir.includes('e')) newW = Math.max(300, w + dx);
      if (resizeDir.includes('s')) newH = Math.max(200, h + dy);
      if (resizeDir.includes('w')) {
        const proposedWidth = w - dx;
        if (proposedWidth >= 300) {
          newW = proposedWidth;
          newX = x + dx;
        }
      }
      if (resizeDir.includes('n')) {
        const proposedHeight = h - dy;
        if (proposedHeight >= 200) {
          newH = proposedHeight;
          newY = y + dy;
        }
      }

      if (newW !== w || newH !== h) {
        updateWindowSize(window.id, { w: newW, h: newH });
      }
      if (newX !== x || newY !== y) {
        updateWindowPosition(window.id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setResizeDir(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizeDir, window.id, window.position, window.size, updateWindowSize, updateWindowPosition]);

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

  const handleResizeStart = (dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizeDir(dir);
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
        drag={!window.isMaximized && !resizeDir}
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
        {/* Resize Handles (Only when not maximized) */}
        {!window.isMaximized && (
          <>
            <div className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize z-50" onMouseDown={handleResizeStart('nw')} />
            <div className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize z-50" onMouseDown={handleResizeStart('ne')} />
            <div className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize z-50" onMouseDown={handleResizeStart('sw')} />
            <div className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize z-50" onMouseDown={handleResizeStart('se')} />
            <div className="absolute top-0 left-2 right-2 h-1 cursor-n-resize z-40" onMouseDown={handleResizeStart('n')} />
            <div className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize z-40" onMouseDown={handleResizeStart('s')} />
            <div className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize z-40" onMouseDown={handleResizeStart('w')} />
            <div className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize z-40" onMouseDown={handleResizeStart('e')} />
          </>
        )}

        {/* Window Title Bar */}
        <div
          className={`
            h-12 flex items-center justify-between px-3
            bg-ctp-mantle/80 border-b border-ctp-surface0/50
            ${!window.isMaximized ? 'cursor-grab active:cursor-grabbing' : ''}
          `}
          onDoubleClick={handleMaximize}
        >
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
              className="h-10 w-10 bg-ctp-red text-white hover:bg-ctp-red/80 rounded transition-colors"
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
        <div className="h-[calc(100%-48px)] overflow-auto bg-ctp-base/90">
          {children}
        </div>
      </motion.div>
    </>
  );
};
