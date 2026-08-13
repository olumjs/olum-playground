import { store } from "olum";

// Shared across ProductList and CartSummary (see /store) with no prop-drilling:
// both just import this module and read/write it directly.
export const cart = store({
  items: [],
  add(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) existing.qty++;
    else this.items = [...this.items, { ...product, qty: 1 }];
  },
  inc(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.qty++;
  },
  dec(id) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    if (item.qty <= 1) this.remove(id);
    else item.qty--;
  },
  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
  },
  clear() {
    this.items = [];
  },
});

export const cartCount = () => cart.items.reduce((sum, i) => sum + i.qty, 0);
export const cartTotal = () => cart.items.reduce((sum, i) => sum + i.qty * i.price, 0);
