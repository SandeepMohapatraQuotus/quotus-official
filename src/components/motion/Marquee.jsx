import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/**
 * Endless horizontal ticker. Scrolling the page speeds it up and
 * scrolling back up reverses it, which makes the page feel connected.
 * @param {number} speed - Base speed in percent of track width per second.
 * @param {-1|1} direction - 1 moves left, -1 moves right.
 */
export default function Marquee({ children, speed = 2.5, direction = 1, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  const directionRef = useRef(direction);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -direction;
    else if (factor > 0) directionRef.current = direction;

    const move = directionRef.current * -speed * (delta / 1000) * (1 + Math.abs(factor));
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}
