"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400); // 0.4 segundos estrictos
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Overlay del Preloader */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 transition-opacity duration-400 ease-in-out ${
          loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!loading}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Spinner naranja */}
          <svg
            className="animate-spin h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#FF6B00"
              strokeWidth="3"
              strokeLinecap="round"
              className="opacity-20"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="#FF6B00"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs font-semibold tracking-widest text-orange-400/60 uppercase">
            Cargando
          </span>
        </div>
      </div>

      {/* Contenido principal */}
      {children}
    </>
  );
}
