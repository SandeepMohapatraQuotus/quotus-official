import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

function Map() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white rounded-xl p-8 md:p-10"
      >
        <motion.h3
          variants={item}
          className="text-2xl font-bold text-[#1f0079] mb-8"
        >
          Contact Information
        </motion.h3>

        <div className="space-y-6">
          <motion.div variants={item} className="flex items-start">
            <motion.div
              className="bg-[#f5f2ff] p-3 rounded-full mr-4"
              whileHover={{ rotate: 10 }}
            >
              <FiMapPin className="text-[#513897] w-5 h-5" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-[#1f0079]">Our Office</h4>
              <p className="text-[#513897] mt-1">
                Arena-3, 3rd Floor, STPI ELITE Building,
                <br />
                Gothapatna, Khordha, Odisha - 751003
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="flex items-start">
            <motion.div
              className="bg-[#f5f2ff] p-3 rounded-full mr-4"
              whileHover={{ rotate: 10 }}
            >
              <FiMail className="text-[#513897] w-5 h-5" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-[#1f0079]">Email Us</h4>
              <motion.a
                href="mailto:info@quotus.co.in"
                className="text-[#513897] hover:text-[#1f0079] transition-colors mt-1 block"
                whileHover={{ x: 5 }}
              >
                info@quotus.co.in
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={item} className="flex items-start">
            <motion.div
              className="bg-[#f5f2ff] p-3 rounded-full mr-4"
              whileHover={{ rotate: 10 }}
            >
              <FiPhone className="text-[#513897] w-5 h-5" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-[#1f0079]">Call Us</h4>
              <motion.a
                href="tel:+919777403555"
                className="text-[#513897] hover:text-[#1f0079] transition-colors mt-1 block"
                whileHover={{ x: 5 }}
              >
                +91 9777403555
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ✅ FIXED: Map — no clipping, no overlay blocking clicks */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="rounded-xl overflow-hidden shadow-lg"
        // ✅ REMOVED: fixed h-64/h-80 that was clipping the map
        // ✅ REMOVED: relative + absolute overlay that blocked all pointer events
      >
        <iframe
          title="Quotus Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1929588684716!2d85.74310129999999!3d20.2922787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1907e655555555%3A0x3f6fe26d44d5028b!2sQUOTUS%20SOFTWARE%20SOLUTIONS%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1751208717725!5m2!1sen!2sin"
          width="100%"
          height="400"
          // ✅ height set directly on iframe — no wrapper height conflict
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}

export default Map;