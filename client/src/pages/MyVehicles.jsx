import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getVehicles, deleteVehicle } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useState } from "react";

const MyVehicles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);

  const { data: allVehicles, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const myVehicles = allVehicles?.filter(
    (vehicle) => vehicle.userEmail === user?.email
  ) || [];

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      toast.success("Vehicle deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to delete vehicle");
      setDeleteId(null);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setDeleteId(id);
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">My Vehicles</h1>
          <p className="text-base-content/70">Manage your vehicle listings</p>
        </div>
        <Link to="/addVehicle" className="btn btn-primary">
          Add New Vehicle
        </Link>
      </div>

      {myVehicles.length === 0 ? (
        <div className="text-center py-16">
          <div className="card bg-base-100 shadow-lg border border-base-300/50 p-12 max-w-md mx-auto">
            <p className="text-xl text-base-content/70 mb-6">
              You haven't added any vehicles yet.
            </p>
            <Link to="/addVehicle" className="btn btn-primary">
              Add Your First Vehicle
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myVehicles.map((vehicle) => (
            <div key={vehicle._id} className="card bg-base-100 shadow-lg h-full border border-base-300/50">
              <figure className="overflow-hidden">
                <img
                  src={vehicle.coverImage || "https://via.placeholder.com/400x300"}
                  alt={vehicle.vehicleName}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">{vehicle.vehicleName}</h2>
                <p className="text-base-content/70 line-clamp-2">
                  {vehicle.description?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-300/50">
                  <span className="text-2xl font-bold text-primary">
                    ${vehicle.pricePerDay}<span className="text-sm font-normal text-base-content/70">/day</span>
                  </span>
                  <span className="badge badge-secondary badge-lg">{vehicle.category}</span>
                </div>
                <div className="card-actions justify-end mt-4 gap-2">
                  <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                  <Link
                    to={`/updateVehicle/${vehicle._id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    disabled={deleteMutation.isPending && deleteId === vehicle._id}
                    className="btn btn-sm btn-error"
                  >
                    {deleteMutation.isPending && deleteId === vehicle._id ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;

