import React from "react";
import { motion } from "framer-motion";
import FancyTestimonialsSlider from "../ui/testimonalslider";
import { testimonials, flags, clients } from "../../data/ourClientSectionData";
import Country from "./Country";

const MarqueeRow = ({ clients, direction = "left", speed = 30 }) => {
  const doubled = [...clients, ...clients];
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div
      className="relative overflow-hidden py-3 group/row"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((client, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-16 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => client.url && window.open(client.url, "_blank", "noopener,noreferrer")}
          >
            <img
              src={client.image}
              alt={client.name}
              className="w-4/5 h-4/5 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function OurClients() {

  const gapInClients = 24; // mx-6 = 24px
  const clientWidth = 192; // w-48 = 192px
  const totalWidthOfClients = (clientWidth + gapInClients) * flags.length;



  return (
    <section className="py-20  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* Country Flags */}
      <Country/>

      {/* Clients */}
      <div className="flex flex-col justify-center items-center relative overflow-hidden py-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-20 w-80 h-80 bg-gradient-to-br from-[#1f0079]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-gradient-to-tr from-[#513897]/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] via-[#6e40c9] to-[#513897]"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{
                backgroundPosition: "100% 50%",
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                },
              }}
            >
              Our Clients
            </motion.span>
            <motion.span
              className="block mt-2 text-xl sm:text-2xl md:text-3xl font-medium text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Trusted by Visionary Leaders
            </motion.span>
          </motion.h2>

          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-24 h-1 bg-gradient-to-r from-[#1f0079] to-[#513897] rounded-full"></div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col text-center items-center w-full max-w-7xl px-4">
          {/* Animated description */}
          <motion.div
            className="mb-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[#1f0079]/10 hidden md:block"></div>
            <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[#513897]/10 hidden md:block"></div>

            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed relative z-10">
              We partner with{" "}
              <span className="font-semibold text-[#1f0079]">
                innovative companies
              </span>{" "}
              to deliver exceptional{" "}
              <span className="font-semibold text-[#513897]">
                transformative solutions
              </span>{" "}
              that drive growth and success.
            </p>
          </motion.div>

          {/* Dual-row infinite marquee */}
          <style>{`
            @keyframes marqueeLeft {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              from { transform: translateX(-50%); }
              to { transform: translateX(0); }
            }
          `}</style>
          <div className="w-full mb-10 space-y-2">
            <MarqueeRow clients={clients.slice(0, Math.ceil(clients.length / 2))} direction="left" speed={35} />
            <MarqueeRow clients={clients.slice(Math.ceil(clients.length / 2))} direction="right" speed={40} />
          </div>

          {/* Client logos grid with enhanced design */}
          <div className="w-full relative">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {clients.slice(0, 12).map((client, index) => (
                <motion.div
                  key={`client-${index}`}
                  className="
                      aspect-square flex items-center justify-center 
                      bg-white rounded-2xl
                      relative overflow-hidden
                      group/item
                      shadow-lg
                      hover:shadow-xl
                      transition-all duration-500
                      border border-gray-100
                      cursor-pointer
                    "
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => {
                    if (client.url) {
                      window.open(client.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.open(client.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Visit ${client.name} website`}
                >
                  {/* Animated border */}
                  <div
                    className="
                      absolute inset-0 rounded-2xl transition-opacity duration-500
                      "
                  >
                    <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center">
                      <motion.img
                        src={client.image}
                        alt={client.name}
                        className="w-4/5 h-4/5 object-contain"
                        loading="lazy"
                        whileHover={{
                          scale: 1.15,
                          transition: { duration: 0.3 },
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-15 ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] mb-4"
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
              What Our Clients
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Clients Say
            </motion.span>
          </motion.h2>
        </motion.div>

        <FancyTestimonialsSlider testimonials={testimonials} />
      </div>
    </section>
  );
}

export default OurClients;
