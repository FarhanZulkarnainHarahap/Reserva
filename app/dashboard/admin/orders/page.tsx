import { AdminShell, AdminTable } from "@/components/admin-shell";
import { money } from "@/lib/data";

export default function AdminOrdersPage() {
  const orders = [["ORD-24012", "RSV-284916", "Alya Ramadhani", 240000, "PENDING"], ["ORD-24011", "RSV-189402", "Dimas Putra", 486000, "PREPARING"], ["ORD-24010", "RSV-330824", "Nadia Azzahra", 196000, "SERVED"]];
  return <AdminShell title="Food orders"><div className="admin-toolbar"><input placeholder="Search order" /><select><option>All statuses</option><option>Pending</option><option>Preparing</option><option>Served</option></select></div><AdminTable columns={["Order", "Reservation", "Customer", "Total", "Status", ""]} rows={orders.map(([order, reservation, customer, total, status]) => [order, reservation, customer, money(Number(total)), <span className={`status ${String(status).toLowerCase()}`} key={String(order)}>{status}</span>, <a key={String(order)}>Update</a>])} /></AdminShell>;
}
