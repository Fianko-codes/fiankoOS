import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-40 bg-[hsl(var(--ctp-base))] flex flex-col"
        >
            {/* App Header */}
            <div className="h-14 safe-top flex items-center px-4 gap-4
                      bg-[hsl(var(--ctp-surface0))]/95 backdrop-blur-xl border-b border-[hsl(var(--ctp-surface1))]">
                <button
                    onClick={closeApp}
                    className="w-10 h-10 flex items-center justify-center rounded-full
                     bg-[hsl(var(--ctp-surface1))] text-[hsl(var(--ctp-text))] 
                     hover:bg-[hsl(var(--ctp-surface2))] transition-colors touch-manipulation"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <h1 className="text-lg font-semibold text-[hsl(var(--ctp-text))]">
                    {title}
                </h1>
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>

            {/* Home Bar */}
            <div className="h-8 w-full flex justify-center items-center pb-2 bg-[hsl(var(--ctp-base))] safe-bottom cursor-pointer" onClick={closeApp}>
                <div className="w-32 h-1.5 bg-[hsl(var(--ctp-surface2))] rounded-full" />
            </div>
        </motion.div>
    );
};
