"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export type Pose = "idle" | "peeking" | "pointing" | "waving" | "celebrating" | "peeking-static";

interface CharacterProps {
  pose?: Pose;
  className?: string;
  showBg?: boolean;
  alt?: string;
}

/**
 * Character Component
 * 
 * Note: We are currently using a single image (`/avatar.jpg`) for all poses.
 * All poses are "transform-simulated" variants utilizing Framer-Motion 
 * container transforms on the whole image.
 * 
 * Swap out the src logic below if you acquire "true illustrated variants" for each pose.
 */
export default function Character({ pose = "idle", className = "", showBg = true, alt = "Jess.dev Avatar" }: CharacterProps) {
  // Animation variants for the whole character container
  const containerVariants: Variants = {
    idle: { 
      y: [0, -5, 0], 
      rotate: [0, 2, -2, 0],
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
    },
    peeking: { 
      x: ["100%", "0%"], 
      rotate: [-20, 0], 
      transition: { type: "spring", bounce: 0.5 } 
    },
    pointing: { 
      scale: 1,
      rotate: 5,
    },
    waving: { 
      rotate: [0, -10, 10, -10, 0],
      transition: { repeat: Infinity, duration: 2 } 
    },
    celebrating: { 
      y: [0, -20, 0], 
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.6, ease: "easeOut" } 
    },
    "peeking-static": {
      scale: 1,
      rotate: 0,
      y: 0,
    },
  };

  return (
    <motion.div 
      className={`relative w-64 h-64 ${className}`}
      variants={containerVariants}
      animate={pose}
      initial="idle"
    >
      {/* Background Circle */}
      {showBg && (
        <motion.div 
          className="absolute inset-0 bg-neo-purple rounded-full border-brutal-thick"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.6 }}
        />
      )}
      
      {/* Avatar Image */}
      <Image 
        src="/avatar.png" 
        alt={alt} 
        fill
        sizes="(max-width: 768px) 256px, 384px"
        className="object-contain pointer-events-none drop-shadow-[0_10px_0_rgba(18,18,18,1)] scale-[1.15] -translate-y-4"
        priority
        draggable={false}
      />
    </motion.div>
  );
}
