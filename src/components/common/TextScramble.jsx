import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

/**
 * Scrambles text and resolves to final string.
 * @param {string} text - The final text to display.
 * @param {boolean} trigger - When true, starts the animation.
 * @param {string} className - Tailwind classes.
 * @param {number} duration - Total animation duration in ms (default 1200).
 */
export default function TextScramble({ text, trigger = true, className = "", duration = 1200 }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const totalFrames = Math.ceil(duration / 40);
    let frame = 0;

    const animate = () => {
      const progress = frame / totalFrames;
      const resolved = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      frame++;
      if (frame <= totalFrames) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, text, duration]);

  return <span className={className}>{display}</span>;
}

