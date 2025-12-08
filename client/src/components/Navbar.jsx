import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaCar } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const pathname = location.pathname;

  return (
    <div 
      className="navbar sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
            <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-md rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200"
          >
            <li>
              <Link
                to="/"
                className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${pathname === "/" ? "font-semibold text-blue-600" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allVehicles"
                className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${pathname === "/allVehicles" ? "font-semibold text-blue-600" : ""}`}
              >
                All Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/addVehicle"
                className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${pathname === "/addVehicle" ? "font-semibold text-blue-600" : ""}`}
              >
                Add Vehicle
              </Link>
            </li>
            <li>
              <Link
                to="/myVehicles"
                className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${pathname === "/myVehicles" ? "font-semibold text-blue-600" : ""}`}
              >
                My Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/myBookings"
                className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${pathname === "/myBookings" ? "font-semibold text-blue-600" : ""}`}
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent">
          <FaCar className="w-6 h-6 mr-2" style={{ color: "#070738" }} />
          <span style={{ color: "#070738" }}>TravelGuru</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                pathname === "/" ? "font-semibold text-blue-600" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allVehicles"
              className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                pathname === "/allVehicles" ? "font-semibold text-blue-600" : ""
              }`}
            >
              All Vehicles
            </Link>
          </li>
          <li>
            <Link
              to="/addVehicle"
              className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                pathname === "/addVehicle" ? "font-semibold text-blue-600" : ""
              }`}
            >
              Add Vehicle
            </Link>
          </li>
          <li>
            <Link
              to="/myVehicles"
              className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                pathname === "/myVehicles" ? "font-semibold text-blue-600" : ""
              }`}
            >
              My Vehicles
            </Link>
          </li>
          <li>
            <Link
              to="/myBookings"
              className={`text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                pathname === "/myBookings" ? "font-semibold text-blue-600" : ""
              }`}
            >
              My Bookings
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || user.email || "User"}
            >
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt={user.displayName || "User"}
                    src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-ghost text-gray-700 hover:bg-gray-100">
              LogOut
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost text-gray-700 hover:bg-gray-100">
              Login
            </Link>
            <Link to="/register" className="btn hover:opacity-90 transition-all" style={{ backgroundColor: "#070738", color: "#ffffff" }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
