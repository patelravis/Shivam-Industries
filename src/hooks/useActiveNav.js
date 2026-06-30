import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useActiveNav() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return activePath === '/';
    return activePath.startsWith(path);
  };

  return { activePath, isActive };
}

export default useActiveNav;
