import { flags } from "../../data/ourClientSectionData";
import { useState, useEffect, useRef } from "react";

function Country() {
  const gapInClients = 24; // mx-6 = 24px
  const clientWidth = 192; // w-48 = 192px
  const itemWidth = clientWidth + gapInClients;
  const numItems = flags.length;
  const trackWidth = numItems * itemWidth;

  const [numCopies, setNumCopies] = useState(2); // Reduced initial copies
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateCopies = () => {
      if (containerRef.current) {
        const viewportWidth = containerRef.current.offsetWidth;
        const minCopies = Math.ceil(viewportWidth / trackWidth) + 1;
        setNumCopies(Math.max(2, minCopies));
      }
    };

    calculateCopies();
    const debounceResize = () => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(calculateCopies, 100);
      };
    };
    window.addEventListener("resize", debounceResize());
    return () => window.removeEventListener("resize", debounceResize());
  }, [trackWidth]);

  const allFlags = Array.from({ length: numCopies }, () => flags).flat();

  return (
    <div>
      {/* Country Flags */}
      <div className="flex flex-col justify-center items-center mb-16">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] mb-4">
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#1f0079] to-[#513897]"
            style={{
              backgroundSize: "200% 100%",
              animation: "gradientShift 6s linear infinite alternate",
            }}
          >
            Client Based
          </span>{" "}
          <span>Countries</span>
        </h2>

        <div
          ref={containerRef}
          className="relative w-full h-48 overflow-hidden bg-white rounded-xl shadow-sm border border-[#1f0079]/10"
        >
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Seamless scrolling container */}
          <div
            className="absolute flex items-center h-full"
            style={{
              width: `${trackWidth * numCopies}px`,
              animation: `scroll ${30 / numCopies}s linear infinite`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {allFlags.map((flag, index) => (
              <div
                key={`flag-${index}`}
                className="flex flex-col items-center mx-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="h-32 w-48 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-white border border-[#1f0079]/10">
                  <img
                    src={flag.image}
                    alt={flag.country}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-[#1f0079]">
                  {flag.country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${trackWidth}px); }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
}

export default Country;
