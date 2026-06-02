import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FoodCard } from "@/components/food-card";
import { Icon } from "@/components/icons";
import { PublicFooter, PublicHeader } from "@/components/public-header";
import { foods, money } from "@/lib/data";

export default async function MenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const food = foods.find((item) => item.id === Number(id));
  if (!food) notFound();
  const related = foods.filter((item) => item.id !== food.id && item.category === food.category).slice(0, 3);

  return <><PublicHeader /><main className="detail-shell">
    <Link className="breadcrumb" href="/dashboard/customer/menu">Menu <span>/</span> {food.category}</Link>
    <section className="menu-detail"><Image alt={food.name} height={760} priority src={food.image} width={900} /><div><small>{food.category}</small><h1>{food.name}</h1><span className="detail-rating"><Icon name="star" size={14} /> {food.rating} guest rating</span><p>{food.description} Each component is prepared with care and served at its best.</p><strong>{money(food.price)}</strong><Link className="button" href="/dashboard/customer/reservation">Add to booking <Icon name="arrow" size={16} /></Link></div></section>
    {related.length > 0 && <section className="related"><small>YOU MAY ALSO LIKE</small><h2>More to <em>discover.</em></h2><div className="food-grid">{related.map((item) => <FoodCard food={item} key={item.id} />)}</div></section>}
  </main><PublicFooter /></>;
}
