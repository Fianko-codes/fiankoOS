import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useMobileStore } from '@/stores/useMobileStore';
import { ReactNode } from 'react';

interface MobileAppContainerProps {
    title: string;
    children: ReactNode;
}

export const MobileAppContainer = ({ title, children }: MobileAppContainerProps) => {
    const { closeApp } = useMobileStore();

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-40 bg-[hsl(var(--ctp-base))] flex flex-col"
        >
            {/* App Header */}
            <div className="h-16 safe-top flex items-center justify-between px-4 
                      bg-[hsl(var(--ctp-surface0))]/95 backdrop-blur-xl border-b border-[hsl(var(--ctp-surface1))]">
                <button
                    onClick={closeApp}
                    className="w-10 h-10 flex items-center justify-center rounded-lg
                     text-[hsl(var(--ctp-mauve))] hover:bg-[hsl(var(--ctp-surface1))]
                     transition-colors touch-manipulation"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <h1 className="text-lg font-semibold text-[hsl(var(--ctp-text))]">
                    {title}
                </h1>

                <button
                    onClick={closeApp}
                    className="w-10 h-10 flex items-center justify-center rounded-lg
                     text-[hsl(var(--ctp-subtext0))] hover:bg-[hsl(var(--ctp-surface1))]
                     transition-colors touch-manipulation"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-auto safe-bottom">
                {children}
            </div>
        </motion.div>
    );
};
