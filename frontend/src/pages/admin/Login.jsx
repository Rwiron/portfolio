import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import Button from "../../components/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error: authError,
    token,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is already logged in, redirect to admin dashboard
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only dispatch the necessary credentials, don't log them
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    // Don't console.log credentials in production
    dispatch(loginUser(loginData));

    // Reset password field after submission for security
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#052d43] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-15 animate-blob animation-delay-2000"></div>

      <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>

      <div className="relative z-10 w-full max-w-md px-6 py-12 bg-[#071f33]/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/5">
        <div className="mb-10 text-center">
          <div className="inline-flex mb-4 p-4 bg-blue-500/10 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="text-gray-400 mt-2">
            Sign in to access your admin dashboard
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#052d43]/70 border border-gray-700/50 pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm text-gray-400">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#052d43]/70 border border-gray-700/50 pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 bg-[#052d43] border-gray-700 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="md"
              icon={
                loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
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
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                )
              }
              iconPosition="left"
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contact Administrator
            </Link>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/5 rounded-full"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/5 rounded-full"></div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob-animation 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes blob-animation {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
