import { useState } from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { useThemeStore, ThemeVariant } from '@/stores/useThemeStore';

export const SettingsAppMobile = () => {
    const { theme, setTheme } = useThemeStore();
    const [notifications, setNotifications] = useState(true);
    const [animations, setAnimations] = useState(true);

    const themes: { name: string; variant: ThemeVariant; color: string; isDark: boolean }[] = [
        { name: 'Mocha', variant: 'mocha', color: 'from-[hsl(var(--ctp-mauve))] to-[hsl(var(--ctp-pink))]', isDark: true },
        { name: 'Macchiato', variant: 'macchiato', color: 'from-[hsl(var(--ctp-blue))] to-[hsl(var(--ctp-sapphire))]', isDark: true },
        { name: 'Frappe', variant: 'frappe', color: 'from-[hsl(var(--ctp-green))] to-[hsl(var(--ctp-teal))]', isDark: true },
        { name: 'Latte', variant: 'latte', color: 'from-[hsl(var(--ctp-peach))] to-[hsl(var(--ctp-yellow))]', isDark: false },
    ];

    return (
        <div className="p-6 space-y-6">

            {/* Appearance Section */}
            <div>
                <h2 className="text-xl font-semibold text-[hsl(var(--ctp-text))] mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[hsl(var(--ctp-mauve))]" />
                    Appearance
                </h2>

                {/* Theme Variants */}
                <div className="space-y-3">
                    <span className="text-sm font-medium text-[hsl(var(--ctp-text))]">Color Theme</span>
                    <div className="grid grid-cols-2 gap-3">
                        {themes.map((t) => (
                            <button
                                key={t.variant}
                                onClick={() => setTheme(t.variant)}
                                className={`p-4 rounded-xl transition-all active:scale-95 touch-manipulation ${theme === t.variant
                                    ? 'bg-[hsl(var(--ctp-surface2))] ring-2 ring-[hsl(var(--ctp-mauve))]'
                                    : 'bg-[hsl(var(--ctp-surface0))] hover:bg-[hsl(var(--ctp-surface1))]'
                                    }`}
                            >
                                <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${t.color} mb-2`} />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[hsl(var(--ctp-text))]">{t.name}</span>
                                    {t.isDark ? (
                                        <Moon className="w-3.5 h-3.5 text-[hsl(var(--ctp-subtext0))]" />
                                    ) : (
                                        <Sun className="w-3.5 h-3.5 text-[hsl(var(--ctp-subtext0))]" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="pt-6 border-t border-[hsl(var(--ctp-surface1))]">
                <div className="text-center text-sm text-[hsl(var(--ctp-subtext0))] space-y-1">
                    <p className="font-semibold text-[hsl(var(--ctp-text))]">FiankoOS Mobile</p>
                </div>
            </div>
        </div>
    );
};
