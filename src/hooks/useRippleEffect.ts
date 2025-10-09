import { useState } from "react";

export type Ripple = {
  x: number;
  y: number;
  size: number;
};

export function useRippleEffect(duration = 1000) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => setRipples([]), duration);
  };

  return { ripples, createRipple };
}