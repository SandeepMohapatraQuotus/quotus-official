import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiEthereum,
  SiDotnet,
  SiFlutter,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import LetterPullUp from "../overlays/LetterPullUp";
import { useLenis } from "../overlays/SmoothScroll";
import { seededRandom } from "../../lib/motion";

// Particle and tag drift values are generated once so they never jump on re-render
const rand = seededRandom(7);
const PARTICLES = Array.from({ length: 35 }, () => ({
  size: rand() * 3 + 1,
  left: rand() * 100,
  top: rand() * 100,
  dx: (rand() - 0.5) * 40,
  dy: (rand() - 0.5) * 40,
  duration: rand() * 20 + 15,
}));
const TAG_DRIFT = Array.from({ length: 8 }, () => ({
  dx: rand() * 20 - 10,
  dy: rand() * 20 - 10,
  duration: 15 + rand() * 10,
}));

export default function HeroSection() {
  const containerRef = useRef(null);
  const lenis = useLenis();
  const orbitProgress = useMotionValue(0);
  const outerOrbitProgress = useMotionValue(0);

  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Scroll-driven parallax on hero exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const techLogos = [
    { name: "React", icon: <SiReact className="w-full h-full" />, color: "text-[#1f0079]" },
    { name: "Java", icon: <FaJava className="w-full h-full" />, color: "text-[#1f0079]" },
    { name: "Blockchain", icon: <SiEthereum className="w-full h-full" />, color: "text-[#1f0079]" },
    { name: "Web App", icon: <SiDotnet className="w-full h-full" />, color: "text-[#1f0079]" },
    { name: "Android", icon: <SiFlutter className="w-full h-full" />, color: "text-[#513897]" },
    { name: "MongoDB", icon: <SiMongodb className="w-full h-full" />, color: "text-[#1f0079]" },
    { name: "JavaScript", icon: <SiJavascript className="w-full h-full" />, color: "text-[#513897]" },
    { name: "Node.js", icon: <SiNodedotjs className="w-full h-full" />, color: "text-[#513897]" },
  ];

  const outerDots = [
    { color: "#1f0079" },
    { color: "#513897" },
    { color: "#1f0079" },
    { color: "#7c5cbf" },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Inner orbit animation
  useEffect(() => {
    const dur = screenSize.isMobile ? 60 : screenSize.isTablet ? 50 : 40;
    const anim = animate(orbitProgress, 1, { duration: dur, repeat: Infinity, ease: "linear" });
    return () => anim.stop();
  }, [screenSize, orbitProgress]);

  // Outer orbit animation (counter-clockwise, slower)
  useEffect(() => {
    const dur = screenSize.isMobile ? 90 : screenSize.isTablet ? 70 : 55;
    const anim = animate(outerOrbitProgress, -1, { duration: dur, repeat: Infinity, ease: "linear" });
    return () => anim.stop();
  }, [screenSize, outerOrbitProgress]);

  const getResponsiveValue = (mobile, tablet, desktop) =>
    screenSize.isMobile ? mobile : screenSize.isTablet ? tablet : desktop;

  // Mouse parallax transforms at different depths
  const gridX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const gridY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);
  const particleX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]);
  const particleY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const orbitTiltX = useTransform(smoothMouseX, [-0.5, 0.5], [6, -6]);
  const orbitTiltY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);
  const blobX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const blobY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen md:h-full lg:h-screen w-full overflow-hidden bg-white flex flex-col lg:flex-row items-center justify-center lg:justify-start pt-16 lg:pt-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      {/* ── Animated Gradient Mesh Background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y: heroBgY }}
      >
        {/* Drifting blob 1 */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(81,56,151,0.08) 0%, transparent 70%)",
            top: "-10%",
            right: "-5%",
            x: blobX,
            y: blobY,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Drifting blob 2 */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(31,0,121,0.06) 0%, transparent 70%)",
            bottom: "10%",
            left: "5%",
            x: useTransform(blobX, (v) => -v * 0.6),
            y: useTransform(blobY, (v) => -v * 0.6),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </motion.div>

      {/* ── Circuit Board Pattern (mouse parallax depth 1) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: gridX, y: gridY }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M60 0v60H0V0h60zM10 10v40h40V10H10zm5 5h30v30H15V15zm5 5v20h20V20H20z' stroke='%231f0079' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Grid SVG */}
        {!screenSize.isMobile && (
          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31,0,121,0.5)" strokeWidth="0.5" />
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(81,56,151,0.6)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}
      </motion.div>

      {/* ── Floating Particles (mouse parallax depth 2) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ x: particleX, y: particleY }}
      >
        {PARTICLES.slice(0, getResponsiveValue(12, 22, 35)).map((p, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? "bg-[#1f0079]" : i % 3 === 1 ? "bg-[#513897]" : "bg-[#7c5cbf]"
            }`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: screenSize.isMobile ? 0.15 : 0.3,
            }}
            animate={{
              x: [0, p.dx],
              y: [0, p.dy],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ── Left Side: Text Content ── */}
      <motion.div
        className="w-full lg:w-1/2 z-20 text-center lg:text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0 mt-[20px] lg:mt-0"
        style={{ y: heroTextY, opacity: heroOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4 md:mb-6 bg-[#1f0079]/10 backdrop-blur-md rounded-full border border-[#513897]/20 mx-auto lg:mx-0"
          variants={itemVariants}
        >
          <motion.div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#513897]"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs font-medium text-[#1f0079] tracking-wide">
            INNOVATION AT LIGHTSPEED
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-bold text-[#1f0079] mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight"
          variants={containerVariants}
        >
          <motion.span
            className="block text-3xl xs:text-4xl sm:text-[2.5rem] md:text-[2.75rem] lg:text-4xl xl:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#1f0079] to-[#513897]"
            variants={itemVariants}
          >
            Reliable modern
          </motion.span>
          <motion.span
            className="inline-block text-[#513897] text-3xl xs:text-4xl sm:text-[2.5rem] md:text-[2.75rem] lg:text-4xl xl:text-5xl"
            variants={itemVariants}
          >
            <LetterPullUp text="Technology" className="text-lg" />
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed sm:leading-normal"
          variants={itemVariants}
        >
          We build reliable modern technology to empower digital transformation.
          Our engineering-first approach ensures high performance, scalability, and
          long-term impact.
        </motion.p>

        {/* Tech Stack Icons */}
        <motion.div
          className="flex items-center justify-center lg:justify-start gap-2 mt-4 sm:mt-6 md:mt-8"
          variants={itemVariants}
        >
          <div className="flex -space-x-2">
            {techLogos
              .slice(0, getResponsiveValue(3, 4, 5))
              .map((tech, index) => (
                <motion.div
                  key={index}
                  className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#513897]/20 flex items-center justify-center ${tech.color}`}
                  initial={{ x: -15 * index, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.25, zIndex: 10 }}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5">{tech.icon}</div>
                </motion.div>
              ))}
          </div>
          <motion.span
            className="text-xs sm:text-sm text-[#513897] ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            +{techLogos.length - getResponsiveValue(3, 4, 5)} more in our stack
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ── Right Side: Tech Orbits ── */}
      <motion.div
        className={`relative ${getResponsiveValue(
          "w-full h-64 mt-6 mb-10",
          "w-full h-60 mt-8 mb-12",
          "lg:absolute right-0 w-1/2 h-full"
        )} flex items-center justify-center lg:pr-12 xl:pr-16`}
        style={{ rotateX: orbitTiltY, rotateY: orbitTiltX, perspective: "800px" }}
        aria-hidden="true"
      >
        {/* Radar rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-[#1f0079]/10"
            style={{
              width: `${ring * getResponsiveValue(80, 100, 120)}px`,
              height: `${ring * getResponsiveValue(80, 100, 120)}px`,
            }}
            animate={{ scale: [1, 1 + ring * 0.08, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3 + ring, repeat: Infinity, ease: "easeInOut", delay: ring * 0.8 }}
          />
        ))}

        {/* Central Sphere */}
        <div className="relative z-10">
          <motion.div
            className={`${getResponsiveValue("w-24 h-24", "w-32 h-32", "w-40 h-40")} rounded-full bg-gradient-to-br from-[#1f0079] to-[#513897] shadow-xl shadow-[#513897]/30 flex items-center justify-center`}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(31,0,121,0.3)",
                "0 0 50px rgba(81,56,151,0.5)",
                "0 0 20px rgba(31,0,121,0.3)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`${getResponsiveValue("text-3xl", "text-4xl", "text-6xl")} text-white`}
            >
              ⚡
            </motion.div>
          </motion.div>
        </div>

        {/* Inner Orbit: tech icons */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            rotate: useTransform(orbitProgress, [0, 1], [0, 360]),
          }}
        >
          {techLogos.map((tech, logoIndex) => {
            const distance = getResponsiveValue(100, 125, 130);
            const angle = (logoIndex / techLogos.length) * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <motion.div
                key={tech.name}
                className={`absolute ${tech.color} bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-[#513897]/20`}
                style={{
                  x,
                  y,
                  width: `${getResponsiveValue(30, 40, 50)}px`,
                  height: `${getResponsiveValue(30, 40, 50)}px`,
                  padding: getResponsiveValue("0.4rem", "0.5rem", "0.75rem"),
                }}
                whileHover={{ scale: 1.3, backgroundColor: "rgba(255,255,255,1)", zIndex: 10 }}
              >
                <div className={`${getResponsiveValue("w-3 h-3", "w-4 h-4", "w-6 h-6")}`}>
                  {tech.icon}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Outer Orbit: glowing dots (counter-clockwise) */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            rotate: useTransform(outerOrbitProgress, [-1, 0], [360, 0]),
          }}
        >
          {outerDots.map((dot, i) => {
            const distance = getResponsiveValue(145, 175, 195);
            const angle = (i / outerDots.length) * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  x,
                  y,
                  width: getResponsiveValue("8px", "10px", "12px"),
                  height: getResponsiveValue("8px", "10px", "12px"),
                  backgroundColor: dot.color,
                }}
                animate={{
                  boxShadow: [
                    `0 0 6px ${dot.color}`,
                    `0 0 18px ${dot.color}`,
                    `0 0 6px ${dot.color}`,
                  ],
                  scale: [1, 1.4, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
            );
          })}
        </motion.div>

        {/* Floating Tech Tags (desktop only) */}
        {screenSize.isDesktop &&
          techLogos.map((tech, index) => {
            const angle = (index / techLogos.length) * Math.PI * 2;
            const distance = 215;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <motion.div
                key={`tag-${index}`}
                className={`absolute text-xs font-medium px-2 py-1 rounded-full ${tech.color} bg-white/90 backdrop-blur-sm border border-[#513897]/20`}
                style={{ x, y }}
                animate={{
                  x: [x, x + TAG_DRIFT[index].dx],
                  y: [y, y + TAG_DRIFT[index].dy],
                }}
                transition={{
                  duration: TAG_DRIFT[index].duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.2 }}
              >
                {tech.name}
              </motion.div>
            );
          })}

        {/* Glow layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, rgba(81,56,151,0.15) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Scroll cue (desktop) ── */}
      {screenSize.isDesktop && (
        <motion.div
          className="absolute bottom-8 left-12 xl:left-16 z-20"
          style={{ opacity: heroOpacity }}
        >
        <motion.button
          type="button"
          onClick={() => {
            const next = containerRef.current?.nextElementSibling;
            if (!next) return;
            if (lenis) lenis.scrollTo(next, { offset: -72, duration: 1.4 });
            else next.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-3 text-[#513897] group cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          aria-label="Scroll to next section"
        >
          <span className="relative w-6 h-10 rounded-full border-2 border-[#513897]/40 flex justify-center group-hover:border-[#513897] transition-colors">
            <motion.span
              className="w-1 h-2 mt-2 rounded-full bg-[#513897]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase">Scroll to explore</span>
        </motion.button>
        </motion.div>
      )}
    </div>
  );
}
