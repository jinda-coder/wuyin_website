import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
    mode: ThemeMode;
    resolvedMode: 'light' | 'dark';
    setMode: (mode: ThemeMode) => void;
    toggle: () => void;
}

const resolveTheme = (mode: ThemeMode): 'light' | 'dark' => {
    if (mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
};

export const useThemeStore = create<ThemeState>()(
    persist<ThemeState>(
        (set, get) => ({
            mode: 'system',
            resolvedMode: resolveTheme('system'),

            setMode: (mode) => {
                const resolvedMode = resolveTheme(mode);
                set({ mode, resolvedMode });
                applyTheme(resolvedMode);
            },

            toggle: () => {
                const nextMode = get().resolvedMode === 'light' ? 'dark' : 'light';
                set({ mode: nextMode, resolvedMode: nextMode });
                applyTheme(nextMode);
            }
        }),
        {
            name: 'theme-store',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const resolvedMode = resolveTheme(state.mode);
                    state.resolvedMode = resolvedMode;
                    applyTheme(resolvedMode);
                }
            }
        }
    )
);

const applyTheme = (mode: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', mode);
};
