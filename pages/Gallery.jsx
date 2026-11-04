import { motion } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import RollingGallery from "../src/components/ui/RollingGallery";
import IntroImage from "../src/components/common/IntroImage";
import Masonry from "react-masonry-css";
import SEO from "../src/SEO";


const LazyMasonry = lazy(() => import("react-masonry-css"));

const EventGallery = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const events = [
    {
      id: 1,
      title: "Annual Stakeholders Meet 2023",
      location: "Vivanta, BBSR",
      description:
        "Our annual gathering with stakeholders to discuss progress and future strategies",
      images: [
        {
          id: 1,
          url: "/galleryData/stakeholdersMeet2023/img1.jpg",
          size: "wide",
        },
        {
          id: 2,
          url: "/galleryData/stakeholdersMeet2023/img2.jpg",
          size: "tall",
        },
        {
          id: 3,
          url: "/galleryData/stakeholdersMeet2023/img3.jpg",
          size: "wide",
        },

        {
          id: 5,
          url: "/galleryData/stakeholdersMeet2023/img5.jpg",
          size: "tall",
        },
        {
          id: 4,
          url: "/galleryData/stakeholdersMeet2023/img4.jpg",
          size: "tall",
        },
        {
          id: 6,
          url: "/galleryData/stakeholdersMeet2023/img6.jpg",
          size: "wide",
        },
        {
          id: 7,
          url: "/galleryData/stakeholdersMeet2023/img7.jpg",
          size: "regular",
        },

        {
          id: 9,
          url: "/galleryData/stakeholdersMeet2023/img9.jpg",
          size: "wide",
        },
        {
          id: 8,
          url: "/galleryData/stakeholdersMeet2023/img8.jpg",
          size: "tall",
        },
      ],
    },
  ];

  const getSizeClass = (size) => {
    switch (size) {
      case "wide":
        return "col-span-2";
      case "tall":
        return "row-span-2";
      case "big":
        return "col-span-2 row-span-2";
      default:
        return "";
    }
  };

  const openImage = (eventId, imageId) => {
    setExpandedImage({ eventId, imageId });
  };

  const closeImage = () => {
    setExpandedImage(null);
  };

  const handleImageLoad = (eventId, imageId) => {
    setLoadedImages((prev) => new Set(prev).add(`${eventId}-${imageId}`));
  };

  
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <div className="min-h-screen bg-white mt-[5%]">
      <SEO
        title="Gallery | Quotus Software Solutions"
        description="Contact Quotus Software Solutions for blockchain, AI, SaaS, and custom software development. Reach out to our team for inquiries, collaborations, or support."
        keywords="Quotus gallery, blockchain solutions contact, AI development contact, SaaS company contact, enterprise IT contact"
        image="https://quotus.co.in/QuotusLOGO.png"
        url="https://quotus.co.in/gallery"
      />

      {/* Intro image */}
      <IntroImage title="Our Gallery" imageUrl="/commonEntroImage.jpg" />

      <RollingGallery images={events[0].images} />

      <div className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Events Gallery */}
        <div className="space-y-20">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Event Header */}
              <div className="p-8 bg-gradient-to-r from-[#1f0079]/5 to-white">
                <motion.h2
                  className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#1f0079] mb-3 md:mb-4"
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
                    {event.title}
                  </motion.span>
                </motion.h2>

                <p className="text-[#513897] font-medium mb-3">
                  {event.location}
                </p>
                <p className="text-gray-600">{event.description}</p>
              </div>

              {/* Images  */}
              <Suspense
                fallback={<div className="p-6">Loading gallery...</div>}
              >
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="flex gap-4 p-6 my-masonry-grid"
                  columnClassName="my-masonry-grid_column space-y-4"
                >
                  {event.images.map((image) => (
                    <motion.div
                      key={image.id}
                      className="relative overflow-hidden rounded-lg shadow-sm border border-gray-200 h-64" // Fixed height for uniformity
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openImage(event.id, image.id)}
                    >
                      {/* Low-quality placeholder */}
                      {!loadedImages.has(`${event.id}-${image.id}`) && (
                        <div className="w-full h-full bg-gray-200 animate-pulse"></div> // Full height placeholder
                      )}

                      <img
                        src={image.url}
                        alt={`${event.title} ${image.id}`}
                        className="w-full h-full object-cover cursor-pointer" // Full height and width with object-cover
                        loading="lazy"
                        onLoad={() => handleImageLoad(event.id, image.id)}
                        style={{
                          display: loadedImages.has(`${event.id}-${image.id}`)
                            ? "block"
                            : "none",
                        }}
                      />
                      <div className="absolute inset-0 bg-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white font-medium">View</span>
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </Suspense>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <div
              className="absolute top-6 right-6 text-[#513897] text-3xl z-10 hover:text-[#353159] transition-colors cursor-pointer"
              onClick={closeImage}
            >
              &times;
            </div>

            <div className="relative max-w-6xl w-full max-h-[90vh]">
              {events.map(
                (event) =>
                  event.id === expandedImage.eventId &&
                  event.images.map(
                    (image) =>
                      image.id === expandedImage.imageId && (
                        <motion.img
                          key={image.id}
                          src={image.url}
                          alt={`Expanded view - ${event.title}`}
                          className="w-full h-full max-h-[80vh] object-contain"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          loading="eager"
                        />
                      )
                  )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventGallery;
