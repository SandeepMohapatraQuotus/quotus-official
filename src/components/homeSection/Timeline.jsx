import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { data } from "../../data/timelineData";

/* ─── Animated vertical line that draws itself as you scroll ─── */
function TimelineLine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    /* track */
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#1f0079]/10 hidden md:block">
      {/* fill */}
      <motion.div
        className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-[#1f0079] via-[#513897] to-[#7a5af5]"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}

/* ─── Single timeline node + card ─── */
function TimelineItem({ event, index }) {
  const ref = useRef(null);
  const isLeft = index % 2 === 0;
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
    },
  };

  /* mobile: always slide up */
  const mobileVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-y-4 md:gap-x-8 mb-16 last:mb-0"
    >
      {/* ── Left slot (desktop) ── */}
      <div className="hidden md:flex justify-end">
        {isLeft && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card event={event} index={index} />
          </motion.div>
        )}
      </div>

      {/* ── Centre node ── */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 } }
              : {}
          }
          className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#1f0079] to-[#7a5af5] shadow-[0_0_20px_4px_rgba(122,90,245,0.45)]"
        >
          <span className="text-white text-[11px] font-bold tracking-tight leading-none text-center">
            {event.year}
          </span>
          {/* pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#7a5af5]"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* ── Right slot (desktop) ── */}
      <div className="hidden md:flex justify-start">
        {!isLeft && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card event={event} index={index} />
          </motion.div>
        )}
      </div>

      {/* ── Mobile: year badge + card stacked ── */}
      <div className="flex md:hidden items-start gap-4">
        {/* left accent bar */}
        <div className="flex flex-col items-center pt-1 shrink-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 18 } }
                : {}
            }
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f0079] to-[#7a5af5] flex items-center justify-center shadow-[0_0_14px_3px_rgba(122,90,245,0.4)]"
          >
            <span className="text-white text-[10px] font-bold">{event.year}</span>
          </motion.div>
          <div className="w-[2px] flex-1 mt-2 bg-gradient-to-b from-[#513897] to-transparent min-h-[40px]" />
        </div>
        <motion.div
          variants={mobileVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-1 pb-2"
        >
          <Card event={event} index={index} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Card ─── */
function Card({ event, index }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="relative group max-w-sm w-full"
    >
      {/* glow on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#1f0079] via-[#7a5af5] to-[#513897] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />

      <div className="relative rounded-2xl bg-white border border-[#1f0079]/10 p-6 shadow-[0_4px_24px_rgba(31,0,121,0.10)] overflow-hidden">
        {/* shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(122,90,245,0.15) 50%, transparent 60%)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2.2,
            delay: 0.6 + index * 0.15,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />

        {/* top accent bar */}
        <div className="h-[3px] w-10 rounded-full bg-gradient-to-r from-[#1f0079] to-[#7a5af5] mb-4" />

        <h3 className="text-base font-bold text-[#1f0079] mb-2 leading-snug">
          {event.title}
        </h3>
        <p className="text-sm text-[#513897]/80 leading-relaxed">
          {event.description}
        </p>

        {/* bottom year tag */}
        <div className="mt-4 inline-flex items-center gap-1.5 bg-[#1f0079]/6 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7a5af5] inline-block" />
          <span className="text-xs font-semibold text-[#1f0079] tracking-wide">
            {event.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section heading ─── */
function SectionHeading() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-20"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* eyebrow */}
      <motion.span
        className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#7a5af5] mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Our Story
      </motion.span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f0079] leading-tight">
        Quotus{" "}
        <span className="relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] via-[#513897] to-[#7a5af5]">
            Timeline
          </span>
          {/* underline decoration */}
          <motion.span
            className="absolute left-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-[#1f0079] to-[#7a5af5]"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          />
        </span>
      </h2>

      <motion.p
        className="mt-4 text-sm sm:text-base text-[#513897]/70 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        Our journey through innovation and milestones
      </motion.p>
    </motion.div>
  );
}

/* ─── Main export ─── */
export default function Timeline() {
  const containerRef = useRef(null);

  return (
    <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 w-full max-w-5xl mx-auto">
      <SectionHeading />

      <div ref={containerRef} className="relative">
        {/* scroll-driven line (desktop only) */}
        <TimelineLine containerRef={containerRef} />

        {data.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
