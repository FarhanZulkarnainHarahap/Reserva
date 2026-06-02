import Link from "next/link";
import { Icon } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { SessionAccount } from "./session-account";

export function Logo({ dark = false }: { dark?: boolean }) {
  return <Link className={`logo ${dark ? "dark" : ""}`} href="/"><i>R</i>aserva<span>.</span></Link>;
}

export function PublicHeader() {
  return <header className="inner-nav">
    <Logo dark />
    <nav><Link href="/">Home</Link><Link href="/dashboard/customer/menu">Menu</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
    <div><SessionAccount /><Link className="button small" href="/dashboard/customer/reservation">Book a table</Link></div>
    <MobileMenu />
  </header>;
}

export function PublicFooter() {
  return <footer className="site-footer">
    <div><Logo dark /><p>Good food, beautifully timed.<br />A table worth coming back to.</p></div>
    <div><h4>VISIT US</h4><p><Icon name="map" size={15} /> Jl. Senopati No. 42, Jakarta</p><p><Icon name="phone" size={15} /> +62 21 527 2048</p></div>
    <div><h4>EXPLORE</h4><p><Link href="/about">Our story</Link></p><p><Link href="/contact">Contact us</Link></p></div>
    <small>Copyright 2026 Raserva Dining. All rights reserved.</small>
  </footer>;
}
