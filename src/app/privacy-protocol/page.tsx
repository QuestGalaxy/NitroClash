"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, Database, ChevronLeft, Fingerprint, Activity, Radio } from "lucide-react";
import Link from "next/link";

export default function PrivacyProtocol() {
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

  const dataFlow = [
    { title: "Identity_Masking", desc: "Wallet-based authentication ensures zero personal data harvesting. We don't know who you are, only what you drive." },
    { title: "On-Chain_Permanence", desc: "Game assets and achievements are stored on the blockchain, granting you full ownership and control over your digital footprint." },
    { title: "Cookie_Neutralization", desc: "Our terminal uses zero-tracking protocols. No marketing pixels, no third-party scripts, no surveillance." },
    { title: "Asset_Sovereignty", desc: "Your NFT data is hosted on IPFS, ensuring your garage remains accessible even if the main grid goes dark." }
  ];

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-clash-rust/30 overflow-x-hidden">
      {/* Background Grid & Scanlines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(180,83,9,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(180,83,9,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 animate-scanline pointer-events-none opacity-[0.03] bg-gradient-to-b from-white via-transparent to-transparent h-[100px] w-full" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-clash-rust/20 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center gap-4 group"
            onMouseEnter={() => playSfx('hover')}
            onClick={() => playSfx('click')}
          >
            <div className="p-2 border border-clash-rust/30 group-hover:border-clash-rust transition-colors">
              <ChevronLeft className="w-5 h-5 text-clash-rust" />
            </div>
            <span className="text-xl font-black uppercase italic tracking-tighter">Back_to_Terminal</span>
          </Link>
          <div className="flex items-center gap-3 text-clash-rust">
            <EyeOff className="w-5 h-5" />
            <span className="text-[10px] tracking-[0.3em] font-black uppercase">Privacy_Active</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <Fingerprint className="w-12 h-12 text-clash-rust" />
              <div className="h-[1px] flex-grow bg-clash-rust/20"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none mb-10">
              Privacy_<br/>
              <span className="text-clash-rust">Protocol</span>
            </h1>
            <p className="text-clash-sand/60 text-lg leading-relaxed max-w-2xl uppercase italic border-l-4 border-clash-rust pl-6 bg-clash-rust/5 py-4">
              In the wasteland, anonymity is your strongest armor. NitroClash is built on the principle of radical data sovereignty.
            </p>
          </motion.div>

          {/* Privacy Grid */}
          <div className="grid grid-cols-1 gap-12 mb-24">
            {dataFlow.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0 w-16 h-16 border border-clash-rust/20 flex items-center justify-center bg-black group-hover:border-clash-rust transition-colors">
                    <span className="text-clash-rust font-black text-xl">0{i + 1}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-black italic uppercase text-white mb-4 group-hover:text-clash-rust transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-clash-sand/50 text-sm md:text-base leading-relaxed uppercase tracking-wider">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {/* HUD Decoration */}
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-clash-rust/20 to-transparent group-hover:via-clash-rust/50 transition-all"></div>
              </motion.div>
            ))}
          </div>

          {/* Technical Disclosure Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="clash-card p-10 bg-clash-rust/5 border-clash-rust/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database className="w-48 h-48" />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <Radio className="w-6 h-6 text-clash-rust animate-pulse" />
              <h2 className="text-2xl font-black italic uppercase tracking-widest">Data_Transmission_Report</h2>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center py-3 border-b border-clash-rust/10">
                <span className="text-xs text-clash-sand/40 uppercase">Global_Data_Retention</span>
                <span className="text-xs font-black text-clash-rust">ZERO_LOG_POLICY</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-clash-rust/10">
                <span className="text-xs text-clash-sand/40 uppercase">Third_Party_Sharing</span>
                <span className="text-xs font-black text-clash-rust">NON_EXISTENT</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-clash-rust/10">
                <span className="text-xs text-clash-sand/40 uppercase">Wallet_Encryption</span>
                <span className="text-xs font-black text-clash-rust">SECURE_ON_CHAIN</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-clash-rust/10">
                <span className="text-xs text-clash-sand/40 uppercase">Surveillance_Resistance</span>
                <span className="text-xs font-black text-clash-rust">MAXIMUM</span>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 p-4 bg-black/40 border border-clash-rust/10">
              <Activity className="w-5 h-5 text-clash-rust" />
              <p className="text-[10px] text-clash-sand/40 uppercase leading-relaxed">
                Notice: All privacy protocols are subject to immutable code governance. Any changes to data handling must be approved via DAO consensus.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Decoration */}
      <footer className="py-20 border-t border-clash-rust/10 bg-black">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8">
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-1 bg-clash-rust/20"></div>
            ))}
          </div>
          <p className="text-[10px] text-clash-sand/20 uppercase tracking-[0.5em] text-center">
            Privacy_Protocol_v2.0 // Managed_by_Decentralized_Governance
          </p>
        </div>
      </footer>
    </main>
  );
}
