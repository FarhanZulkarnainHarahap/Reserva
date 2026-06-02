import Link from "next/link";
import { AdminShell, AdminTable } from "@/components/admin-shell";
import { bookings, money } from "@/lib/data";

export default function AdminPage() {
  const cards = [["12", "Reservations today"], ["05", "Pending bookings"], ["08", "Confirmed tables"], [money(4826000), "Order revenue"]];
  return <AdminShell title="Good afternoon, Admin."><div className="stat-grid">{cards.map(([value, label]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>Updated just now</span></article>)}</div><div className="admin-columns"><section className="admin-card"><header><div><small>UPCOMING</small><h2>Next reservations</h2></div><Link href="/dashboard/admin/reservations">View all</Link></header><AdminTable columns={["Guest", "Time", "Table", "Status"]} rows={bookings.map((item) => ["Alya Ramadhani", item.time, item.table, <span className={`status ${item.status.toLowerCase()}`} key={item.id}>{item.status}</span>])} /></section><section className="admin-card"><header><div><small>OCCUPANCY</small><h2>Dining areas</h2></div></header>{[["Indoor", "78%"], ["Outdoor", "62%"], ["VIP Room", "40%"], ["Non-Smoking", "84%"]].map(([label, value]) => <div className="occupancy" key={label}><span>{label}</span><i><b style={{ width: value }} /></i><strong>{value}</strong></div>)}</section></div></AdminShell>;
}
