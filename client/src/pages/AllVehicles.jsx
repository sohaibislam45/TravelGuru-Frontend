import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getVehicles } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVehicles = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles", categoryFilter, locationFilter, sortBy, sortOrder],
    queryFn: () =>
      getVehicles({
        category: categoryFilter || undefined,
        location: locationFilter || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      }),
  });

  // Get unique categories and locations for filters
  const categories = [...new Set(vehicles?.map((v) => v.category) || [])];
  const locations = [...new Set(vehicles?.map((v) => v.location) || [])];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Vehicles</h1>
        <p className="text-lg text-base-content/70">Browse our complete vehicle collection</p>
      </div>

      {/* Filters and Sort */}
      <div className="card bg-base-100 shadow-lg border border-base-300/50 p-6 mb-12">
        <div className="card-body p-0">
          <h3 className="text-xl font-semibold mb-6">Filter & Sort</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Filter by Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Filter by Location</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Sort By</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">No Sort</option>
              <option value="price">Price</option>
              <option value="date">Date</option>
            </select>
          </div>

          {sortBy && (
            <div>
              <label className="label">
                <span className="label-text">Order</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : vehicles && vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="card bg-base-100 shadow-lg h-full border border-base-300/50">
                <figure className="overflow-hidden">
                  <img
                    src={vehicle.coverImage || "https://via.placeholder.com/400x300"}
                    alt={vehicle.vehicleName}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl">{vehicle.vehicleName}</h2>
                  <p className="text-base-content/70 line-clamp-2">
                    {vehicle.description?.substring(0, 120)}...
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                    <span className="text-2xl font-bold text-primary">
                      ৳{vehicle.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
                    </span>
                    <div className="flex flex-col items-end gap-2">
                      <span className="badge badge-secondary badge-lg">{vehicle.category}</span>
                      <span className="badge badge-outline">{vehicle.location}</span>
                    </div>
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
        <div className="text-center py-16">
          <div className="card bg-base-100 shadow-lg border border-base-300/50 p-12">
            <p className="text-xl text-base-content/70 mb-4">No vehicles found.</p>
            <p className="text-base-content/60">Try adjusting your filters to see more results.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllVehicles;

