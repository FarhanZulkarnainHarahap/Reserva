"use client";

import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft, LuCalendarCheck, LuLogIn, LuMenu, LuX } from "react-icons/lu";
import { LogoutButton } from "./logout-button";

type MenuVariant = "public" | "home" | "admin";

const publicLinks = [["/", "Home"], ["/dashboard/customer/menu", "Menu"], ["/about", "About"], ["/contact", "Contact"]];
const homeLinks = [["/", "Home"], ["/about", "About"], ["/dashboard/customer/menu", "Menu"], ["#experience", "Experience"], ["/contact", "Contact"]];
const adminLinks = [["/dashboard/admin", "Overview"], ["/dashboard/admin/reservations", "Reservations"], ["/dashboard/admin/menu", "Menu"], ["/dashboard/admin/tables", "Tables"], ["/dashboard/admin/orders", "Orders"], ["/dashboard/admin/reviews", "Reviews"], ["/dashboard/admin/settings/schedule", "Schedule"]];

export function MobileMenu({ variant = "public" }: { variant?: MenuVariant }) {
  const [open, setOpen] = useState(false);
  const links = variant === "admin" ? adminLinks : variant === "home" ? homeLinks : publicLinks;

  return <>
    <button aria-controls={`${variant}-mobile-menu`} aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"} className={`mobile-menu-toggle ${variant === "home" ? "on-hero" : ""} ${variant === "admin" ? "admin-mobile-toggle" : ""}`} onClick={() => setOpen(!open)} type="button">
      {open ? <LuX /> : <LuMenu />}
    </button>
    <button aria-label="Close navigation menu" className={`mobile-menu-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} type="button" />
    <aside aria-hidden={!open} className={`mobile-menu-panel ${open ? "open" : ""}`} id={`${variant}-mobile-menu`}>
      <header><Link href="/" onClick={() => setOpen(false)}><i>R</i>aserva<span>.</span></Link><button aria-label="Close navigation menu" onClick={() => setOpen(false)} type="button"><LuX /></button></header>
      <small>{variant === "admin" ? "RESTAURANT CONSOLE" : "RASERVA DINING"}</small>
      <nav>{links.map(([href, label]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
      {variant === "admin" ? <footer><Link href="/" onClick={() => setOpen(false)}><LuArrowLeft /> Back to website</Link><LogoutButton className="mobile-logout" /></footer> : <footer><Link href="/auth/login" onClick={() => setOpen(false)}><LuLogIn /> Log in</Link><Link className="button" href="/dashboard/customer/reservation" onClick={() => setOpen(false)}><LuCalendarCheck /> Book a table</Link></footer>}
    </aside>
  </>;
}
