import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaCar, FaMapMarkerAlt, FaPhone, FaSearch } from "react-icons/fa";

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
    <div className="sticky top-0 z-50">
      {/* Top Bar - Dark Blue */}
      <div className="bg-blue-900 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left - Location */}
            <div className="flex items-center gap-2 font-sans">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>Uttata secto 10 | Dhaka</span>
            </div>
            {/* Right - Contact */}
            <div className="flex items-center gap-2 font-sans">
              <FaPhone className="w-4 h-4" />
              <span>01234567890</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - White */}
      <div className="navbar bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Left - Logo */}
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
                    d="M4 6h16M4 12h8M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-200"
              >
                <li>
                  <Link 
                    to="/" 
                    className={pathname === "/" ? "active font-semibold text-blue-600" : ""}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/allVehicles" 
                    className={pathname === "/allVehicles" ? "active font-semibold text-blue-600" : ""}
                  >
                    All Vehicles
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/addVehicle" 
                    className={pathname === "/addVehicle" ? "active font-semibold text-blue-600" : ""}
                  >
                    Add Vehicle
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/myVehicles" 
                    className={pathname === "/myVehicles" ? "active font-semibold text-blue-600" : ""}
                  >
                    My Vehicles
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/myBookings" 
                    className={pathname === "/myBookings" ? "active font-semibold text-blue-600" : ""}
                  >
                    My Bookings
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-3xl font-bold px-2 hover:bg-transparent">
              <FaCar className="w-8 h-8 mr-2 text-blue-600" />
              <span className="text-black">
                TravelGuru
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1">
              <li>
                <Link 
                  to="/" 
                  className={`px-4 py-2 rounded-lg transition-colors text-black ${
                    pathname === "/" 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/allVehicles" 
                  className={`px-4 py-2 rounded-lg transition-colors text-black ${
                    pathname === "/allVehicles" 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  All Vehicles
                </Link>
              </li>
              <li>
                <Link 
                  to="/addVehicle" 
                  className={`px-4 py-2 rounded-lg transition-colors text-black ${
                    pathname === "/addVehicle" 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  Add Vehicle
                </Link>
              </li>
              <li>
                <Link 
                  to="/myVehicles" 
                  className={`px-4 py-2 rounded-lg transition-colors text-black ${
                    pathname === "/myVehicles" 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  My Vehicles
                </Link>
              </li>
              <li>
                <Link 
                  to="/myBookings" 
                  className={`px-4 py-2 rounded-lg transition-colors text-black ${
                    pathname === "/myBookings" 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - Search and Auth */}
          <div className="navbar-end gap-3">
            {/* Search Icon */}
            <button className="btn btn-ghost btn-circle hover:bg-gray-100">
              <FaSearch className="w-5 h-5 text-gray-700" />
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Photo with Hover Tooltip */}
                <div className="tooltip tooltip-bottom" data-tip={user.displayName || user.email || "User"}>
                  <div className="w-10 h-10 rounded-full ring-2 ring-blue-600 overflow-hidden">
                    <img
                      alt={user.displayName || "User"}
                      src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* LogOut Button */}
                <button 
                  onClick={handleLogout}
                  className="btn btn-ghost text-black hover:bg-gray-100"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost text-black hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/register" className="btn bg-blue-600 text-white hover:bg-blue-700 border-none">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

