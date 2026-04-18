const API_BASE_URL =
  ((import.meta as any).env?.VITE_API_BASE_URL as string | undefined)?.trim() || "http://127.0.0.1:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const parsed = await response.json();
      if (typeof parsed?.detail === "string" && parsed.detail.trim()) {
        detail = parsed.detail;
      } else if (typeof parsed?.message === "string" && parsed.message.trim()) {
        detail = parsed.message;
      }
    } catch {
      const text = await response.text();
      if (text.trim()) {
        detail = text;
      }
    }
    throw new Error(detail);
  }

  return (await response.json()) as T;
}

