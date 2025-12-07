import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllVehicles from "./pages/AllVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import AddVehicle from "./pages/AddVehicle";
import MyVehicles from "./pages/MyVehicles";
import UpdateVehicle from "./pages/UpdateVehicle";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/allVehicles" element={<AllVehicles />} />
            <Route
              path="/vehicle/:id"
              element={
                <PrivateRoute>
                  <VehicleDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/addVehicle"
              element={
                <PrivateRoute>
                  <AddVehicle />
                </PrivateRoute>
              }
            />
            <Route
              path="/myVehicles"
              element={
                <PrivateRoute>
                  <MyVehicles />
                </PrivateRoute>
              }
            />
            <Route
              path="/updateVehicle/:id"
              element={
                <PrivateRoute>
                  <UpdateVehicle />
                </PrivateRoute>
              }
            />
            <Route
              path="/myBookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
