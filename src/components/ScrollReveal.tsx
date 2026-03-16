import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "fade";

interface ScrollRevealProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;       // ms delay
    duration?: number;    // ms duration
    threshold?: number;
    className?: string;
}

const initialStyles: Record<AnimationType, React.CSSProperties> = {
    "fade-up":    { opacity: 0, transform: "translateY(40px)" },
    "fade-down":  { opacity: 0, transform: "translateY(-40px)" },
    "fade-left":  { opacity: 0, transform: "translateX(40px)" },
    "fade-right": { opacity: 0, transform: "translateX(-40px)" },
    "zoom":       { opacity: 0, transform: "scale(0.92)" },
    "fade":       { opacity: 0 },
};

const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: "none",
};

/**
 * Wraps children in a div that animates into view on scroll.
 */
const ScrollReveal = ({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 600,
    threshold = 0.15,
    className = "",
}: ScrollRevealProps) => {
    const [ref, isVisible] = useScrollReveal({ threshold });

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...(isVisible ? visibleStyle : initialStyles[animation]),
                transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
