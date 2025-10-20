"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { loginUser } from "@/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: any) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.user) router.push("/");
  }, [auth.user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(loginUser(email, password));
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sign In
        </h1>

        {/* Mock Users Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Demo Users:
          </h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div>📧 demo@example.com | 🔑 password123</div>
            <div>📧 admin@example.com | 🔑 admin123</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="demo@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password123"
              required
            />
          </div>

          {auth.error && (
            <div className="text-red-600 text-sm text-center">{auth.error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white text-sm font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? <LoadingSpinner size="sm" text="" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-500 text-sm hover:text-blue-600 transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
