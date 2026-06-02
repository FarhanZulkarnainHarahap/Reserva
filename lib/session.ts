export type UserRole = "ADMIN" | "CUSTOMER";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
};

export const sessionChangedEvent = "raserva-session-changed";

export function getSession() {
  const token = window.localStorage.getItem("raserva_token");
  const storedUser = window.localStorage.getItem("raserva_user");
  if (!token) return null;

  try {
    return { token, user: storedUser ? JSON.parse(storedUser) as SessionUser : null };
  } catch {
    window.localStorage.removeItem("raserva_user");
    return { token, user: null };
  }
}

export function saveSession(token: string, user: SessionUser) {
  window.localStorage.setItem("raserva_token", token);
  window.localStorage.setItem("raserva_user", JSON.stringify(user));
  document.cookie = `raserva_token=${encodeURIComponent(token)}; path=/; max-age=604800; samesite=lax`;
  document.cookie = `raserva_role=${user.role}; path=/; max-age=604800; samesite=lax`;
  window.dispatchEvent(new Event(sessionChangedEvent));
}

export function clearSession() {
  window.localStorage.removeItem("raserva_token");
  window.localStorage.removeItem("raserva_user");
  document.cookie = "raserva_token=; path=/; max-age=0; samesite=lax";
  document.cookie = "raserva_role=; path=/; max-age=0; samesite=lax";
  window.dispatchEvent(new Event(sessionChangedEvent));
}
