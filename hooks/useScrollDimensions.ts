import { useState, useEffect } from 'react';

interface IDimension {
  scrollX: number;
  scrollY: number;
}
const getScrollDimensions = (window: any): IDimension => {
  const { scrollX, scrollY } = window;
  return {
    scrollX,
    scrollY,
  };
};

const useScrollDimensions = () => {
  const [scrollDimensions, setScrollDimensions] = useState<IDimension>({
    scrollX: 0,
    scrollY: 0,
  });

  useEffect(() => {
    setScrollDimensions(getScrollDimensions(window));
    function handleResize() {
      setScrollDimensions(getScrollDimensions(window));
    }

    window.addEventListener('scroll', handleResize);
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  return { scrollDimensions };
};

export default useScrollDimensions;
