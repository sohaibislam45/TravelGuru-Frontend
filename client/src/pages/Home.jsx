import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { getLatestVehicles, getTopRatedVehicles, getVehicles } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCar, FaBolt, FaShuttleVan, FaTaxi, FaChevronLeft, FaChevronRight, FaStar, FaUsers, FaCheckCircle } from "react-icons/fa";
import { formatPrice } from "../utils/priceFormatter";

const Home = () => {
  const { data: latestVehicles, isLoading: loadingLatest, error: errorLatest } = useQuery({
    queryKey: ["latestVehicles"],
    queryFn: getLatestVehicles,
  });

  const { data: topRatedVehicles, isLoading: loadingTopRated } = useQuery({
    queryKey: ["topRatedVehicles"],
    queryFn: getTopRatedVehicles,
  });

  // Fetch vehicles for hero slider
  const { data: allVehicles, isLoading: loadingVehicles, error: errorVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getVehicles(),
  });

  // Extract unique coverImages for slider
  const sliderImages = allVehicles
    ?.filter((vehicle) => vehicle.coverImage)
    .map((vehicle) => vehicle.coverImage)
    .filter((value, index, self) => self.indexOf(value) === index) || [];

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous
  const [slideProgress, setSlideProgress] = useState(0);

  // Auto-play slider with progress tracking
  useEffect(() => {
    if (!isAutoPlaying || sliderImages.length === 0) return;

    setSlideProgress(0);
    const duration = 5000;
    const interval = 100;
    const increment = (100 / duration) * interval;

    const progressInterval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + increment;
      });
    }, interval);

    const slideInterval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      setSlideProgress(0);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [isAutoPlaying, sliderImages.length, currentSlide]);

  // Navigation functions
  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    setSlideProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    setSlideProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setSlideProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  const categories = [
    { name: "SUVs", categoryValue: "SUV", icon: <FaCar className="w-12 h-12" />, description: "Spacious and powerful" },
    { name: "Electric", categoryValue: "Electric", icon: <FaBolt className="w-12 h-12" />, description: "Eco-friendly travel" },
    { name: "Vans", categoryValue: "Van", icon: <FaShuttleVan className="w-12 h-12" />, description: "Perfect for groups" },
    { name: "Sedans", categoryValue: "Sedan", icon: <FaTaxi className="w-12 h-12" />, description: "Comfortable and efficient" },
  ];

  // Detect current theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "travelguru" || !savedTheme ? "light" : savedTheme;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "travelguru" ? "light" : currentTheme || "light");
    };

    // Check theme on mount
    handleThemeChange();

    // Watch for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Banner Section - Enhanced Modern Design */}
      <section 
        className="relative min-h-screen w-full overflow-hidden bg-base-100"
        style={
          theme === "light"
            ? {
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 15%, #f1f5f9 30%, #e0e7ff 50%, #c7d2fe 70%, #a5b4fc 85%, #f0f9ff 100%)"
              }
            : {
                background: "linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)"
              }
        }
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {theme === "light" ? (
            <>
              {/* Animated gradient orbs - Responsive sizes */}
              <motion.div
                className="absolute top-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-200/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-200/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-purple-100/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/20 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Grid pattern overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />
            </>
          ) : (
            <>
              {/* Dark theme animated elements - Responsive */}
              <motion.div
                className="absolute top-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 30, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}
        </div>
        {loadingVehicles ? (
          <div className="min-h-screen w-full flex items-center justify-center relative z-10">
            <LoadingSpinner />
          </div>
        ) : errorVehicles ? (
          <div className="min-h-screen w-full flex items-center justify-center relative z-10">
            <div className="text-center">
              <p className="text-xl text-error mb-4">Failed to load vehicles</p>
              <p className="text-base-content/70">{errorVehicles.message || "Please try again later."}</p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[80vh]">
              {/* Left Side - Enhanced Content (60%) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-6 lg:space-y-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit"
                >
                  <FaCheckCircle className="text-primary w-4 h-4" />
                  <span className="text-sm font-semibold text-primary">Trusted by thousands</span>
                </motion.div>

                {/* Enhanced Heading with Gradient */}
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
                >
                  <span 
                    className="bg-clip-text text-transparent"
                    style={
                      theme === "light"
                        ? {
                            backgroundImage: "linear-gradient(135deg, #070738 0%, #1e3a8a 50%, #3b82f6 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 2px 4px rgba(7, 7, 56, 0.1))",
                          }
                        : {
                            color: "hsl(var(--bc))",
                            filter: "drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1))",
                          }
                    }
                  >
                    Rent a car from
                  </span>
                  <br />
                  <span 
                    className="bg-clip-text text-transparent"
                    style={
                      theme === "light"
                        ? {
                            backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : {
                            color: "hsl(var(--bc))",
                          }
                    }
                  >
                    anywhere anytime
                  </span>
                </motion.h1>

                {/* Enhanced Description */}
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg md:text-xl text-base-content/80 leading-relaxed max-w-2xl font-medium"
                >
                  Your trusted partner for vehicle rentals and trip management. Find the perfect vehicle for your next adventure with ease and convenience.
                </motion.p>

                {/* Trust Indicators / Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-wrap gap-4 md:gap-6 pt-2 mb-12"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FaCar className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-base-content">
                        {allVehicles?.length || 0}+
                      </div>
                      <div className="text-sm text-base-content/60">Vehicles</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FaUsers className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-base-content">10K+</div>
                      <div className="text-sm text-base-content/60">Users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FaStar className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-base-content">4.8</div>
                      <div className="text-sm text-base-content/60">Rating</div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                >
                  <Link
                    to="/allVehicles"
                    className="group btn btn-primary btn-lg font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
                    style={{ padding: "1rem 2rem" }}
                  >
                    <span className="relative z-10">Explore All Vehicles</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  <Link
                    to="/about"
                    className="btn btn-outline btn-lg font-semibold border-2 hover:bg-base-200 transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center"
                    style={{ padding: "1rem 2rem" }}
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              {/* Right Side - Enhanced Vehicle Showcase (40%) */}
              <div className="lg:col-span-2 relative">
                {sliderImages.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    {/* Glassmorphism Container */}
                    <div 
                      className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
                      style={{
                        background: theme === "light"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.3)",
                        border: theme === "light"
                          ? "1px solid rgba(255, 255, 255, 0.2)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: theme === "light"
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                          : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {/* Main Featured Image */}
                      <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>
                          <motion.div
                            key={currentSlide}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.9 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="relative"
                          >
                            <img
                              src={sliderImages[currentSlide]}
                              alt={`Vehicle ${currentSlide + 1}`}
                              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                              loading="lazy"
                            />
                            {/* Enhanced Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20"></div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Progress Indicator */}
                        {sliderImages.length > 1 && isAutoPlaying && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-base-300/30 z-30">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${slideProgress}%` }}
                              transition={{ duration: 0.1, ease: "linear" }}
                            />
                          </div>
                        )}

                        {/* Enhanced Navigation Arrows - Responsive */}
                        {sliderImages.length > 1 && (
                          <>
                            <motion.button
                              onClick={goToPrevious}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full transition-all shadow-2xl backdrop-blur-md border"
                              style={{
                                background: theme === "light"
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "rgba(0, 0, 0, 0.7)",
                                borderColor: theme === "light"
                                  ? "rgba(0, 0, 0, 0.1)"
                                  : "rgba(255, 255, 255, 0.2)",
                              }}
                              aria-label="Previous slide"
                            >
                              <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-base-content" />
                            </motion.button>
                            <motion.button
                              onClick={goToNext}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full transition-all shadow-2xl backdrop-blur-md border"
                              style={{
                                background: theme === "light"
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "rgba(0, 0, 0, 0.7)",
                                borderColor: theme === "light"
                                  ? "rgba(0, 0, 0, 0.1)"
                                  : "rgba(255, 255, 255, 0.2)",
                              }}
                              aria-label="Next slide"
                            >
                              <FaChevronRight className="w-4 h-4 md:w-5 md:h-5 text-base-content" />
                            </motion.button>
                          </>
                        )}

                        {/* Slide Counter - Responsive */}
                        {sliderImages.length > 1 && (
                          <div 
                            className="absolute bottom-3 md:bottom-4 right-3 md:right-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-md text-xs md:text-sm font-semibold z-20"
                            style={{
                              background: theme === "light"
                                ? "rgba(255, 255, 255, 0.9)"
                                : "rgba(0, 0, 0, 0.7)",
                              border: theme === "light"
                                ? "1px solid rgba(0, 0, 0, 0.1)"
                                : "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                          >
                            {currentSlide + 1} / {sliderImages.length}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Thumbnail Grid Below */}
                    {sliderImages.length > 1 && sliderImages.length <= 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-4 gap-3 mt-6"
                      >
                        {sliderImages.slice(0, 4).map((image, index) => (
                          <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative rounded-xl overflow-hidden border-2 transition-all backdrop-blur-sm ${
                              index === currentSlide
                                ? "border-primary scale-105 shadow-xl ring-2 ring-primary/50"
                                : "border-base-300/50 hover:border-primary/50 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-24 object-cover"
                            />
                            {index === currentSlide && (
                              <motion.div
                                className="absolute inset-0 bg-primary/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                            )}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Enhanced Dot Indicators for more images */}
                    {sliderImages.length > 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center gap-2 mt-6"
                      >
                        {sliderImages.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`h-2.5 rounded-full transition-all ${
                              index === currentSlide
                                ? "bg-primary w-10 shadow-lg shadow-primary/50"
                                : "bg-base-300 hover:bg-primary/50 w-2.5"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div 
                    className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center backdrop-blur-sm"
                    style={{
                      background: theme === "light"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.3)",
                      border: theme === "light"
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <p className="text-base-content/60 text-lg">No vehicles available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Latest Vehicles Section */}
      <section className="py-20 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Vehicles</h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto md:mx-0">
                  Discover our newest additions to the fleet
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link
                  to="/allVehicles"
                  className="btn btn-primary btn-lg"
                >
                  See All
                </Link>
              </div>
            </div>
          </motion.div>
          {loadingLatest ? (
            <LoadingSpinner />
          ) : errorLatest ? (
            <div className="text-center py-12">
              <div className="card bg-base-100 shadow-lg border border-base-300/50 p-8 max-w-md mx-auto">
                <p className="text-xl text-error mb-4">Failed to load vehicles</p>
                <p className="text-base-content/70">
                  {errorLatest.message || "Please try again later."}
                </p>
              </div>
            </div>
          ) : latestVehicles && latestVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="card bg-base-100 shadow-lg h-full border border-base-300/50">
                    <figure className="overflow-hidden h-64 w-full">
                      <img
                        src={vehicle.coverImage || "https://via.placeholder.com/400x300"}
                        alt={vehicle.vehicleName}
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-xl mb-0">{vehicle.vehicleName}</h2>
                      <p className="text-base font-semibold text-base-content/60 mb-2">Owner: {vehicle.owner || "N/A"}</p>
                      <p className="text-base-content/70 line-clamp-2">{vehicle.description || "No description available"}</p>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                        <span className="text-2xl font-bold text-primary">
                          ৳{formatPrice(vehicle.pricePerDay)}<span className="text-sm font-normal text-base-content/70">/day</span>
                        </span>
                        <span className="badge badge-secondary badge-lg">{vehicle.category}</span>
                      </div>
                      <div className="card-actions justify-end mt-4">
                        <Link
                          to={`/vehicle/${vehicle._id}`}
                          className="btn btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="card bg-base-100 shadow-lg border border-base-300/50 p-8 max-w-md mx-auto">
                <p className="text-xl text-base-content/70 mb-4">No vehicles found</p>
                <p className="text-base-content/60">Check back later for new additions to our fleet!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-20 px-4 bg-base-200/50">
        <div className="container mx-auto">
            <animated.div style={fadeIn}>
              <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Top Categories</h2>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/allVehicles?category=${encodeURIComponent(category.categoryValue)}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="card bg-base-100 shadow-lg text-center p-8 border border-base-300/50 cursor-pointer"
                  >
                    <div className="flex justify-center mb-6 text-primary">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                    <p className="text-base-content/70">{category.description}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </animated.div>
        </div>
      </section>

      {/* Top Rated Vehicles Section */}
      {topRatedVehicles && topRatedVehicles.length > 0 && (
        <section className="py-20 px-4 bg-base-100">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Top Rated Vehicles</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Most popular choices from our customers
              </p>
            </motion.div>
            {loadingTopRated ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {topRatedVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="card bg-base-100 shadow-lg h-full border border-base-300/50">
                      <figure className="overflow-hidden h-64 w-full">
                        <img
                          src={vehicle.coverImage || "https://via.placeholder.com/400x300"}
                          alt={vehicle.vehicleName}
                          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title text-xl mb-1">{vehicle.vehicleName}</h2>
                        <p className="text-base font-semibold text-base-content/60 mb-2">Owner: {vehicle.owner || "N/A"}</p>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                          <span className="text-2xl font-bold text-primary">
                            ৳{formatPrice(vehicle.pricePerDay)}<span className="text-sm font-normal text-base-content/70">/day</span>
                          </span>
                          <span className="badge badge-accent badge-lg">Top Rated</span>
                        </div>
                        <div className="card-actions justify-end mt-4">
                          <Link
                            to={`/vehicle/${vehicle._id}`}
                            className="btn btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;


