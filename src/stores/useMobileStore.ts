import { create } from 'zustand';

export type MobileAppId = 'about' | 'projects' | 'terminal' | 'code' | 'settings' | 'blogs' | 'resume';

interface MobileState {
    isLocked: boolean;
    activeApp: MobileAppId | null;
    isAppDrawerOpen: boolean;
    isNotificationPanelOpen: boolean;
    homeScreenPage: number;
}

interface MobileActions {
    unlock: () => void;
    lock: () => void;
    openApp: (appId: MobileAppId) => void;
    closeApp: () => void;
    toggleAppDrawer: () => void;
    closeAppDrawer: () => void;
    toggleNotificationPanel: () => void;
    closeNotificationPanel: () => void;
    setHomeScreenPage: (page: number) => void;
}

export type MobileStore = MobileState & MobileActions;

export const useMobileStore = create<MobileStore>((set) => ({
    // Initial state
    isLocked: true,
    activeApp: null,
    isAppDrawerOpen: false,
    isNotificationPanelOpen: false,
    homeScreenPage: 0,

    // Actions
    unlock: () => set({ isLocked: false }),
    lock: () => set({ isLocked: true, activeApp: null }),

    openApp: (appId) => set({
        activeApp: appId,
        isAppDrawerOpen: false,
        isNotificationPanelOpen: false
    }),

    closeApp: () => set({ activeApp: null }),

    toggleAppDrawer: () => set((state) => ({
        isAppDrawerOpen: !state.isAppDrawerOpen,
        isNotificationPanelOpen: false
    })),

    closeAppDrawer: () => set({ isAppDrawerOpen: false }),

    toggleNotificationPanel: () => set((state) => ({
        isNotificationPanelOpen: !state.isNotificationPanelOpen,
        isAppDrawerOpen: false
    })),

    closeNotificationPanel: () => set({ isNotificationPanelOpen: false }),

    setHomeScreenPage: (page) => set({ homeScreenPage: page }),
}));
