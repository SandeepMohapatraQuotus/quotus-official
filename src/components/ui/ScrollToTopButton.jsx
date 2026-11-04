import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useLenis } from "../overlays/SmoothScroll";
import { EASE_OUT, SCROLL_SPRING } from "../../lib/motion";

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTopButton() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Ring around the button fills as the page is read
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);

  useMotionValueEvent(scrollY, "change", (y) => setIsVisible(y > 400));

  const scrollToTop = (e) => {
    e.currentTarget.blur();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-full bg-[#21047c] text-white shadow-xl shadow-[#21047c]/30 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#513897] focus-visible:ring-offset-2"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            <circle
              cx="28"
              cy="28"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r={RADIUS}
              fill="none"
              stroke="#b8b2ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ pathLength: progress }}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
