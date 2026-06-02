import { AdminShell } from "@/components/admin-shell";
import { MenuForm } from "../../create/page";

export default async function AdminEditMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminShell title={`Edit menu #${id}`}><MenuForm /></AdminShell>;
}
