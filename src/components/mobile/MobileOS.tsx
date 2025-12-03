import { AnimatePresence } from 'framer-motion';
import { useMobileStore } from '@/stores/useMobileStore';
import { LockScreen } from './LockScreen';
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileStatusBar } from './MobileStatusBar';
import { MobileAppContainer } from './MobileAppContainer';

// Mobile App Components
import { AboutAppMobile } from './apps/AboutAppMobile';
import { ProjectsAppMobile } from './apps/ProjectsAppMobile';
import { TerminalAppMobile } from './apps/TerminalAppMobile';
import { CodeViewerAppMobile } from './apps/CodeViewerAppMobile';
import { SettingsAppMobile } from './apps/SettingsAppMobile';
import { BlogsAppMobile } from './apps/BlogsAppMobile';
import { ResumeAppMobile } from './apps/ResumeAppMobile';

const APP_COMPONENTS = {
    about: { component: AboutAppMobile, title: 'About Me' },
    projects: { component: ProjectsAppMobile, title: 'Projects' },
    terminal: { component: TerminalAppMobile, title: 'Terminal' },
    code: { component: CodeViewerAppMobile, title: 'Code Viewer' },
    settings: { component: SettingsAppMobile, title: 'Settings' },
    blogs: { component: BlogsAppMobile, title: 'Blogs' },
    resume: { component: ResumeAppMobile, title: 'Resume' },
};

export const MobileOS = () => {
    const { isLocked, activeApp } = useMobileStore();

    const renderActiveApp = () => {
        if (!activeApp) return null;

        const appConfig = APP_COMPONENTS[activeApp];
        if (!appConfig) return null;

        const AppComponent = appConfig.component;

        return (
            <MobileAppContainer title={appConfig.title}>
                <AppComponent />
            </MobileAppContainer>
        );
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[hsl(var(--ctp-base))]">
            {/* Lock Screen */}
            <AnimatePresence>
                {isLocked && <LockScreen />}
            </AnimatePresence>

            {/* Main Interface (shown when unlocked) */}
            {!isLocked && (
                <>
                    <MobileStatusBar isVisible={!activeApp} />
                    <MobileHomeScreen />

                    {/* Active App Overlay */}
                    <AnimatePresence>
                        {renderActiveApp()}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};
