"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Shield, Rocket, ChevronRight, ExternalLink, Twitter, Send, Instagram, ShoppingBag, Target, Activity, Cpu, Terminal, Crosshair, Menu, X, Coins, TrendingUp, Flame, Dna, Volume2, VolumeX, Skull } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import confetti from "canvas-confetti";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [matrixText, setMatrixText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showReward, setShowReward] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const skullRef = useRef<HTMLAnchorElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (!skullRef.current) return;
    const skullRect = skullRef.current.getBoundingClientRect();
    const dropX = info.point.x;
    const dropY = info.point.y;

    if (
      dropX >= skullRect.left &&
      dropX <= skullRect.right &&
      dropY >= skullRect.top &&
      dropY <= skullRect.bottom
    ) {
      setShowReward(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        zIndex: 1000,
        colors: ['#B45309', '#FDE047', '#ffffff'] // Rust, Neon, White
      });
      playSfx('click');
    }
  };
  
  // Audio SFX Logic
  const playSfx = (type: 'hover' | 'click') => {
    // SFX fallback to synthesized beep to avoid 404 errors if files are missing
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type === 'hover' ? 'sine' : 'square';
      osc.frequency.setValueAtTime(type === 'hover' ? 880 : 440, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // AudioContext might be blocked or unsupported
      // If synthesis fails, try loading the file as a last resort
      // const audio = new Audio(type === 'hover' ? '/audio/hover.mp3' : '/audio/click.mp3');
      // audio.volume = 0.15;
      // audio.play().catch(() => {});
    }
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      const newMuted = !isAudioMuted;
      videoRef.current.muted = newMuted;
      if (!newMuted) {
        videoRef.current.volume = 0.2;
      }
      setIsAudioMuted(newMuted);
      playSfx('click');
    }
  };
  const [bulletHoles, setBulletHoles] = useState<{ id: number; x: number; y: number; charIndex: number }[]>([]);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; charIndex: number; angle: number }[]>([]);
  const [tracers, setTracers] = useState<{ id: number; x: number; y: number; charIndex: number; startX: number; startY: number }[]>([]);
  const [lastHitIndex, setLastHitIndex] = useState<number | null>(null);
  const [muzzleFlash, setMuzzleFlash] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const interval = setInterval(() => {
      let text = "";
      for (let i = 0; i < 20; i++) {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
      setMatrixText(text);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Enhanced shooting animation logic
  useEffect(() => {
    const totalChars = 10;
    
    if (bulletHoles.length >= 15) {
      const timeout = setTimeout(() => {
        setBulletHoles([]);
        setSparks([]);
        setTracers([]);
      }, 5000);
      return () => clearTimeout(timeout);
    }

    const shootInterval = setInterval(() => {
      const charIndex = Math.floor(Math.random() * totalChars);
      const targetX = Math.random() * 60 + 20;
      const targetY = Math.random() * 60 + 20;
      const shotId = Date.now() + Math.random();
      
      // 1. Create Tracer
      const startFromTop = Math.random() > 0.5;
      const startX = Math.random() * 100;
      const startY = startFromTop ? -20 : 120;
      
      // Calculate container-relative X for the tracer
      const containerX = (charIndex * 10) + (targetX / 10);
      
      setTracers(prev => [...prev, { id: shotId, x: containerX, y: targetY, charIndex, startX, startY }]);
      setIsFiring(true);
      setMuzzleFlash(true);

      // 2. Impact after travel time
      setTimeout(() => {
        setBulletHoles(prev => [...prev, { id: shotId, x: targetX, y: targetY, charIndex }]);
        setLastHitIndex(charIndex);
        
        // Create multiple sparks
        const newSparks = Array.from({ length: 5 }).map((_, i) => ({
          id: shotId + i,
          x: targetX,
          y: targetY,
          charIndex,
          angle: Math.random() * 360
        }));
        setSparks(prev => [...prev, ...newSparks]);

        // Cleanup FX
        setTimeout(() => {
          setTracers(prev => prev.filter(t => t.id !== shotId));
          setSparks(prev => prev.filter(s => (s.id < shotId || s.id > shotId + 5)));
          setLastHitIndex(null);
          setIsFiring(false);
          setMuzzleFlash(false);
        }, 200);
      }, 80);

    }, 1200);

    return () => clearInterval(shootInterval);
  }, [bulletHoles.length]);

  const [selectedCar, setSelectedCar] = useState(0);

  const MINT_URL = "https://app.coincollect.org/nfts/collections/mint/0xB2e4ab09684a4850d3271C53D39D68C9afA4785E";
  const OPENSEA_URL = "https://opensea.io/collection/nitroclash";
  const TELEGRAM_URL = "https://t.me/nitroclash";
  const TWITTER_URL = "https://twitter.com/nitroclashnet";
  const INSTAGRAM_URL = "https://instagram.com/nitroclashnet";

  const carStats = [
    { name: "Interceptor", speed: 95, armor: 40, weapon: "Plasma Cannons", description: "High-speed pursuit vehicle designed for quick strikes." },
    { name: "War-Rig", speed: 45, armor: 95, weapon: "Heavy Harpoons", description: "A rolling fortress that can withstand direct hits from tank shells." },
    { name: "Skull-Crusher", speed: 70, armor: 75, weapon: "Spiked Ram", description: "Built for one thing: smashing through anything in its path." },
    { name: "Dust-Devil", speed: 85, armor: 50, weapon: "Oil Slick", description: "Nimble and hard to catch in the swirling sands of the wasteland." },
    { name: "Nitro-Beast", speed: 100, armor: 30, weapon: "Twin Turbos", description: "Pure speed. If you see it, it's already past you." },
    { name: "Iron-Fury", speed: 60, armor: 85, weapon: "Dual Miniguns", description: "Heavily armored with enough firepower to level a small settlement." },
    { name: "Sand-Storm", speed: 80, armor: 60, weapon: "EM Pulse", description: "Disrupts enemy electronics before they even know you're there." },
    { name: "Bone-Shaker", speed: 65, armor: 70, weapon: "Flame Thrower", description: "A terrifying sight on the horizon, leaving only ash in its wake." },
    { name: "Doom-Runner", speed: 90, armor: 45, weapon: "Sniper Railgun", description: "Long-range precision combined with high-speed escape capability." },
    { name: "Wasteland-King", speed: 75, armor: 80, weapon: "Rocket Battery", description: "The ultimate balance of power and speed. Ruler of the ruins." },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-clash-black text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4 backdrop-blur-none md:backdrop-blur-md border-b border-clash-rust/20 bg-black/20 md:bg-black/20 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Ghost element to maintain layout spacing */}
          <div className="flex items-center gap-2 md:gap-4 opacity-0 pointer-events-none select-none" aria-hidden="true">
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center">
              <div className="w-full h-full" />
            </div>
            <span className="hidden md:block text-xl md:text-2xl font-black uppercase tracking-tighter">
              NitroClash
            </span>
          </div>

          <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-2 md:gap-4 group z-[200]">
            <motion.div 
              className="relative w-20 h-20 md:w-32 md:h-32 flex items-center cursor-move"
              drag
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              dragElastic={0.1}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(180,83,9,0.5)] pointer-events-none"
              >
                <source src="/img/logo.webm" type="video/webm" />
              </video>
            </motion.div>
            <span className="hidden md:block text-2xl md:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-clash-rust transition-colors drop-shadow-md">
              NitroClash
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em]">
            <a href="#roadmap" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">Roadmap</a>
            <a href="#faq" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">FAQ</a>
            <a href={OPENSEA_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="hover:text-clash-rust transition-colors">OpenSea</a>
            <a href={MINT_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="hover:text-clash-rust transition-colors">Mint</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleAudio}
              onMouseEnter={() => playSfx('hover')}
              className="p-2 border border-clash-rust/30 text-clash-rust hover:bg-clash-rust hover:text-white transition-all flex items-center gap-2 group"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
              <span className="hidden sm:block text-[8px] font-black uppercase tracking-widest">Audio_{isAudioMuted ? 'OFF' : 'ON'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-4">
              <a href={TWITTER_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="p-2 hover:text-clash-rust transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href={TELEGRAM_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="p-2 hover:text-clash-rust transition-colors"><Send className="w-4 h-4" /></a>
              <a href={INSTAGRAM_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="p-2 hover:text-clash-rust transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
            
            <div id="questlayer-widget-0ccaefb9-cd1b-4858-82cb-89d48e553f01"></div>
            <Script 
              src="https://questlayer.app/widget-embed.js" 
              data-config='{"projectName":"NitroSkull Smash","projectId":"0ccaefb9-cd1b-4858-82cb-89d48e553f01","position":"free-form"}' 
              data-mount="questlayer-widget-0ccaefb9-cd1b-4858-82cb-89d48e553f01"
              strategy="afterInteractive"
            />
            
            <button 
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                playSfx('click');
              }}
              onMouseEnter={() => playSfx('hover')}
              className="md:hidden p-2 text-clash-rust"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-black/20 border-b border-clash-rust/20 backdrop-blur-xl overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 font-mono text-sm uppercase tracking-widest">
                <a href="#roadmap" onClick={() => { setIsMenuOpen(false); playSfx('click'); }} onMouseEnter={() => playSfx('hover')} className="text-white hover:text-clash-rust transition-colors">Roadmap</a>
                <a href="#faq" onClick={() => { setIsMenuOpen(false); playSfx('click'); }} onMouseEnter={() => playSfx('hover')} className="text-white hover:text-clash-rust transition-colors">FAQ</a>
                <a href={OPENSEA_URL} onClick={() => playSfx('click')} onMouseEnter={() => playSfx('hover')} target="_blank" className="text-white hover:text-clash-rust transition-colors">OpenSea</a>
                <a href={MINT_URL} onClick={() => playSfx('click')} onMouseEnter={() => playSfx('hover')} target="_blank" className="text-white hover:text-clash-rust transition-colors">Mint</a>
                <div className="flex gap-6 pt-4 border-t border-white/5">
                  <a href={TWITTER_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="text-clash-rust"><Twitter /></a>
                  <a href={TELEGRAM_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="text-clash-rust"><Send /></a>
                  <a href={INSTAGRAM_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="text-clash-rust"><Instagram /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-60 contrast-110 scale-105"
          >
            <source src="/img/nitroclash.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-clash-black/40 via-transparent to-clash-black z-10" />
        </div>

        <div className="container mx-auto px-4 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              animate={{ opacity: [1, 0.4, 1, 0.7, 1], scale: [1, 1.02, 1, 0.99, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.8, 1] }}
              className="inline-block mb-6 px-4 py-1 border border-clash-rust/50 bg-clash-rust/10 text-white text-[10px] font-mono tracking-[0.4em] uppercase"
            >
              The Ultimate NFT Racing & Combat Arena
            </motion.div>
            <div className="relative inline-flex mb-4">
              {/* Muzzle Flash / Impact Glow Overlay */}
              <AnimatePresence>
                {muzzleFlash && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-clash-rust/20 blur-2xl z-40 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Tracers */}
              <AnimatePresence>
                {tracers.map(tracer => (
                  <motion.div
                    key={`tracer-${tracer.id}`}
                    initial={{ 
                      x: `${tracer.startX}%`, 
                      y: `${tracer.startY}%`,
                      width: 0,
                      opacity: 1
                    }}
                    animate={{ 
                      x: `${tracer.x}%`, 
                      y: `${tracer.y}%`,
                      width: '100px',
                      opacity: 0
                    }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    className="absolute h-[2px] bg-gradient-to-r from-transparent via-clash-rust to-white z-50 origin-left"
                    style={{
                      transform: `rotate(${Math.atan2(tracer.y - tracer.startY, tracer.x - tracer.startX) * 180 / Math.PI}deg)`
                    }}
                  />
                ))}
              </AnimatePresence>

              {"NITROCLASH".split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={lastHitIndex === i ? {
                    x: [0, -8, 8, -5, 0],
                    y: [0, 3, -3, 2, 0],
                    rotate: [0, -3, 3, -2, 0],
                    scale: [1, 1.05, 0.98, 1],
                  } : bulletHoles.some(h => h.charIndex === i) ? {
                    rotate: [0, -0.5, 0.5, 0],
                  } : {}}
                  transition={{ duration: 0.15 }}
                  className={`text-4xl sm:text-6xl md:text-[11rem] font-black tracking-tighter italic leading-none relative ${i >= 5 ? 'text-clash-rust' : 'text-white'}`}
                >
                  {char}
                  
                  {/* Sparks */}
                  <AnimatePresence>
                    {sparks.filter(s => s.charIndex === i).map((spark) => (
                      <motion.div
                        key={`spark-${spark.id}`}
                        initial={{ x: `${spark.x}%`, y: `${spark.y}%`, scale: 1, opacity: 1 }}
                        animate={{ 
                          x: `${spark.x + Math.cos(spark.angle) * 50}%`, 
                          y: `${spark.y + Math.sin(spark.angle) * 50}%`,
                          scale: 0,
                          opacity: 0
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full z-40 shadow-[0_0_8px_#facc15]"
                      />
                    ))}
                  </AnimatePresence>

                  {/* Bullet Holes for this character */}
                  <AnimatePresence>
                    {bulletHoles.filter(h => h.charIndex === i).map((hole) => (
                      <motion.div
                        key={hole.id}
                        initial={{ scale: 3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute w-3 h-3 md:w-6 md:h-6 bg-black rounded-full border border-clash-metal/50 z-30"
                        style={{ 
                          left: `${hole.x}%`, 
                          top: `${hole.y}%`,
                          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), 0 0 8px rgba(180,83,9,0.6)'
                        }}
                      >
                        <div className="absolute inset-0 bg-clash-rust/20 blur-[1px] rounded-full scale-150" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.span>
              ))}
            </div>
            <p className="max-w-3xl mx-auto text-sm md:text-xl text-clash-sand/90 mb-8 md:mb-12 font-mono tracking-wide uppercase leading-relaxed px-4">
              Race, battle, and smash skulls in the wasteland. <br/>
              <span className="text-white">Play-to-Earn redefined with $NITRO.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <a 
                href={MINT_URL} 
                target="_blank" 
                className="clash-button text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 flex items-center gap-3 group w-full sm:w-auto justify-center"
                onMouseEnter={() => playSfx('hover')}
                onClick={() => playSfx('click')}
              >
                MINT NOW <Zap className="w-5 h-5 md:w-6 md:h-6 fill-current group-hover:animate-pulse" />
              </a>
              <a 
                href={OPENSEA_URL} 
                target="_blank" 
                className="px-8 md:px-12 py-3 md:py-4 border-2 border-clash-metal hover:border-clash-rust hover:text-clash-rust transition-all font-bold uppercase tracking-widest flex items-center gap-3 bg-black/40 backdrop-blur-sm w-full sm:w-auto justify-center text-sm md:text-base"
                onMouseEnter={() => playSfx('hover')}
                onClick={() => playSfx('click')}
              >
                OpenSea <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <span className="text-[10px] font-mono text-clash-rust/60 tracking-[0.4em] uppercase">Join the clan</span>
              <div className="flex gap-6">
                <a 
                  href={TWITTER_URL} 
                  target="_blank" 
                  className="p-3 border border-clash-rust/20 bg-clash-rust/5 hover:bg-clash-rust/20 hover:border-clash-rust/50 transition-all group"
                  onMouseEnter={() => playSfx('hover')}
                  onClick={() => playSfx('click')}
                >
                  <Twitter className="w-5 h-5 text-clash-rust group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={TELEGRAM_URL} 
                  target="_blank" 
                  className="p-3 border border-clash-rust/20 bg-clash-rust/5 hover:bg-clash-rust/20 hover:border-clash-rust/50 transition-all group"
                  onMouseEnter={() => playSfx('hover')}
                  onClick={() => playSfx('click')}
                >
                  <Send className="w-5 h-5 text-clash-rust group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  className="p-3 border border-clash-rust/20 bg-clash-rust/5 hover:bg-clash-rust/20 hover:border-clash-rust/50 transition-all group"
                  onMouseEnter={() => playSfx('hover')}
                  onClick={() => playSfx('click')}
                >
                  <Instagram className="w-5 h-5 text-clash-rust group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  ref={skullRef}
                  href="#" 
                  className="p-3 border border-clash-rust/20 bg-clash-rust/5 hover:bg-clash-rust/20 hover:border-clash-rust/50 transition-all group relative overflow-visible"
                  onMouseEnter={() => playSfx('hover')}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    playSfx('click');
                    setShowHint(true);
                    setTimeout(() => setShowHint(false), 3000);
                  }}
                >
                  <div className="absolute inset-0 bg-clash-rust/10 animate-pulse overflow-hidden" />
                  <Skull className="w-5 h-5 text-clash-rust group-hover:scale-110 transition-transform relative z-10" />
                  
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black border border-clash-rust px-3 py-2 z-50"
                      >
                        <div className="text-[10px] font-mono text-clash-rust uppercase tracking-wider">
                          You need a special key...
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-clash-rust" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* HUD Elements - Terminator meets Matrix */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] animate-scanline opacity-20" />
          
          {/* Target Reticle Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
            <Crosshair className="w-full h-full text-clash-rust animate-spin-slow" strokeWidth={0.5} />
          </div>

          {/* Top Left - Matrix Data Stream */}
          <div className="absolute top-24 left-12 hidden lg:block">
            <div className="clash-card p-4 border-l-4 border-l-clash-rust bg-black/60 backdrop-blur-md w-64">
              <div className="flex items-center gap-2 mb-3 border-b border-clash-rust/20 pb-2">
                <Terminal className="w-4 h-4 text-clash-rust" />
                <span className="text-[10px] font-mono text-clash-rust tracking-[0.2em] uppercase">Kernel_Log</span>
              </div>
              <div className="font-mono text-[9px] text-clash-rust/80 space-y-1 overflow-hidden h-24">
                 <p className="">&gt; INITIALIZING_ARENA_SYNC...</p>
                 <p className="">&gt; SYNC_COMPLETE: 100%</p>
                 <p className="text-clash-neon animate-pulse">&gt; {matrixText}</p>
                 <p className="">&gt; LATENCY: 0.003ms</p>
                 <p className="">&gt; ENCRYPT_SIG: AES-256</p>
                 <p className="text-clash-neon">&gt; {matrixText.split('').reverse().join('')}</p>
               </div>
            </div>
          </div>

          {/* Top Right - Tactical Status */}
          <div className="absolute top-24 right-12 hidden lg:block">
            <div className="clash-card p-4 border-r-4 border-r-clash-rust bg-black/60 backdrop-blur-md w-64">
              <div className="flex items-center justify-between mb-3 border-b border-clash-rust/20 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-clash-rust animate-pulse" />
                  <span className="text-[10px] font-mono text-clash-rust tracking-[0.2em] uppercase">Status_Report</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-clash-neon animate-flicker" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[9px] font-mono text-clash-sand/60">
                  <span>COMBAT_RIGS</span>
                  <span className="text-white">ACTIVE [5,000]</span>
                </div>
                <div className="w-full bg-clash-metal/30 h-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="bg-clash-rust h-full"
                  />
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-clash-sand/60">
                  <span>NITRO_FUEL</span>
                  <span className="text-white">OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left - Terminator Identification */}
          <div className="absolute bottom-12 left-12 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 bg-clash-rust/20 blur animate-pulse" />
              <div className="relative clash-card p-4 bg-black/80 border-clash-rust/50 w-72">
                <div className="flex gap-4">
                  <div className="w-16 h-16 border border-clash-rust/40 relative flex items-center justify-center">
                    <Target className="w-8 h-8 text-clash-rust animate-pulse" />
                    <div className="absolute inset-0 bg-clash-rust/10 animate-scanline" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-clash-rust uppercase mb-1">Target_Acquisition</div>
                    <div className="text-xs font-black italic text-white uppercase mb-2">NITRO_STRIKER_V1</div>
                    <div className="grid grid-cols-2 gap-x-2 text-[8px] font-mono text-clash-sand/40 uppercase">
                      <span>Armor: 98%</span>
                      <span>Speed: Mach 2</span>
                      <span>Weapon: Plasma</span>
                      <span>Shield: Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Right - System Uplink */}
          <div className="absolute bottom-12 right-12 hidden lg:block text-right">
            <div className="clash-card p-4 border-clash-rust/30 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 justify-end mb-2">
                <div className="text-right">
                  <div className="text-clash-rust font-mono text-xs animate-pulse tracking-widest uppercase">
                    [ SYSTEM_ONLINE ]
                  </div>
                  <div className="text-[8px] font-mono text-clash-sand/40 uppercase">
                    Encrypted_Link_Established
                  </div>
                </div>
                <Cpu className="w-8 h-8 text-clash-rust animate-flicker" />
              </div>
              <div className="flex gap-1 justify-end h-4">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 16, 8, 12, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-clash-rust/40"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-32 relative bg-clash-black/80 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, label: "Total Supply", value: "5,000 NFTs", desc: "Limited Edition Combat Vehicles" },
              { icon: Trophy, label: "Earnings", value: "$NITRO", desc: "Earn through Racing & Staking" },
              { icon: Shield, label: "Clans", value: "15 Factions", desc: "Join a Syndicate, Rule the Track" },
              { icon: Rocket, label: "Modes", value: "5 Arenas", desc: "Deathmatch, Rally, and more" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="clash-card p-10 group hover:border-clash-rust/60"
              >
                <stat.icon className="w-8 h-8 text-clash-rust mb-6 group-hover:scale-110 transition-transform" />
                <div className="text-clash-rust text-[10px] font-mono mb-2 uppercase tracking-[0.3em]">{stat.label}</div>
                <div className="text-3xl font-black mb-3 italic tracking-tight">{stat.value}</div>
                <p className="text-clash-sand/40 text-xs font-mono uppercase tracking-wider">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combat Rigs Showcase */}
      <section className="py-20 md:py-40 relative overflow-hidden bg-black/40">
        <div className="container mx-auto px-4 mb-10 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
            <div>
              <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-4">[ THE GARAGE ]</div>
              <h2 className="text-4xl md:text-7xl font-black italic leading-none">
                CHOOSE YOUR <br/>
                <span className="text-clash-rust">WAR MACHINE</span>
              </h2>
            </div>
            <p className="text-clash-sand/50 font-mono text-xs md:text-sm max-w-md uppercase tracking-widest leading-loose mx-auto md:mx-0">
              10 legendary rigs salvaged from the ruins. <br className="hidden md:block"/>
              Each equipped with unique combat specs.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-10">
          <div className="flex gap-8 animate-scroll whitespace-nowrap px-4">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -10 }}
                className="inline-block w-[300px] md:w-[400px] aspect-[4/5] relative clash-card group overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 bg-clash-rust/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={`/img/homepage/${i}.jpg`}
                  alt={`Combat Rig #${i}`}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-110 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="text-clash-rust font-mono text-[10px] tracking-[0.3em] uppercase mb-1">UNIT_00{i}</div>
                  <div className="text-2xl font-black italic tracking-tighter group-hover:text-clash-rust transition-colors uppercase">
                    {["Interceptor", "War-Rig", "Skull-Crusher", "Dust-Devil", "Nitro-Beast", "Iron-Fury", "Sand-Storm", "Bone-Shaker", "Doom-Runner", "Wasteland-King"][i]}
                  </div>
                </div>
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 border border-clash-rust bg-black/80 backdrop-blur-md">
                    <ExternalLink className="w-4 h-4 text-clash-rust" />
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`dup-${i}`}
                whileHover={{ scale: 1.05, y: -10 }}
                className="inline-block w-[300px] md:w-[400px] aspect-[4/5] relative clash-card group overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 bg-clash-rust/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={`/img/homepage/${i}.jpg`}
                  alt={`Combat Rig #${i}`}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-110 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="text-clash-rust font-mono text-[10px] tracking-[0.3em] uppercase mb-1">UNIT_00{i}</div>
                  <div className="text-2xl font-black italic tracking-tighter group-hover:text-clash-rust transition-colors uppercase">
                    {["Interceptor", "War-Rig", "Skull-Crusher", "Dust-Devil", "Nitro-Beast", "Iron-Fury", "Sand-Storm", "Bone-Shaker", "Doom-Runner", "Wasteland-King"][i]}
                  </div>
                </div>
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 border border-clash-rust bg-black/80 backdrop-blur-md">
                    <ExternalLink className="w-4 h-4 text-clash-rust" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Select Section */}
      <section className="py-20 md:py-40 relative overflow-hidden bg-clash-black">
        {/* Background ambient effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-clash-rust/5 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-4">[ RIG_SELECTOR ]</div>
            <h2 className="text-4xl md:text-7xl font-black italic leading-none uppercase">
              SELECT YOUR <span className="text-clash-rust">FATE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Stats & Description (Mobile: 2nd) */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCar}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black italic text-white uppercase mb-4 tracking-tighter">
                      {carStats[selectedCar].name}
                    </h3>
                    <p className="text-clash-sand/60 font-mono text-xs md:text-sm uppercase tracking-widest leading-loose">
                      {carStats[selectedCar].description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Speed Stat */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-clash-rust">
                          <Zap className="w-4 h-4" />
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Top_Speed</span>
                        </div>
                        <span className="text-xl font-black italic text-white">{carStats[selectedCar].speed}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-clash-metal/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${carStats[selectedCar].speed}%` }}
                          className="h-full bg-clash-rust"
                        />
                      </div>
                    </div>

                    {/* Armor Stat */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 text-clash-rust">
                          <Shield className="w-4 h-4" />
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Armor_Plate</span>
                        </div>
                        <span className="text-xl font-black italic text-white">{carStats[selectedCar].armor}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-clash-metal/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${carStats[selectedCar].armor}%` }}
                          className="h-full bg-clash-rust"
                        />
                      </div>
                    </div>

                    {/* Weapon Stat */}
                    <div className="p-4 border border-clash-rust/20 bg-clash-rust/5">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-4 h-4 text-clash-rust" />
                        <span className="text-[10px] font-mono text-clash-rust uppercase tracking-[0.2em]">Primary_Weapon</span>
                      </div>
                      <div className="text-sm font-black italic text-white uppercase">{carStats[selectedCar].weapon}</div>
                    </div>
                  </div>

                  <a href={MINT_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="clash-button w-full justify-center py-4 flex items-center gap-3 group">
                    DEPLOY UNIT <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Middle Column: Large Car Preview (Mobile: 1st) */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative aspect-[4/5] md:aspect-square group">
                {/* HUD Decorations */}
                <div className="absolute -inset-4 border border-clash-rust/10 pointer-events-none" />
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-clash-rust z-20" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-clash-rust z-20" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCar}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={`/img/homepage/${selectedCar}.jpg`}
                      alt={carStats[selectedCar].name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover rounded-sm shadow-[0_0_50px_rgba(180,83,9,0.2)]"
                      priority
                    />
                    {/* Glitch Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute inset-0 bg-clash-rust/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Navigation Arrows (PC only) */}
                <div className="absolute inset-y-0 -left-12 hidden lg:flex items-center">
                  <button 
                    onClick={() => {
                      setSelectedCar((prev) => (prev === 0 ? carStats.length - 1 : prev - 1));
                      playSfx('click');
                    }}
                    onMouseEnter={() => playSfx('hover')}
                    className="p-3 border border-clash-rust/30 bg-black/60 text-clash-rust hover:bg-clash-rust hover:text-white transition-all"
                  >
                    <ChevronRight className="w-6 h-6 rotate-180" />
                  </button>
                </div>
                <div className="absolute inset-y-0 -right-12 hidden lg:flex items-center">
                  <button 
                    onClick={() => {
                      setSelectedCar((prev) => (prev === carStats.length - 1 ? 0 : prev + 1));
                      playSfx('click');
                    }}
                    onMouseEnter={() => playSfx('hover')}
                    className="p-3 border border-clash-rust/30 bg-black/60 text-clash-rust hover:bg-clash-rust hover:text-white transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Thumbnail Grid (Mobile: 3rd) */}
            <div className="lg:col-span-3 order-3 lg:order-3">
              <div className="grid grid-cols-5 lg:grid-cols-2 gap-2 md:gap-4">
                {carStats.map((car, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCar(i);
                      playSfx('click');
                    }}
                    onMouseEnter={() => playSfx('hover')}
                    className={`relative aspect-square overflow-hidden border-2 transition-all group ${
                      selectedCar === i 
                        ? 'border-clash-rust scale-95 shadow-[0_0_15px_rgba(180,83,9,0.5)]' 
                        : 'border-white/10 grayscale hover:grayscale-0 hover:border-clash-rust/50'
                    }`}
                  >
                    <Image
                      src={`/img/homepage/${i}.jpg`}
                      alt={car.name}
                      fill
                      sizes="(max-width: 768px) 20vw, 10vw"
                      className="object-cover"
                    />
                    {selectedCar === i && (
                      <div className="absolute inset-0 bg-clash-rust/20 animate-pulse" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-1 text-[8px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase text-center">
                      Unit_{i}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Mission Briefing */}
      <section className="py-20 md:py-40 relative overflow-hidden border-t border-clash-rust/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-6">[ MISSION_BRIEFING ]</div>
              <h2 className="text-4xl md:text-7xl font-black mb-8 italic leading-tight uppercase">
                Unlock High-Speed <br/>
                <span className="text-clash-rust">Profits in NitroClash</span>
              </h2>
              <p className="text-clash-sand/80 text-sm md:text-lg mb-8 leading-relaxed font-mono uppercase tracking-wide">
                Step into NitroClash—the definitive Play-to-Earn NFT racing and combat game that puts you in the driver’s seat of your financial destiny. 
                With over 5,000 unique, stakeable NFTs and our native $NITRO token, we offer multiple avenues to earn while you burn rubber.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-clash-rust/5 border-l-4 border-clash-rust">
                  <Terminal className="w-5 h-5 text-clash-rust mt-1 shrink-0" />
                  <p className="text-xs md:text-sm font-mono text-clash-sand/70 leading-relaxed uppercase">
                    &gt; Dive into diverse game modes, stake your NFTs to claim more $NITRO, or farm tokens through staking. Your track, your rules, your rewards.
                  </p>
                </div>
              </div>

              <a href={MINT_URL} onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} target="_blank" className="clash-button inline-flex items-center gap-4 px-10 py-4 group">
                CLAIM YOUR CAR NFT <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* HUD Overlay for Image */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-clash-rust" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-clash-rust" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-clash-rust" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-clash-rust" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-clash-rust/20 animate-scanline" />
                </div>
                
                <div className="clash-card p-2 bg-black/40 backdrop-blur-sm relative z-10 overflow-hidden h-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all"
                  >
                    <source src="/img/nitrointro.mp4" type="video/mp4" />
                  </video>
                  {/* Digital stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 p-3 font-mono text-[8px] md:text-[10px] text-clash-rust flex justify-between uppercase">
                    <span>Model: NITRO_V1</span>
                    <span>Class: INTERCEPTOR</span>
                    <span>Status: ARMED</span>
                  </div>
                </div>
                
                {/* Floating HUD cards around the image */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-10 -right-10 hidden md:block clash-card p-3 bg-clash-rust/10 backdrop-blur-md border-clash-rust/30 z-30"
                >
                  <div className="text-[10px] font-mono text-clash-rust uppercase">+5,000 RIGS</div>
                  <div className="text-[8px] font-mono text-white/50 uppercase">IN COLLECTION</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NFT Benefits Section - Tactical Advantages */}
      <section className="py-20 md:py-40 relative bg-black/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-4">[ TACTICAL_ADVANTAGES ]</div>
            <h2 className="text-4xl md:text-7xl font-black italic leading-none uppercase">
              Unlock <span className="text-clash-rust">Real-World</span> Value
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                icon: Shield, 
                title: "Competitive Edge", 
                desc: "Own powerful, armed cars to dominate in multiple game modes.",
                tag: "BATTLE_READY"
              },
              { 
                icon: Coins, 
                title: "Stake & Earn", 
                desc: "Stake your NFTs to earn $NITRO tokens, boosting your in-game economy.",
                tag: "PASSIVE_YIELD"
              },
              { 
                icon: TrendingUp, 
                title: "Trade Flexibility", 
                desc: "Easily trade or upgrade your NFTs to refresh your gameplay experience.",
                tag: "LIQUID_ASSETS"
              },
              { 
                icon: Flame, 
                title: "Multi-Earning", 
                desc: "Use NFTs and $NITRO tokens for farming rare assets and tokens.",
                tag: "ECO_SYSTEM"
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="clash-card p-8 md:p-10 group hover:border-clash-rust/60 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-clash-rust/30 uppercase tracking-widest">{benefit.tag}</div>
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-clash-rust/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <benefit.icon className="w-10 h-10 text-clash-rust relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl md:text-2xl font-black italic mb-4 uppercase group-hover:text-clash-rust transition-colors">{benefit.title}</h3>
                <p className="text-clash-sand/50 text-xs md:text-sm font-mono leading-relaxed uppercase tracking-wide">
                  {benefit.desc}
                </p>
                <div className="mt-8 pt-6 border-t border-clash-rust/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-clash-rust/40">SYSTEM_OPTIMAL</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-1 h-1 bg-clash-rust/40 rounded-full" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Bird Section - Bounty Board */}
      <section className="py-20 md:py-40 relative border-t border-clash-rust/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
            <div className="lg:w-1/3">
              <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-6">[ BOUNTY_BOARD ]</div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic leading-tight uppercase">
                Early Bird <br/>
                <span className="text-clash-rust">Specials</span>
              </h2>
              <p className="text-clash-sand/60 text-sm md:text-base font-mono mb-10 uppercase tracking-widest leading-loose">
                Buy low, earn high: Stake your claim in NitroClash today before the arena gets crowded.
              </p>
              <div className="p-6 border-2 border-clash-rust bg-clash-rust/5 relative group cursor-crosshair">
                <div className="absolute -top-3 -left-3 p-1 bg-clash-rust text-[8px] font-mono text-black font-bold uppercase">Critical_Entry</div>
                <div className="text-2xl font-black italic text-white mb-2 uppercase">Floor: 30 Matic</div>
                <div className="text-xs font-mono text-clash-rust uppercase tracking-tighter animate-pulse">Available for limited time only_</div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              {[
                { 
                  val: "80%", 
                  label: "Initial Discount", 
                  desc: "Jump in early to snag our premium NFTs at a whopping 80% off. Final floor price will be significantly higher." 
                },
                { 
                  val: "EARLY", 
                  label: "Supporter Boost", 
                  desc: "Be among the first to stake and reap boosted rewards from our specialized pools. Early support pays off." 
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="clash-card p-8 md:p-12 border-l-4 border-l-clash-rust bg-clash-rust/5 flex flex-col gap-6"
                >
                  <div className="text-5xl md:text-7xl font-black italic text-clash-rust opacity-40">{item.val}</div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black italic text-white mb-4 uppercase">{item.label}</h4>
                    <p className="text-xs md:text-sm font-mono text-clash-sand/60 uppercase tracking-widest leading-loose">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 md:py-40 relative bg-black/60 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 md:mb-32">
            <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-6">[ STRATEGIC_MAP ]</div>
            <h2 className="text-4xl md:text-7xl font-black italic leading-tight uppercase">
              Accelerate into <br/>
              <span className="text-clash-rust">The Future</span>
            </h2>
            <p className="max-w-2xl mx-auto text-clash-sand/40 text-xs md:text-sm font-mono mt-8 uppercase tracking-widest">
              Fuel up and fasten your seatbelts as we unveil the roadmap to a turbocharged journey!
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-clash-rust/0 via-clash-rust/30 to-clash-rust/0 hidden md:block" />
            
            <div className="space-y-12 md:space-y-0">
              {[
                { 
                  percent: "0%", 
                  title: "Ignition: Token Launch", 
                  desc: "$NITRO token goes live. Stake, farm, and fuel your NFT Cars.",
                  status: "COMPLETED"
                },
                { 
                  percent: "20%", 
                  title: "NFT Garage Opens", 
                  desc: "Mint your first NFT Cars at discounted prices. Limited slots available.",
                  status: "ACTIVE"
                },
                { 
                  percent: "40%", 
                  title: "Staking & Rewards", 
                  desc: "Stake your NFT Cars and $NITRO tokens for exclusive benefits and yields.",
                  status: "LOCKED"
                },
                { 
                  percent: "60%", 
                  title: "Community Engagement", 
                  desc: "Interactive AMAs, tournaments, and challenges to engage the community.",
                  status: "LOCKED"
                },
                { 
                  percent: "80%", 
                  title: "New Game Modes", 
                  desc: "Introducing innovative game modes for endless action and rewards.",
                  status: "LOCKED"
                },
                { 
                  percent: "100%", 
                  title: "NitroClash Universe Expansion", 
                  desc: "Unveiling new tracks, cars, and items. The race to greatness has just begun.",
                  status: "LOCKED"
                }
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden md:flex items-center justify-center z-20">
                    <div className={`w-4 h-4 rounded-full border-2 ${milestone.status === 'COMPLETED' ? 'bg-clash-rust border-clash-rust' : milestone.status === 'ACTIVE' ? 'bg-black border-clash-rust animate-pulse' : 'bg-black border-clash-metal'} `} />
                    {milestone.status === 'ACTIVE' && (
                      <div className="absolute inset-0 w-8 h-8 -left-2 -top-2 bg-clash-rust/20 rounded-full animate-ping" />
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-4 md:px-12">
                    <div className={`clash-card p-6 md:p-8 bg-black/40 backdrop-blur-md border-l-4 ${milestone.status === 'COMPLETED' ? 'border-l-clash-rust' : milestone.status === 'ACTIVE' ? 'border-l-clash-rust/60' : 'border-l-clash-metal/30'} group hover:border-l-clash-rust transition-all`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl md:text-4xl font-black italic text-clash-rust opacity-40 group-hover:opacity-100 transition-opacity">{milestone.percent}</span>
                        <div className={`text-[8px] font-mono px-2 py-1 border ${milestone.status === 'COMPLETED' ? 'text-clash-rust border-clash-rust/30' : 'text-clash-sand/30 border-clash-metal/20'}`}>
                          {milestone.status}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black italic mb-3 uppercase group-hover:text-clash-rust transition-colors">{milestone.title}</h3>
                      <p className="text-clash-sand/50 text-xs md:text-sm font-mono leading-relaxed uppercase tracking-wider">
                        {milestone.desc}
                      </p>
                      
                      {/* HUD Decor */}
                      <div className="mt-6 flex gap-1 opacity-20">
                        {[...Array(8)].map((_, j) => (
                          <div key={j} className="w-3 h-[2px] bg-clash-rust" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-40 relative border-t border-clash-rust/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-clash-rust font-mono text-[10px] tracking-[0.5em] uppercase mb-4">[ KNOWLEDGE_BASE ]</div>
            <h2 className="text-4xl md:text-7xl font-black italic leading-none uppercase">
              Frequently Asked <br/>
              <span className="text-clash-rust">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is NitroClash?",
                a: "NitroClash is a Play-to-Earn NFT racing and combat arena game. Players can unleash high-octane chaos in races while having the opportunity to accelerate their earnings with $NITRO tokens and NFT cars."
              },
              {
                q: "How do $NITRO tokens work in the game?",
                a: "$NITRO tokens serve as the in-game currency, allowing players to purchase NFT cars, customization options, and enter into premium races. Players can also earn $NITRO tokens through gameplay."
              },
              {
                q: "What are NFT cars?",
                a: "NFT cars are limited-edition, highly customizable digital assets in the NitroClash universe. Each car has a unique pedigree that offers different tactical advantages in racing and combat."
              },
              {
                q: "How can I earn with NitroClash?",
                a: "Players can earn by winning races, participating in combat arenas, staking their NFT cars and $NITRO tokens, or farming rare assets within the ecosystem."
              },
              {
                q: "Is NitroClash secure?",
                a: "Yes, NitroClash is built on secure blockchain protocols. All NFT ownership and token transactions are recorded on-chain, ensuring transparency and security for all survivors."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="clash-card overflow-hidden group hover:border-clash-rust/40 transition-all"
              >
                <button 
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between group"
                  onMouseEnter={() => playSfx('hover')}
                  onClick={(e) => {
                    playSfx('click');
                    const content = e.currentTarget.nextElementSibling;
                    const icon = e.currentTarget.querySelector('.faq-icon');
                    if (content) {
                      content.classList.toggle('hidden');
                      icon?.classList.toggle('rotate-90');
                    }
                  }}
                >
                  <span className="text-lg md:text-xl font-black italic uppercase group-hover:text-clash-rust transition-colors">{item.q}</span>
                  <ChevronRight className="faq-icon w-5 h-5 text-clash-rust transition-transform" />
                </button>
                <div className="hidden px-6 md:px-8 pb-6 md:pb-8 border-t border-clash-rust/10 pt-6">
                  <p className="text-clash-sand/60 font-mono text-sm md:text-base leading-relaxed uppercase tracking-wider">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 relative border-t border-clash-rust/20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-12 h-12 flex items-center">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    <source src="/img/logo.webm" type="video/webm" />
                  </video>
                </div>
                <span className="text-2xl font-black text-white uppercase tracking-tighter">
                  NitroClash
                </span>
              </div>
              <p className="text-clash-sand/40 text-xs md:text-sm font-mono uppercase tracking-widest leading-relaxed max-w-md">
                The ultimate Play-to-Earn NFT racing and combat experience. 
                Built for the survivors of the digital wasteland.
              </p>
            </div>
            
            <div>
              <h4 className="text-clash-rust font-mono text-xs tracking-[0.3em] uppercase mb-8">Uplink_Channels</h4>
              <ul className="space-y-4 font-mono text-xs uppercase tracking-widest text-clash-sand/60">
                <li><a href={TWITTER_URL} target="_blank" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors flex items-center gap-3">Twitter <ChevronRight className="w-3 h-3" /></a></li>
                <li><a href={TELEGRAM_URL} target="_blank" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors flex items-center gap-3">Telegram <ChevronRight className="w-3 h-3" /></a></li>
                <li><a href={INSTAGRAM_URL} target="_blank" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors flex items-center gap-3">Instagram <ChevronRight className="w-3 h-3" /></a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-clash-rust font-mono text-xs tracking-[0.3em] uppercase mb-8">Terminal_Links</h4>
              <ul className="space-y-4 font-mono text-xs uppercase tracking-widest text-clash-sand/60">
                <li><a href={OPENSEA_URL} target="_blank" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">OpenSea Market</a></li>
                <li><a href={MINT_URL} target="_blank" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">Mint Terminal</a></li>
                <li><a href={MINT_URL} target="_blank" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">Staking Node</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-mono text-clash-sand/20 uppercase tracking-[0.2em]">
              © 2026 NitroClash_Protocol. All_Systems_Operational.
            </div>
            <div className="flex gap-8 text-[10px] font-mono text-clash-sand/20 uppercase tracking-[0.2em]">
              <Link href="/security-log" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">Security_Log</Link>
              <Link href="/privacy-protocol" onMouseEnter={() => playSfx('hover')} onClick={() => playSfx('click')} className="hover:text-clash-rust transition-colors">Privacy_Protocol</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="bg-black border-2 border-clash-rust p-8 max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-clash-rust to-transparent animate-scanline" />
              
              <Trophy className="w-16 h-16 text-clash-rust mx-auto mb-6 animate-bounce" />
              
              <h3 className="text-3xl font-black italic uppercase mb-4 text-white">
                GhostAlien <span className="text-clash-rust">Access!</span>
              </h3>
              
              <div className="text-clash-sand/80 font-mono text-sm mb-6 uppercase tracking-widest leading-relaxed">
                <p className="mb-4">You found the easter egg! Here is your exclusive invite code to GhostAlien:</p>
                <div className="bg-clash-rust/10 border border-clash-rust/30 p-4 mb-2 select-all">
                  <code className="text-xl font-black text-clash-rust">REF-RZLENSDB</code>
                </div>
                <p className="text-[10px] text-clash-rust animate-pulse">Only 20 invites available</p>
              </div>
              
              <a 
                href="https://ghostalien.questgalaxy.com/?ref=REF-RZLENSDB"
                target="_blank"
                onClick={() => {
                  playSfx('click');
                  setShowReward(false);
                }}
                className="block w-full py-4 bg-clash-rust text-black font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Enter The Portal
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
