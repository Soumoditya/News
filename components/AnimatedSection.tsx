"use client";
import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  /** Cascade direct children instead of animating as one block */
  stagger?: boolean;
  /** Delay before the reveal starts, in ms */
  delay?: number;
  /** Extra styles on the wrapper */
  style?: CSSProperties;
  className?: string;
}

/**
 * Scroll-reveal wrapper. Adds `.is-visible` when the element enters the
 * viewport, driving the .reveal / .stagger CSS transitions in globals.css.
 * Reduced-motion users are handled by the CSS media query.
 */
export default function AnimatedSection({ children, stagger = false, delay = 0, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            const t = setTimeout(() => setVisible(true), delay);
            observer.disconnect();
            return () => clearTimeout(t);
          }
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${stagger ? "stagger" : "reveal"}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
