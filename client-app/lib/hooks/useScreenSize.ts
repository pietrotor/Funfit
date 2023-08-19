import { useState, useEffect } from 'react';


const useScreenSize = () => {
  const MOBILE_SIZE = 640
  const TABLET_SIZE = 768
  const DESKTOP_SIZE = 1024
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: screenSize.width <= MOBILE_SIZE,
    isTablet: screenSize.width > MOBILE_SIZE && screenSize.width <= DESKTOP_SIZE,
    isDesktop: screenSize.width >= DESKTOP_SIZE,
  }
};

export default useScreenSize;