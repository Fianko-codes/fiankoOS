import { useWMStore } from '@/stores/useWMStore';
import { Wallpaper } from './Wallpaper';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';

export const Desktop = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Wallpaper />
      <TopBar />
      <WindowManager />
      <Dock />
    </div>
  );
};
