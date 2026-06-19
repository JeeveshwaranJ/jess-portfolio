"use client";

import { motion } from "framer-motion";
import Character from "./Character";

const panels = [
  {
    step: "1. STRATEGY",
    title: "We map the chaos.",
    desc: "First, we talk. No code, just coffee and sticky notes. We figure out exactly what problem we're solving and why it matters.",
    pose: "idle" as const,
    color: "bg-neo-cream",
    accent: "bg-neo-yellow",
    alt: "Jess.dev avatar illustrating the strategy process step",
  },
  {
    step: "2. DESIGN",
    title: "Make it pop.",
    desc: "I build a brutalist, high-contrast, scroll-stopping design system that breaks the mold of boring SaaS templates.",
    pose: "pointing" as const,
    color: "bg-neo-yellow",
    accent: "bg-neo-purple",
    alt: "Jess.dev avatar illustrating the design process step",
  },
  {
    step: "3. BUILD",
    title: "Ship it.",
    desc: "Next.js, Framer Motion, and Tailwind. Fast, performant, and ready for production. I write the code, you watch the magic.",
    pose: "celebrating" as const,
    color: "bg-[#4ade80]",
    accent: "bg-neo-black",
    alt: "Jess.dev avatar illustrating the build process step",
  }
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="w-full bg-neo-cream py-32 border-b-brutal-thick overflow-hidden relative">
      
      {/* Halftone dot pattern background */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: "radial-gradient(#121212 3px, transparent 3px)", backgroundSize: "20px 20px" }} />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <h2 className="font-display text-7xl md:text-9xl text-neo-black uppercase">
            How I <span className="bg-neo-orange text-neo-cream px-4 border-brutal drop-shadow-md rotate-[-2deg] inline-block">Work</span>
          </h2>
          <div className="bg-neo-black text-neo-cream px-6 py-2 font-body font-bold border-brutal-thick uppercase tracking-widest text-sm md:text-base rotate-3 shadow-brutal-sm">
            Read Left To Right ➔
          </div>
        </div>

        {/* Comic Strip Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {panels.map((panel, i) => (
            <motion.div
              key={i}
              className={`relative ${panel.color} border-brutal-thick shadow-[12px_12px_0_rgba(18,18,18,1)] flex flex-col h-full overflow-hidden`}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", bounce: 0.3, delay: i * 0.2 }}
              whileHover={{ y: -5, boxShadow: "16px 16px 0 rgba(18,18,18,1)" }}
            >
              {/* Top Bar */}
              <div className="bg-neo-black text-neo-cream px-4 py-2 font-display text-2xl border-b-brutal flex justify-between items-center">
                <span>{panel.step}</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-white/20" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-white/20" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-white/20" />
                </div>
              </div>

              {/* Illustration Area */}
              <div className="relative h-64 border-b-brutal bg-white overflow-hidden flex items-center justify-center">
                {/* Diagonal strip graphic */}
                <div className={`absolute -inset-10 ${panel.accent} opacity-20 rotate-12 origin-center`} />
                <Character pose={panel.pose} className="w-48 h-48 relative z-10" alt={panel.alt} />
                
                {/* Comic action line overlay */}
                {i === 2 && (
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)" }} />
                )}
              </div>

              {/* Text Area */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-start">
                <h3 className="font-display text-4xl mb-4 text-neo-black uppercase leading-none">
                  {panel.title}
                </h3>
                <p className="font-body font-bold text-lg leading-relaxed text-neo-black/80">
                  {panel.desc}
                </p>
              </div>

              {/* Page Number corner */}
              <div className="absolute bottom-0 right-0 bg-neo-black text-neo-cream font-body font-bold px-3 py-1 text-sm border-t-brutal border-l-brutal">
                PG. 0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
