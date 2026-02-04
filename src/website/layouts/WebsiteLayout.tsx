import React, { ReactNode } from 'react';
import { Navigation } from '../components';
import { EventBanner } from '../components';

interface WebsiteLayoutProps {
  children: ReactNode;
  showBanner?: boolean;
  onBannerClose?: () => void;
}

export function WebsiteLayout({ children, showBanner = true, onBannerClose }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen">
      {showBanner && <EventBanner onClose={onBannerClose || (() => {})} />}
      <Navigation bannerVisible={showBanner} />
      <main>
        {children}
      </main>
    </div>
  );
}
