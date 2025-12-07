import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVehicleById, updateVehicle } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  });

  const [formData, setFormData] = useState({
    vehicleName: "",
    ownerName: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: true,
    description: "",
    coverImage: "",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        vehicleName: vehicle.vehicleName || "",
        ownerName: vehicle.ownerName || "",
        category: vehicle.category || "",
        pricePerDay: vehicle.pricePerDay || "",
        location: vehicle.location || "",
        availability: vehicle.availability !== undefined ? vehicle.availability : true,
        description: vehicle.description || "",
        coverImage: vehicle.coverImage || "",
      });
    }
  }, [vehicle]);

  const mutation = useMutation({
    mutationFn: (data) => updateVehicle(id, data),
    onSuccess: () => {
      toast.success("Vehicle updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      navigate("/myVehicles");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update vehicle");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.vehicleName || !formData.category || !formData.pricePerDay || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const vehicleData = {
      ...formData,
      pricePerDay: parseFloat(formData.pricePerDay),
    };

    mutation.mutate(vehicleData);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
        <button onClick={() => navigate("/myVehicles")} className="btn btn-primary">
          Back to My Vehicles
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Update Vehicle</h1>
        <p className="text-base-content/70">Update your vehicle information</p>
      </div>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl border border-base-300/50">
        <div className="card-body p-8 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Vehicle Name *</span>
            </label>
            <input
              type="text"
              name="vehicleName"
              className="input input-bordered"
              value={formData.vehicleName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Owner Name *</span>
            </label>
            <input
              type="text"
              name="ownerName"
              className="input input-bordered"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category *</span>
            </label>
            <select
              name="category"
              className="select select-bordered"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Price Per Day ($) *</span>
            </label>
            <input
              type="number"
              name="pricePerDay"
              className="input input-bordered"
              value={formData.pricePerDay}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location *</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Availability</span>
              <input
                type="checkbox"
                name="availability"
                className="toggle toggle-primary"
                checked={formData.availability}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-24"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Cover Image URL</span>
            </label>
            <input
              type="url"
              name="coverImage"
              className="input input-bordered"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-control mt-8 pt-6 border-t border-base-300/50 flex-row gap-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-primary btn-lg flex-1"
            >
              {mutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Vehicle"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/myVehicles")}
              className="btn btn-ghost btn-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateVehicle;

