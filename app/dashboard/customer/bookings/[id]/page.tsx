import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { PublicFooter, PublicHeader } from "@/components/public-header";
import { bookings, money } from "@/lib/data";

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = bookings.find((item) => item.id === Number(id));
  if (!booking) notFound();
  return <><PublicHeader /><main className="detail-shell booking-detail"><Link className="breadcrumb" href="/dashboard/customer/bookings">My bookings <span>/</span> {booking.code}</Link><section><small>RESERVATION DETAILS</small><div className="booking-detail-head"><h1>{booking.code}</h1><span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></div><div className="booking-detail-grid"><article><Icon name="calendar" /><small>DATE</small><b>{booking.date}</b></article><article><Icon name="clock" /><small>TIME</small><b>{booking.time}</b></article><article><Icon name="users" /><small>PARTY SIZE</small><b>{booking.guests} guests</b></article><article><Icon name="map" /><small>TABLE</small><b>{booking.table}, {booking.area}</b></article></div><div className="status-note"><h3>{booking.status === "PENDING" ? "Waiting for confirmation" : booking.status === "COMPLETED" ? "Thank you for dining with us" : "Reservation cancelled"}</h3><p>{booking.status === "PENDING" ? "Complete your deposit payment and our team will confirm your table shortly." : "Your booking history remains available here."}</p></div><footer><b>Total pre-order: {money(booking.total)}</b>{booking.status === "COMPLETED" && <Link className="button" href="/dashboard/customer/reviews">Write a review</Link>}</footer></section></main><PublicFooter /></>;
}
