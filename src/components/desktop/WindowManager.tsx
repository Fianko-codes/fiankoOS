import { useWMStore } from '@/stores/useWMStore';
import { WindowFrame } from './WindowFrame';
import { TerminalApp } from '../apps/TerminalApp';
import { AboutApp } from '../apps/AboutApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { SettingsApp } from '../apps/SettingsApp';
import { MusicApp } from '../apps/MusicApp';
import { CodeViewerApp } from '../apps/CodeViewerApp';

const componentMap: Record<string, React.ComponentType> = {
  Terminal: TerminalApp,
  About: AboutApp,
  Projects: ProjectsApp,
  SettingsApp: SettingsApp,
  Music: MusicApp,
  CodeViewer: CodeViewerApp,
};

export const WindowManager = () => {
  const { windows } = useWMStore();
  
  return (
    <div className="fixed inset-0 pt-8 pb-24 pointer-events-none">
      {windows.map((window) => {
        const Component = componentMap[window.component];
        if (!Component) return null;
        
        return (
          <WindowFrame key={window.id} window={window}>
            <Component />
          </WindowFrame>
        );
      })}
    </div>
  );
};
