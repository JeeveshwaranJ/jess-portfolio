"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useDragControls, AnimatePresence } from "framer-motion";
import Character from "./Character";

export default function Hero() {
  const tools = ["REACT", "NEXT.JS", "AI AGENTS", "TYPESCRIPT", "TAILWIND", "FRAMER MOTION", "NODE.JS", "POSTGRES"];

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dragControls = useDragControls();

  // Curved lanyard strap that bends/stretches as you drag
  const lanyardPath = useTransform(
    [dragX, dragY],
    ([x, y]) => {
      const xVal = (x as number) || 0;
      const yVal = (y as number) || 0;
      // Center of the lanyard line is x = 160 on a 320px container
      return `M 160,0 Q ${160 + xVal * 0.3},30 ${160 + xVal},64`;
    }
  );

  return (
    <section id="hero" className="relative w-full min-h-screen bg-neo-purple flex flex-col justify-between overflow-hidden border-b-brutal-thick">
      
      {/* Background Texture: Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(#121212 3px, transparent 3px)", backgroundSize: "24px 24px" }}
      />

      {/* Top Nav Bar */}
      <header className="w-full flex items-center justify-between px-6 sm:px-12 py-4 border-b-brutal bg-neo-cream text-neo-black z-40 relative shadow-brutal-sm select-none">
        <div className="font-display text-xl sm:text-2xl bg-neo-yellow text-neo-black px-4 py-1.5 border-brutal shadow-brutal-sm uppercase">
          JESS.DEV
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn-brutal px-4 py-2 font-display text-xs sm:text-sm uppercase flex items-center gap-2 cursor-none"
          >
            <span className="text-sm">{isMenuOpen ? "✕" : "☰"}</span> MENU
          </button>

          {/* Navigation Dropdown Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute top-full mt-3 right-0 w-64 bg-neo-cream border-brutal-thick shadow-brutal z-50 flex flex-col p-4 font-display text-lg sm:text-xl uppercase select-none rounded-xl"
              >
                {[
                  { label: "Home", href: "#hero" },
                  { label: "The Lab", href: "#the-lab" },
                  { label: "Projects", href: "#projects" },
                  { label: "How I Work", href: "#how-i-work" },
                  { label: "Contact", href: "#contact" },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const targetEl = document.querySelector(link.href);
                      if (targetEl) {
                        targetEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="py-3 px-4 border-b-2 border-neo-black last:border-b-0 hover:bg-neo-yellow text-neo-black transition-colors flex items-center justify-between group cursor-none"
                  >
                    <span>{link.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 flex items-center justify-center relative w-full z-10 max-w-7xl mx-auto py-16 px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center justify-center w-full relative">
          
          {/* Left: Text & Headings */}
          <div className="lg:col-span-7 flex flex-col items-start relative z-10">
            
            {/* Pulsing Work Status Chip */}
            <motion.div 
              className="absolute -top-16 left-0 z-20 hidden md:block"
              animate={{ y: [0, 6, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <div className="bg-neo-cream text-neo-black px-4 py-2 border-brutal shadow-brutal-sm flex items-center gap-2 font-body font-bold text-xs uppercase tracking-wider">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ade80]"></span>
                </span>
                AVAILABLE FOR WORK
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] leading-none uppercase tracking-tight text-neo-cream drop-shadow-[8px_8px_0_rgba(18,18,18,1)]">
                I{" "}
                <span className="relative inline-block">
                  Build
                  {/* Sitting Avatar */}
                  <motion.div
                    className="absolute bottom-[64%] left-[64%] w-[42%] z-20 pointer-events-none"
                    initial={{ y: -60, opacity: 0, rotate: -15 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                      delay: 0.6,
                    }}
                  >
                    <img
                      src="/avatar2.png"
                      alt="Jess.dev illustrated avatar sitting on top of the hero text"
                      className="w-full h-auto object-contain drop-shadow-[6px_6px_0_rgba(18,18,18,1)]"
                    />
                  </motion.div>
                </span>
                <br />
                <span className="text-neo-yellow relative inline-block">
                  Digital
                  {/* Scribble Underline */}
                  <motion.svg 
                    className="absolute -bottom-4 left-0 w-full h-8 pointer-events-none" 
                    viewBox="0 0 300 20"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path 
                      d="M 5,10 Q 75,20 150,10 T 295,15" 
                      fill="transparent" 
                      stroke="#121212" 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 0.5, ease: "easeOut" } }
                      }}
                    />
                  </motion.svg>
                </span><br />
                Businesses
              </h1>
            </motion.div>

            <div className="relative mt-8">
              <motion.p 
                className="font-body text-lg md:text-2xl font-bold bg-neo-black text-neo-cream px-6 py-3 border-brutal shadow-brutal-sm rotate-[-2deg] inline-block"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
              >
                Websites • SaaS • AI Tools
              </motion.p>
              
              {/* Asterisk Doodle sticker */}
              <motion.div 
                className="absolute bottom-[-20px] right-[-48px] z-20 text-neo-yellow text-4xl font-display select-none hidden md:block"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                whileHover={{ scale: 1.2 }}
              >
                ✦
              </motion.div>
            </div>
          </div>

          {/* Right: Draggable ID Card Assembly (with overlapping layout) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:-ml-12 z-20 relative">
            
            {/* Circular Verified Builder Stamp */}
            <motion.div 
              className="absolute top-[-70px] right-[-30px] z-30 cursor-pointer hidden md:block select-none"
              animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: 15 }}
            >
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-neo-black">
                <path id="circlePath" d="M 50, 10 A 40, 40 0 1, 1 49.9, 10" fill="none" />
                <circle cx="50" cy="50" r="38" fill="#FDE047" stroke="currentColor" strokeWidth="4" strokeDasharray="4,4" />
                <text className="font-body font-bold text-[8px] uppercase fill-current tracking-widest">
                  <textPath href="#circlePath" startOffset="0%">
                    ✦ VERIFIED BUILDER ✦ DIGITAL PRODUCT MAKER
                  </textPath>
                </text>
                <text x="50" y="56" textAnchor="middle" className="font-display text-base fill-current leading-none">OK</text>
              </svg>
            </motion.div>

            {/* Swinging Lanyard & Badge assembly */}
            <motion.div
              className="relative flex flex-col items-center pt-16 w-80 h-[480px]"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ transformOrigin: "top center" }}
            >
              {/* Lanyard Cord (SVG) */}
              <svg className="absolute top-0 left-0 w-full h-20 overflow-visible pointer-events-none z-10" viewBox="0 0 320 80">
                <motion.path
                  d={lanyardPath}
                  stroke="#121212"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Draggable Badge Card & Clip Container */}
              <motion.div
                drag
                dragControls={dragControls}
                dragListener={true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.7}
                dragTransition={{ bounceStiffness: 350, bounceDamping: 13 }}
                whileDrag={{ scale: 1.05, rotate: 6, cursor: "grabbing" }}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                style={{ 
                  x: dragX, 
                  y: dragY, 
                }}
                className="relative w-[280px] sm:w-[320px] h-[390px] sm:h-[440px] mt-16 cursor-grab touch-none z-20 select-none"
              >
                {/* Metal Badge Clip - Drag Handle (Stays static, does not rotate) */}
                <div 
                  onPointerDown={(e) => dragControls.start(e)}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 bg-neo-orange border-brutal shadow-brutal-sm rounded-md z-30 flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  <div className="w-3 h-3 rounded-full bg-neo-black pointer-events-none" />
                </div>

                {/* Rotating Card Inner Container */}
                <motion.div
                  className="w-full h-full relative"
                  animate={{ 
                    rotateY: isFlipped ? 180 : 0
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ 
                    transformStyle: "preserve-3d" 
                  }}
                >
                  {/* Front Side */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-neo-cream border-brutal-thick shadow-brutal flex flex-col justify-between p-5 sm:p-6 rounded-2xl select-none"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Slot hole for clip */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-neo-black rounded-full border border-white/10" />

                    {/* Card Header */}
                    <div className="w-full bg-neo-black text-neo-yellow py-1 border-2 border-neo-black text-center font-display text-sm sm:text-base uppercase tracking-widest rounded-md select-none">
                      BUILDER PASS
                    </div>

                    {/* Photo Frame */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-neo-purple border-brutal rounded-full overflow-hidden mx-auto my-3 sm:my-4 flex items-center justify-center select-none">
                      <Character pose="idle" showBg={false} className="w-32 h-32 sm:w-40 sm:h-40" alt="Jess.dev illustrated developer avatar on Builder Pass ID card" />
                    </div>

                    {/* Identity Info */}
                    <div className="text-center font-body mb-1 sm:mb-2 select-none">
                      <div className="font-display text-2xl sm:text-3xl text-neo-black uppercase tracking-tight leading-none">
                        JESS.DEV
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-neo-black/60 uppercase mt-1">
                        Dept: AI & SaaS Tools
                      </div>
                    </div>

                    {/* Footer Section: Barcode & Status */}
                    <div className="border-t-2 border-neo-black pt-2 sm:pt-3 flex items-center justify-between select-none">
                      <div className="flex gap-[2px] items-center h-7 sm:h-8 bg-white p-1 border border-neo-black">
                        <div className="w-[3px] h-full bg-black" />
                        <div className="w-[1px] h-full bg-black" />
                        <div className="w-[2px] h-full bg-black" />
                        <div className="w-[4px] h-full bg-black" />
                        <div className="w-[1px] h-full bg-black" />
                        <div className="w-[3px] h-full bg-black" />
                        <div className="w-[1px] h-full bg-black" />
                        <div className="w-[2px] h-full bg-black" />
                        <div className="w-[1px] h-full bg-black" />
                      </div>
                      
                      <div className="bg-[#4ade80] text-neo-black border-2 border-neo-black px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase rounded-md shadow-brutal-sm shrink-0">
                        STATUS: OK
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-neo-black border-brutal-thick shadow-brutal flex flex-col justify-between p-5 sm:p-6 rounded-2xl text-neo-cream select-none"
                    style={{ 
                      backfaceVisibility: "hidden", 
                      transform: "rotateY(180deg)" 
                    }}
                  >
                    {/* Slot hole for clip */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-neo-cream rounded-full border border-black/10" />

                    {/* Card Header */}
                    <div className="w-full bg-neo-yellow text-neo-black py-1 border-2 border-neo-black text-center font-display text-sm sm:text-base uppercase tracking-widest rounded-md select-none">
                      CONTACT DETAILS
                    </div>

                    {/* Quick Social Buttons */}
                    <div className="flex flex-col gap-3 my-auto font-body z-30">
                      <a 
                        href="https://github.com/jessaideveloper" 
                        target="_blank" 
                        rel="noreferrer" 
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 bg-neo-purple text-neo-cream py-2 border-2 border-neo-cream shadow-brutal-sm hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-bold uppercase cursor-none"
                      >
                        GITHUB ➔
                      </a>
                      <a 
                        href="https://www.instagram.com/jess.developer/" 
                        target="_blank" 
                        rel="noreferrer" 
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 bg-[#E1306C] text-neo-cream py-2 border-2 border-neo-cream shadow-brutal-sm hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-bold uppercase cursor-none"
                      >
                        INSTAGRAM ➔
                      </a>
                      <a 
                        href="mailto:jessaideveloper@gmail.com" 
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 bg-neo-cream text-neo-black py-2 border-2 border-neo-cream shadow-brutal-sm hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-bold uppercase cursor-none"
                      >
                        EMAIL ➔
                      </a>
                    </div>

                    {/* Card Footer Warning label */}
                    <div className="bg-neo-orange text-neo-black text-center py-1 font-display text-[10px] sm:text-xs border-2 border-neo-black uppercase rotate-[-2deg] rounded-md shadow-brutal-sm">
                      AUTHORIZED DEVELOPER
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Arrow pointing to the badge ("that's me") */}
              <motion.div 
                className="absolute top-1/2 left-[-80px] -translate-y-1/2 z-30 hidden xl:flex flex-col items-center pointer-events-none"
                animate={{ y: [0, -6, 0], rotate: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
                <span className="font-body text-neo-cream bg-neo-black text-xs font-bold px-3 py-1 border-2 border-neo-cream uppercase rotate-[-8deg] shadow-brutal-sm select-none whitespace-nowrap">
                  That's Me!
                </span>
                <svg className="w-10 h-10 text-neo-cream mt-2 rotate-[45deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Strip */}
      <div className="w-full bg-neo-black border-t-brutal-thick py-4 overflow-hidden relative flex z-20 select-none">
        <div className="flex whitespace-nowrap gap-8 items-center animate-marquee-slow text-neo-cream">
          {[...tools, ...tools, ...tools, ...tools].map((tool, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="font-display text-4xl text-neo-cream tracking-wider">{tool}</span>
              <span className="text-neo-yellow font-display text-4xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
