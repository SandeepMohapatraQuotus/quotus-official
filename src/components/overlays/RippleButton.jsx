import React, { useCallback, useRef, useState } from "react";

const RippleButton = ({ children, ...props }) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const createRipple = useCallback((event) => {
    if (isHovered || !buttonRef.current || !rippleRef.current) return;
    setIsHovered(true);

    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.remove("ripple-leave");
    ripple.classList.add("ripple-enter");
  }, [isHovered]);

  const removeRipple = useCallback((event) => {
    if (event.target !== event.currentTarget) return;
    if (!buttonRef.current || !rippleRef.current) return;
    setIsHovered(false);

    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.remove("ripple-enter");
    ripple.classList.add("ripple-leave");

    const handleAnimationEnd = () => {
      ripple.classList.remove("ripple-leave");
      ripple.removeEventListener("animationend", handleAnimationEnd);
    };

    ripple.addEventListener("animationend", handleAnimationEnd);
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!buttonRef.current || !rippleRef.current || !isHovered) return;

    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
  }, [isHovered]);

  return (
    <div
      ref={buttonRef}
      className="relative flex items-center justify-center overflow-hidden rounded-full bg-white h-15 p-5 text-lg font-medium text-[#513897] border border-[#513897] transition-colors duration-300 hover:bg-[#513897] hover:text-white"

      onMouseEnter={(e) => {
        if (e.target === e.currentTarget) createRipple(e);
      }}
      onMouseLeave={(e) => {
        if (e.target === e.currentTarget) removeRipple(e);
      }}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span ref={rippleRef} className="ripple" />
      {/* Ripple styles inline for easy use */}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background-color: #1f0079;
          z-index: 1;
          opacity: 0;
          transition: transform 50ms linear;
        }
        .ripple-enter {
          animation: ripple-enter 600ms ease-out forwards;
        }
        .ripple-leave {
          animation: ripple-leave 600ms ease-out forwards;
        }
        @keyframes ripple-enter {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes ripple-leave {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RippleButton;
