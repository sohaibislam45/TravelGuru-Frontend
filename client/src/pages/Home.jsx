import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { getLatestVehicles, getTopRatedVehicles } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCar, FaBolt, FaShuttleVan, FaTaxi } from "react-icons/fa";

const Home = () => {
  const { data: latestVehicles, isLoading: loadingLatest } = useQuery({
    queryKey: ["latestVehicles"],
    queryFn: getLatestVehicles,
  });

  const { data: topRatedVehicles, isLoading: loadingTopRated } = useQuery({
    queryKey: ["topRatedVehicles"],
    queryFn: getTopRatedVehicles,
  });

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
      {/* Banner Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-primary/90 via-primary to-secondary/90 relative overflow-hidden">
        <div className="hero-overlay bg-base-content/20"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-5xl md:text-6xl font-bold"
            >
              Welcome to TravelGuru
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 text-lg md:text-xl text-neutral-content/90 leading-relaxed"
            >
              Your trusted partner for vehicle rentals and trip management. Find the perfect vehicle for your next adventure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/allVehicles" className="btn btn-lg btn-accent shadow-lg hover:shadow-xl transition-all">
                Explore All Vehicles
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Vehicles Section */}
      <section className="py-20 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Vehicles</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Discover our newest additions to the fleet
            </p>
          </motion.div>
          {loadingLatest ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestVehicles?.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="card bg-base-100 shadow-lg h-full border border-base-300/50">
                    <figure className="overflow-hidden">
                      <img
                        src={vehicle.coverImage || "https://via.placeholder.com/400x300"}
                        alt={vehicle.vehicleName}
                        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-xl">{vehicle.vehicleName}</h2>
                      <p className="text-base-content/70 line-clamp-2">{vehicle.description?.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                        <span className="text-2xl font-bold text-primary">
                          ${vehicle.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
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
                      <figure className="overflow-hidden">
                        <img
                          src={vehicle.coverImage || "https://via.placeholder.com/400x300"}
                          alt={vehicle.vehicleName}
                          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title text-xl">{vehicle.vehicleName}</h2>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                          <span className="text-2xl font-bold text-primary">
                            ${vehicle.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
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

