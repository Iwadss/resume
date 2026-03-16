import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
    threshold?: number;    // 0–1, how much of element must be visible
    rootMargin?: string;   // e.g. "0px 0px -80px 0px"
    once?: boolean;        // only trigger once (default: true)
}

/**
 * Returns [ref, isVisible].
 * Attach `ref` to any element; `isVisible` becomes true when
 * the element enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    once = true,
}: UseScrollRevealOptions = {}) {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return [ref, isVisible] as const;
}
