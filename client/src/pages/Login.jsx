import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is already handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      navigate(from, { replace: true });
    } catch (error) {
      // Error is already handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl border border-base-300/50">
          <div className="card-body p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-base-content mb-2">
                Sign in to your account
              </h2>
              <p className="text-sm text-base-content/70">
                Or{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:text-primary-focus transition-colors"
                >
                  create a new account
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="form-control">
                  <label htmlFor="email" className="label">
                    <span className="label-text font-medium">Email address</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input input-bordered w-full"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary-focus transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className="divider">Or continue with</div>

              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="btn btn-outline w-full"
                >
                  <FaGoogle className="w-5 h-5 mr-2" />
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

