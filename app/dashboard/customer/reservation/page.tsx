"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PublicFooter, PublicHeader } from "@/components/public-header";
import { apiUrl } from "@/lib/api";
import { foods, money } from "@/lib/data";

const slots = ["10:00", "11:30", "13:00", "16:30", "18:00", "19:30", "21:00"];
const areas = [["Indoor", "INDOOR"], ["Outdoor", "OUTDOOR"], ["VIP Room", "VIP_ROOM"], ["Non-Smoking", "NON_SMOKING"]];

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("2026-06-12");
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState("INDOOR");
  const [tables, setTables] = useState<Array<{ id: number; tableNumber: string; capacity: number }>>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState<{ code: string; url: string; amount: number } | null>(null);
  const cartItems = useMemo(() => foods.filter((food) => cart[food.id]).map((food) => ({ ...food, qty: cart[food.id] })), [cart]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  async function checkAvailability() {
    setLoading(true); setError("");
    try {
      const response = await fetch(`${apiUrl}/tables/availability?date=${date}&time=${time}&guests=${guests}&area=${area}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setTables(result.tables);
      if (!result.tables.length) return setError("This slot is full. Please select another date, time, or area.");
      setStep(2);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Availability could not be checked.");
    } finally { setLoading(false); }
  }
  function update(id: number, delta: number) {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] || 0) + delta };
      if (next[id] < 1) delete next[id];
      return next;
    });
  }
  async function confirm() {
    const token = window.localStorage.getItem("raserva_token");
    if (!token) return setError("Please log in before confirming your reservation.");
    setLoading(true); setError("");
    try {
      const reservationResponse = await fetch(`${apiUrl}/reservations`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ tableId: tables[0].id, reservationDate: date, reservationTime: time, guestCount: guests, note, items: cartItems.map((item) => ({ menuId: item.id, quantity: item.qty })) }) });
      const reservation = await reservationResponse.json();
      if (!reservationResponse.ok) throw new Error(reservation.message);
      const paymentResponse = await fetch(`${apiUrl}/payments/reservations/${reservation.id}/checkout`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const payment = await paymentResponse.json();
      if (!paymentResponse.ok) throw new Error(payment.message);
      setCheckout({ code: reservation.reservationCode, url: payment.redirectUrl, amount: payment.grossAmount });
      setStep(4);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Reservation could not be created.");
    } finally { setLoading(false); }
  }

  return <><PublicHeader /><PageHero eyebrow="RESERVE A TABLE" title="Plan your visit." copy="Choose your table, add a little something from the kitchen, and we will take care of the rest." />
    <main className="page-shell reservation-page">
      <div className="flow-steps">{["Choose a table", "Pre-order dishes", "Review details", "Payment"].map((item, index) => <div className={step >= index + 1 ? "active" : ""} key={item}><b>{index + 1}</b><span>{item}</span></div>)}</div>
      {step === 1 && <section className="reservation-card"><h2>When should we<br /><em>save your table?</em></h2><div className="reservation-fields"><label>Date<input min="2026-06-02" onChange={(event) => setDate(event.target.value)} type="date" value={date} /></label><label>Time<select onChange={(event) => setTime(event.target.value)} value={time}>{slots.map((slot) => <option key={slot}>{slot}</option>)}</select></label><label>Guests<select onChange={(event) => setGuests(Number(event.target.value))} value={guests}>{[1,2,3,4,5,6,7,8,9,10].map((count) => <option key={count}>{count}</option>)}</select></label><label>Area<select onChange={(event) => setArea(event.target.value)} value={area}>{areas.map(([label, value]) => <option key={value} value={value}>{label}</option>)}</select></label></div><button className="button" disabled={loading} onClick={checkAvailability}>{loading ? "Checking..." : "Check available tables"} <Icon name="arrow" size={15} /></button>{error && <p className="form-error">{error}</p>}</section>}
      {step === 2 && <section className="reservation-card"><div className="reservation-title"><div><small>TABLE AVAILABLE</small><h2>Add something<br /><em>for the table.</em></h2></div><p>Pre-order is optional. Your selected table {tables[0]?.tableNumber} seats up to {tables[0]?.capacity} guests.</p></div><div className="preorder-grid">{foods.slice(0, 6).map((food) => <article key={food.id}><Image alt={food.name} height={140} src={food.image} width={180} /><div><h3>{food.name}</h3><small>{money(food.price)}</small></div><aside><button onClick={() => update(food.id, -1)}><Icon name="minus" size={12} /></button><b>{cart[food.id] || 0}</b><button onClick={() => update(food.id, 1)}><Icon name="plus" size={12} /></button></aside></article>)}</div><div className="reservation-actions"><button className="back" onClick={() => setStep(1)}>Back</button><button className="button" onClick={() => setStep(3)}>Review booking <Icon name="arrow" size={15} /></button></div></section>}
      {step === 3 && <section className="reservation-card review-booking"><h2>Review your<br /><em>reservation.</em></h2><div className="review-columns"><div><h3>Visit details</h3><p><Icon name="calendar" size={16} /> {date} at {time}</p><p><Icon name="users" size={16} /> {guests} guests, table {tables[0]?.tableNumber}</p><p><Icon name="map" size={16} /> {areas.find((item) => item[1] === area)?.[0]} area</p><label>Special request<textarea onChange={(event) => setNote(event.target.value)} placeholder="A table near the window, please." value={note} /></label></div><div><h3>Pre-order</h3>{cartItems.length ? cartItems.map((item) => <p className="review-order" key={item.id}><span>{item.qty}x {item.name}</span><b>{money(item.price * item.qty)}</b></p>) : <p>No dishes pre-ordered.</p>}<hr /><p className="review-order"><span>Food total</span><b>{money(total)}</b></p><p className="review-order"><span>Reservation deposit</span><b>{money(50000)}</b></p></div></div><div className="reservation-actions"><button className="back" onClick={() => setStep(2)}>Back</button><button className="button" disabled={loading} onClick={confirm}>{loading ? "Creating..." : "Confirm and pay DP"} <Icon name="arrow" size={15} /></button></div>{error && <p className="form-error">{error} {!window.localStorage.getItem("raserva_token") && <Link href="/auth/login">Log in here.</Link>}</p>}</section>}
      {step === 4 && checkout && <section className="reservation-card checkout-result"><div className="success-check"><Icon name="check" size={27} /></div><small>RESERVATION CREATED</small><h2>Complete your<br /><em>deposit payment.</em></h2><p>Booking <b>{checkout.code}</b> is saved as pending. Midtrans will confirm it automatically after payment.</p><strong>{money(checkout.amount)}</strong><a className="button" href={checkout.url} rel="noreferrer" target="_blank">Pay securely with Midtrans <Icon name="arrow" size={15} /></a><Link className="back" href="/dashboard/customer/bookings">View booking status</Link></section>}
    </main><PublicFooter /></>;
}
