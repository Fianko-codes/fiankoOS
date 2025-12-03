import { create } from 'zustand';

export type ThemeVariant = 'mocha' | 'macchiato' | 'frappe' | 'latte';

interface ThemeState {
    theme: ThemeVariant;
    setTheme: (theme: ThemeVariant) => void;
}

// Theme color definitions for each variant
const themeColors: Record<ThemeVariant, Record<string, string>> = {
    mocha: {
        // Catppuccin Mocha (Dark)
        'ctp-rosewater': '10 56% 91%',
        'ctp-flamingo': '0 59% 88%',
        'ctp-pink': '316 72% 86%',
        'ctp-mauve': '267 84% 81%',
        'ctp-red': '343 81% 75%',
        'ctp-maroon': '350 65% 77%',
        'ctp-peach': '23 92% 75%',
        'ctp-yellow': '41 86% 83%',
        'ctp-green': '115 54% 76%',
        'ctp-teal': '170 57% 73%',
        'ctp-sky': '189 71% 73%',
        'ctp-sapphire': '199 76% 69%',
        'ctp-blue': '217 92% 76%',
        'ctp-lavender': '232 97% 85%',
        'ctp-text': '226 64% 88%',
        'ctp-subtext1': '227 35% 80%',
        'ctp-subtext0': '228 24% 72%',
        'ctp-overlay2': '228 17% 64%',
        'ctp-overlay1': '227 12% 56%',
        'ctp-overlay0': '228 9% 48%',
        'ctp-surface2': '228 10% 38%',
        'ctp-surface1': '227 12% 30%',
        'ctp-surface0': '230 14% 22%',
        'ctp-base': '240 21% 15%',
        'ctp-mantle': '240 21% 12%',
        'ctp-crust': '240 23% 9%',
    },
    macchiato: {
        // Catppuccin Macchiato (Dark)
        'ctp-rosewater': '10 58% 88%',
        'ctp-flamingo': '0 58% 86%',
        'ctp-pink': '316 74% 85%',
        'ctp-mauve': '267 83% 80%',
        'ctp-red': '343 81% 75%',
        'ctp-maroon': '350 65% 77%',
        'ctp-peach': '23 92% 75%',
        'ctp-yellow': '41 88% 84%',
        'ctp-green': '115 54% 76%',
        'ctp-teal': '170 57% 73%',
        'ctp-sky': '189 71% 73%',
        'ctp-sapphire': '199 76% 69%',
        'ctp-blue': '220 91% 77%',
        'ctp-lavender': '232 97% 85%',
        'ctp-text': '227 68% 88%',
        'ctp-subtext1': '227 44% 80%',
        'ctp-subtext0': '228 29% 72%',
        'ctp-overlay2': '228 20% 64%',
        'ctp-overlay1': '227 15% 56%',
        'ctp-overlay0': '228 11% 48%',
        'ctp-surface2': '228 12% 38%',
        'ctp-surface1': '227 15% 30%',
        'ctp-surface0': '230 16% 23%',
        'ctp-base': '232 23% 18%',
        'ctp-mantle': '233 23% 15%',
        'ctp-crust': '232 23% 12%',
    },
    frappe: {
        // Catppuccin Frappe (Dark)
        'ctp-rosewater': '10 57% 88%',
        'ctp-flamingo': '0 59% 87%',
        'ctp-pink': '316 73% 86%',
        'ctp-mauve': '277 59% 76%',
        'ctp-red': '359 68% 71%',
        'ctp-maroon': '350 65% 77%',
        'ctp-peach': '23 92% 75%',
        'ctp-yellow': '41 88% 84%',
        'ctp-green': '115 54% 76%',
        'ctp-teal': '170 57% 73%',
        'ctp-sky': '189 71% 73%',
        'ctp-sapphire': '199 76% 69%',
        'ctp-blue': '222 74% 74%',
        'ctp-lavender': '239 66% 84%',
        'ctp-text': '227 70% 87%',
        'ctp-subtext1': '227 44% 79%',
        'ctp-subtext0': '228 29% 71%',
        'ctp-overlay2': '228 20% 63%',
        'ctp-overlay1': '227 15% 55%',
        'ctp-overlay0': '228 11% 47%',
        'ctp-surface2': '228 13% 39%',
        'ctp-surface1': '227 15% 31%',
        'ctp-surface0': '230 16% 23%',
        'ctp-base': '229 19% 20%',
        'ctp-mantle': '230 19% 17%',
        'ctp-crust': '229 20% 14%',
    },
    latte: {
        // Catppuccin Latte (Light)
        'ctp-rosewater': '11 59% 67%',
        'ctp-flamingo': '0 60% 67%',
        'ctp-pink': '316 73% 69%',
        'ctp-mauve': '266 85% 58%',
        'ctp-red': '347 87% 44%',
        'ctp-maroon': '355 76% 59%',
        'ctp-peach': '22 99% 52%',
        'ctp-yellow': '35 77% 49%',
        'ctp-green': '109 58% 40%',
        'ctp-teal': '183 74% 35%',
        'ctp-sky': '197 97% 46%',
        'ctp-sapphire': '189 70% 42%',
        'ctp-blue': '220 91% 54%',
        'ctp-lavender': '231 97% 72%',
        'ctp-text': '234 16% 35%',
        'ctp-subtext1': '233 13% 41%',
        'ctp-subtext0': '233 10% 47%',
        'ctp-overlay2': '232 10% 53%',
        'ctp-overlay1': '231 10% 59%',
        'ctp-overlay0': '228 11% 65%',
        'ctp-surface2': '227 12% 71%',
        'ctp-surface1': '225 14% 77%',
        'ctp-surface0': '223 16% 83%',
        'ctp-base': '220 23% 95%',
        'ctp-mantle': '220 22% 92%',
        'ctp-crust': '220 21% 89%',
    },
};

const applyTheme = (theme: ThemeVariant) => {
    const root = document.documentElement;
    const colors = themeColors[theme];

    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
};

export const useThemeStore = create<ThemeState>((set) => {
    // Load theme from localStorage or default to mocha
    const savedTheme = (localStorage.getItem('fianko-theme') as ThemeVariant) || 'mocha';

    // Apply initial theme
    applyTheme(savedTheme);

    return {
        theme: savedTheme,
        setTheme: (theme) => {
            applyTheme(theme);
            localStorage.setItem('fianko-theme', theme);
            set({ theme });
        },
    };
});
