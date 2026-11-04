import { motion } from "framer-motion";
import { useState } from "react";
import IntroImage from "../src/components/common/IntroImage";
import Map from "../src/components/contactSection/Map";
import ContactForm from "../src/components/contactSection/ContactForm";
import SEO from "../src/SEO";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState("message");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], 
      },
    },
  };


  return (
    <section className="bg-white  ">
      <SEO
        title="Contact Quotus Software Solutions | Get in Touch"
        description="Contact Quotus Software Solutions for blockchain, AI, SaaS, and custom software development. Reach out to our team for inquiries, collaborations, or support."
        keywords="Quotus contact, contact software company, get in touch Quotus, blockchain solutions contact, AI development contact, SaaS company contact, enterprise IT contact"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/contact"
      />

      <div className="">
        {/* intro image*/}
        <IntroImage title="Contact Us" imageUrl="/commonEntroImage.jpg" />

        <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-6"
          >
            <motion.p
              variants={item}
              className="text-lg text-[#513897] max-w-2xl mx-auto"
            >
              Have questions or ready to start your project ? Reach out to our
              team today.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact  Map */}
            <div className="space-y-8">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
