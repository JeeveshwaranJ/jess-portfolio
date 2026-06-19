"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Character from "./Character";

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current;
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{to}</span>;
}

export default function ProofOfWork() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [showReaction, setShowReaction] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowReaction(true);
      }, 2500); // Trigger reaction after counting mostly finishes
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const stats = [
    { label: "LINES OF CODE", value: 99999, suffix: "+" },
    { label: "COFFEE CUPS", value: 404, suffix: "" },
    { label: "HAPPY CLIENTS", value: "??", suffix: "" },
  ];

  return (
    <section className="relative w-full bg-neo-purple py-32 border-b-brutal-thick overflow-hidden" ref={containerRef}>
      
      <div className="max-w-7xl mx-auto px-8 lg:px-16 flex flex-col items-center">
        
        <motion.div
          initial={{ rotate: -5, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="font-display text-6xl md:text-8xl text-neo-yellow drop-shadow-[6px_6px_0_rgba(18,18,18,1)] uppercase bg-neo-black inline-block px-8 py-4 border-brutal-thick rotate-2">
            Proof of Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="bg-neo-cream border-brutal-thick shadow-[12px_12px_0_rgba(18,18,18,1)] p-8 flex flex-col items-center justify-center text-center relative"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, delay: i * 0.2 }}
              whileHover={{ y: -10, boxShadow: "16px 16px 0 rgba(18,18,18,1)" }}
            >
              {/* Thumbtack */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-neo-orange rounded-full border-2 border-neo-black shadow-sm" />
              
              <div className="font-display text-7xl md:text-[6rem] text-neo-black leading-none drop-shadow-md tracking-tighter">
                {typeof stat.value === "number" ? (
                  <Counter to={stat.value} />
                ) : (
                  stat.value
                )}
                {stat.suffix}
              </div>
              <h3 className="font-body font-bold text-xl md:text-2xl mt-4 px-4 py-2 bg-neo-yellow border-2 border-neo-black uppercase">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Character Reaction */}
        <div className="mt-20 relative h-64 w-full flex justify-center">
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={showReaction ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
          >
            {showReaction && <Character pose="waving" className="w-64 h-64" alt="Jess.dev avatar waving to celebrate statistics" />}
          </motion.div>
          
          <motion.div
            className="absolute top-0 ml-48 bg-white border-brutal shadow-brutal px-6 py-4 rounded-3xl rounded-bl-none z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={showReaction ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <p className="font-body font-bold text-xl uppercase">Nice numbers!</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
