import { motion } from "framer-motion";
import { industryGroups } from "../../data/domainExpertiseData";

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

const IndustryCard = ({ group }) => (
  <motion.div
    className="w-full py-12 px-4 sm:px-8 md:px-12 border-b border-gray-100 last:border-b-0"
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Image */}
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="mb-6"
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ boxShadow: "0 20px 25px -5px rgba(81, 56, 151, 0.15)" }}
      >
        <img
          src={group.image}
          alt={group.title.trim()}
          className="w-full h-52 sm:h-64 md:h-72 object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${group.accentColor}30, transparent 60%)`,
          }}
        />
      </div>
    </motion.div>

    {/* Text */}
    <motion.h3
      variants={item}
      className="text-2xl sm:text-3xl font-bold mb-3"
      style={{ color: group.accentColor }}
    >
      {group.title.trim()}
    </motion.h3>

    <motion.p
      variants={item}
      className="text-base text-gray-600 mb-6 leading-relaxed"
    >
      {group.description}
    </motion.p>

    {/* Technologies */}
    <motion.div variants={container} className="grid grid-cols-3 sm:grid-cols-4 gap-3">
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
          <span className="font-medium text-gray-800 text-center text-xs leading-tight">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// Vertical stacked layout used for tablet/mobile (< lg breakpoint)
const DomainExpertise = () => (
  <section className="w-full max-w-3xl mx-auto">
    <div className="text-center px-4 pt-12 pb-4">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-[#1f0079] mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Empowering Industries with Innovation
      </motion.h2>
      <motion.p
        className="text-base text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        From blockchain to traveltech, we build transformative digital solutions
        that drive growth, efficiency, and future-readiness across diverse
        industry verticals.
      </motion.p>
    </div>

    {industryGroups.map((group, i) => (
      <IndustryCard key={i} group={group} />
    ))}
  </section>
);

export default DomainExpertise;
