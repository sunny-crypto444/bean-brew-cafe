import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to elements with the `reveal` class
 * when they scroll into view. Returns a ref to attach to a container
 * (defaults to the window).
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const els = root.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
