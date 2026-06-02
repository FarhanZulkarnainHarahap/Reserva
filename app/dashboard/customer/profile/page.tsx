"use client";

import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";
import { useSessionUser } from "@/lib/use-session-user";

export default function ProfilePage() {
  const user = useSessionUser();

  return <><PublicHeader /><PageHero eyebrow="YOUR ACCOUNT" title="Profile." copy="Keep your contact details up to date for an easy reservation experience." /><main className="page-shell profile-page"><div className="account-tabs"><Link href="/dashboard/customer">Overview</Link><Link href="/dashboard/customer/bookings">Reservations</Link><Link className="active" href="/dashboard/customer/profile">Profile</Link><Link href="/dashboard/customer/reviews">Reviews</Link></div><form key={user?.id || "loading"}><label>Full name<input defaultValue={user?.name || ""} /></label><label>Email address<input defaultValue={user?.email || ""} type="email" /></label><label>Phone number<input defaultValue={user?.phone || ""} /></label><button className="button" type="button">Save changes</button></form></main><PublicFooter /></>;
}
