import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Vehicles API
export const getVehicles = async (params = {}) => {
  const response = await api.get("/vehicles", { params });
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const getLatestVehicles = async () => {
  const response = await api.get("/vehicles/latest");
  return response.data;
};

export const getTopRatedVehicles = async () => {
  const response = await api.get("/vehicles/top-rated");
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await api.post("/vehicles", vehicleData);
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await api.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

// Bookings API
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getBookings = async (userEmail) => {
  const response = await api.get("/bookings", {
    params: { userEmail },
  });
  return response.data;
};

export default api;

