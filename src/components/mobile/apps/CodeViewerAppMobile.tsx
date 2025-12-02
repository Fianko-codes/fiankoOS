import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Save } from 'lucide-react';

const codeFiles = [
    {
        name: 'useWindowManager.ts',
        language: 'TypeScript',
        code: `import { create } from 'zustand';

interface WindowState {
  windows: Window[];
  focusedId: string | null;
}

export const useWMStore = create<WindowState>((set) => ({
  windows: [],
  focusedId: null,
  
  openWindow: (window) => 
    set((state) => ({
      windows: [...state.windows, window],
      focusedId: window.id,
    })),
}));`,
    },
    {
        name: 'index.css',
        language: 'CSS',
        code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --ctp-mauve: 267 84% 81%;
    --ctp-base: 240 21% 15%;
  }
}`,
    },
    {
        name: 'App.tsx',
        language: 'TypeScript',
        code: `import { Desktop } from '@/components/desktop';

export default function App() {
  return <Desktop />;
}`,
    },
];

export const CodeViewerAppMobile = () => {
    const [selectedFile, setSelectedFile] = useState(0);
    const [editedContent, setEditedContent] = useState<Record<number, string>>({});
    const [isEditing, setIsEditing] = useState(false);

    const currentFile = codeFiles[selectedFile];
    
    const getFileContent = () => {
        if (editedContent[selectedFile]) {
            return editedContent[selectedFile];
        }
        return currentFile.code;
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const currentContent = getFileContent();

    return (
        <div className="h-full flex flex-col bg-[hsl(var(--ctp-mantle))]">

            {/* File Tabs */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-[hsl(var(--ctp-surface1))] bg-[hsl(var(--ctp-crust))]">
                {codeFiles.map((file, index) => (
                    <button
                        key={file.name}
                        onClick={() => {
                            setSelectedFile(index);
                            setIsEditing(false);
                        }}
                        className={`px-4 py-3 text-sm whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors touch-manipulation ${selectedFile === index
                                ? 'border-[hsl(var(--ctp-mauve))] text-[hsl(var(--ctp-text))] bg-[hsl(var(--ctp-surface0))]'
                                : 'border-transparent text-[hsl(var(--ctp-subtext0))]'
                            }`}
                    >
                        <FileCode className="w-4 h-4" />
                        {file.name}
                    </button>
                ))}
            </div>

            {/* Action Bar */}
            <div className="px-4 py-2 bg-[hsl(var(--ctp-crust))] border-b border-[hsl(var(--ctp-surface1))] flex justify-end">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm bg-[hsl(var(--ctp-green))] text-[hsl(var(--ctp-crust))] rounded-lg 
                                 active:scale-95 transition-all touch-manipulation flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm bg-[hsl(var(--ctp-surface0))] text-[hsl(var(--ctp-text))] rounded-lg 
                                 active:scale-95 transition-all touch-manipulation"
                    >
                        Edit
                    </button>
                )}
            </div>

            {/* Content Display */}
            {isEditing ? (
                <div className="flex-1 overflow-hidden flex flex-col">
                    <textarea
                        value={currentContent}
                        onChange={(e) => setEditedContent(prev => ({ ...prev, [selectedFile]: e.target.value }))}
                        className="flex-1 w-full p-4 bg-[hsl(var(--ctp-crust))] text-[hsl(var(--ctp-text))] font-mono text-sm resize-none outline-none"
                        style={{ fontFamily: 'monospace', lineHeight: '1.5' }}
                        spellCheck={false}
                    />
                </div>
            ) : (
                <div className="flex-1 overflow-auto p-4">
                    <motion.div
                        key={selectedFile}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs text-[hsl(var(--ctp-subtext0))] font-semibold uppercase">
                                {currentFile.language}
                            </span>
                            <span className="text-xs text-[hsl(var(--ctp-subtext0))]">
                                {currentContent.split('\n').length} lines
                            </span>
                        </div>

                        <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
                            <code className="text-[hsl(var(--ctp-text))]">
                                {currentContent}
                            </code>
                        </pre>
                    </motion.div>
                </div>
            )}

            {/* Footer Info */}
            <div className="px-4 py-3 bg-[hsl(var(--ctp-crust))] border-t border-[hsl(var(--ctp-surface1))]
                    flex items-center justify-between text-xs text-[hsl(var(--ctp-subtext0))]">
                <span>Line 1, Column 1</span>
                <span>UTF-8</span>
            </div>
        </div>
    );
};
