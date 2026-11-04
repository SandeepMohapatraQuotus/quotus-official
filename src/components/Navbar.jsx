import { useState, useEffect } from "react";
import { Activity, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "./overlays/SmoothScroll";
import { EASE_OUT } from "../lib/motion";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import ServicePage from "../../pages/Services";
import { servicesData } from "../data/servicesData";
import { useNavigate } from "react-router-dom";
import {ourProducts} from "../data/ProductPageData";


export const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Gallery", href: "/gallery" },
  { name: "Product", href: "/product", hasDropdown: true },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navigate = useNavigate();
  const [itemWidths, setItemWidths] = useState({});
  const [mobileProductOpen, setMobileProductOpen] = useState(false);


  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  // Hide the bar while scrolling down, bring it back as soon as the user scrolls up
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 10);
    if (y < 120) setHidden(false);
    else if (y - previous > 4) setHidden(true);
    else if (previous - y > 4) setHidden(false);
  });

  // Freeze smooth scrolling behind the open mobile menu
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) lenis.stop();
    else lenis.start();
  }, [isOpen, lenis]);

  const menuOpen = isOpen || showServicesDropdown || showProductDropdown;

  // Measure the width of each nav item
  useEffect(() => {
    if (typeof window !== "undefined") {
      const widths = {};
      navItems.forEach((item) => {
        const element = document.createElement("span");
        element.style.visibility = "hidden";
        element.style.position = "absolute";
        element.style.fontSize = "1rem"; 
        element.style.fontWeight = "500";
        element.style.fontFamily = "inherit";
        element.textContent = item.name;
        document.body.appendChild(element);
        widths[item.name] = element.offsetWidth;
        document.body.removeChild(element);
      });
      setItemWidths(widths);
    }
  }, []);

  // Check if a nav item is active
  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden && !menuOpen ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      {/* Animated Background */}
      <motion.div
        className={`absolute inset-0 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
          scrolled ? "bg-white/90" : "bg-white"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: scrolled ? "0 4px 20px rgba(33, 4, 124, 0.1)" : "none",
          borderBottom: scrolled ? "1px solid rgba(33, 4, 124, 0.1)" : "none",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative   px-0 md:px-4 pr-3  py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-10 block">
            <motion.div
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              className="flex items-center space-x-2"
            >
              <div className="relative w-50 h-15">
                <motion.div
                  whileHover={{
                    transition: { duration: 0.6 },
                  }}
                  className="relative w-full h-full p-1 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <div className="relative flex items-center justify-center">
                    <img
                      src="/QuotusLOGO.png"
                      alt="Logo"
                      className="object-contain h-10"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isServices = item.name === "Services";
              const isProduct = item.name === "Product";
              const active = isActive(item.href);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      if (item.name === "Services")
                        setShowServicesDropdown(true);
                      if (item.name === "Product") setShowProductDropdown(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) {
                      if (item.name === "Services")
                        setShowServicesDropdown(false);
                      if (item.name === "Product")
                        setShowProductDropdown(false);
                    }
                  }}
                >
                  <Link
                    to={item.href}
                    className="relative px-4 py-2 flex flex-col items-center"
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault(); // Prevent navigation for dropdown items
                      }
                    }}
                  >
                    <motion.span
                      className={`relative z-10 font-medium text-md flex items-center ${
                        active
                          ? "text-[#21047c]"
                          : "text-gray-600 hover:text-[#21047c]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                      {(isServices || isProduct) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-inherit mt-[2px] ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </motion.span>

                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 h-0.5 bg-[#21047c]"
                        style={{
                          width: itemWidths[item.name]
                            ? `${itemWidths[item.name]}px`
                            : "auto",
                        }}
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Link>

                  {/* Services Dropdown */}
                  <AnimatePresence>
                    {isServices && showServicesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-40 mt-2 w-[300px]"
                      >
                        <ServicePage
                          onClose={() => setShowServicesDropdown(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Product Dropdown */}
                  <AnimatePresence>
                    {item.name === "Product" && showProductDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -15, scale: 0.98 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            bounce: 0.3,
                            duration: 0.4,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                          transition: { duration: 0.15 },
                        }}
                        className="absolute top-full right-0 mt-2 w-100  bg-white shadow-2xl rounded-xl border border-gray-200 "
                        style={{
                          boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        <div className="flex flex-col py-1.5">
                          {ourProducts.map((product, index) => (
                            <div key={product.productHeadingSection.pathUrl}>
                              {index > 0 && (
                                <div className="border-t border-gray-100  mx-3 my-1" />
                              )}
                              <motion.div
                                initial={{ x: -5, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: {
                                    delay: 0.1 + index * 0.05,
                                    ease: "easeOut",
                                  },
                                }}
                              >
                                <Link
                                  to={product.productHeadingSection.pathUrl}
                                  className="group px-4 py-3 hover:bg-gray-50  transition-all duration-200 flex items-center text-[#21047c] dark:text-gray-200"
                                  onClick={() => setShowProductDropdown(false)}
                                >
                                  <span className="mr-3 group-hover:scale-110 transition-transform duration-200">
                                    <img
                                      src={
                                        product.productHeadingSection.navIcon
                                      }
                                      className="rounded-full w-9 h-9 object-contain"
                                      alt="Product Icon"
                                    />
                                  </span>

                                  <div>
                                    <p className="font-medium">
                                      {product.productHeadingSection.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {product.productHeadingSection.heading}
                                    </p>
                                  </div>
                                  <svg
                                    className="ml-auto h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </Link>
                              </motion.div>
                            </div>
                          ))}
                        </div>

                        {/* Enhanced footer */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { delay: 0.2 } }}
                          className="px-4 py-2.5  text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 flex justify-between items-center"
                        >
                          <span
                            className="hover:text-[#21047c] cursor-pointer"
                            onClick={() => {
                              navigate("/contact");
                            }}
                          >
                            Need help ?
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <div
                variant="ghost"
                size="icon"
                className="lg:hidden relative z-10 text-gray-600 hover:text-[#21047c] hover:bg-[#21047c]/10"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] sm:w-[380px] bg-white border-l border-gray-200 p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <Link to="/" className="z-10 block">
                    <motion.div
                      whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.1 },
                      }}
                      className="flex items-center space-x-2"
                    >
                      <div className="relative w-50 h-15">
                        <motion.div
                          whileHover={{
                            transition: { duration: 0.6 },
                          }}
                          className="relative w-full h-full p-1 rounded-lg bg-white flex items-center justify-left overflow-hidden"
                        >
                          <div className="relative flex items-center justify-center">
                            <img
                              src="https://quotus.co.in/static/media/logosmall.415b9ba4b0b4c8d554a5.png"
                              alt="Logo"
                              className="object-contain h-10"
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 py-2 overflow-y-auto">
                  {navItems.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <div key={item.name}>
                        {item.name === "Services" || item.name === "Product" ? (
                          <div className="px-2">
                            <div
                              onClick={() => {
                                if (item.name === "Services") {
                                  setMobileServicesOpen(!mobileServicesOpen);
                                } else if (item.name === "Product") {
                                  setMobileProductOpen(!mobileProductOpen);
                                }
                              }}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
                                active
                                  ? "text-[#21047c] bg-[#21047c]/10"
                                  : "text-[#1f0079] hover:bg-[#1f0079]/5"
                              }`}
                            >
                              <span className="font-medium">{item.name}</span>
                              <motion.div
                                animate={{
                                  rotate:
                                    item.name === "Services"
                                      ? mobileServicesOpen
                                        ? 180
                                        : 0
                                      : mobileProductOpen
                                      ? 180
                                      : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-5 w-5 ${
                                    active ? "text-[#21047c]" : "text-[#1f0079]"
                                  }`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </motion.div>
                            </div>

                            {/* Services Dropdown */}
                            <AnimatePresence>
                              {item.name === "Services" &&
                                mobileServicesOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pl-4 py-2 space-y-2">
                                      {servicesData.map((service, index) => {
                                        const serviceActive =
                                          location.pathname === service.path;

                                        return (
                                          <div
                                            key={index}
                                            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition ${
                                              serviceActive
                                                ? "text-[#21047c] bg-[#21047c]/10"
                                                : "text-[#1f0079] hover:text-[#513897] hover:bg-[#1f0079]/5"
                                            }`}
                                            onClick={() => {
                                              setMobileServicesOpen(false);
                                              navigate(service.path);
                                              setIsOpen(false);
                                            }}
                                          >
                                            {service.icon}
                                            <span className="text-xs">
                                              {service.title}
                                            </span>
                                            {serviceActive && (
                                              <motion.div
                                                layoutId="mobile-service-active"
                                                className="w-1 h-5 bg-[#21047c] rounded-full ml-auto"
                                                transition={{
                                                  type: "spring",
                                                  bounce: 0.2,
                                                  duration: 0.6,
                                                }}
                                              />
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                            </AnimatePresence>

                            {/*  Product Dropdown */}
                            <AnimatePresence>
                              {item.name === "Product" && mobileProductOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 py-2 space-y-2">
                                    {ourProducts.map((product, index) => {
                                      const productActive =
                                        location.pathname === product.productHeadingSection.pathUrl;

                                      return (
                                        <div
                                          key={index}
                                          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition ${
                                            productActive
                                              ? "text-[#21047c] bg-[#21047c]/10"
                                              : "text-[#1f0079] hover:text-[#513897] hover:bg-[#1f0079]/5"
                                          }`}
                                          onClick={() => {
                                            setMobileProductOpen(false);
                                            navigate(
                                              product.productHeadingSection
                                                .pathUrl
                                            );
                                            setIsOpen(false);
                                          }}
                                        >
                                          <span className="mr-3 group-hover:scale-110 transition-transform duration-200">
                                            <img
                                              src={
                                                product.productHeadingSection
                                                  .navIcon
                                              }
                                              className="rounded-full w-9 h-9 object-contain"
                                              alt="Product Icon"
                                            />
                                          </span>
                                          <span className="text-xs">
                                            {product.productHeadingSection.name}
                                          </span>
                                          {productActive && (
                                            <motion.div
                                              layoutId="mobile-product-active"
                                              className="w-1 h-5 bg-[#21047c] rounded-full ml-auto"
                                              transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                              }}
                                            />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-lg transition-all mx-2 font-medium relative ${
                              active
                                ? "text-[#21047c] bg-[#21047c]/10"
                                : "text-[#1f0079] hover:text-[#513897] hover:bg-[#1f0079]/5"
                            }`}
                          >
                            {item.name}
                            {active && (
                              <motion.div
                                layoutId="mobile-nav-active"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-[#21047c] rounded-r-full"
                                transition={{
                                  type: "spring",
                                  bounce: 0.2,
                                  duration: 0.6,
                                }}
                              />
                            )}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
