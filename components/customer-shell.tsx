import Link from "next/link";
import { PublicFooter, PublicHeader } from "./public-header";
import { LogoutButton } from "./logout-button";

const tabs = [["/dashboard/customer", "Overview"], ["/dashboard/customer/bookings", "Reservations"], ["/dashboard/customer/profile", "Profile"], ["/dashboard/customer/reviews", "Reviews"]];

export function CustomerShell({ children, eyebrow, title, copy }: { children: React.ReactNode; eyebrow: string; title: string; copy: string }) {
  return <><PublicHeader /><section className="page-hero"><small>{eyebrow}</small><h1>{title}</h1><p>{copy}</p></section><main className="page-shell"><div className="account-tabs">{tabs.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}<LogoutButton className="account-logout" /></div>{children}</main><PublicFooter /></>;
}
