"use client";

import { ElementType, useEffect, useRef } from "react";

function phraseLines(text: string, targetLength: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > targetLength) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      node.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -7% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function MotionHeading({ as: Tag, text = "", lines, className = "", id }: { as: ElementType; text?: string; lines?: string[]; className?: string; id?: string }) {
  const ref = useReveal<HTMLHeadingElement>();
  const resolvedLines = lines ?? phraseLines(text, 34);
  return <Tag id={id} ref={ref} className={`rise-heading ${className}`.trim()} aria-label={resolvedLines.join(" ")}>{resolvedLines.map((line, index) => <span className="rise-line" aria-hidden="true" key={`${line}-${index}`}><span style={{ transitionDelay: `${index * 105}ms` }}>{line}</span></span>)}</Tag>;
}

export function BlurLines({ text, lines, className = "", as: Tag = "p" }: { text?: string; lines?: string[]; className?: string; as?: ElementType }) {
  const ref = useReveal<HTMLElement>();
  const resolvedLines = lines ?? phraseLines(text ?? "", 58);
  return <Tag ref={ref} className={`blur-lines ${className}`.trim()} aria-label={resolvedLines.join(" ")}>{resolvedLines.map((line, index) => <span className="blur-line" aria-hidden="true" key={`${line}-${index}`}><span style={{ transitionDelay: `${index * 90 + 90}ms` }}>{line}</span></span>)}</Tag>;
}
