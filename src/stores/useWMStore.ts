import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { w: number; h: number };
  icon: string;
}

interface WMState {
  windows: WindowState[];
  activeWindowId: string | null;
  maxZIndex: number;
  wallpaper: number;
  
  // Actions
  openWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { w: number; h: number }) => void;
  setWallpaper: (index: number) => void;
}

export const useWMStore = create<WMState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  maxZIndex: 100,
  wallpaper: 0,
  
  openWindow: (window) => {
    const { windows, maxZIndex } = get();
    const existingWindow = windows.find(w => w.id === window.id);
    
    if (existingWindow) {
      // If window exists, just focus it
      get().focusWindow(window.id);
      if (existingWindow.isMinimized) {
        get().restoreWindow(window.id);
      }
      return;
    }
    
    set({
      windows: [...windows, { ...window, zIndex: maxZIndex + 1 }],
      activeWindowId: window.id,
      maxZIndex: maxZIndex + 1,
    });
  },
  
  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },
  
  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
  },
  
  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: true } : w
      ),
    }));
  },
  
  restoreWindow: (id) => {
    const { maxZIndex } = get();
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: false, isMaximized: false, zIndex: maxZIndex + 1 } : w
      ),
      activeWindowId: id,
      maxZIndex: maxZIndex + 1,
    }));
  },
  
  focusWindow: (id) => {
    const { maxZIndex } = get();
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      ),
      activeWindowId: id,
      maxZIndex: maxZIndex + 1,
    }));
  },
  
  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },
  
  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
  
  setWallpaper: (index) => {
    set({ wallpaper: index });
    localStorage.setItem('fianko-wallpaper', String(index));
  },
}));
