import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone } from 'react-icons/fi';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { servicesData } from "../data/servicesData";
import { navItems } from './Navbar';
import { seededRandom } from '../lib/motion';

// Generated once so the background bubbles keep their positions across re-renders
const rand = seededRandom(99);
const BUBBLES = Array.from({ length: 8 }, () => ({
  size: rand() * 200 + 50,
  left: rand() * 100,
  top: rand() * 100,
  dx: rand() * 100 - 50,
  dy: rand() * 100 - 50,
  duration: rand() * 30 + 20,
}));

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#1f0079] to-[#0f003a]  text-white pt-20 pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {BUBBLES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#b8b2ff]"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              top: `${b.top}%`,
            }}
            animate={{
              x: [0, b.dx],
              y: [0, b.dy],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className=" relative z-10"
        initial="hidden"
        whileInView="visible"
        variants={footerVariants}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  gap-10 lg:gap-16 ">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold bg-clip-text  text-white">
              Quotus Software Solutions Pvt. Ltd.
            </h3>
            <p className="text-white leading-relaxed">
              Leading the way in digital innovation and transformation since
              2021.
            </p>
            <div className="flex space-x-4">
              {[
                // { icon: <FiFacebook className="w-5 h-5 text-white" />, url: "https://www.facebook.com/profile.php?id=100063524542612" },
                // { icon: <FiTwitter className="w-5 h-5 text-white" />, url: "https://twitter.com/yourhandle" },
                {
                  icon: <FiLinkedin className="w-5 h-5 text-white" />,
                  url: "https://www.linkedin.com/company/quotus-software",
                },
                {
                  icon: <FiInstagram className="w-5 h-5 text-white" />,
                  url: "https://www.instagram.com/quotussoftware?igsh=YWQ3YWZzN2JlMmF1",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b8b2ff] hover:text-white transition-colors"
                  whileHover={{ y: -3 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 pl-5">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.href}
                    className="text-[#b8b2ff] hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#b8b2ff] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 pl-5 bg-none">
              Services
            </h3>
            <ul className="space-y-4">
              {servicesData.map((service) => (
                <motion.li
                  key={service.title}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={service.path}
                    className="text-[#b8b2ff] hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#b8b2ff] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <address className="not-italic text-white space-y-4">
              <motion.p
                className="leading-relaxed flex items-start"
                whileHover={{ x: 5 }}
              >
                <span className="mr-3 mt-1">
                  <MdOutlineLocationOn size={22} />
                </span>
                <span>
                  Arena-3, 3rd Floor,
                  <br />
                  STPI ELITE Building, Gothapatna,
                  <br />
                  Khordha, Odisha - 751003
                </span>
              </motion.p>
              <motion.p whileHover={{ x: 5 }} className="flex items-center">
                <FiMail className="mr-3" />
                <Link
                  to="mailto:info@quotus.co.in"
                  className="hover:text-white transition-colors"
                >
                  info@quotus.co.in
                </Link>
              </motion.p>
              <motion.p whileHover={{ x: 5 }} className="flex items-center">
                <FiPhone className="mr-3" />
                <Link
                  to="tel:+919777403555"
                  className="hover:text-white transition-colors"
                >
                  +91 9777403555
                </Link>
              </motion.p>
            </address>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-16 pt-8 border-t border-[#513897]/50 text-center"
          variants={itemVariants}
        >
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Quotus Software Solutions Pvt. Ltd. All rights
            reserved.
            <span className=" mt-2 text-xs opacity-70 flex items-center justify-center">
              Designed with &nbsp;
              <FaRegHeart /> &nbsp; in Quotus
            </span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;