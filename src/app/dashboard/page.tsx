"use client";

import { logoutUser } from "@/features/auth/authThunks";
import type { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/store";
import Link from "next/link";
import { useSelector } from "react-redux";

// Mock data for dashboard
const recentActivities = [
  {
    id: 1,
    action: "User logged in",
    user: "demo@example.com",
    timestamp: "2 minutes ago",
    type: "login",
  },
  {
    id: 2,
    action: "Profile updated",
    user: "admin@example.com",
    timestamp: "15 minutes ago",
    type: "update",
  },
  {
    id: 3,
    action: "Password changed",
    user: "demo@example.com",
    timestamp: "1 hour ago",
    type: "security",
  },
  {
    id: 4,
    action: "Session refreshed",
    user: "demo@example.com",
    timestamp: "2 hours ago",
    type: "refresh",
  },
];

const quickStats = [
  {
    title: "Total Sessions",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: "📊",
  },
  {
    title: "Active Users",
    value: "89",
    change: "+5%",
    changeType: "positive",
    icon: "👥",
  },
  {
    title: "Success Rate",
    value: "99.9%",
    change: "+0.1%",
    changeType: "positive",
    icon: "✅",
  },
  {
    title: "Error Rate",
    value: "0.1%",
    change: "-0.2%",
    changeType: "positive",
    icon: "⚠️",
  },
];

const systemInfo = [
  { label: "Server Status", value: "Online", status: "success" },
  { label: "Database", value: "Connected", status: "success" },
  { label: "Cache", value: "Active", status: "success" },
  { label: "API Response", value: "45ms", status: "success" },
];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              StyleHub
            </Link>
            <span className="text-sm text-gray-500">/ Dashboard</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-800">{user?.name}</div>
                <div className="text-gray-500">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={() => dispatch(logoutUser())}
              className="rounded-lg bg-red-500 px-4 py-2 text-white text-sm hover:bg-red-600 transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your authentication system today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  from last week
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "login"
                          ? "bg-green-500"
                          : activity.type === "update"
                          ? "bg-blue-500"
                          : activity.type === "security"
                          ? "bg-yellow-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                System Status
              </h2>
              <div className="space-y-4">
                {systemInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {info.label}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          info.status === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-900">
                        {info.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block w-full rounded-lg bg-blue-500 px-4 py-2 text-white text-center text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Go to Homepage
                </Link>
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="block w-full rounded-lg bg-gray-500 px-4 py-2 text-white text-center text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </label>
                <div className="text-gray-900">{user?.name || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <div className="text-gray-900">{user?.email || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  User Role
                </label>
                <div className="text-gray-900">
                  {user?.role ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  ) : (
                    "Standard User"
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Account Status
                </label>
                <div className="text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
