import { useState, useRef, useEffect } from 'react';

/**
 * Closes the burger menu user clicks outside of the menu.
 * The variables and logic have been created using the Moments walkthrough.
 */
const useClickOutsideToggle = () => {
    const [ expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setExpanded(false);
        }
      }
  
      document.addEventListener('mouseup', handleClickOutside);
      return () => {
        document.removeEventListener('mouseup', handleClickOutside);
      }
    }, [ref]);

    return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;