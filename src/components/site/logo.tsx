import { Link } from "@tanstack/react-router";
export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link to="/" aria-label="Carne de Sol do Chef — início" className="group inline-flex items-center gap-3 text-foreground">
    <span className="grid size-10 place-items-center border border-gold/60 font-display text-lg text-gold transition-transform group-hover:rotate-3">CS</span>
    <span className={compact ? "hidden sm:block" : "block"}><span className="block font-display text-lg leading-none">Carne de Sol</span><span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-gold">do Chef</span></span>
  </Link>;
}
