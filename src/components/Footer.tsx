"use client";

import { motion } from "framer-motion";
import Character from "./Character";

export default function Footer() {
  const words = ["I BUILD DIGITAL BUSINESSES", "LET'S WORK", "JESS.DEV"];

  return (
    <footer className="w-full bg-neo-black relative overflow-hidden flex flex-col items-center justify-end min-h-[50vh] border-t-brutal-thick pt-20">
      
      {/* Waving Character */}
      <motion.div 
        className="relative z-10 -mb-10"
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
      >
        <Character pose="waving" className="w-80 h-80" alt="Jess.dev avatar waving goodbye" />
      </motion.div>

      {/* Caution Tape Marquee */}
      <div className="w-full h-16 bg-neo-yellow border-t-brutal border-b-brutal flex overflow-hidden relative z-20"
           style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(18,18,18,0.1) 20px, rgba(18,18,18,0.1) 40px)" }}>
        
        <motion.div 
          className="flex whitespace-nowrap gap-16 items-center h-full"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
        >
          {[...words, ...words, ...words, ...words, ...words, ...words].map((word, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-display text-2xl text-neo-black tracking-widest">{word}</span>
              <span className="text-neo-black font-display text-2xl">⚡</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Copyright Bar */}
      <div className="w-full bg-neo-black text-neo-cream font-body font-bold text-center py-6 text-sm uppercase tracking-widest relative z-20">
        © {new Date().getFullYear()} JESS.DEV • ALL RIGHTS RESERVED
      </div>

    </footer>
  );
}
