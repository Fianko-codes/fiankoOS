import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PROMPT = 'guest@fiankoOS';

const commands: Record<string, string> = {
    help: `Available commands:
  about    - Display information about me
  projects - Show my projects
  contact  - Get contact information
  clear    - Clear terminal
  theme    - Show current theme`,

    about: `Fianko - A high school student Overthinking the simplest things`,

    projects: `Featured Projects:
  → fiankoOS     - Browser-based desktop environment
  → Schwarzschild - A realistic meteor simulator build alongside 5 teammates in two days hackathon.`,

    contact: `Contact Information:
  📧 Email:    me@anubhavprasai.com.np
  🐙 GitHub:   github.com/Fianko-codes
  💼 LinkedIn: linkedin.com/in/anubhavprasai
  🐦 Twitter:  @PrasaiAnubhav
  📸 Instagram: @__dear.honey__`,

    theme: `Current Theme: Catppuccin Mocha
  
A soothing pastel theme for the modern developer.`,
};

export const TerminalAppMobile = () => {
    const [history, setHistory] = useState<Array<{ prompt: string; output: string }>>([
        {
            prompt: '',
            output: `Welcome to FiankoOS Terminal
Type 'help' for available commands.
`
        }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        }

        let output = '';
        if (trimmedCmd === '') {
            output = '';
        } else if (commands[trimmedCmd]) {
            output = commands[trimmedCmd];
        } else {
            output = `Command not found: ${trimmedCmd}
Type 'help' for available commands.`;
        }

        setHistory(prev => [...prev, { prompt: cmd, output }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput('');
    };

    return (
        <div
            className="h-full bg-[hsl(var(--ctp-mantle))] font-mono text-sm flex flex-col"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Output */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-auto p-4 space-y-3"
            >
                {history.map((entry, i) => (
                    <div key={i}>
                        {entry.prompt && (
                            <div className="flex gap-2 text-[hsl(var(--ctp-green))]">
                                <span>{PROMPT}$</span>
                                <span className="text-[hsl(var(--ctp-text))]">{entry.prompt}</span>
                            </div>
                        )}
                        {entry.output && (
                            <pre className="text-[hsl(var(--ctp-subtext1))] whitespace-pre-wrap mt-1 leading-relaxed">
                                {entry.output}
                            </pre>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-[hsl(var(--ctp-crust))]/50 border-t border-[hsl(var(--ctp-surface0))]">
                <div className="flex gap-2 text-[hsl(var(--ctp-green))]">
                    <span className="shrink-0">{PROMPT}$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-[hsl(var(--ctp-text))] caret-[hsl(var(--ctp-green))]"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
            </form>
        </div>
    );
};
