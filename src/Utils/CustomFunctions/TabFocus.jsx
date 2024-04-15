import { useEffect, useState } from 'react';

const TabFocusChecker = () => {
  const [isTabInFocus, setIsTabInFocus] = useState(true); // Default to true when the component mounts

  // Define a function to handle visibility changes
  const handleVisibilityChange = () => {
    setIsTabInFocus(document.visibilityState === 'visible');
  };

  // Add an event listener to track visibility changes
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isTabInFocus;
};

export default TabFocusChecker;
