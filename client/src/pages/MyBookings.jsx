import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { getBookings } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: () => getBookings(user?.email),
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Bookings</h1>
        <p className="text-base-content/70">View and manage your vehicle bookings</p>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="card bg-base-100 shadow-lg border border-base-300/50 p-12 max-w-md mx-auto">
            <p className="text-xl text-base-content/70 mb-6">
              You haven't made any bookings yet.
            </p>
            <Link to="/allVehicles" className="btn btn-primary">
              Browse Vehicles
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="card bg-base-100 shadow-lg border border-base-300/50">
              {booking.vehicle?.coverImage && (
                <figure className="overflow-hidden">
                  <img
                    src={booking.vehicle.coverImage}
                    alt={booking.vehicleName}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </figure>
              )}
              <div className="card-body">
                <h2 className="card-title text-xl">{booking.vehicleName}</h2>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center py-2 border-b border-base-300/50">
                    <span className="text-sm font-semibold text-base-content/70">Booking Date:</span>
                    <span className="text-sm text-base-content">
                      {booking.bookingDate
                        ? format(new Date(booking.bookingDate), "MMMM dd, yyyy")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-base-300/50">
                    <span className="text-sm font-semibold text-base-content/70">Price:</span>
                    <span className="text-lg font-bold text-primary">
                      ${booking.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
                    </span>
                  </div>
                  {booking.vehicle && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-base-300/50">
                        <span className="text-sm font-semibold text-base-content/70">Category:</span>
                        <span className="badge badge-secondary badge-sm">{booking.vehicle.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-base-300/50">
                        <span className="text-sm font-semibold text-base-content/70">Location:</span>
                        <span className="text-sm text-base-content">{booking.vehicle.location}</span>
                      </div>
                    </>
                  )}
                  {booking.createdAt && (
                    <p className="text-xs text-base-content/60 pt-2">
                      Booked on: {format(new Date(booking.createdAt), "MMMM dd, yyyy")}
                    </p>
                  )}
                </div>
                {booking.vehicle?._id && (
                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-300/50">
                    <Link
                      to={`/vehicle/${booking.vehicle._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Vehicle
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

