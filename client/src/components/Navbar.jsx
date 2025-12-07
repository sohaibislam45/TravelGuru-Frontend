import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
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
    <div className="navbar bg-base-100 border-b border-base-300/50 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-base-100/95">
      <div className="container mx-auto">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-lg w-52 border border-base-300/50"
            >
              <li>
                <Link 
                  to="/" 
                  className={pathname === "/" ? "active font-semibold" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/allVehicles" 
                  className={pathname === "/allVehicles" ? "active font-semibold" : ""}
                >
                  All Vehicles
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link 
                      to="/addVehicle" 
                      className={pathname === "/addVehicle" ? "active font-semibold" : ""}
                    >
                      Add Vehicle
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/myVehicles" 
                      className={pathname === "/myVehicles" ? "active font-semibold" : ""}
                    >
                      My Vehicles
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/myBookings" 
                      className={pathname === "/myBookings" ? "active font-semibold" : ""}
                    >
                      My Bookings
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold px-2 hover:bg-transparent">
            <FaCar className="w-6 h-6 mr-2 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TravelGuru
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/" 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "hover:bg-base-200"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/allVehicles" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/allVehicles" 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "hover:bg-base-200"
                }`}
              >
                All Vehicles
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link 
                    to="/addVehicle" 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      pathname === "/addVehicle" 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "hover:bg-base-200"
                    }`}
                  >
                    Add Vehicle
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/myVehicles" 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      pathname === "/myVehicles" 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "hover:bg-base-200"
                    }`}
                  >
                    My Vehicles
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/myBookings" 
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      pathname === "/myBookings" 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "hover:bg-base-200"
                    }`}
                  >
                    My Bookings
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/20 transition-all"
              >
                <div className="w-10 rounded-full ring-2 ring-base-300">
                  <img
                    alt={user.displayName || "User"}
                    src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                    title={user.displayName || user.email}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-lg w-56 border border-base-300/50"
              >
                <li className="px-2 py-1">
                  <span className="text-sm font-semibold text-base-content">
                    {user.displayName || "User"}
                  </span>
                </li>
                <li className="px-2 py-1">
                  <span className="text-xs text-base-content/70">
                    {user.email}
                  </span>
                </li>
                <li className="divider my-1"></li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="text-error hover:bg-error/10 rounded-lg"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
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

