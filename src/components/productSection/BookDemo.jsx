import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const BookDemo = () => {
  const [email, setEmail] = useState('');

  // Animation variants for the section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the background
  const bgVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 0.2,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 80,
      },
    },
  };

  // Animation variants for the form
  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Handle demo submission 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add demo
    // console.log('Demo booked with email:', email);
    setEmail('');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1f0079]/20 to-[#513897]/30"
        variants={bgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#1f0079] mb-6 leading-tight"
            variants={textVariants}
          >
            Book a <span className="text-[#513897]">Demo</span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#1f0079] to-[#513897] mb-8 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto"
            variants={textVariants}
          >
            Discover how our product can transform your workflow. Schedule a personalized demo with our team today!
          </motion.p>
        </div>

        <motion.button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-[#1f0079] to-[#513897] text-white rounded-lg font-semibold hover:from-[#1f0079]/90 hover:to-[#513897]/90 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Book Now
            </motion.button>
      </motion.div>
    </section>
  );
};