import { motion } from 'framer-motion';
import { useWMStore, WindowState } from '@/stores/useWMStore';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export const WindowFrame = ({ window, children }: WindowFrameProps) => {
  const { 
    closeWindow, 
    minimizeWindow, 
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
            h-10 flex items-center justify-between px-3
            bg-ctp-mantle/80 border-b border-ctp-surface0/50
            ${!window.isMaximized ? 'cursor-grab active:cursor-grabbing' : ''}
          `}
          onDoubleClick={handleMaximize}
        >
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="w-3 h-3 rounded-full bg-ctp-red hover:bg-ctp-red/80 transition-colors group flex items-center justify-center"
            >
              <X className="w-2 h-2 text-ctp-crust opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(window.id);
              }}
              className="w-3 h-3 rounded-full bg-ctp-yellow hover:bg-ctp-yellow/80 transition-colors group flex items-center justify-center"
            >
              <Minus className="w-2 h-2 text-ctp-crust opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="w-3 h-3 rounded-full bg-ctp-green hover:bg-ctp-green/80 transition-colors group flex items-center justify-center"
            >
              {window.isMaximized ? (
                <Square className="w-1.5 h-1.5 text-ctp-crust opacity-0 group-hover:opacity-100" />
              ) : (
                <Maximize2 className="w-2 h-2 text-ctp-crust opacity-0 group-hover:opacity-100" />
              )}
            </button>
          </div>
          
          {/* Window Title */}
          <span className="text-ctp-text text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {window.title}
          </span>
          
          {/* Spacer */}
          <div className="w-16" />
        </div>
        
        {/* Window Content */}
        <div className="h-[calc(100%-40px)] overflow-auto bg-ctp-base/90">
          {children}
        </div>
      </motion.div>
    </>
  );
};
