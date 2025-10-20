import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error?: string | null;
  isAuthenticated: boolean;
}

// Load initial state from localStorage
const getInitialState = (): Partial<AuthState> => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    };
  }

  const accessToken = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user");
  let user = null;

  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch {
      localStorage.removeItem("user");
    }
  }

  return {
    user,
    accessToken,
    loading: false,
    error: null,
    isAuthenticated: !!(accessToken && user),
  };
};

const initialState: AuthState = {
  ...getInitialState(),
} as AuthState;

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!(state.accessToken && action.payload);

      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("user");
        }
      }
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
      state.isAuthenticated = !!(action.payload && state.user);

      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("accessToken", action.payload);
        } else {
          localStorage.removeItem("accessToken");
        }
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, setAccessToken, setLoading, setError, clearAuth } =
  slice.actions;
export default slice.reducer;
