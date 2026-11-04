import { useReducedMotion } from "framer-motion";
import IntroImage from "../src/components/common/IntroImage";
import Workflow from "../src/components/aboutSection/Workflow";
import WhyChooseUs from "../src/components/aboutSection/WhyUs";
import DomainExpertise from "../src/components/aboutSection/DomainExpertise";
import HorizontalScroll from "../src/components/aboutSection/HorizontalScroll";
import useMediaQuery from "../src/hooks/useMediaQuery";
import SEO from "../src/SEO";

const AboutUs = () => {
  // Horizontal scrolling only on roomy screens, and not for people who prefer reduced motion.
  const isLargeScreen = useMediaQuery("(min-width: 1024px) and (min-height: 640px)");
  const reduceMotion = useReducedMotion();
  const horizontal = isLargeScreen && !reduceMotion;

  return (
    // overflow-x-clip (NOT overflow-hidden): overflow-hidden would break position: sticky
    <div className="relative overflow-x-clip">
      <SEO
        title="About Us | Quotus Software Solutions"
        description="Learn about Quotus  a software Solutions building innovative blockchain, AI, and SaaS products. Discover our mission, team, and journey in enterprise software development."
        keywords="Quotus, about Quotus, Quotus team, software Solutions, blockchain experts, AI software developers, enterprise IT, company mission, software consulting, technology innovation"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/about"
      />

      {/* intro image */}
      <IntroImage title="About Us" imageUrl="/commonEntroImage.jpg" />

      {horizontal ? (
        <HorizontalScroll />
      ) : (
        <div className="relative">
          <DomainExpertise />
          <WhyChooseUs />
          <Workflow />
        </div>
      )}
    </div>
  );
};

export default AboutUs;