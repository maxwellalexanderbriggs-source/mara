"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY, ticking = false;
    const update = () => {
      const y = window.scrollY;
      const header = document.querySelector<HTMLElement>(".site-header, .inner-site-header");
      const hero = document.querySelector<HTMLElement>(".hero-scroll, .development-hero, .location-hero, .about-hero");
      const heroStage = document.querySelector<HTMLElement>(".hero-stage");
      heroStage?.classList.toggle("hero-interacted", y > 10);
      if (header) {
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
        header.classList.toggle("nav-solid", heroBottom <= header.offsetHeight + 8);
        header.classList.toggle("nav-scrolled", y > 8);
        if (y > lastY + 5 && y > 120) header.classList.add("nav-hidden");
        if (y < lastY - 4 || y < 80) header.classList.remove("nav-hidden");
      }
      if (!reduceMotion) document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((media) => {
        const section = media.closest<HTMLElement>(".hero-scroll, .development-hero, .location-hero, .about-hero");
        if (!section) return;
        const progress = Math.max(0, Math.min(section.offsetHeight, -section.getBoundingClientRect().top));
        media.style.setProperty("--parallax-y", `${-Math.min(150, progress * .22)}px`);
      });
      document.querySelectorAll<HTMLElement>(".motion-title:not(.is-entered), .motion-blur:not(.is-entered), .motion-image:not(.is-entered)").forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * .95 && bounds.bottom > 0) element.classList.add("is-entered");
      });
      lastY = y; ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    const entranceObserver = reduceMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-entered");
        entranceObserver?.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });

    const observeEntrance = (element: HTMLElement) => {
      entranceObserver?.observe(element);
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * .92 && bounds.bottom > 0) requestAnimationFrame(() => element.classList.add("is-entered"));
    };

    document.querySelectorAll<HTMLElement>("main section").forEach((section) => {
      const isHero = section.matches(".hero-scroll, .development-hero, .location-hero, .about-hero");
      if (!isHero) {
        section.querySelectorAll<HTMLElement>("h2:not(.rise-heading), h3:not(.rise-heading)").forEach((title, index) => {
          if (title.closest(".rail-card")) return;
          title.classList.add("motion-title");
          title.style.setProperty("--motion-delay", `${index * 90}ms`);
          observeEntrance(title);
        });
        section.querySelectorAll<HTMLElement>("p, a, button, figcaption, [data-motion-copy]").forEach((item, index) => {
          if (item.closest(".rail-card")) return;
          item.classList.add("motion-blur");
          item.style.setProperty("--motion-delay", `${Math.min(index, 5) * 75 + 120}ms`);
          observeEntrance(item);
        });
      }
      section.querySelectorAll<HTMLImageElement>("img").forEach((item, index) => {
        if (item.closest(".wipe-image, .rail-card")) return;
        item.classList.add("motion-image");
        item.style.setProperty("--image-delay", `${Math.min(index, 5) * 140}ms`);
        observeEntrance(item);
      });
    });

    update(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { entranceObserver?.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [pathname]);
  return null;
}
