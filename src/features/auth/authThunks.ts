import {
  getCurrentUser,
  hasRefreshToken,
  login,
  logout,
  refreshToken,
} from "@/lib/auth/utils";
import { AppDispatch } from "@/lib/store";
import {
  clearAuth,
  setAccessToken,
  setError,
  setLoading,
  setUser,
} from "./authSlice";

// Login thunk
export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await login(email, password);

      dispatch(setUser(response.user));
      dispatch(setAccessToken(response.tokens.accessToken));
    } catch (error: any) {
      dispatch(setError(error.message || "Login failed"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

// Logout thunk
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await logout();
  } catch (error: any) {
    console.error("Logout error:", error);
  } finally {
    dispatch(clearAuth());
  }
};

// Refresh token thunk
export const refreshAccessToken =
  () => async (dispatch: AppDispatch, getState: any) => {
    const state = getState();

    // Don't refresh if we don't have a refresh token
    if (!hasRefreshToken()) {
      return;
    }

    try {
      const response = await refreshToken();
      dispatch(setAccessToken(response.accessToken));

      // Fetch updated user data
      await dispatch(fetchUser());
    } catch (error: any) {
      console.error("Token refresh failed:", error);
      dispatch(clearAuth());
    }
  };

// Fetch user thunk
export const fetchUser = () => async (dispatch: AppDispatch, getState: any) => {
  const state = getState();

  // Don't fetch if we don't have an access token
  if (!state.auth.accessToken) {
    return;
  }

  try {
    const response = await getCurrentUser();
    dispatch(setUser(response.user));
  } catch (error: any) {
    console.error("Failed to fetch user:", error);
    dispatch(clearAuth());
  }
};

// Initialize auth state thunk
export const initializeAuth =
  () => async (dispatch: AppDispatch, getState: any) => {
    const state = getState();

    // If we have an access token but no user, fetch user data
    if (state.auth.accessToken && !state.auth.user) {
      await dispatch(fetchUser());
    }

    // If we have a refresh token but no access token, try to refresh
    if (!state.auth.accessToken && hasRefreshToken()) {
      try {
        await dispatch(refreshAccessToken());
      } catch (error) {
        // Refresh failed, clear auth state
        dispatch(clearAuth());
      }
    }
  };
