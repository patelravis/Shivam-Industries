import { useEffect, useRef } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';

function SiteHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    window.addEventListener('resize', syncHeight, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <TopBar />
      <Navbar />
    </header>
  );
}

export default SiteHeader;
