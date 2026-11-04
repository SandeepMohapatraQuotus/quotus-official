import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { industryGroups } from "../../data/domainExpertiseData";
import IndustryPanel from "./IndustryPanel";
import { useLenis } from "../overlays/SmoothScroll";
import WhyChooseUs from "./WhyUs";
import Workflow from "./Workflow";

// Height of your fixed/sticky navbar in px. Panels are pushed down by this much.
const NAV_OFFSET = 80;

const IntroPanel = () => (
  <div className="w-full max-w-4xl mx-auto px-12 xl:px-16 text-center">
    <motion.h2
      className="text-4xl xl:text-5xl font-bold text-[#1f0079] mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      >
        Empowering
      </motion.span>{" "}
      <span>Industries with Innovation</span>
    </motion.h2>

    <motion.p
      className="text-lg text-gray-600 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      From blockchain to traveltech, we build transformative digital solutions and
      integrations that drive growth, efficiency, and future-readiness across diverse
      industry verticals.
    </motion.p>

    {/* Scroll hint */}
    <motion.div
      className="mt-12 inline-flex items-center gap-3 text-sm font-medium text-[#513897]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      Keep scrolling
      <motion.span
        className="block h-px w-12 bg-[#513897] origin-left"
        animate={{ scaleX: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </div>
);

const panels = [
  { key: "intro", label: "Overview", node: <IntroPanel /> },
  ...industryGroups.map((group, i) => ({
    key: `industry-${i}`,
    label: group.title.trim(),
    node: <IndustryPanel group={group} />,
  })),
  {
    key: "why",
    label: "Why choose us",
    node: (
      <div className="w-full">
        <WhyChooseUs />
      </div>
    ),
  },
  {
    key: "process",
    label: "Our process",
    node: (
      <div className="w-full">
        <Workflow />
      </div>
    ),
  },
];

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const n = panels.length;

  // Vertical scroll progress through the tall container (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth it so mouse-wheel steps feel fluid
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  // Move the track left by (n - 1) panel widths
  const x = useTransform(progress, [0, 1], ["0%", `-${((n - 1) / n) * 100}%`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  const goTo = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const target = top + (index / (n - 1)) * distance;
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    // Tall container: the extra height is the "scroll distance" for the sideways motion
    <div ref={containerRef} className="relative" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Horizontal track */}
        <motion.div
          style={{ x, width: `${n * 100}%` }}
          className="flex h-full will-change-transform"
        >
          {panels.map((panel) => (
            <div
              key={panel.key}
              className="h-full shrink-0 flex items-center border-r border-gray-100 last:border-r-0"
              style={{
                width: `${100 / n}%`,
                paddingTop: NAV_OFFSET,
                paddingBottom: 88,
              }}
            >
              {panel.node}
            </div>
          ))}
        </motion.div>

        {/* Step navigation: jump to any panel, current one is labelled */}
        <nav
          aria-label="About sections"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-[#513897]/15 bg-white/80 backdrop-blur-md px-3 py-2 shadow-lg shadow-[#1f0079]/10"
        >
          {panels.map((panel, i) => {
            const isActive = i === active;
            return (
              <button
                key={panel.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={panel.label}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex items-center justify-center min-w-5 h-7 cursor-pointer"
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`flex items-center rounded-full overflow-hidden whitespace-nowrap text-xs font-medium ${
                    isActive
                      ? "h-7 px-3 bg-gradient-to-r from-[#1f0079] to-[#513897] text-white"
                      : "h-2.5 w-2.5 bg-[#513897]/25 group-hover:bg-[#513897]/60"
                  }`}
                >
                  {isActive && panel.label}
                </motion.span>
              </button>
            );
          })}
        </nav>

        {/* Progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-[#1f0079] to-[#513897]"
        />
      </div>
    </div>
  );
};

export default HorizontalScroll;