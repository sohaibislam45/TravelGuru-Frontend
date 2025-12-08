import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { createVehicle } from "../services/api";
import toast from "react-hot-toast";

const AddVehicle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    vehicleName: "",
    ownerName: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: true,
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("Vehicle added successfully!");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      navigate("/myVehicles");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to add vehicle");
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
      userEmail: user.email,
    };

    mutation.mutate(vehicleData);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Add New Vehicle</h1>
        <p className="text-base-content/70">Fill in the details to list your vehicle</p>
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
              <span className="label-text">Price Per Day (৳) *</span>
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

          <div className="form-control mt-8 pt-6 border-t border-base-300/50">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-primary btn-lg w-full"
            >
              {mutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding...
                </>
              ) : (
                "Add Vehicle"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;

