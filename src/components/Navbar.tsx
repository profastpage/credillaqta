"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { getDynamicWhatsAppUrl } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════
    GOLD PALETTE
   ═══════════════════════════════════════════════════════════════ */
const GOLD = {
  lightest: "#F5E6C8",
  light: "#E8D5A3",
  primary: "#DCAA61",
  medium: "#A97631",
  dark: "#6D4B21",
  glow: "rgba(220, 170, 97, 0.25)",
  glowStrong: "rgba(220, 170, 97, 0.45)",
};

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    if (typeof window !== "undefined") window.addEventListener("mandi:open-drawer", handler);
    return () => { if (typeof window !== "undefined") window.removeEventListener("mandi:open-drawer", handler); };
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const dynamicWhatsAppUrl = getDynamicWhatsAppUrl(pathname);
  const phoneHref = "tel:+51966897008";

  /* ─── Two-state design ───────────────────────────────────────
     TOP (transparent):  dark glass overlay → gold text legible on any hero
     SCROLLED (solid):    white clean bg → dark text, gold accents, max contrast
     UX: consistent readability in both states, financial-trust white on scroll
  ─────────────────────────────────────────────────────────────── */

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-500 ease-out ${
          isScrolled ? "h-16 sm:h-[72px]" : "py-3 sm:py-4"
        }`}
        style={
          isScrolled
            ? {
                background: "rgba(255, 255, 255, 0.97)",
                backdropFilter: "blur(16px) saturate(1.2)",
                WebkitBackdropFilter: "blur(16px) saturate(1.2)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.06)",
              }
            : {
                background: "linear-gradient(180deg, rgba(6,5,3,0.6) 0%, rgba(6,5,3,0.35) 100%)",
                backdropFilter: "blur(12px) saturate(1.3)",
                WebkitBackdropFilter: "blur(12px) saturate(1.3)",
                borderBottom: "1px solid transparent",
              }
        }
      >
        {/* Gold accent line — subtle on transparent, elegant on white */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none transition-opacity duration-500"
          style={{
            background: isScrolled
              ? `linear-gradient(90deg, transparent 5%, ${GOLD.dark} 20%, ${GOLD.primary} 50%, ${GOLD.dark} 80%, transparent 95%)`
              : `linear-gradient(90deg, transparent 10%, ${GOLD.primary}80 50%, transparent 90%)`,
            opacity: isScrolled ? 0.7 : 0.4,
          }}
        />

        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* ── LOGO ── */}
          <Link
            href="/"
            className="relative shrink-0 w-[140px] md:w-[220px]"
            style={{ aspectRatio: "1941 / 466" }}
            aria-label="MANDI CORP - Inicio"
          >
            <Image
              src="/logo-mandi.png"
              alt="Logo MANDI CORP"
              fill
              priority
              sizes="(max-width: 768px) 210px, 350px"
              className="object-contain object-left select-none"
            />
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-300 group`}
                >
                  <span
                    className={`relative z-10 block transition-all duration-300 ${
                      !isActive && "group-hover:drop-shadow-[0_0_6px_rgba(220,170,97,0.4)]"
                    }`}
                    style={{
                      color: isScrolled
                        ? isActive
                          ? GOLD.medium
                          : "#374151"
                        : isActive
                          ? GOLD.lightest
                          : "rgba(255,255,255,0.85)",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      if (isScrolled && !isActive) e.currentTarget.style.color = GOLD.medium;
                    }}
                    onMouseLeave={(e) => {
                      if (isScrolled && !isActive) e.currentTarget.style.color = "#374151";
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${GOLD.medium} 0%, ${GOLD.primary} 50%, ${GOLD.lightest} 100%)`,
                        boxShadow: isScrolled
                          ? `0 0 8px ${GOLD.glow}`
                          : `0 0 12px ${GOLD.glowStrong}, 0 0 4px ${GOLD.primary}`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* WhatsApp */}
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] overflow-hidden"
              style={{
                border: isScrolled
                  ? `1px solid rgba(37, 211, 102, 0.3)`
                  : "1px solid rgba(37, 211, 102, 0.35)",
                color: "#25D366",
                background: isScrolled
                  ? "rgba(37, 211, 102, 0.06)"
                  : "rgba(37, 211, 102, 0.1)",
              }}
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className={isScrolled ? "text-gray-700" : "text-white/90"}>WhatsApp</span>
            </a>

            {/* Llamar — Gold solid */}
            <a
              href={phoneHref}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${GOLD.dark} 0%, ${GOLD.medium} 40%, ${GOLD.primary} 100%)`,
                color: "#060503",
                boxShadow: `0 2px 12px ${GOLD.glow}, 0 1px 0 rgba(255,255,255,0.15) inset`,
              }}
              aria-label="Llamar por teléfono"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
            </a>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            onClick={() => setIsOpen(true)}
            className={`lg:hidden relative p-2 rounded-xl transition-all duration-300 active:scale-95 ${
              isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/90 hover:bg-white/10"
            }`}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE DRAWER — Clean white + gold accents (UX: readable)
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Panel — White clean */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[380px] bg-white shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
            >
              {/* Gold accent line */}
              <div
                className="h-[2px] shrink-0"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${GOLD.dark} 15%, ${GOLD.primary} 50%, ${GOLD.dark} 85%, transparent 100%)`,
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-gray-100">
                <div
                  className="relative shrink-0 w-[150px]"
                  style={{ aspectRatio: "1941 / 466" }}
                >
                  <Image
                    src="/logo-mandi.png"
                    alt="MANDI CORP"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 active:scale-90"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <nav className="flex flex-col gap-0.5">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 active:scale-[0.98] ${
                            isActive
                              ? `bg-[#DCAA61]/8 text-[#A97631]`
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                          style={isActive ? { borderLeft: `3px solid ${GOLD.primary}` } : { borderLeft: "3px solid transparent" }}
                        >
                          <span className="ml-1">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Contact Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="px-4 pb-5 pt-4 border-t border-gray-100"
              >
                {/* WhatsApp */}
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1fb855] text-white min-h-[52px] rounded-xl text-[15px] font-bold shadow-lg shadow-[#25D366]/20 transition-all duration-300 active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Asesoría por WhatsApp
                </a>

                {/* Llamar — Gold */}
                <a
                  href={phoneHref}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98] mt-3"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD.dark} 0%, ${GOLD.medium} 40%, ${GOLD.primary} 100%)`,
                    color: "#060503",
                    boxShadow: `0 4px 20px ${GOLD.glow}`,
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>

                <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed">
                  CORPORACIÓN MANDI SAC
                  <br />
                  RUC: 20615991938
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}