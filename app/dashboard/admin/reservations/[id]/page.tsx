import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { bookings, money } from "@/lib/data";

export default async function AdminReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = bookings.find((item) => item.id === Number(id));
  if (!booking) notFound();
  return <AdminShell eyebrow="RESERVATION DETAIL" title={booking.code}><Link className="breadcrumb" href="/dashboard/admin/reservations">Reservations <span>/</span> {booking.code}</Link><div className="admin-detail-grid"><section className="admin-card"><small>CUSTOMER</small><h2>Alya Ramadhani</h2><p>alya@example.com</p><p>081298765432</p><hr /><small>VISIT</small><p><b>{booking.date}, {booking.time}</b></p><p>{booking.guests} guests, table {booking.table}</p><p>{booking.area} area</p></section><section className="admin-card"><small>PRE-ORDER</small><h2>Order summary</h2><p>2x Peach Bellini <b>{money(112000)}</b></p><p>1x Truffle Mushroom Pasta <b>{money(128000)}</b></p><hr /><p>Total <b>{money(240000)}</b></p></section></div><div className="admin-actions"><button>Cancel booking</button><button className="button">Confirm booking</button></div></AdminShell>;
}
