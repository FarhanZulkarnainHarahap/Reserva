export type Food = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  tag?: string;
};

export const foods: Food[] = [
  { id: 1, name: "Truffle Mushroom Pasta", category: "Main Course", description: "Creamy fettuccine with wild mushroom, truffle oil, and aged parmesan.", price: 128000, rating: 4.9, tag: "Bestseller", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Charred Salmon", category: "Special Menu", description: "Norwegian salmon with pomme puree, asparagus, and lemon butter sauce.", price: 186000, rating: 4.8, tag: "Chef's pick", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Burrata Garden", category: "Appetizer", description: "Fresh burrata with heirloom tomato, basil pesto, and sourdough crisp.", price: 96000, rating: 4.7, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Ember Ribeye", category: "Special Menu", description: "Grilled prime ribeye with roasted garlic jus and seasonal vegetables.", price: 268000, rating: 4.9, tag: "Signature", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Tiramisu Classico", category: "Dessert", description: "Espresso soaked ladyfinger, mascarpone cream, and cocoa dust.", price: 68000, rating: 4.8, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Peach Bellini", category: "Drinks", description: "White peach, sparkling soda, citrus, and fresh mint.", price: 56000, rating: 4.6, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Roasted Pumpkin Soup", category: "Appetizer", description: "Slow roasted pumpkin, brown butter, and toasted pumpkin seed.", price: 62000, rating: 4.6, image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Basque Cheesecake", category: "Dessert", description: "Burnt cheesecake with vanilla bean and berry compote.", price: 72000, rating: 4.9, image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=900&q=85" }
];

export const categories = ["All Menu", "Appetizer", "Main Course", "Special Menu", "Dessert", "Drinks"];

export const bookings = [
  { id: 1, code: "RSV-284916", date: "12 Jun 2026", time: "19:30", guests: 2, area: "Indoor", table: "A01", status: "PENDING", total: 240000 },
  { id: 2, code: "RSV-119204", date: "25 May 2026", time: "18:00", guests: 4, area: "Outdoor", table: "B02", status: "COMPLETED", total: 462000 },
  { id: 3, code: "RSV-083722", date: "11 May 2026", time: "20:00", guests: 2, area: "Non-Smoking", table: "A03", status: "CANCELLED", total: 0 }
];

export function money(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}
