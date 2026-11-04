import { motion } from "framer-motion";
import { FiZap, FiCheckCircle } from "react-icons/fi";

const WhyChooseUs = () => {
  const features = [
    "Cost-effective solutions",
    "Cutting-edge technologies",
    "Highly skilled team",
    "Pan-India client network"
  ];

  return (
    <section className="relative py-8  overflow-hidden pt-0 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ">
   
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >

           <motion.h2
          className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] mb-3 md:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{
              backgroundPosition: "100% 50%",
              transition: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              },
            }}
          >
            Why
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Choose Us
          </motion.span>
        </motion.h2>
          
          <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
            Pioneering digital transformation with cutting-edge solutions
          </p>
        </motion.div>
        

        



        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          {/* Left Column  */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
             <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#513897] rounded-full opacity-80 z-50"></div>
            <div className="relative w-full h-48 sm:h-56 md:h-64">
          
              
              <motion.div
                initial={{ rotateY: 15 }}
                whileInView={{ rotateY: 6 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transform perspective-1000"
              >
                {/*Digital Acceleration */}
                <div className="absolute inset-2 sm:inset-3 bg-white rounded-lg overflow-hidden border border-gray-100">
                  <div className="p-3 sm:p-4 h-full flex flex-col">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-md flex items-center justify-center mr-2">
                        <FiZap className="text-white text-sm sm:text-base" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800">
                        Digital Acceleration
                      </h3>
                    </div>
                    <div className="space-y-1 sm:space-y-2 flex-grow">
                      {features.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start"
                        >
                          <FiCheckCircle className="text-[#513897] mt-0.5 mr-1 sm:mr-2 flex-shrink-0 text-xs sm:text-sm" />
                          <p className="text-xs sm:text-sm text-gray-700">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                <div className="flex gap-2 mt-2 sm:mt-3">
                  <div className="w-1/2 h-0.5 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-full"></div>
                  <div className="w-1/4 h-0.5 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-full opacity-60"></div>
                </div>
                  </div>
                </div>
              </motion.div>

              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#1f0079] rounded-full opacity-80"></div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-3 sm:space-y-4 order-1 lg:order-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Innovation Block */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative p-4 sm:p-5 bg-white rounded-lg shadow-xs border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#513897] rounded-full opacity-80"></div>
              

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                <span className="relative">
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#513897]/10 z-0"></span>
                  <span className="relative z-10">INNOVATION AT CORE</span>
                </span>
              </h3>

              <div className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                <p>
                  Quotus combines <span className="font-semibold text-gray-900">highly proficient teams</span> with
                  <span className="font-semibold text-gray-900"> cutting-edge technologies</span> for cost-effective solutions.
                </p>

                <div className="flex gap-2 mt-2 sm:mt-3">
                  <div className="w-1/2 h-0.5 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-full"></div>
                  <div className="w-1/4 h-0.5 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-full opacity-60"></div>
                </div>
              </div>
              
            </motion.div>

            {/* Digital Presence Block */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative p-4 sm:p-5 bg-white rounded-lg shadow-xs border border-gray-200 hover:shadow-sm transition-all"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                BRIDGING THE{' '}
                <span className="relative">
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#1f0079]/10 z-0"></span>
                  <span className="relative z-10">DIGITAL DIVIDE</span>
                </span>
              </h3>

              <div className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                <p>
                  We specialize in <span className="font-semibold text-gray-900">bringing businesses online</span> with our growing network across India.
                </p>

                <div className="flex gap-2 mt-2 sm:mt-3">
                  <div className="w-1/3 h-0.5 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-full"></div>
                  <div className="w-1/6 h-0.5 bg-gradient-to-r from-[#513897] to-[#1f0079] rounded-full opacity-60"></div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#1f0079] rounded-full opacity-80"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;