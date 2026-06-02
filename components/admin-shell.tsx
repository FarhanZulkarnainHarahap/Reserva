import Link from "next/link";
import { Logo } from "./public-header";
import { LogoutButton } from "./logout-button";
import { MobileMenu } from "./mobile-menu";

const nav = [["/dashboard/admin", "Overview"], ["/dashboard/admin/reservations", "Reservations"], ["/dashboard/admin/menu", "Menu"], ["/dashboard/admin/tables", "Tables"], ["/dashboard/admin/orders", "Orders"], ["/dashboard/admin/reviews", "Reviews"], ["/dashboard/admin/settings/schedule", "Schedule"]];

export function AdminShell({ children, title, eyebrow = "RASERVA ADMIN" }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  return <main className="admin-shell"><aside><Logo /><small>RESTAURANT CONSOLE</small><nav>{nav.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</nav><Link className="admin-back" href="/">Back to website</Link><LogoutButton className="admin-logout" /></aside><section><header><div><small>{eyebrow}</small><h1>{title}</h1></div><div className="admin-profile"><MobileMenu variant="admin" /><span>AR</span></div></header>{children}</section></main>;
}

export function AdminTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return <div className="admin-table"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
