import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useSpring, animated } from "react-spring";
import { format } from "date-fns";
import { getVehicleById, createBooking } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useState } from "react";
import { formatPrice } from "../utils/priceFormatter";
// Import professional icons (assuming lucide-react or similar)
import {
  MapPin,
  Calendar,
  Star,
  User,
  Check,
  ArrowLeft,
  Share2,
  Heart,
  Info,
  ShieldCheck,
  Car,
} from "lucide-react";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [bookingDate, setBookingDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking request sent!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/myBookings");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Booking failed");
    },
  });

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 60 },
  });

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    if (!bookingDate) {
      toast.error("Select a date to proceed");
      return;
    }

    const bookingData = {
      vehicleId: id,
      vehicleName: vehicle.vehicleName,
      userEmail: user.email,
      userName: user.displayName || user.email,
      bookingDate: bookingDate,
      pricePerDay: vehicle.pricePerDay,
      createdAt: new Date().toISOString(),
    };

    bookingMutation.mutate(bookingData);
  };

  if (isLoading) return <LoadingSpinner />;

  if (!vehicle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Vehicle unavailable
        </h2>
        <button
          onClick={() => navigate("/allVehicles")}
          className="btn btn-neutral btn-sm"
        >
          Return to fleet
        </button>
      </div>
    );
  }

  // Fallback image logic
  const mainImage =
    vehicle.images?.[selectedImage] ||
    vehicle.coverImage ||
    "https://via.placeholder.com/800x600?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans text-gray-800">
      {/* Navbar Placeholder / Top Spacing */}
      <div className="h-4"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <animated.div style={fadeIn}>
          {/* Top Navigation & Title Section */}
          <div className="py-6 flex flex-col gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors w-fit"
            >
              <ArrowLeft size={18} /> Back to search
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                  {vehicle.vehicleName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="font-semibold text-gray-900">
                      {vehicle.ratings ? vehicle.ratings.toFixed(1) : "New"}
                    </span>
                    {vehicle.ratings && (
                      <span className="underline decoration-gray-300 ml-1">
                        (Reviews)
                      </span>
                    )}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {vehicle.location}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              {/* Action Icons (Save/Share) */}
              <div className="flex gap-2">
                <button className="btn btn-circle btn-ghost btn-sm">
                  <Share2 size={18} />
                </button>
                <button className="btn btn-circle btn-ghost btn-sm">
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-2">
            {/* Left Column: Images & Info */}
            <div className="lg:col-span-2 space-y-10">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100 relative group shadow-sm">
                  <img
                    src={mainImage}
                    alt={vehicle.vehicleName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {!vehicle.availability && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Currently Unavailable
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {vehicle.images && vehicle.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {vehicle.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden transition-all ${
                          selectedImage === idx
                            ? "ring-2 ring-gray-900 opacity-100"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Specs / Highlights */}
              <div className="border-t border-b border-gray-200 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Car size={24} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Model</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.model}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar size={24} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Year</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <ShieldCheck size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Verified Owner
                    </p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.owner || vehicle.ownerName || "Verified Owner"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                      Vehicle Owner
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {vehicle.owner || vehicle.ownerName || "Owner"}
                    </p>
                  </div>
                </div>
                {vehicle.ownerContact && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📞</span> {vehicle.ownerContact}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About this vehicle
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                    {vehicle.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <Check
                          size={18}
                          className="text-green-600 flex-shrink-0"
                        />
                        <span className="text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  {/* Price Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ৳{formatPrice(vehicle.pricePerDay)}
                      </span>
                      <span className="text-gray-500 mb-1">/ day</span>
                    </div>
                    <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                      <ShieldCheck size={14} /> Best Price Guaranteed
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 ml-1">
                          Pick-up Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                          <Calendar
                            size={18}
                            className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>

                    {vehicle.availability ? (
                      <div className="space-y-3">
                        <button
                          onClick={handleBookNow}
                          disabled={bookingMutation.isPending || !bookingDate}
                          className="btn btn-primary btn-block h-12 text-base font-bold shadow-lg shadow-primary/30"
                        >
                          {bookingMutation.isPending ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Reserve Now"
                          )}
                        </button>
                        <p className="text-xs text-center text-gray-400">
                          You won't be charged yet
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3 text-sm">
                        <Info size={18} className="shrink-0 mt-0.5" />
                        Currently unavailable for booking. Please check back
                        later.
                      </div>
                    )}

                    {/* Cost Breakdown (Static Example) */}
                    {bookingDate && (
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between text-gray-600 text-sm">
                          <span>
                            ৳{formatPrice(vehicle.pricePerDay)} x 1 day
                          </span>
                          <span>৳{formatPrice(vehicle.pricePerDay)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                          <span>Service fee</span>
                          <span>৳0</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-bold pt-2 border-t border-dashed border-gray-200">
                          <span>Total</span>
                          <span>৳{formatPrice(vehicle.pricePerDay)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Owner Contact Snippet */}
                {vehicle.ownerContact && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Questions?</span>
                    <button className="text-primary font-medium hover:underline">
                      Contact Owner
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default VehicleDetails;
