import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { getLatestVehicles, getTopRatedVehicles, getVehicles } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCar, FaBolt, FaShuttleVan, FaTaxi, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderImages.length]);

  // Navigation functions
  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  const categories = [
    { name: "SUVs", icon: <FaCar className="w-12 h-12" />, description: "Spacious and powerful" },
    { name: "Electric", icon: <FaBolt className="w-12 h-12" />, description: "Eco-friendly travel" },
    { name: "Vans", icon: <FaShuttleVan className="w-12 h-12" />, description: "Perfect for groups" },
    { name: "Sedans", icon: <FaTaxi className="w-12 h-12" />, description: "Comfortable and efficient" },
  ];

  return (
    <div>
      {/* Hero Banner Section - Modern Split Layout */}
      <section 
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e0e7ff 75%, #f0f9ff 100%)"
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle circles */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl"></div>
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
              {/* Left Side - Content (60%) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-6 lg:space-y-8">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{ color: "#070738" }}
                >
                  Rent a car from anywhere anytime
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
                >
                  Your trusted partner for vehicle rentals and trip management. Find the perfect vehicle for your next adventure with ease and convenience.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="pt-4"
                >
                  <Link
                    to="/allVehicles"
                    className="inline-block px-4 py-2 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all text-center transform hover:-translate-y-1"
                    style={{ backgroundColor: "#070738", color: "#ffffff", padding: "1.25rem 2.5rem" }}
                  >
                    All vehicles
                  </Link>
                </motion.div>
              </div>

              {/* Right Side - Vehicle Showcase (40%) */}
              <div className="lg:col-span-2 relative">
                {sliderImages.length > 0 ? (
                  <div className="relative">
                    {/* Main Featured Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={currentSlide}
                          custom={direction}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <img
                            src={sliderImages[currentSlide]}
                            alt={`Vehicle ${currentSlide + 1}`}
                            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {sliderImages.length > 1 && (
                        <>
                          <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all shadow-lg"
                            aria-label="Previous slide"
                          >
                            <FaChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all shadow-lg"
                            aria-label="Next slide"
                          >
                            <FaChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Grid Below */}
                    {sliderImages.length > 1 && sliderImages.length <= 4 && (
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {sliderImages.slice(0, 4).map((image, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentSlide
                                ? "border-blue-600 scale-105 shadow-lg"
                                : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-20 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Dot Indicators for more images */}
                    {sliderImages.length > 4 && (
                      <div className="flex justify-center gap-2 mt-4">
                        {sliderImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentSlide
                                ? "bg-blue-600 w-8"
                                : "bg-gray-300 hover:bg-gray-400 w-2"
                            }`}
                            style={index === currentSlide ? { backgroundColor: "#070738" } : {}}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                    <p className="text-gray-400">No vehicles available</p>
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
                      <h2 className="card-title text-xl">{vehicle.vehicleName}</h2>
                      <p className="text-base-content/70 line-clamp-2">{vehicle.description?.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                        <span className="text-2xl font-bold text-primary">
                          ৳{vehicle.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
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
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Top Categories</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Explore our diverse range of vehicle categories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="card bg-base-100 shadow-lg text-center p-8 border border-base-300/50"
                >
                  <div className="flex justify-center mb-6 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                  <p className="text-base-content/70">{category.description}</p>
                </motion.div>
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
                        <h2 className="card-title text-xl">{vehicle.vehicleName}</h2>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                          <span className="text-2xl font-bold text-primary">
                            ৳{vehicle.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
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

      {/* About TravelGuru Section */}
      <section className="py-20 px-4 bg-base-200/50">
        <div className="container mx-auto">
          <animated.div style={fadeIn} className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About TravelGuru</h2>
            <div className="space-y-6 text-lg text-base-content/80 leading-relaxed">
              <p>
                TravelGuru is a comprehensive vehicle booking and trip management platform designed to make your travel experience seamless and enjoyable. Whether you're planning a weekend getaway, a business trip, or a family vacation, we've got the perfect vehicle for you.
              </p>
              <p>
                Our platform connects vehicle owners with travelers, offering a wide range of vehicles from economy sedans to luxury SUVs. With our easy-to-use interface, secure booking system, and 24/7 customer support, TravelGuru ensures that your journey starts smoothly.
              </p>
              <p>
                Join thousands of satisfied customers who trust TravelGuru for their transportation needs. Start your adventure today!
              </p>
            </div>
          </animated.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

