"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, AlertTriangle, ChevronLeft, Terminal, Cpu, Zap } from "lucide-react";
import Link from "next/link";

export default function SecurityLog() {
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

  const securityEvents = [
    { id: "SEC-001", type: "ENCRYPTION", status: "ACTIVE", detail: "End-to-end military grade encryption deployed for all $NITRO transactions." },
    { id: "SEC-002", type: "AUTH", status: "VERIFIED", detail: "Multi-signature wallet integration confirmed for smart contract governance." },
    { id: "SEC-003", type: "FIREWALL", status: "STABLE", detail: "Anti-DDoS layer 7 protection operational across all racing nodes." },
    { id: "SEC-004", type: "AUDIT", status: "PASSED", detail: "Quarterly smart contract audit completed by Cyber-Wasteland Labs." }
  ];

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-clash-rust/30">
      {/* HUD Background Decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(180,83,9,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
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
          <div className="flex items-center gap-3 text-clash-rust animate-pulse">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] tracking-[0.3em] font-black uppercase">System_Secure</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="text-clash-rust text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-clash-rust/30"></span>
              Core_Protocol_01
              <span className="w-12 h-[1px] bg-clash-rust/30"></span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none mb-8">
              Security_<br/>
              <span className="text-clash-rust">Log</span>
            </h1>
            <p className="text-clash-sand/60 text-lg leading-relaxed max-w-2xl uppercase italic">
              Detailed technical overview of the NitroClash security architecture and defensive protocols. All systems monitored 24/7.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Encryption Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="clash-card p-8 bg-clash-rust/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lock className="w-24 h-24" />
              </div>
              <Cpu className="w-10 h-10 text-clash-rust mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-4">Encryption_Standard</h3>
              <p className="text-clash-sand/50 text-sm leading-relaxed uppercase tracking-wider mb-6">
                All data transmission within the NitroClash ecosystem is protected by AES-256 military-grade encryption. Your assets and identity remain strictly classified.
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-clash-rust"></div>
                <div className="w-2 h-2 bg-clash-rust animate-pulse"></div>
                <div className="w-2 h-2 bg-clash-rust/30"></div>
              </div>
            </motion.div>

            {/* Smart Contract Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="clash-card p-8 bg-clash-rust/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="w-24 h-24" />
              </div>
              <Zap className="w-10 h-10 text-clash-rust mb-6" />
              <h3 className="text-2xl font-black italic uppercase mb-4">Contract_Integrity</h3>
              <p className="text-clash-sand/50 text-sm leading-relaxed uppercase tracking-wider mb-6">
                Our smart contracts are immutable and have undergone rigorous audits. The NitroClash protocol utilizes non-custodial architecture for maximum user safety.
              </p>
              <div className="flex gap-2">
                <div className="w-8 h-1 bg-clash-rust"></div>
                <div className="w-8 h-1 bg-clash-rust/20"></div>
              </div>
            </motion.div>
          </div>

          {/* Real-time Status Log */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-clash-rust/20 bg-black/40 backdrop-blur-sm p-6 md:p-10"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-clash-rust" />
                <h2 className="text-xl font-black italic uppercase tracking-widest">Active_Log_Stream</h2>
              </div>
              <div className="px-3 py-1 bg-clash-rust/20 border border-clash-rust/50 text-[10px] text-clash-rust font-black animate-pulse">
                LIVE_FEED
              </div>
            </div>

            <div className="space-y-6">
              {securityEvents.map((event, i) => (
                <div key={event.id} className="group border-l-2 border-clash-rust/20 hover:border-clash-rust p-4 transition-all bg-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-clash-rust font-black">{event.id}</span>
                      <span className="text-sm font-black italic uppercase">{event.type}</span>
                    </div>
                    <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 border border-green-500/20">
                      {event.status}
                    </span>
                  </div>
                  <p className="text-xs text-clash-sand/40 uppercase tracking-tighter leading-relaxed">
                    {event.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-clash-rust/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-4 h-4 text-clash-rust" />
                <span className="text-[10px] text-clash-sand/30 uppercase">Last_Update: {new Date().toLocaleTimeString()}</span>
              </div>
              <button className="text-[10px] font-black uppercase text-clash-rust hover:underline">
                Download_Full_Report.PDF
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="py-20 border-t border-clash-rust/10 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-4 border border-clash-rust/20">
            <p className="text-[10px] text-clash-sand/20 uppercase tracking-[0.5em]">
              NitroClash_Security_Bureau // End_of_Line
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
