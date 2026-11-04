import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import RippleButton from "../overlays/RippleButton";
import { Navigate, useNavigate } from "react-router-dom";

export const ProductDetails = ({ productData }) => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl={productData.bgImage}
        subheading={productData.subheading}
        heading={productData.name}
        productUrl={productData.productUrl}
      >
        {/* <ExampleContent
          name={productData.name}
          description={productData.description}
        /> */}
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 1;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  productUrl,
  children,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-fit">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
          productUrl={productUrl}
        />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, productUrl }) => {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white gap-5"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
      <RippleButton>
        <button
          className="w-full h-full flex justify-center text-center items-center"
          onClick={() => {
            if (productUrl.startsWith("http")) {
              window.open(productUrl, "_blank");
            }
          }}
        >
          View More
        </button>
      </RippleButton>
    </motion.div>
  );
};

// const ExampleContent = ({ name, description }) => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pb-5 pt-12 md:grid-cols-12 ">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
//       Additional content explaining {name}
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-neutral-600 ">{description}</p>
//     </div>
//   </div>
// );
