import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const Workflow = () => {
  const workflowSteps = [
    { title: "STRATEGY", desc: "Precision planning" },
    { title: "DESIGN", desc: "User-centric interfaces" },
    { title: "DEVELOP", desc: "Technical implementation" },
    { title: "TEST", desc: "Quality assurance" },
    { title: "DELIVER", desc: "Solution deployment" }
  ];

  return (
    <div className="relative py-1 bg-white pt-15">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-15 max-w-7xl mx-auto w-full">
        {/*  header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
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
            Our
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Process
          </motion.span>
        </motion.h2>


          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Streamlined workflow for quality results
          </p>
        </motion.div>

    
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          {/* image - Only shown on larger screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="hidden lg:block lg:col-span-2 relative h-64 items-center"
          >
            <motion.img
              src="/service/ourProcess.png"
              alt="Process Visualization"
              className="absolute h-full w-full object-contain "
              animate={{
                y: [0, 10, 0],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/*  timeline  */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative pl-8 sm:pl-10">
              {/* Vertical line */}
              <div className="absolute left-4 sm:left-5 top-0 h-full w-0.5 bg-gradient-to-b from-[#513897]/30 via-[#1f0079]/30 to-[#513897]/30"></div>

              {/*  steps */}
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  className="relative pb-4 sm:pb-6 last:pb-0 group"
                >
                 
                  {/*  card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-100 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-[#513897]/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                        <FiCheckCircle className="text-[#513897] text-xs sm:text-sm" />
                      </div>
                      <div className="flex text-center justify-center gap-5">
                        <h5 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                          {step.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;