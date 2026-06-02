import Link from "next/link";
import { AdminShell, AdminTable } from "@/components/admin-shell";
import { bookings } from "@/lib/data";

export default function AdminReservationsPage() {
  return <AdminShell title="Reservations"><div className="admin-toolbar"><input placeholder="Search customer or booking code" /><select><option>All statuses</option><option>Pending</option><option>Confirmed</option><option>Cancelled</option></select><input type="date" /></div><AdminTable columns={["Booking", "Guest", "Schedule", "Guests", "Area", "Status", ""]} rows={bookings.map((item) => [item.code, "Alya Ramadhani", `${item.date}, ${item.time}`, `${item.guests} people`, item.area, <span className={`status ${item.status.toLowerCase()}`} key={item.id}>{item.status}</span>, <Link key={item.code} href={`/dashboard/admin/reservations/${item.id}`}>Details</Link>])} /></AdminShell>;
}
