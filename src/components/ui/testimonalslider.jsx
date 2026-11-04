import { useState, useRef, useEffect } from "react";

export default function FancyTestimonialsSlider({ testimonials }) {
  const testimonialsRef = useRef(null);
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [autorotate, testimonials.length]);

  useEffect(() => {
    const heightFix = () => {
      if (containerRef.current && testimonialsRef.current) {
        const activeSlide = testimonialsRef.current.querySelector(
          `div:nth-child(${active + 1})`
        );
        if (activeSlide) {
          containerRef.current.style.height = `${activeSlide.offsetHeight}px`;
        }
      }
    };
    heightFix();
  }, [active]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 text-center">
      {/* Testimonial image */}
      <div className="relative h-42 mb-6">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-[#1f0079]/25 before:via-[#513897]/5 before:via-25% before:to-[#1f0079]/0 before:to-75%">
          <div className="h-32 flex justify-center items-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute transition-opacity duration-700 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  className="relative top-11 rounded-full w-20 h-20 object-cover border-2 border-[#321f67]  "
                  src={testimonial.img}
                  alt={testimonial.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        className="relative transition-all duration-300 ease-in-out"
        ref={containerRef}
      >
        <div
          className="relative flex flex-col items-center"
          ref={testimonialsRef}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 text-lg sm:text-xl px-4 ${
                active === index
                  ? "opacity-100 relative"
                  : "opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <div className="text-[#1f0079] font-semibold before:content-['\201C'] after:content-['\201D']">
                {testimonial.quote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 cursor-pointer">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm transition-colors duration-150 focus:outline-none focus:ring focus:ring-[#1f0079] ${
              active === index
                ? "bg-[#1f0079] text-white shadow-md"
                : "bg-white text-[#513897] border border-[#513897] hover:bg-[#513897]/10"
            }`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span className="font-semibold">{testimonial.name}</span>
            <span className="px-1">-</span>
            <span>{testimonial.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
