import { motion, useScroll, useTransform } from "framer-motion";
import { FiTarget, FiEye } from "react-icons/fi";
import { MdOutlineTouchApp } from "react-icons/md";
import { useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const MissionVision = () => {
  const sectionRef = useRef(null);
  const missionRef = useRef(null);

  // triggerOnce keeps `isVisible` true after the first reveal
  const { ref: inViewRef, inView: isVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Stable merged ref: same identity across renders, so no ref/setState loop
  const setSectionRef = useCallback(
    (el) => {
      sectionRef.current = el;
      inViewRef(el);
    },
    [inViewRef]
  );

  // Section scroll for blob parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Mission image parallax
  const { scrollYProgress: missionScroll } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });
  const missionImgY = useTransform(missionScroll, [0, 1], ["-15%", "15%"]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardHover = {
    y: -8,
    boxShadow: "0 20px 40px -10px rgba(101, 78, 255, 0.3)",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <section
      ref={setSectionRef}
      className="bg-white min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full overflow-hidden"
    >
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Parallax blobs */}
        <motion.div
          className="absolute -left-32 top-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(81,56,151,0.08) 0%, transparent 70%)",
            y: blob1Y,
          }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(31,0,121,0.06) 0%, transparent 70%)",
            y: blob2Y,
          }}
        />

        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-20 relative z-10"
          variants={container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            variants={item}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#1f0079] mr-3" />
            <span className="text-xs font-medium tracking-widest text-[#1f0079]">
              OUR CORE PRINCIPLES
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#1f0079] ml-3" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] mb-4"
            variants={item}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Mission
            </motion.span>{" "}
            <span>& Vision</span>
          </motion.h2>

          <motion.p
            className="text-md text-[#513897] max-w-2xl mx-auto"
            variants={item}
          >
            The foundation of our company and compass for our future
          </motion.p>
        </motion.div>

        <div className="relative z-10">
          {/* Mission & Vision */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16"
            variants={container}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Mission: clip-path wipe + image parallax */}
            <motion.div
              ref={missionRef}
              className="lg:col-span-2 rounded-xl overflow-hidden shadow-md relative group min-h-[280px]"
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={
                isVisible
                  ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
                  : { clipPath: "inset(100% 0 0 0)", opacity: 0 }
              }
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              whileHover={cardHover}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f0079]/90 to-[#513897]/80 z-10" />
              {/* Parallax image */}
              <motion.div className="absolute inset-0" style={{ y: missionImgY }}>
                <img
                  src="/home/mission&vision/mission.jpg"
                  alt="Mission"
                  className="w-full h-full object-cover scale-125"
                />
              </motion.div>

              <div className="relative z-20 p-5 h-full flex flex-col justify-center">
                <motion.h3
                  className="text-xl md:text-2xl font-bold text-white mb-2 flex gap-2"
                  variants={fadeIn}
                >
                  <FiTarget className="text-white text-md" />
                  Our Mission
                </motion.h3>
                <motion.div
                  className="text-white/90 mb-4 text-sm space-y-2"
                  variants={fadeIn}
                >
                  <p>
                    Quotus wants to provide every business a digital platform for
                    growth by using our innovation, ideas, creativity and
                    technology.
                  </p>
                  <p>
                    We will create change for technically unprivileged businesses
                    while helping them achieve global presence.
                  </p>
                </motion.div>
                <motion.ul className="space-y-1" variants={container}>
                  {["Value creation", "Customer focus", "Global enablement"].map(
                    (val, i) => (
                      <motion.li
                        key={i}
                        className="text-white flex items-center text-xs md:text-sm"
                        whileHover={{ x: 5 }}
                        variants={item}
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2" />
                        {val}
                      </motion.li>
                    )
                  )}
                </motion.ul>
              </div>
            </motion.div>

            {/* Vision column */}
            <motion.div
              className="flex flex-col gap-4"
              variants={container}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Vision text */}
              <motion.div
                className="rounded-xl bg-white p-5 shadow-md relative overflow-hidden min-h-[140px]"
                initial={{ x: 60, opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={cardHover}
              >
                <motion.h3
                  className="text-lg md:text-xl font-bold text-[#1f0079] mb-2 flex gap-2 items-center"
                  variants={fadeIn}
                >
                  <FiEye className="text-[#1f0079] text-lg mr-1" />
                  Our Vision
                </motion.h3>
                <motion.div
                  className="text-gray-700 text-xs md:text-sm space-y-2"
                  variants={fadeIn}
                >
                  <p>
                    To add value to enterprises by providing innovative software
                    products that transform businesses.
                  </p>
                </motion.div>
              </motion.div>

              {/* Approach */}
              <motion.div
                className="group rounded-xl overflow-hidden shadow-md relative min-h-[140px]"
                initial={{ x: 60, opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={cardHover}
              >
                <img
                  src="/home/mission&vision/vision.jpg"
                  alt="Vision"
                  className="w-full h-full object-cover absolute transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1f0079]/70 z-10" />
                <motion.div
                  className="relative z-20 p-4 flex flex-col justify-center h-full"
                  variants={fadeIn}
                >
                  <div className="flex items-center mb-1">
                    <MdOutlineTouchApp className="text-white text-lg mr-1" />
                    <span className="text-white font-medium text-xs md:text-sm">
                      Our Approach
                    </span>
                  </div>
                  <p className="text-white/90 text-xs">
                    Customer-centric solutions for global business enablement
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Core Values header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h4 className="text-xl md:text-2xl font-bold mb-3 text-[#1f0079]">
              Core Values
            </h4>
            <p className="text-[#513897] text-xs md:text-sm max-w-2xl mx-auto">
              The foundation of everything we do
            </p>
          </motion.div>

          {/* Core Values: 3D flip-in cards */}
          <div className="grid md:grid-cols-3 gap-4" style={{ perspective: "1200px" }}>
            {[
              {
                title: "Integrity",
                description:
                  "We uphold transparency, honesty, and accountability in all our interactions. Every relationship is built on trust, and every decision is guided by strong ethical principles.",
                icon: "🛡️",
              },
              {
                title: "Innovation",
                description:
                  "We embrace curiosity and forward-thinking to develop groundbreaking solutions. By staying ahead of technological trends, we transform challenges into opportunities.",
                icon: "💡",
              },
              {
                title: "Excellence",
                description:
                  "We are committed to exceeding expectations through superior craftsmanship and relentless attention to detail. Our pursuit of excellence raises the bar on every project.",
                icon: "🏆",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="relative bg-white/80 backdrop-blur-sm p-5 rounded-lg border border-white/60 shadow-sm overflow-hidden group"
                initial={{ opacity: 0, rotateX: 90, y: 40 }}
                animate={
                  isVisible
                    ? { opacity: 1, rotateX: 0, y: 0 }
                    : { opacity: 0, rotateX: 90, y: 40 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.7 + index * 0.15,
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -10px rgba(101,78,255,0.25)",
                  backgroundColor: "rgba(255,255,255,0.95)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(81,56,151,0.05) 0%, transparent 60%)",
                  }}
                />
                <div className="text-2xl mb-2">{value.icon}</div>
                <h5 className="text-lg font-bold mb-2 text-[#1f0079]">
                  {value.title}
                </h5>
                <p className="text-gray-700 text-xs md:text-sm">
                  {value.description}
                </p>
                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#1f0079] to-[#513897]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;