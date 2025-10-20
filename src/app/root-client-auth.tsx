"use client";

import { initializeAuth } from "@/features/auth/authThunks";
import { useAppDispatch } from "@/lib/store";
import { useEffect } from "react";

export default function RootClientAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize authentication state on app load
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
}
