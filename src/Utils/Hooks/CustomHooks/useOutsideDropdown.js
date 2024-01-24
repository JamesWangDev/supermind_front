/**
 * It returns a ref, a boolean, and a function that toggles the boolean
 * @param initialIsVisible - The initial state of the component.
 * @returns The return value is an object with three properties:
 */
import { useState, useEffect, useRef } from "react";

export default function useOutsideDropdown() {
  const [isComponentVisible, setIsComponentVisible] = useState();
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
