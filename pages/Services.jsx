import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {servicesData} from "../src/data/servicesData";


const ServicesPage = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  const handleNavigation = (path) => {
    navigate(path);
    onClose(); 
  };

  const handleNavigationToSubHeadings = (path,id) => {
    // console.log(path,id)
    navigate(path, { state: { scrollTo: id } });
    onClose(); 
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };


  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      x: 5,
      color: "#513897",
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[95vw] max-w-6xl bg-white shadow-2xl rounded-xl z-50 border border-gray-100 p-6 origin-top"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* service menue on hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {servicesData.map((service, idx) => (
            <motion.div
              key={idx}
              className="group rounded-lg p-4 -m-4    hover:border-1 hover:border-[#846fcb]  "
            >
              <motion.div
                whileHover={{ x: 3 }}
                onClick={() => handleNavigation(service.path)}
                className="font-semibold text-[#1f0079]  flex items-center gap-3 mb-3 cursor-pointer "
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-[#f0ebff] rounded-lg group-hover:bg-[#e0d6ff]"
                >
                  {service.icon}
                </motion.span>
                <span className="text-lg">{service.title}</span>
                <motion.svg
                  initial={{ opacity: 0, x: -5 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </motion.div>

              <ul className="ml-1 space-y-2.5">
                {service.items.map((sub, i) => (
                  <motion.li
                    key={i}
                    variants={listItemVariants}
                    whileHover="hover"
                    className="text-gray-600 cursor-pointer flex items-start "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigationToSubHeadings(service.path, service.id);
                    }}
                  >
                    <motion.svg
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-[#513897]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                    <span className="text-sm">{sub.title}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        {/**footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3 },
          }}
          className="mt-6 pt-6 border-t border-gray-100"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate("/contact");
              onClose();
            }}
            className="text-sm text-gray-500 inline-block cursor-pointer"
          >
            Need help in choosing?{" "}
            <span className="text-[#513897] font-medium">Contact our team</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicesPage;