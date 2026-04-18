import { apiRequest } from "./apiClient";

export const AUTH_TOKEN_KEY = "sh_auth_token";
export const AUTH_USER_KEY = "sh_auth_user";

type LoginResponse = {
  token: string;
  user: {
    username: string;
    display_name: string;
  };
};

function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures (private mode/restricted browser policies).
  }
}

function safeRemoveItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage failures (private mode/restricted browser policies).
  }
}

export function isAuthenticated(): boolean {
  return Boolean(safeGetItem(AUTH_TOKEN_KEY));
}

export async function login(userName: string, password: string): Promise<void> {
  const payload = {
    username: userName.trim(),
    password,
  };
  const response = await apiRequest<LoginResponse>("/api/login", {
    method: "POST",
    body: payload,
  });

  safeSetItem(AUTH_TOKEN_KEY, response.token || "authenticated");
  safeSetItem(AUTH_USER_KEY, response.user?.display_name || payload.username || "User");
}

export function logout(): void {
  safeRemoveItem(AUTH_TOKEN_KEY);
  safeRemoveItem(AUTH_USER_KEY);
}

export function getCurrentUser(): string {
  return safeGetItem(AUTH_USER_KEY) || "User";
}
