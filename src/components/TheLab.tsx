"use client";

import { motion } from "framer-motion";
import Character from "./Character";

const stickyNotes = [
  { 
    id: 1, 
    text: "Writes clean code.", 
    color: "bg-neo-yellow", 
    rotate: -5, 
    posClass: "left-[4%] top-[45%] md:left-[10%] md:top-[48%]" 
  },
  { 
    id: 2, 
    text: "Loves coffee.", 
    color: "bg-neo-orange", 
    rotate: 8, 
    posClass: "right-[2%] top-[12%] md:right-[8%] md:top-[10%]" 
  },
  { 
    id: 3, 
    text: "Prompt Engineer.", 
    color: "bg-neo-purple text-neo-cream", 
    rotate: -12, 
    posClass: "right-[4%] top-[45%] md:right-[10%] md:top-[48%]" 
  },
  { 
    id: 4, 
    text: "UI/UX obsessed.", 
    color: "bg-[#4ade80]", 
    rotate: 4, 
    posClass: "left-[2%] top-[12%] md:left-[8%] md:top-[10%]" 
  },
];

export default function TheLab() {
  return (
    <section id="the-lab" className="relative w-full min-h-screen bg-neo-cream border-b-brutal-thick py-24 overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute top-10 left-10 z-10">
        <h2 className="font-display text-7xl md:text-9xl text-neo-black drop-shadow-[6px_6px_0_rgba(253,224,71,1)]">
          THE LAB
        </h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[60vh] mt-20">
        {/* Desk Line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-neo-black rounded-full shadow-[0_10px_0_rgba(18,18,18,0.2)]" />

        {/* Character peeking at the desk */}
        <motion.div 
          className="relative z-20 mb-10"
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        >
          <Character pose="peeking" className="w-64 h-64 md:w-96 md:h-96" alt="Illustrated character of Jess.dev working at a desk" />
        </motion.div>

        {/* Laptop / Prop on desk */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-2 z-30"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.6, delay: 0.3 }}
        >
          <div className="w-48 h-32 bg-[#e5e5e5] border-brutal-thick rounded-t-xl relative flex justify-center items-center shadow-brutal">
            {/* Glowing Apple/Logo */}
            <div className="w-8 h-8 rounded-full bg-neo-yellow border-2 border-neo-black animate-pulse" />
          </div>
          <div className="w-64 h-4 bg-[#d4d4d4] border-brutal-thick rounded-b-md -ml-8 shadow-brutal" />
        </motion.div>

        {/* Coffee Cup */}
        <motion.div
          className="absolute bottom-14 left-1/4 z-30"
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.6, delay: 0.5 }}
        >
          <div className="w-16 h-20 bg-neo-purple border-brutal relative shadow-brutal rounded-b-lg">
            <div className="absolute -right-6 top-4 w-8 h-10 border-brutal rounded-r-full border-l-0" />
            <div className="absolute -top-6 left-2 text-neo-black opacity-50 font-display text-2xl animate-bounce">♨</div>
          </div>
        </motion.div>

        {/* Sticky Notes */}
        {stickyNotes.map((note, index) => (
          <motion.div
            key={note.id}
            className={`absolute z-40 w-32 h-32 md:w-40 md:h-40 ${note.color} ${note.posClass} border-brutal shadow-brutal p-3 md:p-4 flex items-center justify-center text-center`}
            style={{ 
              rotate: note.rotate,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50, y: -10, boxShadow: "12px 12px 0px 0px #121212" }}
            transition={{ 
              type: "spring", 
              bounce: 0.5, 
              delay: 0.6 + index * 0.1 
            }}
          >
            <p className="font-body font-bold text-sm md:text-lg lg:text-xl leading-tight">{note.text}</p>
            {/* Thumbtack */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neo-black rounded-full shadow-sm" />
          </motion.div>
        ))}

      </div>
    </section>
  );
}
