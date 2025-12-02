import { motion } from 'framer-motion';
import { useMobileStore, MobileAppId } from '@/stores/useMobileStore';
import { Terminal, User, FolderKanban, Settings, Code, BookOpen, FileText } from 'lucide-react';

interface MobileApp {
    id: MobileAppId;
    name: string;
    icon: React.ReactNode;
    color: string;
}

const apps: MobileApp[] = [
    {
        id: 'terminal',
        name: 'Terminal',
        icon: <Terminal className="w-8 h-8" />,
        color: 'from-ctp-green to-ctp-teal',
    },
    {
        id: 'about',
        name: 'About',
        icon: <User className="w-8 h-8" />,
        color: 'from-ctp-mauve to-ctp-pink',
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: <FolderKanban className="w-8 h-8" />,
        color: 'from-ctp-blue to-ctp-sapphire',
    },
    {
        id: 'code',
        name: 'Code',
        icon: <Code className="w-8 h-8" />,
        color: 'from-ctp-peach to-ctp-yellow',
    },
    {
        id: 'blogs',
        name: 'Blogs',
        icon: <BookOpen className="w-8 h-8" />,
        color: 'from-ctp-blue to-ctp-sapphire',
    },
    {
        id: 'resume',
        name: 'Resume',
        icon: <FileText className="w-8 h-8" />,
        color: 'from-ctp-red to-ctp-maroon',
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: <Settings className="w-8 h-8" />,
        color: 'from-ctp-overlay0 to-ctp-surface2',
    },
];

export const MobileHomeScreen = () => {
    const { openApp } = useMobileStore();

    return (
        <div className="absolute inset-0 pt-12 pb-safe bg-gradient-to-br from-ctp-base via-ctp-mantle to-ctp-crust overflow-hidden">

            {/* Background Blur Effect */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--ctp-mauve))] rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--ctp-teal))] rounded-full blur-3xl" />
            </div>

            {/* App Grid */}
            <div className="relative h-full p-8 overflow-auto">
                <div className="grid grid-cols-4 gap-6 max-w-md mx-auto">
                    {apps.map((app, index) => (
                        <motion.button
                            key={app.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openApp(app.id)}
                            className="flex flex-col items-center gap-2 touch-manipulation"
                        >
                            {/* App Icon */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} 
                            flex items-center justify-center text-[hsl(var(--ctp-crust))]
                            shadow-lg`}>
                                {app.icon}
                            </div>

                            {/* App Name */}
                            <span className="text-xs text-[hsl(var(--ctp-text))] text-center leading-tight">
                                {app.name}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Page Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--ctp-text))]" />
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--ctp-surface2))]" />
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--ctp-surface2))]" />
                </div>
            </div>
        </div>
    );
};
