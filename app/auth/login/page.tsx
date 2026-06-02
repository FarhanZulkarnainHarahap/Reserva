"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/public-header";
import { apiUrl } from "@/lib/api";
import { saveSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${apiUrl}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const result = await response.json();
    if (!response.ok) return setError(result.message || "Login failed.");
    saveSession(result.token, result.user);
    router.push(result.user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/customer");
  }
  return <main className="auth-page"><section><Logo dark /><small>WELCOME BACK</small><h1>Your table<br /><em>is waiting.</em></h1><p>Log in to manage reservations, payments, and your dining history.</p></section><form onSubmit={submit}><small>ACCOUNT LOGIN</small><h2>Log in</h2><label>Email address<input onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label><label>Password<input onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></label>{error && <p className="form-error">{error}</p>}<button className="button">Log in</button><p>New to Raserva? <Link href="/auth/register">Create an account</Link></p></form></main>;
}
