import Image from "next/image";
import Link from "next/link";
import { AdminShell, AdminTable } from "@/components/admin-shell";
import { foods, money } from "@/lib/data";

export default function AdminMenuPage() {
  return <AdminShell title="Menu management"><div className="admin-toolbar"><input placeholder="Search menu" /><select><option>All categories</option><option>Special Menu</option><option>Dessert</option></select><Link className="button small" href="/dashboard/admin/menu/create">Add menu</Link></div><AdminTable columns={["Dish", "Category", "Price", "Availability", ""]} rows={foods.map((food) => [<span className="dish" key={food.id}><Image alt="" height={48} src={food.image} width={48} />{food.name}</span>, food.category, money(food.price), <span className="status confirmed" key={food.name}>AVAILABLE</span>, <Link href={`/dashboard/admin/menu/edit/${food.id}`} key={food.id}>Edit</Link>])} /></AdminShell>;
}
