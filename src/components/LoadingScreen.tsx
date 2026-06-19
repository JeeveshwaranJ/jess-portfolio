"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Character from "./Character";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEM...");
  const [isDone, setIsDone] = useState(false);

  // Cycling funny status messages based on progress
  useEffect(() => {
    if (progress < 15) {
      setLoadingText("WAKING UP JESS...");
    } else if (progress < 30) {
      setLoadingText("BREWING DIGITAL ESPRESSO...");
    } else if (progress < 45) {
      setLoadingText("THICKENING BLACK OUTLINES...");
    } else if (progress < 60) {
      setLoadingText("DEPLOYING AI SWARMS...");
    } else if (progress < 75) {
      setLoadingText("OFFSETTING DROP SHADOWS (NO BLUR)...");
    } else if (progress < 90) {
      setLoadingText("CALIBRATING CUSTOM CURSOR...");
    } else if (progress < 100) {
      setLoadingText("POLISHING THE LAB...");
    } else {
      setLoadingText("SYSTEM READY!");
    }
  }, [progress]);

  // Simulate progress loading
  useEffect(() => {
    // Disable scrolling when loading
    document.body.style.overflow = "hidden";

    let timer: NodeJS.Timeout;
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Unlock body scroll immediately at 100% so the site is scrollable/interactive
          document.body.style.overflow = "";
          // Wait slightly at 100% to let the user see the "READY" state
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800); // match exit transition duration
          }, 600);
          return 100;
        }

        // Variable loading jumps for realism
        const remaining = 100 - prev;
        const jump = Math.min(
          remaining,
          Math.floor(Math.random() * 15) + 5
        );
        return prev + jump;
      });
    };

    // Run interval
    const intervalTime = Math.floor(Math.random() * 200) + 100; // 100ms - 300ms
    timer = setInterval(updateProgress, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Number of blocks in our pixelated progress bar
  const totalBlocks = 15;
  const activeBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <AnimatePresence>
      {!isDone && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-300 ${
          progress === 100 ? "pointer-events-none" : "pointer-events-auto"
        }`}>
          
          {/* Shutter Left Panel */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-neo-purple border-r-[4px] border-neo-black flex flex-col justify-center items-end pr-4 md:pr-12"
            initial={{ x: 0 }}
            exit={{ 
              x: "-100%", 
              transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] } 
            }}
          >
            <div className="max-w-[90vw] text-right pointer-events-none select-none">
              <div className="font-display text-5xl md:text-8xl lg:text-[7rem] text-neo-yellow drop-shadow-[4px_4px_0_#121212] leading-none uppercase">
                JESS
              </div>
            </div>
          </motion.div>

          {/* Shutter Right Panel */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-neo-purple border-l-[4px] border-neo-black flex flex-col justify-center items-start pl-4 md:pl-12"
            initial={{ x: 0 }}
            exit={{ 
              x: "100%", 
              transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] } 
            }}
          >
            <div className="max-w-[90vw] text-left pointer-events-none select-none">
              <div className="font-display text-5xl md:text-8xl lg:text-[7rem] text-neo-cream drop-shadow-[4px_4px_0_#121212] leading-none uppercase">
                .DEV
              </div>
            </div>
          </motion.div>

          {/* Centered Loading Dashboard */}
          <motion.div
            className="absolute z-10 flex flex-col items-center justify-center p-8 max-w-lg w-full bg-neo-cream border-brutal-thick shadow-brutal mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 0.5, 
              opacity: 0, 
              transition: { duration: 0.4, ease: "easeInOut" } 
            }}
          >
            {/* Mascot Container */}
            <div className="mb-6 relative h-36 w-36 flex items-center justify-center">
              <Character pose={progress === 100 ? "celebrating" : "waving"} className="w-32 h-32 scale-[0.8]" alt="Jess.dev animated avatar greeting during portfolio load" />
            </div>

            {/* Percentage Display */}
            <motion.div 
              className="font-display text-6xl md:text-7xl text-neo-black mb-4 select-none"
              key={progress}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {progress}%
            </motion.div>

            {/* Simulated Neo-Brutalist Progress Bar */}
            <div className="w-full bg-neo-black p-1.5 border-brutal flex gap-1 h-10 mb-4 overflow-hidden relative">
              {Array.from({ length: totalBlocks }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full border-2 border-neo-black transition-colors duration-150 ${
                    i < activeBlocks 
                      ? "bg-neo-orange" 
                      : "bg-[#2a2a2a]"
                  }`}
                />
              ))}
            </div>

            {/* Loading Phrase Box */}
            <div className="w-full bg-neo-yellow border-brutal p-3 text-center shadow-brutal-sm">
              <p className="font-body font-bold text-xs md:text-sm text-neo-black tracking-wider uppercase animate-pulse">
                {loadingText}
              </p>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
