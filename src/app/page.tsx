"use client";

import { logoutUser } from "@/features/auth/authThunks";
import { openCart } from "@/features/cart/cartSlice";
import type { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Link from "next/link";
import { useSelector } from "react-redux";

// Mock data for features
const features = [
  {
    title: "Secure Shopping",
    description: "JWT-based authentication with refresh tokens",
    icon: "🛒",
  },
  {
    title: "Smart Cart Management",
    description: "Centralized state management with Redux Toolkit",
    icon: "🛍️",
  },
  {
    title: "TypeScript Support",
    description: "Full type safety throughout the application",
    icon: "⚡",
  },
  {
    title: "Modern E-commerce",
    description: "Latest Next.js features with App Router",
    icon: "🏪",
  },
];

const stats = [
  { label: "Happy Customers", value: "1,234" },
  { label: "Products Sold", value: "5,678" },
  { label: "Order Success Rate", value: "99.9%" },
  { label: "Shop Uptime", value: "24/7" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  console.log("HomePage user:", user);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800"></Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/shop"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Categories
            </Link>
            <button
              onClick={() => dispatch(openCart())}
              className="relative p-2 text-gray-700 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-gray-700 text-sm">
                    Welcome, <strong>{user.name}</strong>
                  </span>
                </div>
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white text-sm hover:bg-red-600 transition-all duration-200 shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Dummy Shop
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your premier destination for modern fashion and lifestyle.
            Experience seamless shopping with secure authentication, smart cart
            management, and beautiful user interfaces built with Next.js 15 and
            TypeScript.
          </p>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome back, {user.name}! 👋
              </h2>
              <p className="text-gray-600 mb-6">
                You're successfully authenticated. Explore the dashboard to see
                more features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Go to Dashboard
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                  Go to Shop
                </Link>
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="inline-flex items-center justify-center rounded-lg bg-gray-500 px-8 py-3 text-white font-medium hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Get Started - Sign In
            </Link>
            <p className="text-sm text-gray-500">
              Use demo credentials: demo@example.com / password123
            </p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Dummy Shop
          </h2>
          <p className="text-lg text-gray-600">
            Experience the future of online shopping with cutting-edge
            technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop Statistics
            </h2>
            <p className="text-lg text-gray-600">
              Real-time metrics and shopping performance data
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2025 Dummy Shop. Built with Next.js 15, Redux Toolkit, and
              TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
