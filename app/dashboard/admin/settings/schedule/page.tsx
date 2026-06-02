import { AdminShell, AdminTable } from "@/components/admin-shell";

export default function AdminSchedulePage() {
  const slots = [["10:00", 6, "ACTIVE"], ["11:30", 6, "ACTIVE"], ["13:00", 6, "ACTIVE"], ["16:30", 6, "ACTIVE"], ["18:00", 6, "ACTIVE"], ["19:30", 5, "ACTIVE"], ["21:00", 6, "ACTIVE"]];
  return <AdminShell title="Reservation schedule"><div className="admin-toolbar"><button className="button small">Add time slot</button></div><AdminTable columns={["Time", "Maximum bookings", "Status", ""]} rows={slots.map(([time, max, status]) => [time, `${max} tables`, <span className="status confirmed" key={String(time)}>{status}</span>, <a key={String(time)}>Edit</a>])} /></AdminShell>;
}
