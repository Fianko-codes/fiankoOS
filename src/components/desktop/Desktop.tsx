import { useWMStore } from '@/stores/useWMStore';
import { Wallpaper } from './Wallpaper';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';
import { DesktopShortcuts } from './DesktopShortcuts';

export const Desktop = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Wallpaper />
      <TopBar />
      <DesktopShortcuts />
      <WindowManager />
      <Dock />
    </div>
  );
};
