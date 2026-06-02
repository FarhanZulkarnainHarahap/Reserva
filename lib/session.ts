export type UserRole = "ADMIN" | "CUSTOMER";

export function saveSession(token: string, role: UserRole) {
  window.localStorage.setItem("raserva_token", token);
  document.cookie = `raserva_token=${encodeURIComponent(token)}; path=/; max-age=604800; samesite=lax`;
  document.cookie = `raserva_role=${role}; path=/; max-age=604800; samesite=lax`;
}

export function clearSession() {
  window.localStorage.removeItem("raserva_token");
  document.cookie = "raserva_token=; path=/; max-age=0; samesite=lax";
  document.cookie = "raserva_role=; path=/; max-age=0; samesite=lax";
}
