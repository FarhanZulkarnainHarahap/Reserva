import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";
import { bookings, money } from "@/lib/data";

export default function BookingsPage() {
  return <><PublicHeader /><PageHero eyebrow="YOUR RESERVATIONS" title="My bookings." copy="Follow upcoming visits, check payment status, and revisit your favorite evenings." /><main className="page-shell booking-list"><div className="account-tabs"><Link href="/dashboard/customer">Overview</Link><Link className="active" href="/dashboard/customer/bookings">Reservations</Link><Link href="/dashboard/customer/profile">Profile</Link><Link href="/dashboard/customer/reviews">Reviews</Link></div>{bookings.map((booking) => <article key={booking.id}><div><small>{booking.code}</small><h3>{booking.date}</h3><p><Icon name="clock" size={15} /> {booking.time}<Icon name="users" size={15} /> {booking.guests} guests<Icon name="map" size={15} /> {booking.area}</p></div><div><span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span><b>{money(booking.total)}</b><Link href={`/dashboard/customer/bookings/${booking.id}`}>View details <Icon name="arrow" size={14} /></Link></div></article>)}</main><PublicFooter /></>;
}
