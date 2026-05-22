"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Orange spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-500 animate-spin" />
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold text-white tracking-tight">
            Unión
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-400 -mt-1">
            El Progreso
          </span>
        </div>
      </div>
    </motion.div>
  );
}
