import { useEffect } from 'react';

const useOnClick = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Inner Click: Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
};

export default useOnClick;
