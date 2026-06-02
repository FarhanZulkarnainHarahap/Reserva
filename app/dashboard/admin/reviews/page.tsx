import { AdminShell, AdminTable } from "@/components/admin-shell";

export default function AdminReviewsPage() {
  const reviews = [["Alya Ramadhani", "RSV-119204", "5 / 5", "Every plate felt considered. We loved the atmosphere."], ["Dimas Putra", "RSV-088214", "5 / 5", "Warm service and a beautiful dinner."], ["Nadia Azzahra", "RSV-092411", "4 / 5", "Would gladly come back for the tiramisu."]];
  return <AdminShell title="Guest reviews"><div className="admin-toolbar"><select><option>All ratings</option><option>5 stars</option><option>4 stars</option></select></div><AdminTable columns={["Customer", "Booking", "Rating", "Comment", ""]} rows={reviews.map(([customer, booking, rating, comment]) => [customer, booking, rating, comment, <button className="table-delete" key={String(booking)}>Delete</button>])} /></AdminShell>;
}
