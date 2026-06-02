import Image from "next/image";
import Link from "next/link";
import type { Food } from "@/lib/data";
import { money } from "@/lib/data";
import { Icon } from "./icons";

export function FoodCard({ food }: { food: Food }) {
  return <article className="food-card">
    <div><Image alt={food.name} height={440} src={food.image} width={800} /><button aria-label={`Favorite ${food.name}`}><Icon name="heart" size={16} /></button>{food.tag && <small>{food.tag}</small>}</div>
    <section><header><h3>{food.name}</h3><b><Icon name="star" size={12} /> {food.rating}</b></header><p>{food.description}</p><footer><strong>{money(food.price)}</strong><Link href={`/dashboard/customer/menu/${food.id}`}>Details <Icon name="arrow" size={14} /></Link></footer></section>
  </article>;
}
