import { AdminShell, AdminTable } from "@/components/admin-shell";

export default function AdminTablesPage() {
  const tables = [["A01", 2, "Indoor", "AVAILABLE"], ["A02", 4, "Indoor", "RESERVED"], ["A03", 4, "Non-Smoking", "AVAILABLE"], ["B01", 4, "Outdoor", "AVAILABLE"], ["B02", 6, "Outdoor", "MAINTENANCE"], ["V01", 8, "VIP Room", "AVAILABLE"]];
  return <AdminShell title="Table management"><div className="admin-toolbar"><input placeholder="Search table number" /><select><option>All areas</option><option>Indoor</option><option>Outdoor</option><option>VIP Room</option></select><button className="button small">Add table</button></div><AdminTable columns={["Table", "Capacity", "Area", "Status", ""]} rows={tables.map(([table, capacity, area, status]) => [table, `${capacity} guests`, area, <span className={`status ${String(status).toLowerCase()}`} key={table}>{status}</span>, <a key={String(table)}>Edit</a>])} /></AdminShell>;
}
