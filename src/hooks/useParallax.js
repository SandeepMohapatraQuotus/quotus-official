import { useScroll, useTransform } from "framer-motion";

/**
 * Returns a motionValue `y` that translates based on scroll position.
 * @param {number} speed - Parallax speed multiplier. Positive = moves down slower. Negative = moves up faster.
 * @param {Array} inputRange - Scroll progress input range, e.g. [0, 1]
 * @param {Array} outputRange - Y output range in px, e.g. [0, -200]
 */
export function useParallax(speed = 0.5, ref = null) {
  const { scrollYProgress } = useScroll(
    ref ? { target: ref, offset: ["start end", "end start"] } : {}
  );
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);
  return y;
}

