import { motion } from "framer-motion";
import { useState } from "react";
 import { FcGoogle } from "react-icons/fc";
 import { FaRobot, FaLinkedin } from "react-icons/fa";

const FutureFeaturesSection = ({ upcomingFeatures }) => {
 
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f0079] mb-4">
            Future Innovations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're constantly evolving Feedora to bring you the most
            comprehensive social experience. Here's what's coming next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`rounded-lg p-3 mr-4 ${feature.color}`}>
                    {feature.icon && <feature.icon size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-lg">{feature.description}</p>

                <div className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Planned for future release</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default FutureFeaturesSection;
