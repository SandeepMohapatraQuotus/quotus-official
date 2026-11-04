import { motion, useScroll, useSpring } from "framer-motion";
import { SCROLL_SPRING } from "../../lib/motion";

// Thin brand-gradient bar at the top of the viewport showing page progress
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#1f0079] via-[#513897] to-[#7c5cbf] pointer-events-none"
    />
  );
}
