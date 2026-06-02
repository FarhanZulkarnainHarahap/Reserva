"use client";

import { useMemo, useState } from "react";
import { FoodCard } from "@/components/food-card";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";
import { categories, foods } from "@/lib/data";

export default function MenuPage() {
  const [category, setCategory] = useState("All Menu");
  const [search, setSearch] = useState("");
  const shown = useMemo(() => foods.filter((food) => (category === "All Menu" || food.category === category) && food.name.toLowerCase().includes(search.toLowerCase())), [category, search]);

  return <><PublicHeader /><PageHero eyebrow="A TASTE OF RASERVA" title="Our menu." copy="A collection of thoughtful plates, warm flavors, and a little something sweet for the end." />
    <main className="page-shell">
      <div className="listing-tools"><div>{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label><Icon name="search" size={16} /><input onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" value={search} /></label></div>
      <div className="food-grid">{shown.map((food) => <FoodCard food={food} key={food.id} />)}</div>
    </main><PublicFooter /></>;
}
