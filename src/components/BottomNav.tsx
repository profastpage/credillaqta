"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wallet, Car, Users, Menu } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
    MANDI CORP — Bottom Navigation Mobile (Ultra Premium)
    ─────────────────────────────────────────────────────────────
    · Solo visible < 1024px (lg:hidden)
    · Fijo en parte inferior con safe-area iOS
    · Fondo negro MANDI #060503
    · Borde superior dorado metálico
    · Esquinas superiores redondeadas
    · Sombra premium + animaciones 200ms
    · Área táctil mínima 48px
    · Botón "Más" dispara evento 'mandi:open-drawer' que escucha el Navbar
   ═══════════════════════════════════════════════════════════════ */

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Si true, dispara evento para abrir el drawer lateral en lugar de navegar */
  isDrawerTrigger?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Préstamos", href: "/prestamos-personales", icon: Wallet },
  { label: "Garantía", href: "/garantia-vehicular", icon: Car },
  { label: "Nosotros", href: "/nosotros", icon: Users },
  { label: "Más", href: "#more", icon: Menu, isDrawerTrigger: true },
];

/**
 * Determina si una ruta está "activa" dado el pathname actual.
 * "/" solo activa en match exacto, las demás con startsWith.
 */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function BottomNav() {
  const pathname = usePathname();
  // Trigger para re-mount de animación cuando cambia la ruta
  const [routeKey, setRouteKey] = useState(pathname);

  useEffect(() => {
    setRouteKey(pathname);
  }, [pathname]);

  /**
   * Dispara un evento global que escucha el Navbar para abrir su drawer lateral.
   * Esto evita acoplar BottomNav al estado interno del Navbar.
   */
  const openDrawer = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("mandi:open-drawer"));
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        key="bottom-nav"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Navegación inferior móvil"
      >
        <div
          className="relative mx-auto"
          style={{
            background: "linear-gradient(180deg, #060503 0%, #000000 100%)",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow:
              "0 -8px 32px rgba(0, 0, 0, 0.6), 0 -1px 0 rgba(220, 170, 97, 0.4) inset",
            overflow: "hidden",
          }}
        >
          {/* Borde superior dorado metálico (gradiente) */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #6D4B21 15%, #A97631 30%, #DCAA61 50%, #F5E6C8 55%, #DCAA61 70%, #A97631 85%, transparent 100%)",
            }}
          />

          {/* Glow dorado sutil debajo del borde superior */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(220, 170, 97, 0.18) 0%, transparent 70%)",
            }}
          />

          {/* Items del menú */}
          <ul className="flex items-stretch justify-around px-1.5 pt-2 pb-2">
            {NAV_ITEMS.map((item) => {
              const active = !item.isDrawerTrigger && isActive(pathname, item.href);
              const Icon = item.icon;

              if (item.isDrawerTrigger) {
                // Botón "Más" — dispara evento para abrir drawer
                return (
                  <li key={item.label} className="flex-1">
                    <button
                      onClick={openDrawer}
                      className="group w-full flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-1 px-1 active:scale-95 transition-transform duration-200"
                      aria-label="Abrir menú completo"
                    >
                      <span className="relative flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-400 group-active:text-[#DCAA61] transition-colors duration-200" />
                        {/* Glow sutil al activar */}
                        <span className="absolute inset-0 -m-2 rounded-full bg-[#DCAA61]/0 group-active:bg-[#DCAA61]/15 transition-colors duration-200" />
                      </span>
                      <span className="text-[10px] font-medium tracking-wide text-slate-400 group-active:text-[#DCAA61] transition-colors duration-200">
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    className="group w-full flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-1 px-1 active:scale-95 transition-transform duration-200"
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="relative flex items-center justify-center">
                      <Icon
                        className={`w-5 h-5 transition-colors duration-200 ${
                          active
                            ? "text-[#DCAA61]"
                            : "text-slate-400 group-active:text-[#DCAA61]"
                        }`}
                      />
                      {/* Glow sutil cuando activo */}
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            key={`glow-${routeKey}-${item.href}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.4 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 -m-2 rounded-full bg-[#DCAA61]/15 pointer-events-none"
                          />
                        )}
                      </AnimatePresence>
                      {/* Indicador superior dorado cuando activo */}
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            key={`indicator-${routeKey}-${item.href}`}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "20px", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, #A97631 0%, #DCAA61 50%, #F5E6C8 100%)",
                              boxShadow: "0 0 8px rgba(220, 170, 97, 0.6)",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                        active
                          ? "text-[#DCAA61]"
                          : "text-slate-400 group-active:text-[#DCAA61]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
