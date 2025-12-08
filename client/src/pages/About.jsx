import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCar, FaUsers, FaStar, FaCheckCircle, FaShieldAlt, FaClock, FaHeart, FaRocket } from "react-icons/fa";

const About = () => {
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const stats = [
    { icon: <FaCar className="w-8 h-8" />, value: "500+", label: "Vehicles" },
    { icon: <FaUsers className="w-8 h-8" />, value: "10K+", label: "Happy Customers" },
    { icon: <FaStar className="w-8 h-8" />, value: "4.8", label: "Average Rating" },
    { icon: <FaCheckCircle className="w-8 h-8" />, value: "50+", label: "Cities" },
  ];

  const values = [
    {
      icon: <FaShieldAlt className="w-10 h-10" />,
      title: "Trust & Safety",
      description: "Your safety is our top priority. All vehicles are thoroughly inspected and verified.",
    },
    {
      icon: <FaClock className="w-10 h-10" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you whenever you need help.",
    },
    {
      icon: <FaHeart className="w-10 h-10" />,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do.",
    },
    {
      icon: <FaRocket className="w-10 h-10" />,
      title: "Innovation",
      description: "Constantly improving our platform to provide the best experience.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] w-full overflow-hidden bg-base-100 flex items-center"
        style={
          theme === "light"
            ? {
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 15%, #f1f5f9 30%, #e0e7ff 50%, #c7d2fe 70%, #a5b4fc 85%, #f0f9ff 100%)",
              }
            : {
                background: "linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
              }
        }
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {theme === "light" ? (
            <>
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
            </>
          ) : (
            <>
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

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-center"
            >
              <span
                className="bg-clip-text text-transparent text-center"
                style={
                  theme === "light"
                    ? {
                        backgroundImage: "linear-gradient(135deg, #070738 0%, #1e3a8a 50%, #3b82f6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {
                        color: "hsl(var(--bc))",
                      }
                }
              >
                About TravelGuru
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-base-content/80 leading-relaxed max-w-2xl mx-auto font-medium text-center"
            >
              Your trusted partner for vehicle rentals and trip management. We're dedicated to making your travel experience seamless, safe, and memorable.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card bg-base-100 shadow-lg border border-base-300/50 p-6 text-center"
              >
                <div className="flex justify-center mb-4 text-primary">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-base-content mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-base-content/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 bg-base-200/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-lg border border-base-300/50 p-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-lg text-base-content/80 leading-relaxed">
                To revolutionize the vehicle rental industry by providing a seamless, secure, and user-friendly platform that connects vehicle owners with travelers, making transportation accessible to everyone, anywhere, anytime.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-base-100 shadow-lg border border-base-300/50 p-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-lg text-base-content/80 leading-relaxed">
                To become the leading vehicle rental platform globally, recognized for innovation, reliability, and exceptional customer service. We envision a future where finding the perfect vehicle for any journey is effortless and enjoyable.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="card bg-base-100 shadow-lg border border-base-300/50 p-6 text-center"
              >
                <div className="flex justify-center mb-4 text-primary">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-base-content/70">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-base-200/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose TravelGuru?</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Experience the difference with our platform
              </p>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  title: "Wide Selection",
                  description: "Choose from hundreds of vehicles across multiple categories - SUVs, Sedans, Vans, and Electric vehicles.",
                },
                {
                  title: "Easy Booking",
                  description: "Simple and intuitive booking process. Find, compare, and book your perfect vehicle in minutes.",
                },
                {
                  title: "Verified Owners",
                  description: "All vehicle owners are verified to ensure a safe and reliable rental experience.",
                },
                {
                  title: "Best Prices",
                  description: "Competitive pricing with transparent costs. No hidden fees, no surprises.",
                },
                {
                  title: "24/7 Availability",
                  description: "Book and manage your rentals anytime, anywhere. Our platform is always available.",
                },
                {
                  title: "Customer Support",
                  description: "Dedicated support team ready to help you with any questions or concerns.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card bg-base-100 shadow-lg border border-base-300/50 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <FaCheckCircle className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-base-content/70">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card bg-gradient-to-r from-primary to-primary/80 shadow-2xl border-0 p-8 md:p-12 text-center text-primary-content"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the convenience of TravelGuru today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="/allVehicles" className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-0 shadow-lg">
                Explore Vehicles
              </a>
              <a href="/register" className="btn btn-lg btn-outline border-2 border-base-100 text-base-100 hover:bg-base-100 hover:text-primary">
                Get Started
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

