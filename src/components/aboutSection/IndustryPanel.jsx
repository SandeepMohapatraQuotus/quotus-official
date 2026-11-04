import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fallbackIcon = (e) => {
  const label = encodeURIComponent(e.target.alt || "");
  e.target.onerror = null;
  e.target.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f3f4f6'/><text x='50' y='50' font-family='Arial' font-size='10' text-anchor='middle' dominant-baseline='middle' fill='%23513897'>${label}</text></svg>`;
};

// layout "left"  -> text on the left, image on the right
// layout "right" -> text on the right, image on the left
const IndustryPanel = ({ group }) => {
  const imageFirst = group.layout === "right";

  return (
    <div className="w-full max-w-7xl mx-auto px-12 xl:px-16 grid grid-cols-2 gap-12 xl:gap-16 items-center">
      {/* Text + technologies */}
      <motion.div
        className={imageFirst ? "order-2" : "order-1"}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h3
          variants={item}
          className="text-3xl xl:text-4xl font-bold mb-4"
          style={{ color: group.accentColor }}
        >
          {group.title.trim()}
        </motion.h3>

        <motion.p
          variants={item}
          className="text-base xl:text-lg text-gray-600 mb-6 leading-relaxed"
        >
          {group.description}
        </motion.p>

        <motion.div variants={container} className="grid grid-cols-3 gap-3">
          {group.technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{
                y: -4,
                boxShadow: "0 10px 25px -5px rgba(31, 0, 121, 0.2)",
                borderColor: group.accentColor,
              }}
              className="bg-white p-3 rounded-xl border-[1.5px] border-gray-200 flex flex-col items-center"
            >
              <div className="w-10 h-10 mb-2 flex items-center justify-center">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                  onError={fallbackIcon}
                />
              </div>
              <span className="font-medium text-gray-800 text-center text-sm leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div
        className={imageFirst ? "order-1" : "order-2"}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ boxShadow: "0 20px 25px -5px rgba(81, 56, 151, 0.15)" }}
        >
          <img
            src={group.image}
            alt={group.title.trim()}
            className="w-full h-[50vh] object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${group.accentColor}30, transparent 60%)`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default IndustryPanel;