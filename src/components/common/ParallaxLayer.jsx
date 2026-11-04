import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Wraps children in a parallax container.
 * @param {number} speed - Positive = slower than scroll (bg feel). Negative = faster than scroll.
 * @param {string} className - Additional Tailwind classes.
 */
export default function ParallaxLayer({ children, speed = 0.3, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -150, speed * 150]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

