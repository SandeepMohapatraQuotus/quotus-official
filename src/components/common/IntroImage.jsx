import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE_OUT, SCROLL_SPRING } from "../../lib/motion";

export default function IntroImage({  title , imageUrl ,}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Parallax while the banner scrolls away: image lags behind, title lifts and fades
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const imageY = useTransform(progress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(progress, [0, 1], [1.05, 1.18]);
  const titleY = useTransform(progress, [0, 1], [0, -90]);
  const titleOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const veilOpacity = useTransform(progress, [0, 1], [0.4, 0.7]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      {/* Text Overlay */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
          className="text-center"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            initial={{ letterSpacing: "0.5em" }}
            animate={isInView ? { letterSpacing: "0.05em" } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.div
            className="mx-auto mt-4 h-1 w-24 bg-white"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
          />
        </motion.div>
      </motion.div>

      {/* Full-width Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0.7 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-[50vh] overflow-hidden"
      >
        <motion.img
          src={imageUrl}
          alt={title}
          style={{ y: imageY, scale: imageScale }}
          className="w-full h-full object-cover will-change-transform"
        />
        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute inset-0"
        >
          <motion.div className="absolute inset-0 bg-[#1f0079]" style={{ opacity: veilOpacity }} />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1f0079]/40 to-transparent" />
        </motion.div>
      </motion.div>

    </section>
  );
}
