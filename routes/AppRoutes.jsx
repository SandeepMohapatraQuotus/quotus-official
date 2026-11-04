import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../src/lib/motion";

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Team = lazy(() => import("../pages/Team"));
const Gallery = lazy(() => import("../pages/Gallery"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Product = lazy(() => import("../pages/Product"));
const Contact = lazy(() => import("../pages/Contact"));
const Blog = lazy(() => import("../pages/Blog"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const BlogPost = lazy(() => import("../src/components/blogsSection/BlogPost"));

// Lazy load services
const WebDevelopment = lazy(() =>
  import("../src/components/serviceSection/WebDevelopment")
);
const UiUxDesign = lazy(() =>
  import("../src/components/serviceSection/UiUxDesign")
);
const MobileAppDevelopment = lazy(() =>
  import("../src/components/serviceSection/MobileAppDevelopment")
);
const BlockchainDevelopment = lazy(() =>
  import("../src/components/serviceSection/BlockchainDevelopment")
);
const AiSolutions = lazy(() =>
  import("../src/components/serviceSection/AiSolutions")
);

// Keeps the footer below the fold while a lazy page loads
const PageFallback = () => <div className="min-h-screen" />;

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageFallback />}>
      {/* Soft fade-in on every route change */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Nested route for services */}
        <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route
          path="/services/mobile-app-development"
          element={<MobileAppDevelopment />}
        />
        <Route
          path="/services/blockchain-development"
          element={<BlockchainDevelopment />}
        />
        <Route path="/services/ai-solutions" element={<AiSolutions />} />

        <Route path="/gallery" element={<Gallery />} />

        {/* Nested route for products */}
        <Route path="/product/naturopura" element={<Product />} />
        <Route path="/product/arthaProAi" element={<Product />} />
        <Route path="/product/feedora" element={<Product />} />
        <Route path="/product/swiftrooms" element={<Product />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />

        {/* unmatched paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </motion.div>
    </Suspense>
  );
}
