import Link from "next/link";
import { CustomerShell } from "@/components/customer-shell";
import { Icon } from "@/components/icons";
import { bookings, money } from "@/lib/data";

export default function CustomerDashboardPage() {
  const nextBooking = bookings[0];
  return <CustomerShell eyebrow="CUSTOMER DASHBOARD" title="Welcome back, Alya." copy="Your upcoming table, recent visits, and favorite dining moments in one place."><div className="customer-dashboard"><section className="customer-welcome"><small>NEXT RESERVATION</small><h2>{nextBooking.date}</h2><p><Icon name="clock" size={15} /> {nextBooking.time}<Icon name="users" size={15} /> {nextBooking.guests} guests<Icon name="map" size={15} /> {nextBooking.area}</p><span className={`status ${nextBooking.status.toLowerCase()}`}>{nextBooking.status}</span><Link className="button small" href={`/dashboard/customer/bookings/${nextBooking.id}`}>View booking</Link></section><div className="customer-stats"><article><small>UPCOMING</small><strong>01</strong><span>reservation</span></article><article><small>COMPLETED</small><strong>04</strong><span>visits enjoyed</span></article><article><small>PRE-ORDERS</small><strong>{money(702000)}</strong><span>lifetime total</span></article></div></div><section className="dashboard-cta"><h2>Ready for another<br /><em>beautifully timed</em> meal?</h2><Link className="button" href="/dashboard/customer/reservation">Book another table <Icon name="arrow" size={15} /></Link></section></CustomerShell>;
}
