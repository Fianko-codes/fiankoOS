import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
    onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [stage, setStage] = useState(0);
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        // Sequence timing
        // 0ms: Black screen (Stage 0)

        // 500ms: Cursor appears (Stage 1)
        timeouts.push(setTimeout(() => setStage(1), 500));

        // 550ms: Booting text (Stage 2)
        timeouts.push(setTimeout(() => setStage(2), 550));

        // 600ms: Tick 1
        timeouts.push(setTimeout(() => {
            setLines(prev => [...prev, "[ OK ] loading kernel-space ui"]);
        }, 600));

        // 675ms: Tick 2
        timeouts.push(setTimeout(() => {
            setLines(prev => [...prev, "[ OK ] mounting /home/fianko"]);
        }, 675));

        // 750ms: Tick 3
        timeouts.push(setTimeout(() => {
            setLines(prev => [...prev, "[ OK ] initializing window manager"]);
        }, 750));

        // 800ms: Logo + Final text (Stage 3)
        timeouts.push(setTimeout(() => setStage(3), 800));

        // 1100ms: Finish
        timeouts.push(setTimeout(onComplete, 1100));

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-start justify-start p-4 md:p-10 font-mono text-xs md:text-sm text-cyan-400 overflow-hidden cursor-none select-none">
            <div className="w-full max-w-2xl space-y-1">

                {/* Stage 1: Cursor */}
                {stage >= 1 && stage < 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.1, times: [0, 0.5, 1] }}
                        className="w-2 h-4 bg-cyan-400 inline-block"
                    />
                )}

                {/* Stage 2: Booting Text */}
                {stage >= 2 && (
                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400">{">>"}</span>
                        <span className="text-white">booting fiankoOS [arch-minimal]</span>
                    </div>
                )}

                {/* Diagnostic Lines */}
                <div className="flex flex-col text-gray-400">
                    {lines.map((line, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-green-500">{line.substring(0, 6)}</span>
                            <span>{line.substring(6)}</span>
                        </div>
                    ))}
                </div>

                {/* Stage 3: Logo & Final Text */}
                {stage >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, filter: "brightness(0)" }}
                        animate={{ opacity: 1, filter: "brightness(1)" }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        className="mt-8"
                    >
                        <pre className="text-cyan-500 font-bold leading-none tracking-tighter mb-4 opacity-80">
                            {`
  ███████╗██╗ █████╗ ███╗   ██╗██╗  ██╗ ██████╗ 
  ██╔════╝██║██╔══██╗████╗  ██║██║ ██╔╝██╔═══██╗
  █████╗  ██║███████║██╔██╗ ██║█████╔╝ ██║   ██║
  ██╔══╝  ██║██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║
  ██║     ██║██║  ██║██║ ╚████║██║  ██╗╚██████╔╝
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ 
`}
                        </pre>
                        <div className="text-white mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            system ready — launching tty0
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
