import { useState, useRef, useEffect } from 'react';
import { useWMStore } from '@/stores/useWMStore';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  color?: string;
}

const ASCII_LOGO = `
   ███████╗██╗ █████╗ ███╗   ██╗██╗  ██╗ ██████╗ 
   ██╔════╝██║██╔══██╗████╗  ██║██║ ██╔╝██╔═══██╗
   █████╗  ██║███████║██╔██╗ ██║█████╔╝ ██║   ██║
   ██╔══╝  ██║██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║
   ██║     ██║██║  ██║██║ ╚████║██║  ██╗╚██████╔╝
   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ 
`;

const COWSAY_TEMPLATE = (text: string) => `
 ${'_'.repeat(text.length + 2)}
< ${text} >
 ${'-'.repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;

const FILESYSTEM: Record<string, string[]> = {
  '~': ['about.md', 'projects/', 'skills.txt', '.config/'],
  '~/projects': ['react-dashboard/', 'cli-tools/', 'portfolio/'],
  '~/.config': ['neofetch/', 'kitty/'],
};

const FILES: Record<string, string> = {
  '~/about.md': `# About Me

I'm a passionate developer who loves building beautiful,
functional applications. I specialize in:

- Frontend Development (React, TypeScript)
- System Administration (Linux, Docker)
- UI/UX Design

Currently exploring the intersection of design and code.
`,
  '~/skills.txt': `Languages: TypeScript, Python, Rust, Go
Frameworks: React, Next.js, Node.js
Tools: Docker, Git, Neovim, tmux
OS: Arch Linux (btw)
`,
};

export const TerminalApp = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to fiankoOS Terminal v1.0.0', color: 'text-ctp-mauve' },
    { type: 'output', content: 'Type "help" for available commands.\n', color: 'text-ctp-subtext0' },
  ]);
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWMStore();
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);
  
  const addOutput = (content: string, color?: string) => {
    setHistory(prev => [...prev, { type: 'output', content, color }]);
  };
  
  const executeCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const params = args.slice(1).join(' ');
    
    setHistory(prev => [...prev, { type: 'input', content: `${currentDir} ❯ ${cmd}` }]);
    
    switch (command) {
      case 'help':
        addOutput(`
Available commands:
  neofetch     - Display system info
  whoami       - Display current user
  date         - Show current date/time
  clear        - Clear terminal
  ls           - List directory contents
  cd <dir>     - Change directory
  cat <file>   - View file contents
  cowsay <msg> - Make a cow say something
  matrix       - Enter the Matrix
  open <app>   - Open an application
  pacman -S    - Install a "skill"
  help         - Show this help
`, 'text-ctp-subtext0');
        break;
        
      case 'neofetch':
        addOutput(`${ASCII_LOGO}
   fianko@archlinux
   ─────────────────
   OS: Arch Linux x86_64
   Host: fiankoOS Desktop
   Kernel: 6.7.0-arch1-1
   Shell: zsh 5.9
   DE: Hyprland
   Terminal: kitty
   CPU: Intel i9-13900K
   GPU: NVIDIA RTX 4090
   Memory: 32GB DDR5
