"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/session";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  function logout() {
    clearSession();
    router.push("/auth/login");
    router.refresh();
  }
  return <button className={className} onClick={logout}>Log out</button>;
}
