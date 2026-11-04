import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import CardSwap, { Card } from "../ui/CardSwap";

export const KeyBenefitsSection = ({ productData }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle image load
  useEffect(() => {
    const img = new Image();
    img.src = productData.image;
    img.onload = () => setIsImageLoaded(true);
  }, [productData.image]);

  return (
    <section className="py-5  bg-gradient-to-b from-[#f8f7fc] to-white">
      <div className="flex flex-col justify-center items-center mb-6 md:mb-0">
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
            User
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Benefits
          </motion.span>
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-0 lg:gap-8 bg-[#f8f7fc] rounded-xl ">
        {/* Left Column */}
        <div className="w-full lg:w-1/2  flex flex-col justify-center relative overflow-hidden bg-[#f8f7fc] rounded-lg">
          <div className="max-w-lg mx-auto w-full">
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Discover how our product can transform your daily routine with
              these powerful benefits. Each feature is carefully designed to
              enhance your experience.
            </p>

            <div className="mt-4 md:mt-8 mb-6 md:mb-12 rounded-xl overflow-hidden ">
              <img
                src="/product/system.gif"
                alt="Product benefits"
                className="w-full h-48 sm:h-64 md:h-72 object-cover"
              />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#1f0079]/10 hidden md:block"></div>
        </div>

        {/* Right Column with CardSwap */}
        <div className="w-full lg:w-1/2 h-full pr-[30vw] flex items-start md:items-center  justify-center relative bg-[#f8f7fc] px-4 sm:px-6 md:p-6 mt-20 lg:mt-0 min-h-[200px] sm:min-h-[500px]">
          <div className="relative z-10 w-full h-full flex items-center justify-center -ml-2 sm:ml-0">
            <CardSwap
              cardDistance={40}
              verticalDistance={50}
              delay={3000}
              pauseOnHover={true}
              className="w-full"
            >
              {productData.keyBenefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  customClass="backdrop-blur-sm bg-white/80 w-full max-w-md mx-auto"
                >
                  <h3 className="text-lg font-semibold text-[#1f0079] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="flex items-center mt-3">
                    <TiTick className="text-[#1f0079] mr-2" />
                    <span className="text-xs text-[#513897]">
                      Verified Benefit
                    </span>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};
