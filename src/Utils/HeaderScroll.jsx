import React, { useEffect, useState } from 'react';
export function useHeaderScroll(value) {
  const [UpScroll, setUpScroll] = useState(value);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const handleScroll = () => {
    if (window.scrollY > 8) {
      setUpScroll(true);
    } else {
      setUpScroll(false);
    }
  };
  return UpScroll;
}
