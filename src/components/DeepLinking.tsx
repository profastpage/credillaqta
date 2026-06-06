"use client";

import { useEffect, useRef, ReactNode } from "react";

/**
 * DeepLinking Observer
 *
 * - On mount: scrolls to the section matching the current URL hash (if any).
 * - On scroll: updates the URL hash via History API (no reload) so the active
 *   section is always shareable.
 * - On popstate (back/forward): scrolls to the section indicated by the hash.
 *
 * Only observes <section id="…"> elements inside <main>.
 * Zero visual changes — purely structural routing.
 */

interface Props {
  children: ReactNode;
}

export default function DeepLinking({ children }: Props) {
  const ready = useRef(false);

  useEffect(() => {
    /* ── 1. Scroll to initial hash ── */
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(initialHash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    }

    /* ── 2. Scroll spy — update URL on scroll ── */
    let ticking = false;

    const updateHash = () => {
      const sections = document.querySelectorAll("main section[id]");
      if (sections.length === 0) return;

      const triggerY = window.innerHeight * 0.2; // 20 % from viewport top
      let activeId = "";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerY) {
          activeId = section.id;
        } else {
          break; // sections are top-to-bottom; once past trigger, stop
        }
      }

      const target = activeId ? `#${activeId}` : window.location.pathname;
      if (window.location.hash !== `#${activeId}`) {
        history.replaceState(null, "", target);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHash();
          ticking = false;
        });
        ticking = true;
      }
    };

    /* ── 3. Popstate — back / forward ── */
    const onPopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    /* ── Init after a short delay so DOM is fully painted ── */
    const initTimer = setTimeout(() => {
      updateHash();
      ready.current = true;
    }, 120);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return <>{children}</>;
}
