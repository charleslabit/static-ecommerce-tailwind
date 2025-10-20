// Simple authentication utilities
import jwt from "jsonwebtoken";

// Mock users for demo
export const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123", // In real app, this would be hashed
    name: "Demo User",
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
];

// Simple JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "demo-secret-key";

// Generate JWT token
export function generateToken(user: any): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Simple login function
export function loginUser(email: string, password: string): any | null {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  return user ? { ...user, password: undefined } : null;
}

// Simple cookie helpers
export function setCookie(name: string, value: string): string {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`;
}

export function clearCookie(name: string): string {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

// Get token from cookies
export function getTokenFromCookies(cookieHeader?: string): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";");
  const tokenCookie = cookies.find((c) => c.trim().startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}
