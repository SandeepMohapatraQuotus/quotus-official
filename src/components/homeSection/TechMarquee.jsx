import Marquee from "../motion/Marquee";
import Reveal from "../motion/Reveal";
import {
  uiuxPageData,
  webDevPageData,
  mobileAppPagedata,
  blockchainPageData,
  aiPageData,
} from "../../data/servicesData";

// Every technology listed on the service pages, without duplicates
const technologies = [
  uiuxPageData,
  webDevPageData,
  mobileAppPagedata,
  blockchainPageData,
  aiPageData,
]
  .flatMap((page) => page.section3?.technologies ?? [])
  .filter((tech, index, all) => all.findIndex((t) => t.name === tech.name) === index);

const half = Math.ceil(technologies.length / 2);
const rows = [technologies.slice(0, half), technologies.slice(half)];

const TechPill = ({ tech }) => (
  <div className="mx-2 sm:mx-3 flex items-center gap-3 rounded-full border border-[#513897]/15 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm shadow-[#1f0079]/5 transition-colors duration-300 hover:border-[#513897]/50">
    <img
      src={tech.icon}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
    />
    <span className="whitespace-nowrap text-sm sm:text-base font-medium text-[#1f0079]">
      {tech.name}
    </span>
  </div>
);

export default function TechMarquee() {
  return (
    <section className="relative py-10 md:py-14 bg-gradient-to-b from-white via-[#f8f7fc] to-white overflow-hidden">
      <Reveal className="text-center mb-6 md:mb-8 px-4">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#513897]">
          Technologies we build with
        </p>
      </Reveal>

      <div className="space-y-3 sm:space-y-4">
        <Marquee speed={2}>
          {rows[0].map((tech) => (
            <TechPill key={tech.name} tech={tech} />
          ))}
        </Marquee>
        <Marquee speed={2} direction={-1}>
          {rows[1].map((tech) => (
            <TechPill key={tech.name} tech={tech} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
