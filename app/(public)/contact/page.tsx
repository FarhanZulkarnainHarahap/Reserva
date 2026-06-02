import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";

export default function ContactPage() {
  return <><PublicHeader /><PageHero eyebrow="COME SAY HELLO" title="Visit Raserva." copy="Questions, special occasions, or a table for a larger gathering? Our team would love to hear from you." />
    <main className="page-shell contact-grid"><section><small>FIND US</small><h2>In the heart of<br /><em>Senopati.</em></h2><p><Icon name="map" size={17} /> Jl. Senopati No. 42, Kebayoran Baru<br />Jakarta Selatan, 12190</p><p><Icon name="phone" size={17} /> +62 21 527 2048</p><div className="contact-hours"><b>Tuesday - Sunday</b><span>10:00 - 22:00</span><b>Monday</b><span>Closed</span></div></section><form className="contact-form"><small>SEND A NOTE</small><h3>How can we help?</h3><div><input placeholder="Your name" /><input placeholder="Email address" type="email" /></div><input placeholder="Subject" /><textarea placeholder="Tell us a little more..." /><button className="button" type="button">Send message <Icon name="arrow" size={16} /></button></form></main><PublicFooter /></>;
}
