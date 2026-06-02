"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveSession } from "@/lib/session";
import { MobileMenu } from "@/components/mobile-menu";

type Food = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  tag?: string;
};

const foods: Food[] = [
  { id: 1, name: "Truffle Mushroom Pasta", category: "Main Course", description: "Wild mushroom, truffle oil, aged parmesan", price: 128000, rating: 4.9, tag: "Bestseller", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Charred Salmon", category: "Special Menu", description: "Pomme puree, asparagus, lemon butter sauce", price: 186000, rating: 4.8, tag: "Chef's pick", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Burrata Garden", category: "Appetizer", description: "Heirloom tomato, basil pesto, sourdough crisp", price: 96000, rating: 4.7, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Ember Ribeye", category: "Special Menu", description: "Roasted garlic jus, seasonal vegetables", price: 268000, rating: 4.9, tag: "Signature", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Tiramisu Classico", category: "Dessert", description: "Espresso, mascarpone cream, cocoa dust", price: 68000, rating: 4.8, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Peach Bellini", category: "Drinks", description: "White peach, sparkling soda, fresh mint", price: 56000, rating: 4.6, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85" }
];

const categories = ["All Menu", "Appetizer", "Main Course", "Special Menu", "Dessert", "Drinks"];
const dates = [["Wed", "10"], ["Thu", "11"], ["Fri", "12"], ["Sat", "13"]];
const slots = [["10:00", "6"], ["11:30", "4"], ["13:00", "2"], ["16:30", "7"], ["18:00", "5"], ["19:30", "3"], ["21:00", "6"]];
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4100/api";
const areaValues: Record<string, string> = { Indoor: "INDOOR", Outdoor: "OUTDOOR", "VIP Room": "VIP_ROOM", "Non-Smoking": "NON_SMOKING" };

function money(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h13" /><path d="m14 6 6 6-6 6" /></>,
    calendar: <><path d="M8 2v4M16 2v4M3 10h18" /><rect width="18" height="19" x="3" y="4" rx="2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="M18 6 6 18M6 6l12 12" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    minus: <path d="M5 12h14" />,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.2 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.5 1.9Z" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    sparkle: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8Z" />,
    star: <path d="m12 2.7 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-2.9L6.4 20l1.1-6.3-4.6-4.4 6.3-.9Z" />,
    bag: <><path d="M6 7h12l1 14H5L6 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    check: <path d="m5 12 4 4L19 6" />
  };
  return <svg aria-hidden="true" fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24" width={size}>{paths[name]}</svg>;
}

function Logo({ dark = false }: { dark?: boolean }) {
  return <Link className={`logo ${dark ? "dark" : ""}`} href="/"><i>R</i>aserva<span>.</span></Link>;
}

