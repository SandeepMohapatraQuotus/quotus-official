import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";



const FaqSection = ({productData}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const categories = ["All", ...new Set(productData.faqs.map(faq => faq.category))];

  const filteredFaqs = useMemo(() => {
    let result = productData.faqs;
    if (activeCategory !== "All") {
      result = result.filter((faq) => faq.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return result;
  }, [productData,activeCategory, searchQuery]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <section className="py-10  bg-white">
      <div className="">
        {/*  Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#1f0079] to-[#513897] p-8 sm:p-12 mb-16 text-cente "
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl font-bold text-white mb-6 text-center"
          >
            {productData.description}
          </motion.h2>
          {/* search bar  */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              className="block w-full pl-10 pr-3 py-1 border border-transparent rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeCategory === category
                  ? "bg-[#1f0079] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        {/* Two Column FAQ Grid */}
        {filteredFaqs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row  w-full justify-between gap-[3vw]"
          >
            {/* First Column */}
            <div className="flex-1 space-y-0">
              {filteredFaqs
                .filter((_, index) => index % 2 === 0)
                .map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-full "
                  >
                    <div
                      onClick={() => toggleFAQ(faq.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${activeIndex === faq.id ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-md md:text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: activeIndex === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown
                            className={`h-5 w-5 ${activeIndex === faq.id ? "text-[#1f0079]" : "text-gray-400"
                              }`}
                          />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {activeIndex === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-3 text-gray-600 text-sm">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
            </div>

            <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700"></div>

            {/* Second Column */}
            <div className="flex-1 space-y-0">
              {filteredFaqs
                .filter((_, index) => index % 2 === 1)
                .map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="w-full"
                  >
                    <div
                      onClick={() => toggleFAQ(faq.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${activeIndex === faq.id ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: activeIndex === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown
                            className={`h-5 w-5 ${activeIndex === faq.id ? "text-[#1f0079]" : "text-gray-400"
                              }`}
                          />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {activeIndex === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-3 text-gray-600 text-sm">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No results found. Try a different search term.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            Still have questions?
          </h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-[#1f0079] text-white rounded-lg font-medium shadow-md hover:bg-[#2a0099] transition-all cursor-pointer"
            onClick={() => { navigate("/contact") }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;