import { useEffect, useState } from 'react';

function useHasEntered(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry.isIntersecting) {
          setHasEntered(entry.isIntersecting);
          observer.unobserve(ref.current);
        }
      },
      {
        // rootMargin,
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount

  return hasEntered;
}

export { useHasEntered };
