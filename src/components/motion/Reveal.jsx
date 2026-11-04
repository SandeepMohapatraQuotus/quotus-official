import { motion } from "framer-motion";
import { DURATION, EASE_OUT, REVEAL_FROM } from "../../lib/motion";

/**
 * Fades and slides its children in once they scroll into view.
 * @param {"up"|"down"|"left"|"right"|"scale"|"none"} from - Direction the content enters from.
 * @param {number} delay - Seconds to wait before animating.
 * @param {boolean} blur - Also sharpen from a soft blur.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = DURATION.base,
  blur = false,
  amount = 0.25,
  as = "div",
  className = "",
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      initial={{ opacity: 0, ...REVEAL_FROM[from], ...(blur && { filter: "blur(8px)" }) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals direct children one after another. Wrap each child in <RevealItem>.
 */
export function RevealGroup({ children, stagger = 0.1, delay = 0, amount = 0.2, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, from = "up", className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...REVEAL_FROM[from] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: DURATION.base, ease: EASE_OUT },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
