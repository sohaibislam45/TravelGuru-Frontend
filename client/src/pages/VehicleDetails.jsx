import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useSpring, animated } from "react-spring";
import { format } from "date-fns";
import { getVehicleById, createBooking } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useState } from "react";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [bookingDate, setBookingDate] = useState("");

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/myBookings");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create booking");
    },
  });

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  const handleBookNow = () => {
    if (!bookingDate) {
      toast.error("Please select a booking date");
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
        <button onClick={() => navigate("/allVehicles")} className="btn btn-primary">
          Back to All Vehicles
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <animated.div style={fadeIn}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vehicle Image */}
          <div className="card bg-base-100 shadow-lg border border-base-300/50 overflow-hidden">
            <figure>
              <img
                src={vehicle.coverImage || "https://via.placeholder.com/800x600"}
                alt={vehicle.vehicleName}
                className="w-full h-auto object-cover"
              />
            </figure>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{vehicle.vehicleName}</h1>
              <div className="flex gap-3 mb-6">
                <span className="badge badge-secondary badge-lg">{vehicle.category}</span>
                <span className="badge badge-outline badge-lg">{vehicle.location}</span>
              </div>
            </div>

            <div className="card bg-primary/5 border border-primary/20 p-6">
              <h2 className="text-3xl font-bold text-primary mb-1">
                ${vehicle.pricePerDay} <span className="text-lg font-normal text-base-content/70">per day</span>
              </h2>
            </div>

            <div className="card bg-base-100 border border-base-300/50 p-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-base-content/80 leading-relaxed">{vehicle.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-100 border border-base-300/50 p-4">
                <h3 className="text-sm font-semibold text-base-content/70 mb-1">Owner</h3>
                <p className="text-base-content font-medium">{vehicle.ownerName}</p>
              </div>

              <div className="card bg-base-100 border border-base-300/50 p-4">
                <h3 className="text-sm font-semibold text-base-content/70 mb-1">Availability</h3>
                <p className={`text-base font-semibold ${vehicle.availability ? "text-success" : "text-error"}`}>
                  {vehicle.availability ? "✓ Available" : "✗ Not Available"}
                </p>
              </div>
            </div>

            {vehicle.createdAt && (
              <div className="card bg-base-100 border border-base-300/50 p-4">
                <h3 className="text-sm font-semibold text-base-content/70 mb-1">Listed On</h3>
                <p className="text-base-content">
                  {format(new Date(vehicle.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            )}

            {/* Booking Section */}
            {vehicle.availability && (
              <div className="card bg-base-100 shadow-lg border border-base-300/50 p-8 mt-8">
                <h3 className="text-2xl font-bold mb-6">Book This Vehicle</h3>
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium">Select Booking Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <button
                  onClick={handleBookNow}
                  disabled={bookingMutation.isPending || !bookingDate}
                  className="btn btn-primary btn-lg w-full"
                >
                  {bookingMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Booking...
                    </>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default VehicleDetails;

