import { useRef, useCallback } from "react";
import { useInView, motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { features } from "../../data/FetureSectionData.jsx";
import TextScramble from "../common/TextScramble";

const FeatureCard = ({ icon, title, description, delay, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  // Glow position: motion values, so tracking the cursor doesn't re-render the card
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(81,56,151,0.12) 0%, transparent 60%)`;

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.08);
    y.set((e.clientY - centerY) * 0.08);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [x, y, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [x, y, glowX, glowY]);

  // Alternate slide direction
  const fromX = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromX, rotateY: index % 2 === 0 ? -15 : 15 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: delay * 0.12,
        type: "spring",
        stiffness: 90,
        damping: 14,
      }}
      style={{
        x: springX,
        y: springY,
        transformStyle: "preserve-3d",
        perspective: "600px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-100 h-full min-h-[120px] p-4 flex flex-col cursor-pointer"
    >
      {/* Dynamic glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ background: glowBackground }}
      />

      {/* Header */}
      <motion.div
        className="flex items-center justify-center mb-3"
        initial={{ rotate: -15, scale: 0.9 }}
        animate={inView ? { rotate: 0, scale: 1 } : {}}
        transition={{ delay: delay * 0.12 + 0.1, type: "spring", stiffness: 300 }}
      >
        <div className="w-8 h-8 flex items-center justify-center text-[#1f0079]">{icon}</div>
        <motion.h3
          className="text-lg font-bold text-[#1f0079] flex-1 text-center"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay * 0.12 + 0.2 }}
        >
          {title}
        </motion.h3>
      </motion.div>

      {/* Description */}
      <div className="flex-1 overflow-y-auto">
        <motion.p
          className="text-sm text-gray-600 pr-2"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay * 0.12 + 0.3 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Animated underline */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-[#1f0079] to-[#513897] mt-2"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.5, once: true });

  return (
    <div className="py-0 md:py-15 bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden">
      {/* Parallax blob backgrounds */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(81,56,151,0.05) 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(31,0,121,0.04) 0%, transparent 70%)" }}
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Section header */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-4xl mx-auto relative z-10"
      >
        <motion.h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] mb-3 md:mb-4">
          <motion.span
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            <TextScramble text="Quotus" trigger={titleInView} duration={1000} />
          </motion.span>{" "}
          <span>Differentiators</span>
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Highly proficient, propitious and cost-effective software solutions powered by innovative
          minds and cutting-edge technologies.
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={index}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
