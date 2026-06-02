"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/public-header";
import { saveSession } from "@/lib/session";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4100/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${apiUrl}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    if (!response.ok) return setError(result.message || "Registration failed.");
    saveSession(result.token, result.user.role);
    router.push("/dashboard/customer");
  }
  return <main className="auth-page"><section><Logo dark /><small>JOIN RASERVA</small><h1>Make time for<br /><em>good things.</em></h1><p>Create an account to reserve a table, pre-order dishes, and follow your booking status.</p></section><form onSubmit={submit}><small>CREATE ACCOUNT</small><h2>Register</h2>{[["name", "Full name"], ["email", "Email address"], ["phone", "Phone number"], ["password", "Password"]].map(([name, label]) => <label key={name}>{label}<input onChange={(event) => setForm({ ...form, [name]: event.target.value })} required type={name === "password" ? "password" : name === "email" ? "email" : "text"} value={form[name as keyof typeof form]} /></label>)}{error && <p className="form-error">{error}</p>}<button className="button">Create account</button><p>Already have an account? <Link href="/auth/login">Log in</Link></p></form></main>;
}
