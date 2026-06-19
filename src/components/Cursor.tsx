"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if pointer is fine
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== "function") return;
      
      try {
        const isClickable = 
          window.getComputedStyle(target).cursor === "pointer" ||
          (target.tagName && target.tagName.toLowerCase() === "a") ||
          (target.tagName && target.tagName.toLowerCase() === "button") ||
          target.closest("a") !== null ||
          target.closest("button") !== null;
          
        setIsPointer(isClickable);
      } catch (err) {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - (isPointer ? 24 : 12),
        y: position.y - (isPointer ? 24 : 12),
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      {/* Custom Crosshair or Character Head Cursor */}
      <svg 
        width={isPointer ? "48" : "24"} 
        height={isPointer ? "48" : "24"} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-neo-yellow drop-shadow-md"
      >
        <circle cx="12" cy="12" r="10" fill={isPointer ? "var(--color-neo-purple)" : "transparent"} stroke="var(--color-neo-yellow)" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    </motion.div>
  );
}
