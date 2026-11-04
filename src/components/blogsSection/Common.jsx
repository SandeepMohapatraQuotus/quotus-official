import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { blogPosts } from "../../data/blogsData";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/blogs/${post.slug}`, { state: { post } });
  };

  return (
    <motion.div
      className="shadow-2xl rounded-2xl overflow-hidden group relative border border-gray-100 transition-all duration-500 hover:border-transparent h-[450px] w-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        boxShadow: "0 10px 30px rgba(81, 56, 151, 0.1)",
      }}
    >
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#1f0079]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

      {/* Category badge positioned at top of image */}
      <div className="absolute top-4 right-4 z-30">
        <span className="px-3 py-1.5 text-[12px] font-semibold text-white bg-[#513897] rounded-full shadow-lg flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
          {post.category}
        </span>
      </div>

      <div className="h-40 overflow-hidden relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f0079]/30 to-transparent z-10"></div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />

        {/* Company badge positioned at top left of image */}
        <div className="absolute top-1 left-4 z-20">
          <span className="px-3 py-1.5 text-[12px] font-semibold text-[#1f0079] rounded-full">
            {post.company}
          </span>
        </div>
      </div>

      <div className="p-6 relative z-20 bg-white flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[18px] font-bold text-gray-800 mb-3 group-hover:text-[#1f0079] transition-colors duration-500 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[14px] text-gray-600 mb-5 leading-relaxed line-clamp-3 text-justify">
            {post.excerpt}
          </p>
        </div>

        <div>
          <p className="flex text-gray-500 mb-5 gap-1 text-[14px] items-center">
            <FaCalendarAlt size={14} />
            {post.date}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <img
                src={post.authorImage}
                alt={post.title}
                className="w-10 h-10 rounded-full object-cover transition-transform duration-700"
              />
              <span className="text-[12px] text-gray-500">
                By {post.author || "Unknown Author"}
              </span>
            </div>

            <motion.button
              className="text-[#513897] flex items-center group-hover:text-[#1f0079] transition-colors duration-300 text-[14px]"
              onClick={handleReadMore}
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#513897]/20 group-hover:opacity-100 opacity-0 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

const Common = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for children
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="w-full"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Common;
