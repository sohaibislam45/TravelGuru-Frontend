import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Validate password in real-time
    if (name === "password") {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        setErrors((prev) => ({ ...prev, password: passwordErrors }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // Validate password requirements
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors({ password: passwordErrors });
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.photoURL
      );
      navigate("/");
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
      navigate("/");
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
                Create your account
              </h2>
              <p className="text-sm text-base-content/70">
                Or{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary-focus transition-colors"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="photoURL" className="label">
                    <span className="label-text font-medium">Photo URL (optional)</span>
                  </label>
                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    className="input input-bordered w-full"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoURL}
                    onChange={handleChange}
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
                    autoComplete="new-password"
                    required
                    className={`input input-bordered w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {Array.isArray(errors.password) ? (
                          <ul className="list-disc list-inside">
                            {errors.password.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        ) : (
                          errors.password
                        )}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="confirmPassword" className="label">
                    <span className="label-text font-medium">Confirm Password</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`input input-bordered w-full ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword}
                      </span>
                    </label>
                  )}
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
                      Creating account...
                    </>
                  ) : (
                    "Register"
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
                  Sign up with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

