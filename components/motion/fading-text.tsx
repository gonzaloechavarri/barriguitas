"use client";

import { useEffect, useState } from "react";

type FadingTextProps = {
  text: string;
  className?: string;
  as?: "span" | "p" | "h1";
};

export function FadingText({
  text,
  className = "",
  as: Component = "span",
}: FadingTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (text === displayText) return;

    setIsVisible(false);

    const timeout = window.setTimeout(() => {
      setDisplayText(text);
      setIsVisible(true);
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [text, displayText]);

  return (
    <Component
      className={`motion-safe:transition-opacity motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {displayText}
    </Component>
  );
}
