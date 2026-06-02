import { AdminShell } from "@/components/admin-shell";

export default function AdminCreateMenuPage() {
  return <AdminShell title="Add a new dish"><MenuForm /></AdminShell>;
}

export function MenuForm() {
  return <form className="admin-form"><label>Dish name<input placeholder="e.g. Pan-seared Barramundi" /></label><label>Category<select><option>Appetizer</option><option>Main Course</option><option>Dessert</option><option>Drinks</option><option>Special Menu</option></select></label><label>Price<input placeholder="128000" type="number" /></label><label>Image<input type="file" /></label><label className="full">Description<textarea placeholder="Describe this dish..." /></label><button className="button" type="button">Save menu</button></form>;
}
