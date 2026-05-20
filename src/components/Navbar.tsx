"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  /* ── Scroll listener: transparent → solid at 20px ── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HEADER — Fixed, Full-Bleed Immersive
          Scroll 0  →  transparent (logo white, text white)
          Scroll >20 → white blur (logo dark, text dark)
      ════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center overflow-hidden transition-[background-color,box-shadow,border-color] duration-300 ${
          isScrolled
            ? "bg-white shadow-md border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <nav className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* ── LOGO — Explicit width, no wrapper restrictions ── */}
          <Link
            href="/"
            className="block shrink-0 transition-transform active:scale-95"
            aria-label="Unión El Progreso - Inicio"
          >
            <Image
              src="/logo-union-transparente.png"
              alt="Logo Unión El Progreso"
              width={300}
              height={90}
              priority
              className="h-12 w-[50%] max-w-[185px] md:h-[66px] md:max-w-[260px] md:w-auto object-contain object-left select-none"
            />
          </Link>

          {/* ── DESKTOP NAV — Dynamic text color ── */}
          <div
            className={`hidden lg:flex items-center gap-1 transition-colors duration-300 ${
              isScrolled ? "text-slate-600" : "text-white"
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isScrolled
                      ? isActive
                        ? "text-[#FF6A00]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {isActive && isScrolled && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF6A00] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active indicator for transparent state */}
                  {isActive && !isScrolled && (
                    <motion.div
                      layoutId="navbar-indicator-light"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-white/60 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP CTA — Glass when transparent, solid when scrolled ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getWhatsAppUrl("contacto")}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
                isScrolled
                  ? "bg-[#FF6A00] hover:bg-[#D6000C] text-white shadow-lg shadow-[#FF6A00]/20 hover:shadow-xl hover:shadow-[#FF6A00]/30"
                  : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/20 hover:border-white/30"
              }`}
            >
              <Phone className="w-4 h-4" />
              Contáctanos
            </a>
          </div>

          {/* ── MOBILE TOGGLE — Dynamic color ── */}
          <button
            onClick={() => setIsOpen(true)}
            className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
              isScrolled
                ? "text-slate-800 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Abrir menú"
          >
            <Menu className="w-8 h-8" />
          </button>
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════════
          MENÚ MÓVIL — Overlay z-[100] con Framer Motion
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* ── Backdrop ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
              onClick={closeMenu}
            />

            {/* ── Slide-in Panel ── */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
                mass: 0.8,
              }}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[380px] bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
            >
              {/* Cabecera */}
              <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-slate-100">
                <Image
                  src="/logo-union-transparente.png"
                  alt="Unión El Progreso"
                  width={150}
                  height={40}
                  className="object-contain h-8 w-auto"
                />
                <button
                  onClick={closeMenu}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-200 active:scale-95"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Enlaces */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <nav className="flex flex-col gap-1.5">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + i * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 active:scale-[0.98] ${
                            isActive
                              ? "bg-[#FF6A00]/10 text-[#FF6A00] border-l-[3px] border-[#FF6A00]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span className="ml-1.5">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-4 pb-6 pt-4 border-t border-slate-100"
              >
                <a
                  href={getWhatsAppUrl("contacto")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2.5 w-full bg-[#FF6A00] hover:bg-[#D6000C] text-white py-3.5 px-5 rounded-xl text-[15px] font-bold shadow-lg shadow-[#FF6A00]/20 transition-all duration-300 active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5" />
                  Asesoría por WhatsApp
                </a>
                <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                  Grupo El Progreso Perú S.A.C.
                  <br />
                  RUC: 20612539066
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
