"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Character from "./Character";

const projects = [
  {
    id: "p1",
    title: "AI AGENT DASHBOARD",
    desc: "A brutalist task manager for AI swarms.",
    tech: ["Next.js", "Tailwind", "OpenAI API"],
    color: "bg-[#7C5CFF]",
  },
  {
    id: "p2",
    title: "SaaS BOILERPLATE",
    desc: "Launch your next product in a weekend.",
    tech: ["React", "Supabase", "Stripe"],
    color: "bg-[#FDE047]",
  },
  {
    id: "p3",
    title: "DEV PORTFOLIO",
    desc: "You're looking at it right now.",
    tech: ["Framer Motion", "Neo Brutalism"],
    color: "bg-[#FF5722]",
  },
  {
    id: "p4",
    title: "WEB3 MARKETPLACE",
    desc: "NFT trading with zero gas fees.",
    tech: ["Solidity", "Ethers.js", "Next.js"],
    color: "bg-[#4ade80]",
  },
];

export default function BuiltThese() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState<number>(0);

  useEffect(() => {
    const calculateScroll = () => {
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        const parent = scrollRef.current.parentElement;
        let padding = 0;
        
        if (parent) {
          const style = window.getComputedStyle(parent);
          padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
        }
        
        if (scrollWidth > clientWidth) {
          setScrollRange(scrollWidth - clientWidth + padding);
        } else {
          setScrollRange(0);
        }
      }
    };

    calculateScroll();
    
    // Fallback timers to handle layout shifts or deferred rendering
    const timer1 = setTimeout(calculateScroll, 100);
    const timer2 = setTimeout(calculateScroll, 500);

    window.addEventListener("resize", calculateScroll);
    return () => {
      window.removeEventListener("resize", calculateScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to vertical scroll progress for inertia and smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Smoothly transform scroll progress into horizontal translation
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="projects" ref={containerRef} className="relative h-[300vh] bg-neo-black border-b-brutal-thick">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-8 touch-pan-y">
        
        {/* Background graphic */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#F5F1E8 2px, transparent 2px)", backgroundSize: "30px 30px" }} 
        />

        <div className="px-8 lg:px-16 mb-4 md:mb-8 lg:mb-12 relative z-10 flex items-end justify-between">
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-neo-cream drop-shadow-[6px_6px_0_rgba(124,92,255,1)] uppercase">
            BUILT THESE
          </h2>
          <div className="hidden md:flex items-center gap-4">
            <span className="font-body text-neo-cream font-bold uppercase tracking-wider text-sm">Scroll Down to Explore</span>
            <div className="w-12 h-12 rounded-full bg-neo-yellow border-brutal flex items-center justify-center font-display text-xl shadow-brutal animate-bounce">
              ➔
            </div>
          </div>
        </div>

        {/* Horizontal scroll track viewport */}
        <div className="w-full relative z-20 overflow-hidden px-8 lg:px-16 touch-pan-y">
          <motion.div 
            ref={scrollRef}
            style={{ x }}
            className="flex gap-8 pb-10 pt-28 touch-pan-y"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative flex-shrink-0 w-[80vw] sm:w-[450px] h-[340px] md:h-[400px] lg:h-[420px] touch-pan-y"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", bounce: 0.4, delay: index * 0.1 }}
              >
                {/* Character Peeking behind card on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-[48%] z-0 pointer-events-none">
                  <Character pose="peeking-static" className="w-36 h-36" showBg={false} alt="Jess.dev avatar peeking from behind project card" />
                </div>

                {/* The Card */}
                <div 
                  className={`relative z-10 w-full h-full ${project.color} border-brutal shadow-[12px_12px_0_rgba(245,241,232,1)] p-8 flex flex-col justify-between transition-all duration-300 ease-out group-hover:-translate-y-4 group-hover:-translate-x-2 group-hover:shadow-[20px_20px_0_rgba(245,241,232,1)]`}
                >
                  <div className="border-b-4 border-neo-black pb-4 mb-4">
                    <span className="font-body text-base md:text-xl font-bold uppercase block mb-2 opacity-80 border-2 border-neo-black inline-block px-3 py-1 rounded-full bg-white/20">
                      Vol. {index + 1}
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-neo-black leading-none uppercase tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex-1 flex flex-col justify-end">
                    <p className="font-body font-bold text-lg md:text-2xl text-neo-black mb-6 lg:mb-8 border-l-4 border-neo-black pl-4">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="bg-neo-black text-neo-cream px-3 py-2 font-body text-xs md:text-sm font-bold border-2 border-neo-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tape corner detail */}
                  <div className="absolute -top-4 -right-4 w-24 h-8 bg-white/40 border-2 border-neo-black rotate-12 backdrop-blur-sm shadow-sm" />
                </div>
              </motion.div>
            ))}

            {/* Spacer to allow clean layout padding at the end of scroll */}
            <div className="flex-shrink-0 w-8 md:w-16" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
