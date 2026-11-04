import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useScroll, useTransform } from "framer-motion";
import { InView } from "react-intersection-observer";
import { seededRandom } from "../../lib/motion";

// Generated once so the particles keep their positions across re-renders
const rand = seededRandom(21);
const PARTICLES = Array.from({ length: 30 }, () => ({
  size: rand() * 3 + 1,
  left: rand() * 100,
  top: rand() * 100,
  opacity: rand() * 0.15 + 0.05,
  rise: rand() * 40 + 20,
  duration: rand() * 8 + 6,
  delay: rand() * 5,
}));

function Stats() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Horizontal drift on scroll
  const driftX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const stats = [
    { value: 15, label: "Happy Clients", suffix: "+", icon: "🤝" },
    { value: 50, label: "Projects Completed", suffix: "+", icon: "🚀" },
    { value: 99, label: "Client Satisfaction", suffix: "%", icon: "⭐" },
    { value: "24/7", label: "Support Available", suffix: "", icon: "💬" },
  ];

  return (
    <InView threshold={0.3} triggerOnce>
      {({ inView, ref: inViewRef }) => (
        <section
          ref={(el) => {
            sectionRef.current = el;
            inViewRef(el);
          }}
          className="relative py-20 text-white mt-10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a0068 0%, #1f0079 50%, #2d1080 100%)" }}
        >
          {/* SVG noise texture overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  opacity: p.opacity,
                }}
                animate={{
                  y: [0, -p.rise],
                  opacity: [0.1, 0.3, 0.05],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Glow blobs */}
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,92,191,0.3) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(31,0,121,0.4) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Content */}
          <motion.div
            className="max-w-6xl mx-auto px-4 relative z-10"
            style={{ x: driftX }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 relative">
              {stats.map((stat, index) => (
                <div key={index} className="relative">
                  {/* Vertical divider (not last) */}
                  {index < stats.length - 1 && (
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-px bg-white/20 hidden md:block"
                      initial={{ height: 0 }}
                      animate={inView ? { height: "60%" } : { height: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 60, rotateX: 45 }}
                    animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 80,
                      damping: 12,
                    }}
                    className="text-center px-4 py-6"
                    style={{ transformStyle: "preserve-3d", perspective: "500px" }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="text-2xl mb-2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Counter */}
                    <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#b8b2ff] to-white bg-clip-text text-transparent">
                      {typeof stat.value === "number" ? (
                        <CountUp
                          end={stat.value}
                          duration={2.5}
                          suffix={stat.suffix}
                          start={inView ? 0 : undefined}
                          separator=","
                        />
                      ) : (
                        <span>{stat.value}</span>
                      )}
                    </div>

                    {/* Label */}
                    <motion.div
                      className="text-[#b8b2ff] text-sm font-medium tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                    >
                      {stat.label}
                    </motion.div>

                    {/* Bottom accent line */}
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-transparent via-[#7c5cbf] to-transparent mx-auto mt-3"
                      initial={{ width: 0 }}
                      animate={inView ? { width: "60%" } : { width: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.6 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </InView>
  );
}

export default Stats;
