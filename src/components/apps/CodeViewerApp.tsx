import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, ChevronRight, ChevronDown, File, Save } from 'lucide-react';

const codeFiles: Record<string, string> = {
  'useWMStore.ts': `import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

export const useWMStore = create<WMState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  maxZIndex: 100,
  
  openWindow: (window) => {
    // Implementation...
  },
  
  closeWindow: (id) => {
    // Implementation...
  },
}));`,
  'Desktop.tsx': `import { Wallpaper } from './Wallpaper';
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
};`,
};

interface FileTreeItem {
  name: string;
  isFolder: boolean;
  children?: FileTreeItem[];
}

const fileTree: FileTreeItem[] = [
  { name: 'src', isFolder: true, children: [
    { name: 'stores', isFolder: true, children: [
      { name: 'useWMStore.ts', isFolder: false },
    ]},
    { name: 'components', isFolder: true, children: [
      { name: 'Desktop.tsx', isFolder: false },
    ]},
  ]},
];

interface TreeItemProps {
  item: FileTreeItem;
  depth: number;
  onSelect: (name: string) => void;
  selected: string;
}

const TreeItem = ({ item, depth, onSelect, selected }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div>
      <button
        onClick={() => item.isFolder ? setIsOpen(!isOpen) : onSelect(item.name)}
        className={`w-full flex items-center gap-1 py-1 px-2 text-sm hover:bg-ctp-surface0/50 transition-colors ${
          selected === item.name ? 'bg-ctp-surface0 text-ctp-mauve' : 'text-ctp-text'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {item.isFolder ? (
          isOpen ? <ChevronDown className="w-4 h-4 text-ctp-subtext0" /> : <ChevronRight className="w-4 h-4 text-ctp-subtext0" />
        ) : (
          <File className="w-4 h-4 text-ctp-subtext0" />
        )}
        <span>{item.name}</span>
      </button>
      {item.isFolder && isOpen && item.children?.map((child) => (
        <TreeItem key={child.name} item={child} depth={depth + 1} onSelect={onSelect} selected={selected} />
      ))}
    </div>
  );
};

export const CodeViewerApp = () => {
  const [selectedFile, setSelectedFile] = useState('useWMStore.ts');
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  
  const getLanguage = (filename: string) => {
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
    if (filename.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  const getFileContent = (filename: string) => {
    if (editedContent[filename] !== undefined) {
      return editedContent[filename];
    }
    return codeFiles[filename] || '';
  };

  const handleFileSelect = (filename: string) => {
    setSelectedFile(filename);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const currentContent = getFileContent(selectedFile);
  
  return (
    <div className="h-full flex bg-ctp-crust">
      {/* File Tree */}
      <div className="w-48 border-r border-ctp-surface0 overflow-auto">
        <div className="p-2 text-xs text-ctp-subtext0 font-medium uppercase">Explorer</div>
        {fileTree.map((item) => (
          <TreeItem key={item.name} item={item} depth={0} onSelect={handleFileSelect} selected={selectedFile} />
        ))}
      </div>
      
      {/* Code View */}
      <div className="flex-1 flex flex-col">
        {/* Tab */}
        <div className="h-9 bg-ctp-mantle border-b border-ctp-surface0 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-ctp-crust rounded-t text-sm text-ctp-text">
            <FileCode className="w-4 h-4 text-ctp-blue" />
            {selectedFile}
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-3 py-1 text-xs bg-ctp-green text-ctp-crust rounded hover:bg-ctp-teal transition-colors flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-xs bg-ctp-surface0 text-ctp-text rounded hover:bg-ctp-surface1 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        {isEditing ? (
          <div className="flex-1 overflow-hidden flex flex-col">
            <textarea
              value={currentContent}
              onChange={(e) => setEditedContent(prev => ({ ...prev, [selectedFile]: e.target.value }))}
              className="flex-1 w-full p-4 bg-ctp-crust text-ctp-text font-mono text-sm resize-none outline-none border-none"
              style={{ fontFamily: 'monospace', lineHeight: '1.5' }}
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-4">
            <pre className="text-sm font-mono">
              <code className="text-ctp-text">
                {currentContent.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-ctp-surface2 text-right pr-4 select-none">{i + 1}</span>
                    <span className="flex-1">
                      {highlightSyntax(line, getLanguage(selectedFile))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple syntax highlighting
function highlightSyntax(line: string, lang: string) {
  if (lang === 'json') {
    return line
      .replace(/"([^"]+)":/g, '<span class="text-ctp-blue">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-ctp-green">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-ctp-peach">$1</span>');
  }
  
  // TypeScript highlighting
  const keywords = ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'from', 'interface', 'type'];
  let highlighted = line;
  
  keywords.forEach(kw => {
    highlighted = highlighted.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="text-ctp-mauve">${kw}</span>`);
  });
  
  highlighted = highlighted
    .replace(/'([^']+)'/g, '<span class="text-ctp-green">\'$1\'</span>')
    .replace(/\/\/.*/g, '<span class="text-ctp-overlay0">$&</span>');
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}
