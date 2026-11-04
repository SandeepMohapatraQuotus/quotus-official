import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import Reveal from "../motion/Reveal";
import ParallaxImage from "../motion/ParallaxImage";
import {
  servicesData,
  uiuxPageData,
  webDevPageData,
  mobileAppPagedata,
  blockchainPageData,
  aiPageData,
} from "../../data/servicesData";

// Same order as servicesData (UI/UX, Web, Mobile, Blockchain, AI)
const pageData = [uiuxPageData, webDevPageData, mobileAppPagedata, blockchainPageData, aiPageData];

const services = servicesData.map((service, i) => ({
  ...service,
  headline: pageData[i].section1.title,
  description: pageData[i].section1.description,
  image: pageData[i].section1.image,
}));

const NAV_OFFSET = 96;
const CARD_STEP = 28;

const ServiceCard = ({ service, index, total, progress }) => {
  // Each card shrinks a little as the cards after it stack on top
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  const dim = useTransform(progress, [start, 1], [0, (total - index - 1) * 0.06]);

  return (
    <div
      className="lg:sticky lg:h-[calc(100vh-120px)] lg:max-h-[620px] flex items-start"
      style={{ top: NAV_OFFSET + index * CARD_STEP }}
    >
      <motion.article
        style={{ scale }}
        className="relative w-full origin-top overflow-hidden rounded-3xl border border-[#513897]/15 bg-white shadow-[0_20px_60px_-20px_rgba(31,0,121,0.25)]"
      >
        <div className="grid lg:grid-cols-2 lg:h-[calc(100vh-160px)] lg:max-h-[580px]">
          {/* Copy */}
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-12 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold tracking-[0.2em] text-[#513897]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-10 bg-[#513897]/40" />
              <span className="flex items-center gap-2 text-sm font-medium text-[#1f0079]">
                <span className="text-lg">{service.icon}</span>
                {service.title}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]">
              {service.headline}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
              {service.description}
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-8">
              {service.items.map((item) => (
                <li key={item.title} className="flex items-start gap-2 text-sm text-[#1f0079]">
                  <FiCheck className="mt-0.5 shrink-0 text-[#513897]" />
                  {item.title}
                </li>
              ))}
            </ul>

            <Link
              to={service.path}
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#1f0079] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#513897]"
            >
              Explore {service.title}
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Image */}
          <ParallaxImage
            src={service.image}
            alt={service.title}
            strength={10}
            className="h-56 sm:h-72 lg:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f0079]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/30" />
          </ParallaxImage>
        </div>

        {/* Darkens slightly once the next card covers it */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-[#1f0079]"
        />
      </motion.article>
    </div>
  );
};

export default function ServicesShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#513897] mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f0079] mb-4">
            Services That{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]">
              Power Your Product
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            From the first wireframe to production AI, our teams design, build and
            scale software across five core practices.
          </p>
        </Reveal>

        <div ref={containerRef} className="relative flex flex-col gap-6 lg:gap-0">
          {services.map((service, index) => (
            <Reveal key={service.path} amount={0.15} className="lg:contents">
              <ServiceCard
                service={service}
                index={index}
                total={services.length}
                progress={scrollYProgress}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
