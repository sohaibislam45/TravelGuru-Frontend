import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaCar } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

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

  const isActive = (path) => pathname === path;

  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur-lg bg-base-100/90 border-b border-base-300/60 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden hover:bg-primary/10 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-base-content"
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
            className="menu menu-sm dropdown-content bg-base-100/98 backdrop-blur-lg rounded-box z-[1] mt-3 w-56 p-3 shadow-xl border border-base-300/60 gap-2"
          >
            <li>
              <Link
                to="/"
                className={`rounded-lg px-4 py-2 transition-all ${
                  isActive("/")
                    ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allVehicles"
                className={`rounded-lg px-4 py-2 transition-all ${
                  isActive("/allVehicles")
                    ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                All Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/addVehicle"
                className={`rounded-lg px-4 py-2 transition-all ${
                  isActive("/addVehicle")
                    ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                Add Vehicle
              </Link>
            </li>
            <li>
              <Link
                to="/myVehicles"
                className={`rounded-lg px-4 py-2 transition-all ${
                  isActive("/myVehicles")
                    ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                My Vehicles
              </Link>
            </li>
            <li>
              <Link
                to="/myBookings"
                className={`rounded-lg px-4 py-2 transition-all ${
                  isActive("/myBookings")
                    ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`rounded-lg px-4 py-2 transition-all ${
                  isActive("/about")
                    ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                    : "text-base-content hover:text-primary hover:bg-base-200"
                }`}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl hover:bg-transparent hover:scale-105 transition-all px-2 lg:px-4"
        >
          <FaCar className="w-7 h-7 mr-2 text-primary transition-colors" />
          <span className="text-primary font-bold tracking-tight">
            TravelGuru
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8">
          <li>
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all relative ${
                isActive("/")
                  ? "font-semibold text-primary bg-primary/10"
                  : "text-base-content hover:text-primary hover:bg-base-200"
              }`}
            >
              {isActive("/") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full"></span>
              )}
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allVehicles"
              className={`px-4 py-2 rounded-lg transition-all relative ${
                isActive("/allVehicles")
                  ? "font-semibold text-primary bg-primary/10"
                  : "text-base-content hover:text-primary hover:bg-base-200"
              }`}
            >
              {isActive("/allVehicles") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full"></span>
              )}
              All Vehicles
            </Link>
          </li>
          <li>
            <Link
              to="/addVehicle"
              className={`px-4 py-2 rounded-lg transition-all relative ${
                isActive("/addVehicle")
                  ? "font-semibold text-primary bg-primary/10"
                  : "text-base-content hover:text-primary hover:bg-base-200"
              }`}
            >
              {isActive("/addVehicle") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full"></span>
              )}
              Add Vehicle
            </Link>
          </li>
          <li>
            <Link
              to="/myVehicles"
              className={`px-4 py-2 rounded-lg transition-all relative ${
                isActive("/myVehicles")
                  ? "font-semibold text-primary bg-primary/10"
                  : "text-base-content hover:text-primary hover:bg-base-200"
              }`}
            >
              {isActive("/myVehicles") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full"></span>
              )}
              My Vehicles
            </Link>
          </li>
          <li>
            <Link
              to="/myBookings"
              className={`px-4 py-2 rounded-lg transition-all relative ${
                isActive("/myBookings")
                  ? "font-semibold text-primary bg-primary/10"
                  : "text-base-content hover:text-primary hover:bg-base-200"
              }`}
            >
              {isActive("/myBookings") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full"></span>
              )}
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg transition-all relative ${
                isActive("/about")
                  ? "font-semibold text-primary bg-primary/10"
                  : "text-base-content hover:text-primary hover:bg-base-200"
              }`}
            >
              {isActive("/about") && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full"></span>
              )}
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || user.email || "User"}
              >
                <div className="avatar">
                  <div className="rounded-full w-12 h-12 ring ring-primary/50 ring-offset-base-100 ring-offset-2 overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <img
                      key={`${user.uid}-${user.photoURL || "no-photo"}`}
                      alt={user.displayName || "User"}
                      src={
                        user.photoURL && user.photoURL.trim() !== ""
                          ? user.photoURL
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.displayName || user.email || "User"
                            )}`
                      }
                      className="w-full h-full object-contain"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Only fallback if not already using fallback
                        const currentSrc = e.target.src;
                        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.displayName || user.email || "User"
                        )}`;
                        if (
                          !currentSrc.includes("ui-avatars.com") &&
                          currentSrc !== fallbackUrl
                        ) {
                          e.target.src = fallbackUrl;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost text-base-content hover:bg-base-200 hover:text-primary transition-all"
              >
                LogOut
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-ghost text-base-content hover:bg-base-200 hover:text-primary transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary text-primary-content hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