function Reservation({ open, close }: { open: boolean; close: () => void }) {
  const [step, setStep] = useState(1);
  const [guest, setGuest] = useState(2);
  const [date, setDate] = useState("12");
  const [time, setTime] = useState("19:30");
  const [area, setArea] = useState("Indoor");
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 6: 2 });
  const [success, setSuccess] = useState(false);
  const [authNeeded, setAuthNeeded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [customerName, setCustomerName] = useState("Guest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cartItems = foods.filter((food) => cart[food.id]).map((food) => ({ ...food, qty: cart[food.id] }));
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  function reset() {
    close();
    window.setTimeout(() => { setStep(1); setSuccess(false); setAuthNeeded(false); setError(""); }, 250);
  }
  function plus(id: number) { setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 })); }
  function minus(id: number) {
    setCart((current) => {
      const next = { ...current };
      if (next[id] === 1) delete next[id]; else next[id] -= 1;
      return next;
    });
  }
  async function submitReservation(token: string) {
    setLoading(true);
    setError("");
    try {
      const reservationDate = `2026-06-${date}`;
      const availability = await fetch(`${apiUrl}/tables/availability?date=${reservationDate}&time=${time}&guests=${guest}&area=${areaValues[area]}`).then((response) => response.json());
      if (!availability.tables?.length) throw new Error("No table is available for this selection. Please choose another time.");

      const reservationResponse = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          tableId: availability.tables[0].id,
          reservationDate,
          reservationTime: time,
          guestCount: guest,
          note,
          items: cartItems.map((item) => ({ menuId: item.id, quantity: item.qty }))
        })
      });
      const reservation = await reservationResponse.json();
      if (!reservationResponse.ok) throw new Error(reservation.message || "Reservation could not be created.");

      const paymentResponse = await fetch(`${apiUrl}/payments/reservations/${reservation.id}/checkout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const payment = await paymentResponse.json();
      if (!paymentResponse.ok) throw new Error(payment.message || "Payment checkout could not be created.");

      setBookingCode(reservation.reservationCode);
      setCheckoutUrl(payment.redirectUrl);
      setPaymentAmount(payment.grossAmount);
      setSuccess(true);
      setAuthNeeded(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  async function confirmReservation() {
    const token = window.localStorage.getItem("raserva_token");
    if (!token) {
      setAuthNeeded(true);
      setError("Log in to create your reservation and continue to payment.");
      return;
    }
    await submitReservation(token);
  }
  async function loginAndConfirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed.");
      saveSession(result.token, result.user.role);
      setCustomerName(result.user.name);
      await submitReservation(result.token);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed.");
      setLoading(false);
    }
  }
  if (!open) return null;

  return <div className="overlay" onMouseDown={reset}>
    <aside className="booking-panel" onMouseDown={(event) => event.stopPropagation()}>
      <div className="booking-head">
        <div><small>TABLE RESERVATION</small><h2>{success ? "One last step." : "Plan your visit"}</h2></div>
        <button className="square" onClick={reset}><Icon name="close" /></button>
      </div>
      {!success && <div className="progress"><b className="done">{step > 1 ? <Icon name="check" size={13} /> : "1"}</b><i /><b className={step > 1 ? "done" : ""}>{step > 2 ? <Icon name="check" size={13} /> : "2"}</b><i /><b className={step > 2 ? "done" : ""}>3</b><span>{step === 1 ? "Choose a time" : step === 2 ? "Pre-order dishes" : "Review details"}</span></div>}

      {success ? <div className="booking-success">
        <div className="success-check"><Icon name="check" size={27} /></div>
        <small>RESERVATION CREATED</small>
        <h3>Your table is almost<br />secured, {customerName}.</h3>
        <p>Complete the reservation deposit through Midtrans. Your booking will be confirmed automatically after payment.</p>
        <div className="code"><small>BOOKING CODE</small><strong>{bookingCode}</strong></div>
        <div className="success-meta"><Icon name="calendar" size={16} /> Fri, {date} Jun 2026 <Icon name="clock" size={16} /> {time}</div>
        <a className="button full" href={checkoutUrl} rel="noreferrer" target="_blank">Pay {money(paymentAmount)} securely <Icon name="arrow" size={16} /></a>
        <button className="back home-back" onClick={reset}>Pay later and return home</button>
      </div> : step === 1 ? <div className="booking-body">
        <label><Icon name="users" size={17} /> Number of guests</label>
        <div className="guests"><button onClick={() => setGuest(Math.max(1, guest - 1))}><Icon name="minus" size={15} /></button><strong>{guest}<span> Guests</span></strong><button onClick={() => setGuest(guest + 1)}><Icon name="plus" size={15} /></button></div>
        <label><Icon name="calendar" size={17} /> Select date</label>
        <div className="date-grid">{dates.map(([day, number]) => <button className={date === number ? "selected" : ""} key={number} onClick={() => setDate(number)}><small>{day}</small><strong>{number}</strong><span>Jun</span></button>)}</div>
        <label><Icon name="clock" size={17} /> Available time</label>
        <div className="time-grid">{slots.map(([slot, count]) => <button className={time === slot ? "selected" : ""} key={slot} onClick={() => setTime(slot)}><strong>{slot}</strong><small>{count} tables left</small></button>)}</div>
        <label><Icon name="map" size={17} /> Preferred area</label>
        <div className="areas">{["Indoor", "Outdoor", "VIP Room", "Non-Smoking"].map((item) => <button className={area === item ? "selected" : ""} key={item} onClick={() => setArea(item)}>{item}</button>)}</div>
        <div className="available"><b><Icon name="sparkle" size={15} /> Great choice</b><p><strong>3 tables</strong> available for {guest} guests at {time}.</p></div>
      </div> : step === 2 ? <div className="booking-body">
        <div className="preorder-intro"><p>Add a little something to your table before you arrive.</p><b><Icon name="bag" size={15} /> {cartItems.length} items</b></div>
        <div className="preorder-list">{foods.slice(0, 5).map((food) => <div className="preorder" key={food.id}>
          <Image alt="" height={106} src={food.image} width={118} /><div><h4>{food.name}</h4><small>{money(food.price)}</small></div>
          {cart[food.id] ? <aside><button onClick={() => minus(food.id)}><Icon name="minus" size={12} /></button><b>{cart[food.id]}</b><button onClick={() => plus(food.id)}><Icon name="plus" size={12} /></button></aside> : <button className="mini-add" onClick={() => plus(food.id)}><Icon name="plus" size={14} /></button>}
        </div>)}</div>
        <button className="skip" onClick={() => setStep(3)}>Skip pre-order</button>
      </div> : <div className="booking-body">
        <div className="visit-summary"><small>YOUR VISIT</small><div><Icon name="calendar" size={17} /><p><b>Fri, {date} Jun 2026</b><span>{time} - {guest} guests</span></p></div><div><Icon name="map" size={17} /><p><b>{area} area</b><span>Raserva Dining, Senopati</span></p></div></div>
        <div className="summary-title"><h3>Pre-order</h3><button onClick={() => setStep(2)}>Edit order</button></div>
        {cartItems.map((item) => <div className="order" key={item.id}><span>{item.qty}x</span><p>{item.name}</p><b>{money(item.price * item.qty)}</b></div>)}
        <div className="total"><span>Total pre-order</span><b>{money(total)}</b></div>
        <label>Special request</label><textarea onChange={(event) => setNote(event.target.value)} placeholder="e.g. A table near the window, please." value={note} />
        {authNeeded && <form className="login-box" onSubmit={loginAndConfirm}><b>Log in to continue</b><p>Your reservation and payment history will be saved to your account.</p><input onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required type="email" value={email} /><input onChange={(event) => setPassword(event.target.value)} placeholder="Password" required type="password" value={password} /><button className="button" disabled={loading} type="submit">{loading ? "Signing in..." : "Log in and reserve"} <Icon name="arrow" size={15} /></button></form>}
        {error && <p className="booking-error">{error}</p>}
      </div>}
      {!success && <footer className="booking-foot">{step > 1 && <button className="back" onClick={() => setStep(step - 1)}>Back</button>}<button className="button" disabled={loading} onClick={() => step === 3 ? confirmReservation() : setStep(step + 1)}>{loading ? "Please wait..." : step === 3 ? "Reserve and pay DP" : "Continue"} <Icon name="arrow" size={16} /></button></footer>}
    </aside>
  </div>;
}

export default function Home() {
  const [reservation, setReservation] = useState(false);
  const [category, setCategory] = useState("All Menu");
  const [search, setSearch] = useState("");
  const shown = useMemo(() => foods.filter((food) => (category === "All Menu" || food.category === category) && food.name.toLowerCase().includes(search.toLowerCase())), [category, search]);

  return <main>
    <header className="nav"><Logo /><nav><Link href="/about">About</Link><Link href="/dashboard/customer/menu">Menu</Link><a href="#experience">Experience</a><Link href="/contact">Contact</Link></nav><div className="nav-actions"><Link className="nav-icon" href="/dashboard/customer/menu"><Icon name="search" /></Link><Link className="nav-icon" href="/dashboard/customer/reservation"><Icon name="bag" /></Link><Link className="button small" href="/dashboard/customer/reservation">Book a table</Link><MobileMenu variant="home" /></div></header>
    <section className="hero">
      <Image alt="Raserva table setting" height={1200} priority src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1900&q=92" width={1900} />
      <div className="hero-shade" /><div className="hero-copy"><small>WELCOME TO RASERVA</small><h1>Good food.<br /><em>Beautifully timed.</em></h1><p>Thoughtful plates, warm conversations, and a table waiting just for you.</p><div><Link className="button" href="/dashboard/customer/reservation">Reserve your table <Icon name="arrow" size={16} /></Link><Link href="/dashboard/customer/menu">Explore menu <Icon name="arrow" size={16} /></Link></div></div>
      <div className="quick-book"><div><Icon name="calendar" /><span><small>DATE</small>Fri, 12 Jun</span></div><div><Icon name="clock" /><span><small>TIME</small>19:30</span></div><div><Icon name="users" /><span><small>GUESTS</small>2 guests</span></div><button onClick={() => setReservation(true)}>Find a table <Icon name="arrow" size={15} /></button></div>
    </section>
    <section className="story" id="story"><small>A LITTLE CORNER OF JOY</small><h2>Come for the food,<br /><em>stay for the feeling.</em></h2><p>We believe a memorable meal is more than what arrives on the plate. It is the time you make, the stories you share, and the small moments that linger long after dessert.</p><div className="story-grid"><Image alt="Restaurant interior" className="story-main" height={700} src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=85" width={900} /><article><Icon name="sparkle" /><h3>Curated with care</h3><p>Seasonal ingredients, thoughtful pairings, and plenty of heart.</p></article><Image alt="Dining room" height={350} src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=85" width={600} /><aside><small>OPENING HOURS</small><h3>Tue - Sun</h3><p>10:00 - 22:00</p></aside></div></section>
    <section className="menu-section" id="menu"><div className="section-head"><div><small>A TASTE OF RASERVA</small><h2>Made to be <em>remembered.</em></h2></div><p>From first bite to last sip, every plate is designed to turn an ordinary day into something worth celebrating.</p></div><div className="toolbar"><div>{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label><Icon name="search" size={16} /><input onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" value={search} /></label></div><div className="food-grid">{shown.map((food) => <article className="food-card" key={food.id}><div><Image alt={food.name} height={440} src={food.image} width={800} /><button><Icon name="heart" size={16} /></button>{food.tag && <small>{food.tag}</small>}</div><section><header><h3>{food.name}</h3><b><Icon name="star" size={12} /> {food.rating}</b></header><p>{food.description}</p><footer><strong>{money(food.price)}</strong><Link href={`/dashboard/customer/menu/${food.id}`}>Details <Icon name="arrow" size={14} /></Link></footer></section></article>)}</div><Link className="link-button" href="/dashboard/customer/menu">View full menu <Icon name="arrow" size={15} /></Link></section>
    <section className="experience" id="experience"><Image alt="Raserva dining room" height={900} src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=90" width={1500} /><div><small>YOUR EVENING, YOUR WAY</small><h2>More than a seat<br />at the <em>table.</em></h2><p>A date night, a long-overdue catch-up, or a quiet meal just because. Tell us what you need and we will take care of the details.</p><button className="button" onClick={() => setReservation(true)}>Plan your visit <Icon name="arrow" size={16} /></button></div></section>
    <section className="testimonials"><small>FROM OUR GUESTS</small><h2>A few kind <em>words.</em></h2><div>{[["The kind of place you keep thinking about the next day. Every plate felt considered, and the team made our anniversary so lovely.", "Alya Ramadhani", "Anniversary dinner"], ["Warm, unhurried, and quietly special. The salmon was beautiful and booking the table took less than a minute.", "Dimas Putra", "Weekend dinner"], ["Our new favorite place for a slow Sunday lunch. I am still dreaming about the tiramisu.", "Nadia Azzahra", "Sunday lunch"]].map(([quote, name, label]) => <article key={name}><span>{[1, 2, 3, 4, 5].map((star) => <Icon key={star} name="star" size={13} />)}</span><blockquote>&ldquo;{quote}&rdquo;</blockquote><b>{name}</b><small>{label}</small></article>)}</div></section>
    <footer className="site-footer" id="visit"><div><Logo dark /><p>Good food, beautifully timed.<br />A table worth coming back to.</p></div><div><h4>VISIT US</h4><p><Icon name="map" size={15} /> Jl. Senopati No. 42, Jakarta</p><p><Icon name="phone" size={15} /> +62 21 527 2048</p></div><div><h4>EXPLORE</h4><p><Link href="/about">About Raserva</Link></p><p><Link href="/contact">Contact us</Link></p></div><small>Copyright 2026 Raserva Dining. All rights reserved.</small></footer>
    <Reservation open={reservation} close={() => setReservation(false)} />
  </main>;
}
