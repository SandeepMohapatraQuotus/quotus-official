import { motion } from "framer-motion";

const LetterPullUp = ({ text = "", className = "" }) => {
  const letters = text.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className={`flex justify-center ${className}`}>
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className="text-center font-display font-bold drop-shadow-sm text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.02em] md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]"
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  );
};

export default LetterPullUp;