"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "./api";
import { clearSession, getSession, saveSession, sessionChangedEvent, type SessionUser } from "./session";

export function useSessionUser() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let active = true;

    async function syncSession() {
      const session = getSession();
      if (!session) return setUser(null);
      if (session.user) return setUser(session.user);

      try {
        const response = await fetch(`${apiUrl}/auth/me`, { headers: { Authorization: `Bearer ${session.token}` } });
        if (response.status === 401) return clearSession();
        if (!response.ok) return setUser(null);
        const profile = await response.json() as SessionUser;
        if (!active) return;
        saveSession(session.token, profile);
        setUser(profile);
      } catch {
        if (active) setUser(null);
      }
    }

    void syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener(sessionChangedEvent, syncSession);
    return () => {
      active = false;
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(sessionChangedEvent, syncSession);
    };
  }, []);

  return user;
}
