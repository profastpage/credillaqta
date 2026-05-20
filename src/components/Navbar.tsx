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
  const pathname = usePathname();

  // Bloquear scroll del body cuando el menú móvil está abierto
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
      {/* ── HEADER — sticky, siempre visible ──────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center" aria-label="Unión El Progreso - Inicio">
            <Image
              src="/logo-union.png"
              alt="Logo Unión El Progreso"
              width={150}
              height={40}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-[#FF6A00]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF6A00] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getWhatsAppUrl("contacto")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF6A00] hover:bg-[#D6000C] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#FF6A00]/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF6A00]/30"
            >
              <Phone className="w-4 h-4" />
              Contáctanos
            </a>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-xl transition-colors duration-300 text-slate-700 hover:text-[#FF6A00]"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* ── MENÚ MÓVIL — OVERLAY z-[100] sobre header z-50 ────── */}
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

            {/* ── Panel deslizante ── */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[380px] bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
            >
              {/* Cabecera */}
              <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-slate-100">
                <Image
                  src="/logo-union.png"
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
                        transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease: "easeOut" }}
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
