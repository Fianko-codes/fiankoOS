import { Desktop } from '@/components/desktop/Desktop';
import { MobileOS } from '@/components/mobile/MobileOS';
import { useIsMobile } from '@/hooks/useIsMobile';
import { BootScreen } from '@/components/BootScreen';
import { useState } from 'react';

const Index = () => {
  const isMobile = useIsMobile();
  const [showBootScreen, setShowBootScreen] = useState(true);

  if (showBootScreen) {
    return <BootScreen onComplete={() => setShowBootScreen(false)} />;
  }

  return isMobile ? <MobileOS /> : <Desktop />;
};

export default Index;
