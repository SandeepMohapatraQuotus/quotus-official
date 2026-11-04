import { useRef, useCallback } from "react";
import { useInView, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import RippleButton from "../overlays/RippleButton";
import { Link } from "react-router-dom";
import { seededRandom } from "../../lib/motion";

// Generated once so the circles keep their positions across re-renders
const rand = seededRandom(42);
const CIRCLES = Array.from({ length: 6 }, () => ({
  size: rand() * 100 + 50,
  left: rand() * 100,
  top: rand() * 100,
  dx: (rand() - 0.5) * 80,
  dy: (rand() - 0.5) * 80,
  duration: 10 + rand() * 15,
}));

function CTA() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  // Magnetic button
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springBtnX = useSpring(btnX, { stiffness: 300, damping: 20 });
  const springBtnY = useSpring(btnY, { stiffness: 300, damping: 20 });

  const handleBtnMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    btnY.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }, [btnX, btnY]);

  const handleBtnMouseLeave = useCallback(() => {
    btnX.set(0);
    btnY.set(0);
  }, [btnX, btnY]);

  // Word parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const word1Y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const word2Y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const word3Y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const word1Opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const word2Opacity = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const word3Opacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const contactItems = [
    { icon: <FiMail size={24} />, text: "info@quotus.co.in" },
    { icon: <FiPhone size={24} />, text: "+91 9777403555" },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 bg-white px-4 sm:px-6 overflow-hidden">
      {/* Background blob that fills from bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(81,56,151,0.08) 0%, transparent 70%)",
          width: "80vw",
          height: "80vw",
          maxWidth: "700px",
          maxHeight: "700px",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Floating background circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {CIRCLES.map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#513897]/10"
            style={{
              width: `${c.size}px`,
              height: `${c.size}px`,
              left: `${c.left}%`,
              top: `${c.top}%`,
            }}
            animate={{
              x: [0, c.dx],
              y: [0, c.dy],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={ref} className="text-center">
          {/* Split-word parallax heading */}
          <div className="overflow-hidden mb-4">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] leading-tight">
              <span className="inline-block overflow-hidden mr-3">
                <motion.span
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]"
                  style={{ y: word1Y, opacity: word1Opacity }}
                >
                  Ready to
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <motion.span
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#513897] to-[#1f0079]"
                  style={{ y: word2Y, opacity: word2Opacity }}
                >
                  Transform
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block text-[#1f0079]"
                  style={{ y: word3Y, opacity: word3Opacity }}
                >
                  Your Business?
                </motion.span>
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-[#1f0079]/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            Let's discuss how we can help achieve your digital goals.
          </motion.p>

          {/* Magnetic CTA button */}
          <motion.div
            style={{ x: springBtnX, y: springBtnY, display: "inline-block" }}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(81,56,151,0)",
                  "0 0 0 12px rgba(81,56,151,0.15)",
                  "0 0 0 0 rgba(81,56,151,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <Link to="/contact" className="inline-block px-10 py-3 md:px-10 md:py-4">
              <RippleButton>Contact Now</RippleButton>
            </Link>
          </motion.div>

          {/* Contact icons — staggered float-in */}
          <motion.div
            className="flex justify-center items-center space-x-8 md:space-x-12 pt-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } } }}
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center group"
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, type: "spring" } },
                }}
              >
                <motion.div
                  className="w-12 h-12 flex items-center justify-center bg-[#1f0079]/10 rounded-full text-[#1f0079] group-hover:bg-[#513897]/20 group-hover:text-[#513897] transition-colors duration-300 mb-2"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-sm md:text-base text-[#1f0079]/80 group-hover:text-[#513897] transition-colors duration-300">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
