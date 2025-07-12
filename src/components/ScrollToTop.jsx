// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page on route change
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
