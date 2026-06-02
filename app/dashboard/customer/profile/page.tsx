import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";

export default function ProfilePage() {
  return <><PublicHeader /><PageHero eyebrow="YOUR ACCOUNT" title="Profile." copy="Keep your contact details up to date for an easy reservation experience." /><main className="page-shell profile-page"><div className="account-tabs"><Link href="/dashboard/customer">Overview</Link><Link href="/dashboard/customer/bookings">Reservations</Link><Link className="active" href="/dashboard/customer/profile">Profile</Link><Link href="/dashboard/customer/reviews">Reviews</Link></div><form><label>Full name<input defaultValue="Alya Ramadhani" /></label><label>Email address<input defaultValue="alya@example.com" type="email" /></label><label>Phone number<input defaultValue="081298765432" /></label><button className="button" type="button">Save changes</button></form></main><PublicFooter /></>;
}
