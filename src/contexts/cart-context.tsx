import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItem } from "@/lib/content";

type CartItem = MenuItem & { quantity: number };
type CartContextValue = {
  items: CartItem[];
  add: (item: MenuItem) => void;
  change: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const value = useMemo<CartContextValue>(() => ({
    items,
    add: (item) => { if (item.price == null) return; setItems((current) => { const found = current.find((entry) => entry.id === item.id); return found ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, quantity: 1 }]; }); setOpen(true); },
    change: (id, quantity) => setItems((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item)),
    clear: () => setItems([]),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0),
    open,
    setOpen,
  }), [items, open]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used inside CartProvider"); return value; }
