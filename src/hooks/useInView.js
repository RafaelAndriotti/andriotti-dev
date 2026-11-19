import { useEffect, useRef, useState } from "react";

// Retorna [ref, visivel]. Com `once`, para de observar depois da primeira vez.
export function useInView({ threshold = 0.15, once = true, root = null } = {}) {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisivel(entry.isIntersecting);
        if (entry.isIntersecting && once) obs.disconnect();
      },
      { threshold, root: root?.current ?? null }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, root]);

  return [ref, visivel];
}

export const reduzMovimento = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
