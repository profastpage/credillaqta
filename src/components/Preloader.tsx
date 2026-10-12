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
        {/* Golden spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#CAA25E] animate-spin" />
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center">
          <span className="text-xl font-extrabold tracking-wider text-gold-metallic">
            CREDILLAQTA
          </span>
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#CAA25E]/80 mt-0.5">
            Créditos Rápidos
          </span>
        </div>
      </div>
    </motion.div>
  );
}
