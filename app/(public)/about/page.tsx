import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";

export default function AboutPage() {
  return <><PublicHeader /><PageHero eyebrow="OUR STORY" title="A place to slow down." copy="Raserva began with one simple idea: the best meals make room for people to be fully present." />
    <main className="page-shell about-page"><section><Image alt="Warm Raserva interior" height={700} src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=90" width={1000} /><div><small>DINING, THOUGHTFULLY RESERVED</small><h2>Made for moments<br /><em>worth keeping.</em></h2><p>From seasonal ingredients to the final pour, every detail at Raserva is considered. We created a warm corner in the city where a Tuesday dinner can feel like an occasion.</p><p>Our kitchen works closely with local producers, while our dining team keeps the evening easy, generous, and unhurried.</p><Link className="button" href="/dashboard/customer/reservation">Plan your visit <Icon name="arrow" size={16} /></Link></div></section><div className="values">{[["01", "Seasonal plates", "Menus that follow the season and celebrate honest ingredients."], ["02", "Warm service", "Attentive when you need us, with room to enjoy your own pace."], ["03", "Easy moments", "Simple reservations, thoughtful details, and a table ready for you."]].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></main><PublicFooter /></>;
}
