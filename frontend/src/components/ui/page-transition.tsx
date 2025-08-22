'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // When the path changes, start the exit animation
    setIsAnimating(true);
    
    // After a short delay, update the children and start the enter animation
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsAnimating(false);
    }, 300); // Match this with the CSS transition duration
    
    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div
      className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;