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
    GOLD PALETTE — MANDI CORP Ultra Premium
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

/* ═══════════════════════════════════════════════════════════════
    Gold Gradient Text utility
   ═══════════════════════════════════════════════════════════════ */
function GoldText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${GOLD.lightest} 0%, ${GOLD.primary} 40%, ${GOLD.medium} 70%, ${GOLD.primary} 100%)`,
      }}
    >
      {children}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const isSolid = isScrolled;

  // Dynamic WhatsApp URL based on current pathname
  const dynamicWhatsAppUrl = getDynamicWhatsAppUrl(pathname);
  const phoneHref = "tel:+51966897008";

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HEADER — GOLD IMMERSIVE ULTRA PREMIUM
          ─────────────────────────────────────────────────────────────
          · Transparente (top): fondo transparente, texto blanco/dorado
          · Scrolled:           fondo negro glass con borde dorado
          · Siempre: sutil glow dorado
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-500 ${
          isSolid
            ? "h-16 sm:h-[72px]"
            : "py-3 sm:py-4"
        }`}
        style={
          isSolid
            ? {
                background: "linear-gradient(180deg, rgba(6,5,3,0.92) 0%, rgba(6,5,3,0.97) 100%)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                borderBottom: `1px solid rgba(220, 170, 97, 0.2)`,
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(220, 170, 97, 0.15) inset`,
              }
            : {
                background: "transparent",
                borderBottom: "1px solid transparent",
              }
        }
      >
        {/* Subtle gold glow line at very top — always visible */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 5%, ${GOLD.dark} 20%, ${GOLD.primary} 50%, ${GOLD.dark} 80%, transparent 95%)`,
            opacity: isSolid ? 1 : 0.6,
            transition: "opacity 0.5s",
          }}
        />

        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* ── LOGO — Retina 2x PNG lossless ── */}
          <Link
            href="/"
            className="relative shrink-0 w-[140px] md:w-[220px]"
            style={{ aspectRatio: "3596 / 862" }}
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

          {/* ── DESKTOP NAV — Gold gradient links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-300 group ${
                    isSolid
                      ? ""
                      : ""
                  }`}
                >
                  {/* Gold text — always gold */}
                  <span
                    className={`relative z-10 transition-all duration-300 ${
                      isActive
                        ? ""
                        : "group-hover:drop-shadow-[0_0_8px_rgba(220,170,97,0.5)]"
                    }`}
                    style={{
                      backgroundImage: isActive
                        ? `linear-gradient(135deg, ${GOLD.lightest} 0%, ${GOLD.primary} 50%, ${GOLD.lightest} 100%)`
                        : `linear-gradient(135deg, ${GOLD.light} 0%, ${GOLD.primary} 50%, ${GOLD.medium} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
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
                        background: `linear-gradient(90deg, ${GOLD.medium} 0%, ${GOLD.primary} 50%, ${GOLD.lightest} 100%)`,
                        boxShadow: `0 0 12px ${GOLD.glowStrong}, 0 0 4px ${GOLD.primary}`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background glow */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${GOLD.glow} 0%, transparent 70%)`,
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP BUTTONS — Gold premium ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Button — Gold border + green icon */}
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] overflow-hidden"
              style={{
                border: `1px solid ${isSolid ? `${GOLD.primary}40` : "rgba(255,255,255,0.2)"}`,
                color: isSolid ? GOLD.lightest : "rgba(255,255,255,0.9)",
                background: isSolid
                  ? "rgba(220, 170, 97, 0.08)"
                  : "rgba(255,255,255,0.05)",
              }}
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
              {/* Gold shimmer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 30%, ${GOLD.glow} 50%, transparent 70%)`,
                }}
              />
            </a>

            {/* Call Button — Solid gold */}
            <a
              href={phoneHref}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${GOLD.dark} 0%, ${GOLD.medium} 40%, ${GOLD.primary} 100%)`,
                color: "#060503",
                boxShadow: `0 2px 16px ${GOLD.glow}, 0 1px 0 rgba(255,255,255,0.1) inset`,
              }}
              aria-label="Llamar por teléfono"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
              {/* Shine effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)`,
                }}
              />
            </a>
          </div>

          {/* ── MOBILE TOGGLE — Gold hamburger ── */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden relative p-2 rounded-xl transition-all duration-300 active:scale-95"
            style={{
              color: isSolid ? GOLD.primary : "rgba(255,255,255,0.9)",
            }}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
            {/* Subtle gold ring on touch */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 active:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                background: GOLD.glow,
              }}
            />
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE DRAWER — GOLD DARK IMMERSIVE
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
            {/* Backdrop — dark with gold tint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 backdrop-blur-md"
              style={{
                background: "radial-gradient(ellipse at right center, rgba(6,5,3,0.7) 0%, rgba(0,0,0,0.5) 100%)",
              }}
              onClick={closeMenu}
            />

            {/* Panel — Dark gold immersive */}
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
                background: "linear-gradient(180deg, #0a0806 0%, #060503 30%, #080604 100%)",
                borderLeft: `1px solid rgba(220, 170, 97, 0.25)`,
                boxShadow: `-20px 0 60px rgba(0, 0, 0, 0.6), -1px 0 0 rgba(220, 170, 97, 0.1) inset`,
              }}
            >
              {/* Gold glow line at top of panel */}
              <div
                className="h-[2px] shrink-0"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${GOLD.dark} 15%, ${GOLD.primary} 50%, ${GOLD.dark} 85%, transparent 100%)`,
                }}
              />

              {/* Panel Header — Logo + Close */}
              <div
                className="flex items-center justify-between px-5 pt-5 pb-4"
                style={{
                  borderBottom: `1px solid rgba(220, 170, 97, 0.12)`,
                }}
              >
                <div
                  className="relative shrink-0 w-[150px]"
                  style={{ aspectRatio: "3596 / 862" }}
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
                    background: "rgba(220, 170, 97, 0.08)",
                    border: "1px solid rgba(220, 170, 97, 0.15)",
                    color: GOLD.primary,
                  }}
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links — Gold immersive */}
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
                          className={`relative flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300 active:scale-[0.98] overflow-hidden ${
                            isActive ? "" : ""
                          }`}
                          style={
                            isActive
                              ? {
                                  background: `linear-gradient(135deg, rgba(220,170,97,0.12) 0%, rgba(220,170,97,0.05) 100%)`,
                                  borderLeft: `3px solid ${GOLD.primary}`,
                                  color: GOLD.lightest,
                                  boxShadow: `inset 0 0 20px rgba(220, 170, 97, 0.05)`,
                                }
                              : {
                                  color: "rgba(255,255,255,0.6)",
                                  borderLeft: "3px solid transparent",
                                }
                          }
                        >
                          <span
                            className="ml-1.5 transition-all duration-300"
                            style={
                              !isActive
                                ? {
                                    // Hover handled via group - we use inline approach
                                  }
                                : undefined
                            }
                          >
                            {link.label}
                          </span>
                          {/* Hover glow overlay */}
                          {!isActive && (
                            <div
                              className="absolute inset-0 rounded-xl opacity-0 active:opacity-100 transition-opacity duration-200 pointer-events-none"
                              style={{
                                background: `linear-gradient(135deg, rgba(220,170,97,0.06) 0%, transparent 100%)`,
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* ── DUAL CONTACT BUTTONS — Gold themed ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-4 pb-5 pt-4"
                style={{
                  borderTop: `1px solid rgba(220, 170, 97, 0.12)`,
                }}
              >
                {/* WhatsApp Button — Dark with green icon + gold border */}
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98]"
                  style={{
                    background: "rgba(37, 211, 102, 0.1)",
                    border: `1px solid rgba(37, 211, 102, 0.25)`,
                    color: "#25D366",
                    boxShadow: "0 4px 20px rgba(37, 211, 102, 0.1)",
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Asesoría por WhatsApp
                </a>

                {/* Call Button — Solid gold */}
                <a
                  href={phoneHref}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full min-h-[52px] rounded-xl text-[15px] font-bold transition-all duration-300 active:scale-[0.98] mt-3"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD.dark} 0%, ${GOLD.medium} 40%, ${GOLD.primary} 100%)`,
                    color: "#060503",
                    boxShadow: `0 4px 24px ${GOLD.glow}`,
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>

                <p
                  className="text-center text-[11px] mt-5 leading-relaxed"
                  style={{ color: "rgba(220, 170, 97, 0.4)" }}
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