import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
const nav = [["Início","/"],["Cardápio","/cardapio"],["Experiência","/experiencia"],["Galeria","/galeria"],["Localização","/localizacao"]] as const;
export function SiteHeader() {
  const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/60 bg-background/90 py-3 backdrop-blur-md" : "bg-transparent py-5"}`}>
    <div className="site-container flex items-center justify-between"><Logo compact={scrolled}/><nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">{nav.map(([label,to])=><Link key={to} to={to} className="nav-link text-[11px] uppercase tracking-[0.16em] text-foreground/80">{label}</Link>)}</nav><Button asChild variant="gold" size="lg" className="hidden lg:inline-flex"><Link to="/reservas">Reservar mesa</Link></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open?"Fechar menu":"Abrir menu"} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div>
    {open && <div className="border-t border-border bg-background px-5 pb-6 pt-5 lg:hidden"><nav className="flex flex-col gap-5">{nav.map(([label,to])=><Link key={to} to={to} onClick={()=>setOpen(false)} className="font-display text-2xl">{label}</Link>)}<Button asChild variant="gold" className="mt-2"><Link to="/reservas" onClick={()=>setOpen(false)}>Reservar mesa</Link></Button></nav></div>}
  </header>;
}
