"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Character from "./Character";
import { Mail } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate send
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Reset after a while
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="w-full bg-neo-yellow py-32 border-b-brutal-thick relative overflow-hidden flex justify-center">
      
      <div className="max-w-4xl w-full px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-7xl md:text-9xl text-neo-black uppercase drop-shadow-[6px_6px_0_rgba(255,87,34,1)]">
            Let's Build
          </h2>
          <p className="font-body font-bold text-2xl mt-4 max-w-2xl mx-auto">
            Got a project? Need a co-founder? Just want to say hi? Send me a letter.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Back of envelope (visible when open) */}
          <div className="absolute inset-0 bg-[#e0c634] border-brutal-thick shadow-[16px_16px_0_rgba(18,18,18,1)] transform translate-y-4" />
          
          {/* Letter / Form */}
          <motion.div 
            className="relative z-30 bg-neo-cream border-brutal-thick p-8 md:p-12 shadow-md max-w-2xl mx-auto"
            animate={isSending ? { y: -200, opacity: 0, scale: 0.5 } : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {isSent ? (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                <h3 className="font-display text-5xl text-neo-purple mb-4">Message Sent!</h3>
                <p className="font-body font-bold text-xl">I'll get back to you soon.</p>
                <div className="mt-8">
                  <Character pose="celebrating" className="w-48 h-48" alt="Jess.dev avatar celebrating form submission" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-body">
                
                {/* Lined paper styling */}
                <div className="relative">
                  <label className="block font-bold mb-2 uppercase text-sm tracking-widest">To:</label>
                  <div className="font-display text-3xl pb-2 border-b-4 border-neo-black/20 text-neo-purple">
                    jess.dev
                  </div>
                </div>

                <div className="relative">
                  <label className="block font-bold mb-2 uppercase text-sm tracking-widest">From (Email):</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@awesome.com"
                    className="w-full bg-transparent font-bold text-xl pb-2 border-b-4 border-neo-black focus:outline-none focus:border-neo-purple transition-colors placeholder:text-neo-black/30 cursor-none"
                  />
                </div>

                <div className="relative">
                  <label className="block font-bold mb-2 uppercase text-sm tracking-widest">Message:</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Let's build something crazy..."
                    className="w-full bg-transparent font-bold text-xl pb-2 border-b-4 border-neo-black focus:outline-none focus:border-neo-purple transition-colors resize-none placeholder:text-neo-black/30 leading-relaxed cursor-none"
                    style={{ backgroundImage: "linear-gradient(transparent, transparent 29px, rgba(18,18,18,0.2) 29px, rgba(18,18,18,0.2) 32px)", backgroundSize: "100% 32px", lineHeight: "32px" }}
                  />
                </div>

                {/* Stamp */}
                <div className="absolute top-4 right-4 w-20 h-24 border-4 border-[#ff5722] rotate-12 flex items-center justify-center opacity-80">
                  <div className="text-[#ff5722] font-display text-xl text-center leading-none">
                    PRIORITY<br/>MAIL
                  </div>
                  {/* Wavy postmark */}
                  <svg className="absolute -inset-4 text-[#ff5722] opacity-50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="50" cy="50" r="40" strokeDasharray="5,5" />
                  </svg>
                </div>

                <button 
                  type="submit" 
                  disabled={isSending}
                  className="mt-8 btn-brutal py-4 text-2xl uppercase tracking-wider cursor-none"
                >
                  {isSending ? "Sending..." : "Send It"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Front envelope flap graphic */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-neo-yellow border-t-brutal-thick z-20 pointer-events-none transform translate-y-4" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
          
        </div>

        {/* Social Stamps */}
        <div className="mt-32 flex flex-wrap justify-center gap-8">
          {[
            { icon: <GithubIcon size={32} />, name: "GitHub", color: "bg-white", rotate: "-rotate-6", href: "https://github.com/jessaideveloper" },
            { icon: <InstagramIcon size={32} />, name: "Instagram", color: "bg-[#E1306C]", rotate: "rotate-3", href: "https://www.instagram.com/jess.developer/" },
            { icon: <LinkedinIcon size={32} />, name: "LinkedIn", color: "bg-[#0A66C2]", rotate: "-rotate-3", href: "https://www.linkedin.com/in/jess-j-2331b1418/" },
            { icon: <Mail size={32} strokeWidth={3} />, name: "Email", color: "bg-neo-cream", rotate: "rotate-6", href: "mailto:jessaideveloper@gmail.com" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className={`flex items-center gap-4 ${social.color} ${social.rotate} border-brutal shadow-brutal p-4 hover:-translate-y-2 hover:shadow-brutal-hover transition-all cursor-none`}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              {social.icon}
              <span className="font-display text-2xl uppercase text-neo-black">{social.name}</span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
