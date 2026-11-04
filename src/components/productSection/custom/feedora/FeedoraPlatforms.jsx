import { motion } from "framer-motion";
import { useState } from "react";

const PlatformCard = ({ platform, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-white rounded-lg border border-gray-100 group shadow-sm "
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -3,
        scale: 1.02,
        
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Content */}
      <div className="relative p-6 h-full flex items-center">
        <div className="flex-1 p-2 pt-3 pb-3">
          <h3 className="text-2xl font-semibold text-gray-800">{platform.name}</h3>
          <motion.p
            className="text-md lg:text-xl text-gray-700  mt-5 leading-tight"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            viewport={{ once: true }}
            animate={{
              opacity: isHovered ? 1 : 0.85,
              y: isHovered ? 0 : 2,
            }}
            // transition={{ duration: 0.2 }}
          >
            {platform.description}
          </motion.p>
          {/* Accent bar */}
          <motion.div
            className="h-0.5 rounded-full mt-2"
            style={{ backgroundColor: platform.color }}
            initial={{ width: "15%" }}
            animate={{ width: isHovered ? "50%" : "15%" }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="flex-shrink-0 ml-3">
          <motion.div
            className="h-6 w-16 rounded-full flex items-center justify-center"
           
            animate={{
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
          >
            <img
              src={platform.logo}
              alt={`${platform.name} logo`}
              className="h-14 w-14 object-contain rounded-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const FeedoraPlatform = ({ platformIntegratins }) => (
  <div className="w-full flex flex-col items-center px-3 mt-0 md:mt-30">
    {/* Header section */}
    <motion.div
      className="text-center mb-16 max-w-3xl"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="mb-6"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-clip-text text-[#1f0079]">
            Feedora : Integrate with Your Favorite Platforms
          </span>
        </span>
      </motion.div>
    </motion.div>

    {/* Platform cards grid */}
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      viewport={{ once: true }}
    >
      {platformIntegratins.map((platform, index) => (
        <PlatformCard key={platform.name} platform={platform} index={index} />
      ))}
    </motion.div>

    {/* Footer note */}
    <motion.div
      className="mt-6 text-center text-gray-600 text-md"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <p>Unite your social world with Feedora.</p>
    </motion.div>
  </div>
);

export default FeedoraPlatform;
