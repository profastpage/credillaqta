"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-slate-900/5"
          : isHome
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled || !isHome
            ? "h-16 sm:h-[72px]"
            : "h-20 sm:h-24"
        }`}
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 flex items-center gap-2"
          aria-label="Unión El Progreso - Inicio"
        >
          <div className="flex flex-col">
            <span
              className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled || !isHome
                  ? "text-slate-900"
                  : "text-white"
              }`}
            >
              Unión
            </span>
            <span
              className={`text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase -mt-1 transition-colors duration-300 ${
                scrolled || !isHome
                  ? "text-orange-600"
                  : "text-orange-300"
              }`}
            >
              El Progreso
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? scrolled || !isHome
                      ? "text-orange-600"
                      : "text-white"
                    : scrolled || !isHome
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={getWhatsAppUrl("contacto")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-orange-900/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-orange-900/30"
          >
            <Phone className="w-4 h-4" />
            Contáctanos
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 lg:hidden p-2 rounded-xl transition-colors duration-300"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X
              className={`w-6 h-6 transition-colors duration-300 ${
                scrolled || !isHome ? "text-slate-900" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 transition-colors duration-300 ${
                scrolled || !isHome ? "text-slate-900" : "text-white"
              }`}
            />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                {/* Navigation Links */}
                <div className="flex flex-col gap-1 flex-1">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-orange-50 text-orange-600 border-l-4 border-orange-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col gap-3 mt-auto"
                >
                  <a
                    href={getWhatsAppUrl("contacto")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3.5 rounded-xl text-base font-semibold shadow-lg transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Contáctanos por WhatsApp
                  </a>
                  <p className="text-center text-xs text-slate-400">
                    Grupo El Progreso Perú S.A.C.
                    <br />
                    RUC: 20612539066
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
