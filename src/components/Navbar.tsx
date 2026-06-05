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
    WhatsApp SVG Icon — Brand green #25D366
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

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isSolid = isScrolled;

  // Dynamic WhatsApp URL based on current pathname
  const dynamicWhatsAppUrl = getDynamicWhatsAppUrl(pathname);
  const phoneHref = "tel:+51902495977";

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HEADER — Fixed, compacto minimalista
          Transparente: py-3 sm:py-4
          Scrolled:     h-16 sm:h-[72px]
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-colors duration-300 ${
          isSolid
            ? "bg-white shadow-md border-b border-slate-100 h-16 sm:h-[72px]"
            : "bg-transparent py-3 sm:py-4"
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* ── LOGO — Compacto, SIN recorte ──
              Mobile: w-[130px] → ~65px
              PC:     w-[180px] → ~90px
          ── */}
          <Link
            href="/"
            className="relative shrink-0 w-[130px] md:w-[180px]"
            style={{ aspectRatio: "1774 / 887" }}
            aria-label="Unión El Progreso - Inicio"
          >
            <Image
              src="/logo-union-transparente.png"
              alt="Logo Unión El Progreso"
              fill
              priority
              sizes="(max-width: 768px) 190px, 260px"
              className="object-contain object-left select-none"
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div
            className={`hidden lg:flex items-center gap-1 transition-colors duration-300 ${
              isSolid ? "text-slate-600" : "text-white"
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isSolid
                      ? isActive
                        ? "text-[#FF6A00]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        isSolid ? "bg-[#FF6A00]" : "bg-white/60"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP DUAL CONTACT BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
                isSolid
                  ? "bg-[#25D366] hover:bg-[#1fb855] text-white shadow-lg shadow-[#25D366]/20"
                  : "border border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Call Button */}
            <a
              href={phoneHref}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
                isSolid
                  ? "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20"
                  : "border border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label="Llamar por teléfono"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
            </a>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            onClick={() => setIsOpen(true)}
            className={`lg:hidden p-1.5 rounded-xl transition-colors duration-300 ${
              isSolid
                ? "text-slate-800 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE MENU — Slide-in overlay z-[100]
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
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
              onClick={closeMenu}
            />

            {/* Panel */}
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
              {/* Panel Header — Logo ancho proporcional */}
              <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-slate-100">
                <div
                  className="relative shrink-0 w-[130px]"
                  style={{ aspectRatio: "1774 / 887" }}
                >
                  <Image
                    src="/logo-union-transparente.png"
                    alt="Unión El Progreso"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-200 active:scale-95"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
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

              {/* ── DUAL CONTACT BUTTONS — Ergonomic mobile touch targets ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-4 pb-4 pt-4 border-t border-slate-100"
              >
                {/* WhatsApp Giant Button */}
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1fb855] text-white min-h-[48px] rounded-xl text-[15px] font-bold shadow-lg shadow-[#25D366]/20 transition-all duration-300 active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Asesoría por WhatsApp
                </a>

                {/* Call Giant Button */}
                <a
                  href={phoneHref}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white min-h-[48px] rounded-xl text-[15px] font-bold shadow-lg shadow-slate-900/20 transition-all duration-300 active:scale-[0.98] mt-3"
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>

                <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                  UNIÓN EL PROGRESO PERÚ S.A.C.
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
