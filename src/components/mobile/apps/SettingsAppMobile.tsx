import { useState } from 'react';
import { Palette, Moon, Sun } from 'lucide-react';

export const SettingsAppMobile = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [notifications, setNotifications] = useState(true);
    const [animations, setAnimations] = useState(true);

    const themes = [
        { name: 'Mocha', color: 'from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]' },
        { name: 'Macchiato', color: 'from-[hsl(var(--ctp-blue))] to-[hsl(var(--ctp-sapphire))]' },
        { name: 'Frappe', color: 'from-[hsl(var(--ctp-green))] to-[hsl(var(--ctp-teal))]' },
        { name: 'Latte', color: 'from-[hsl(var(--ctp-peach))] to-[hsl(var(--ctp-yellow))]' },
    ];

    return (
        <div className="p-6 space-y-6">

            {/* Appearance Section */}
            <div>
                <h2 className="text-xl font-semibold text-[hsl(var(--ctp-text))] mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[hsl(var(--ctp-mauve))]" />
                    Appearance
                </h2>

                {/* Dark/Light Mode */}
                <div className="mb-4 p-4 rounded-xl bg-[hsl(var(--ctp-surface0))]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-[hsl(var(--ctp-text))]">Theme Mode</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all touch-manipulation ${theme === 'dark'
                                    ? 'bg-[hsl(var(--ctp-surface2))] text-[hsl(var(--ctp-mauve))]'
                                    : 'bg-[hsl(var(--ctp-surface1))] text-[hsl(var(--ctp-subtext0))]'
                                }`}
                        >
                            <Moon className="w-6 h-6" />
                            <span className="text-xs">Dark</span>
                        </button>
                        <button
                            onClick={() => setTheme('light')}
                            className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all touch-manipulation ${theme === 'light'
                                    ? 'bg-[hsl(var(--ctp-surface2))] text-[hsl(var(--ctp-mauve))]'
                                    : 'bg-[hsl(var(--ctp-surface1))] text-[hsl(var(--ctp-subtext0))]'
                                }`}
                        >
                            <Sun className="w-6 h-6" />
                            <span className="text-xs">Light</span>
                        </button>
                    </div>
                </div>

                {/* Theme Variants */}
                <div className="space-y-3">
                    <span className="text-sm font-medium text-[hsl(var(--ctp-text))]">Color Theme</span>
                    <div className="grid grid-cols-2 gap-3">
                        {themes.map((t) => (
                            <button
                                key={t.name}
                                className="p-4 rounded-xl bg-[hsl(var(--ctp-surface0))] hover:bg-[hsl(var(--ctp-surface1))]
                         transition-colors active:scale-95 touch-manipulation"
                            >
                                <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${t.color} mb-2`} />
                                <span className="text-sm text-[hsl(var(--ctp-text))]">{t.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Preferences Section */}
            <div>
                <h2 className="text-xl font-semibold text-[hsl(var(--ctp-text))] mb-4">
                    Preferences
                </h2>

                <div className="space-y-3">
                    {/* Notifications Toggle */}
                    <div className="p-4 rounded-xl bg-[hsl(var(--ctp-surface0))] flex items-center justify-between touch-manipulation">
                        <div>
                            <div className="text-sm font-medium text-[hsl(var(--ctp-text))] mb-1">
                                Notifications
                            </div>
                            <div className="text-xs text-[hsl(var(--ctp-subtext0))]">
                                Show desktop notifications
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-14 h-8 rounded-full transition-colors relative ${notifications ? 'bg-[hsl(var(--ctp-mauve))]' : 'bg-[hsl(var(--ctp-surface2))]'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Animations Toggle */}
                    <div className="p-4 rounded-xl bg-[hsl(var(--ctp-surface0))] flex items-center justify-between touch-manipulation">
                        <div>
                            <div className="text-sm font-medium text-[hsl(var(--ctp-text))] mb-1">
                                Animations
                            </div>
                            <div className="text-xs text-[hsl(var(--ctp-subtext0))]">
                                Enable smooth transitions
                            </div>
                        </div>
                        <button
                            onClick={() => setAnimations(!animations)}
                            className={`w-14 h-8 rounded-full transition-colors relative ${animations ? 'bg-[hsl(var(--ctp-mauve))]' : 'bg-[hsl(var(--ctp-surface2))]'
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${animations ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="pt-6 border-t border-[hsl(var(--ctp-surface1))]">
                <div className="text-center text-sm text-[hsl(var(--ctp-subtext0))] space-y-1">
                    <p className="font-semibold text-[hsl(var(--ctp-text))]">FiankoOS Mobile</p>
                    <p>Version 1.0.0</p>
                    <p className="text-xs">Built with React & Framer Motion</p>
                </div>
            </div>
        </div>
    );
};
