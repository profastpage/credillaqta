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
    CREAM PREMIUM PALETTE — MANDI CORP
   ═══════════════════════════════════════════════════════════════ */
const CREAM = {
  bg: "#e5ded6",
  bgAlt: "#e1d8d1",
  text: "#2c2c2c",
  textMuted: "#6b6460",
  gold: "#B8860B",
  goldLight: "#D4AF37",
  goldDark: "#8B6508",
  goldGlow: "rgba(184, 134, 11, 0.15)",
  white: "#FFFFFF",
  border: "rgba(0, 0, 0, 0.06)",
  whatsapp: "#25D366",
  whatsappBg: "#e6f7ef",
};

/* ═══════════════════════════════════════════════════════════════
    WhatsApp SVG Icon
   ═══════════════════════════════════════════════════════════════ */
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
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

  // ── Listener para el evento 'mandi:open-drawer' ──────────────────
  useEffect(() => {
    const handleOpenDrawer = () => setIsOpen(true);
    if (typeof window !== "undefined") {
      window.addEventListener("mandi:open-drawer", handleOpenDrawer);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mandi:open-drawer", handleOpenDrawer);
      }
    };
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Dynamic WhatsApp URL based on current pathname
  const dynamicWhatsAppUrl = getDynamicWhatsAppUrl(pathname);
  const phoneHref = "tel:+51966897008";

  /* ═══════════════════════════════════════════════════════════════
      DYNAMIC COLORS — two states:
      · !scrolled → full bleed transparent (white text on dark hero)
      · scrolled  → cream solid (#e5ded6, dark text)
  ═══════════════════════════════════════════════════════════════ */
  const navTextColor = isScrolled ? CREAM.text : "rgba(255,255,255,0.9)";
  const navActiveColor = CREAM.goldLight; // gold stays gold always
  const btnTextColor = isScrolled ? CREAM.text : "rgba(255,255,255,0.9)";
  const menuIconColor = isScrolled ? CREAM.text : "rgba(255,255,255,0.9)";
  const waBtnBg = isScrolled ? CREAM.whatsappBg : "rgba(37, 211, 102, 0.1)";
  const waBtnBorder = isScrolled ? "rgba(37, 211, 102, 0.2)" : "rgba(37, 211, 102, 0.3)";
  const hoverBg = isScrolled ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)";

  /* ── Logo: gold when transparent, normal when scrolled ── */
  const logoSrc = isScrolled ? "/logo-mandi.png" : "/logo-transparent.png";
  const logoAspect = isScrolled ? "3756 / 894" : "1804 / 554";

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HEADER — TWO STATES
          ─────────────────────────────────────────────────────────────
          · Full bleed transparent (top): fondo transparente, texto blanco, dorado activo
          · Cream solid (scrolled): fondo #e5ded6, texto oscuro, dorado activo
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 sm:h-[72px] transition-all duration-500"
        style={
          isScrolled
            ? {
                background: `linear-gradient(180deg, ${CREAM.bg} 0%, ${CREAM.bgAlt} 100%)`,
                borderBottom: `1px solid ${CREAM.border}`,
                boxShadow: "0 1px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
              }
            : {
                background: "transparent",
                borderBottom: "1px solid transparent",
                boxShadow: "none",
              }
        }
      >
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* ── LOGO — Swaps: gold (transparent) ↔ normal (scrolled) ── */}
          <Link
            href="/"
            className="relative shrink-0 w-[130px] md:w-[190px]"
            style={{ aspectRatio: logoAspect }}
            aria-label="MANDI CORP - Inicio"
          >
            <Image
              src={logoSrc}
              alt="Logo MANDI CORP"
              fill
              priority
              sizes="(max-width: 768px) 200px, 340px"
              className="object-contain object-left select-none"
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-300 group"
                >
                  {/* Text — white when transparent, dark when cream; gold stays gold */}
                  <span
                    className="relative z-10 transition-all duration-300"
                    style={{
                      color: isActive ? navActiveColor : navTextColor,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.label}
                  </span>

                  {/* Active indicator — gold line */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${CREAM.goldDark}, ${CREAM.goldLight}, ${CREAM.goldDark})`,
                        boxShadow: `0 0 8px ${CREAM.goldGlow}`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background — adapts to state */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: hoverBg }}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-md overflow-hidden"
              style={{
                background: waBtnBg,
                color: btnTextColor,
                border: `1px solid ${waBtnBorder}`,
              }}
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Call Button — Gold always */}
            <a
              href={phoneHref}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-md overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${CREAM.goldDark} 0%, ${CREAM.gold} 50%, ${CREAM.goldLight} 100%)`,
                color: CREAM.white,
                boxShadow: "0 2px 12px rgba(184, 134, 11, 0.2)",
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
            className="lg:hidden relative p-2 rounded-xl transition-all duration-300 active:scale-95"
            style={{
              color: menuIconColor,
            }}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE DRAWER — CREAM PREMIUM (always cream)
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
              className="absolute inset-0 backdrop-blur-sm"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
              }}
              onClick={closeMenu}
            />

            {/* Panel — Cream premium slide-in */}
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
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[380px] flex flex-col overflow-hidden"
              style={{
                background: `linear-gradient(180deg, ${CREAM.bg} 0%, ${CREAM.bgAlt} 100%)`,
                boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Panel Header — Logo + Close */}
              <div
                className="flex items-center justify-between px-5 pt-5 pb-4"
                style={{
                  borderBottom: `1px solid ${CREAM.border}`,
                }}
              >
                <div
                  className="relative shrink-0 w-[150px]"
                  style={{ aspectRatio: "3756 / 894" }}
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
                  className="p-2.5 rounded-xl transition-all duration-200 active:scale-90"
                  style={{
                    background: "rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${CREAM.border}`,
                    color: CREAM.textMuted,
                  }}
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <nav className="flex flex-col gap-1">
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
                          className="relative flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300 active:scale-[0.98] overflow-hidden"
                          style={
                            isActive
                              ? {
                                  background: "rgba(184, 134, 11, 0.08)",
                                  borderLeft: `3px solid ${CREAM.goldLight}`,
                                  color: CREAM.goldDark,
                                  fontWeight: 700,
                                }
                              : {
                                  color: CREAM.text,
                                  borderLeft: "3px solid transparent",
                                }
                          }
                        >
                          <span className="ml-1.5">
                            {link.label}
                          </span>
                          {!isActive && (
                            <div
                              className="absolute inset-0 rounded-xl opacity-0 active:opacity-100 transition-opacity duration-200 pointer-events-none"
                              style={{
                                background: "rgba(0, 0, 0, 0.03)",
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* ── DUAL CONTACT BUTTONS ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-4 pb-5 pt-4"
                style={{
                  borderTop: `1px solid ${CREAM.border}`,
                }}
              >
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98]"
                  style={{
                    background: CREAM.whatsappBg,
                    border: `1px solid rgba(37, 211, 102, 0.2)`,
                    color: CREAM.text,
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  Asesoría por WhatsApp
                </a>

                <a
                  href={phoneHref}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98] mt-3"
                  style={{
                    background: `linear-gradient(135deg, ${CREAM.goldDark} 0%, ${CREAM.gold} 50%, ${CREAM.goldLight} 100%)`,
                    color: CREAM.white,
                    boxShadow: "0 4px 16px rgba(184, 134, 11, 0.2)",
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>

                <p
                  className="text-center text-[11px] mt-5 leading-relaxed"
                  style={{ color: CREAM.textMuted }}
                >
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