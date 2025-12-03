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

    // Separate apps into Dock and Grid
    const dockAppIds = ['terminal', 'code', 'projects', 'about'];
    const dockApps = apps.filter(app => dockAppIds.includes(app.id));
    const gridApps = apps.filter(app => !dockAppIds.includes(app.id));

    return (
        <div className="absolute inset-0 pt-14 pb-safe bg-gradient-to-br from-ctp-base via-ctp-mantle to-ctp-crust overflow-hidden flex flex-col">

            {/* Background Blur Effect */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--ctp-mauve))] rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--ctp-teal))] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main App Grid */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="grid grid-cols-4 gap-x-4 gap-y-8">
                    {gridApps.map((app, index) => (
                        <AppIcon key={app.id} app={app} index={index} onClick={() => openApp(app.id)} />
                    ))}
                </div>
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--ctp-text))]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--ctp-surface2))]" />
            </div>

            {/* Dock */}
            <div className="mx-4 mb-6 p-4 rounded-[2rem] bg-[hsl(var(--ctp-surface0))]/40 backdrop-blur-xl border border-[hsl(var(--ctp-surface1))]/50">
                <div className="flex justify-between items-center px-2">
                    {dockApps.map((app, index) => (
                        <AppIcon key={app.id} app={app} index={index} onClick={() => openApp(app.id)} isDock />
                    ))}
                </div>
            </div>
        </div>
    );
};

const AppIcon = ({ app, index, onClick, isDock = false }: { app: MobileApp; index: number; onClick: () => void; isDock?: boolean }) => (
    <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05 + (isDock ? 0.2 : 0) }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1 touch-manipulation"
    >
        {/* App Icon */}
        <div className={`
            ${isDock ? 'w-14 h-14' : 'w-16 h-16'} 
            rounded-2xl bg-gradient-to-br ${app.color} 
            flex items-center justify-center text-[hsl(var(--ctp-crust))]
            shadow-lg ring-1 ring-white/10
        `}>
            {app.icon}
        </div>

        {/* App Name (Hide for Dock if desired, but usually shown or hidden. iOS hides dock labels) */}
        {!isDock && (
            <span className="text-xs text-[hsl(var(--ctp-text))] text-center leading-tight font-medium drop-shadow-md">
                {app.name}
            </span>
        )}
    </motion.button>
);
