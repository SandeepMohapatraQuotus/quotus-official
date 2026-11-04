import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SCROLL_SPRING } from "../../lib/motion";

/**
 * Image that drifts inside its frame as the frame scrolls through the viewport.
 * The image is scaled up slightly so the drift never exposes the frame's edges.
 * @param {number} strength - Drift as a percentage of the frame height.
 */
export default function ParallaxImage({
  src,
  alt,
  strength = 12,
  className = "",
  imgClassName = "",
  loading = "lazy",
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const y = useTransform(smooth, [0, 1], [`-${strength}%`, `${strength}%`]);
  const scale = 1 + (strength * 2.2) / 100;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={{ y, scale }}
        className={`absolute inset-0 w-full h-full object-cover will-change-transform ${imgClassName}`}
      />
      {children}
    </div>
  );
}
