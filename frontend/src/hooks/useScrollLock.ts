"use client";

import { useEffect } from "react";

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      document.body.classList.remove("scroll-locked");
      document.body.style.removeProperty("--scroll-lock-top");
      return;
    }

    const scrollY = window.scrollY;
    document.body.style.setProperty("--scroll-lock-top", `-${scrollY}px`);
    document.body.classList.add("scroll-locked");

    return () => {
      document.body.classList.remove("scroll-locked");
      document.body.style.removeProperty("--scroll-lock-top");
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