`, 'text-ctp-teal');
        break;
        
      case 'whoami':
        addOutput('fianko', 'text-ctp-green');
        break;
        
      case 'date':
        addOutput(new Date().toString(), 'text-ctp-peach');
        break;
        
      case 'clear':
        setHistory([]);
        break;
        
      case 'ls':
        const dirContents = FILESYSTEM[currentDir];
        if (dirContents) {
          addOutput(dirContents.join('  '), 'text-ctp-blue');
        } else {
          addOutput('Directory not found', 'text-ctp-red');
        }
        break;
        
      case 'cd':
        if (!params || params === '~') {
          setCurrentDir('~');
        } else if (params === '..') {
          const parts = currentDir.split('/');
          parts.pop();
          setCurrentDir(parts.join('/') || '~');
        } else {
          const newDir = params.startsWith('~') ? params : `${currentDir}/${params.replace(/\/$/, '')}`;
          if (FILESYSTEM[newDir]) {
            setCurrentDir(newDir);
          } else {
            addOutput(`cd: ${params}: No such file or directory`, 'text-ctp-red');
          }
        }
        break;
        
      case 'cat':
        const filePath = params.startsWith('~') ? params : `${currentDir}/${params}`;
        const fileContent = FILES[filePath];
        if (fileContent) {
          addOutput(fileContent, 'text-ctp-text');
        } else {
          addOutput(`cat: ${params}: No such file or directory`, 'text-ctp-red');
        }
        break;
        
      case 'cowsay':
        if (params) {
          addOutput(COWSAY_TEMPLATE(params), 'text-ctp-yellow');
        } else {
          addOutput(COWSAY_TEMPLATE('Moo!'), 'text-ctp-yellow');
        }
        break;
        
      case 'matrix':
        setShowMatrix(true);
        addOutput('Entering the Matrix... (click to exit)', 'text-ctp-green');
        setTimeout(() => setShowMatrix(false), 10000);
        break;
        
      case 'open':
        const apps: Record<string, string> = {
          about: 'about',
          projects: 'projects',
          settings: 'settings',
          music: 'music',
          code: 'code',
        };
        if (apps[params]) {
          addOutput(`Opening ${params}...`, 'text-ctp-green');
          openWindow({
            id: apps[params],
            title: params.charAt(0).toUpperCase() + params.slice(1),
            component: params === 'code' ? 'CodeViewer' : params.charAt(0).toUpperCase() + params.slice(1),
            isMinimized: false,
            isMaximized: false,
            position: { x: 150, y: 100 },
            size: { w: 600, h: 450 },
            icon: params,
          });
        } else {
          addOutput(`Application "${params}" not found. Try: about, projects, settings, music, code`, 'text-ctp-red');
        }
        break;
        
      case 'pacman':
        if (args[1] === '-S' && args[2]) {
          const skill = args[2];
          addOutput(`resolving dependencies...`, 'text-ctp-subtext0');
          addOutput(`looking for conflicting packages...`, 'text-ctp-subtext0');
          addOutput(`\nPackages (1) ${skill}-1.0.0\n`, 'text-ctp-text');
          addOutput(`Total Installed Size: 42.0 MiB`, 'text-ctp-text');
          addOutput(`\n:: Proceed with installation? [Y/n] Y`, 'text-ctp-yellow');
          addOutput(`(1/1) installing ${skill}...`, 'text-ctp-subtext0');
          addOutput(`[########################################] 100%`, 'text-ctp-green');
          addOutput(`\n✓ Skill "${skill}" has been installed successfully!`, 'text-ctp-green');
        } else {
          addOutput('Usage: pacman -S <skill_name>', 'text-ctp-red');
        }
        break;
        
      case '':
        break;
        
      default:
        addOutput(`Command not found: ${command}. Type "help" for available commands.`, 'text-ctp-red');
    }
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };
  
  return (
    <div 
      className="h-full bg-ctp-crust/95 p-4 font-mono text-sm relative"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix Effect Overlay */}
      {showMatrix && (
        <div 
          className="absolute inset-0 bg-black/90 z-10 overflow-hidden cursor-pointer"
          onClick={() => setShowMatrix(false)}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-ctp-green text-xs animate-matrix"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              {Array.from({ length: 20 }).map(() => 
                String.fromCharCode(0x30A0 + Math.random() * 96)
              ).join('')}
            </div>
          ))}
        </div>
      )}
      
      <div ref={containerRef} className="h-[calc(100%-24px)] overflow-auto">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${line.color || 'text-ctp-text'}`}>
            {line.content}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center">
          <span className="text-ctp-blue">{currentDir}</span>
          <span className="text-ctp-mauve mx-1">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-ctp-text caret-ctp-mauve"
            autoFocus
          />
          <span className="w-2 h-4 bg-ctp-mauve animate-blink" />
        </div>
      </div>
    </div>
  );
};
