import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { websiteRoutes } from './website/routes';
import { adminRoutes } from './dashboard/routes';
import { EventBanner } from './components/EventBanner';
import { Navigation } from './components/Navigation';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function WebsiteContent({ isBannerVisible }: { isBannerVisible: boolean }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/apple-tree-tots/';

  // Add padding on non-home pages to account for fixed navbar + banner
  // pt-40 when banner is visible, pt-20 when banner is closed
  const paddingClass = !isHomePage ? (isBannerVisible ? 'pt-40' : 'pt-20') : '';

  return (
    <div className={paddingClass}>
      <Routes>
        {websiteRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

function AdminContent() {
  return (
    <Routes>
      {adminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export function App() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <DarkModeProvider isDark={false}>
      <ScrollToTop />
      {!isAdminRoute && (
        <>
          {isBannerVisible && <EventBanner onClose={() => setIsBannerVisible(false)} />}
          <Navigation bannerVisible={isBannerVisible} />
        </>
      )}

      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminContent />} />

        {/* Website routes */}
        <Route
          path="/*"
          element={<WebsiteContent isBannerVisible={isBannerVisible} />}
        />
      </Routes>
    </DarkModeProvider>
  );
}

// Wrapper component for Router
export function AppWithRouter() {
  return (
    <Router basename="/apple-tree-tots/">
      <App />
    </Router>
  );
}
