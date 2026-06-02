"use client";

import Link from "next/link";
import { Icon } from "./icons";
import { useSessionUser } from "@/lib/use-session-user";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function SessionAccount({ mobile = false, onNavigate, tone = "default" }: { mobile?: boolean; onNavigate?: () => void; tone?: "default" | "hero" }) {
  const user = useSessionUser();

  if (!user) {
    return <Link className={`header-login ${mobile ? "mobile-account" : ""} ${tone === "hero" ? "on-hero" : ""}`} href="/auth/login" onClick={onNavigate}><Icon name="user" size={16} /> Log in</Link>;
  }

  return <Link className={`session-profile ${mobile ? "mobile-account" : ""} ${tone === "hero" ? "on-hero" : ""}`} href={user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/customer/profile"} onClick={onNavigate}>
    <span className="profile-avatar">{initials(user.name)}</span>
    <span className="profile-name">{user.name}</span>
  </Link>;
}
