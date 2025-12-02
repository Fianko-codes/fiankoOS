import { Desktop } from '@/components/desktop/Desktop';
import { MobileOS } from '@/components/mobile/MobileOS';
import { useIsMobile } from '@/hooks/useIsMobile';

const Index = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileOS /> : <Desktop />;
};

export default Index;
