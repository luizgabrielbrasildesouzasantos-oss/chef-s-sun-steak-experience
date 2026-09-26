import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Filter,
  Flame,
  Globe2,
  LayoutDashboard,
  ListFilter,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trash2,
  Users,
  X,
} from "lucide-react";

type LeadStatus =
  | "Novo"
  | "Contatado"
  | "Respondeu"
  | "Interessado"
  | "Proposta"
  | "Cliente"
  | "Sem interesse";

type Lead = {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  address: string;
  rating: number;
  reviews: number;
  phone: string;
  website: string | null;
  mapsUrl: string;
  instagram?: string;
  status: LeadStatus;
  notes: string;
  score: number;
  signals: string[];
  lastSeen: string;
};

const INITIAL_LEADS: Lead[] = [
  {
    id: "1",
    name: "Studio Bella Estética",
    category: "Clínica de estética",
    city: "Belo Horizonte",
    state: "MG",
    address: "Lourdes, Belo Horizonte - MG",
    rating: 4.8,
    reviews: 327,
    phone: "(31) 99842-1177",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Studio+Bella+Estetica+Belo+Horizonte",
    instagram: "https://instagram.com/",
    status: "Novo",
    notes: "",
    score: 9.4,
    signals: ["Sem site", "327 avaliações", "Nota 4.8", "Telefone"],
    lastSeen: "Agora",
  },
  {
    id: "2",
    name: "Barbearia Prime BH",
    category: "Barbearia",
    city: "Belo Horizonte",
    state: "MG",
    address: "Savassi, Belo Horizonte - MG",
    rating: 4.7,
    reviews: 481,
    phone: "(31) 99120-3388",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Barbearia+Prime+BH",
    status: "Novo",
    notes: "",
    score: 9.2,
    signals: ["Sem site", "481 avaliações", "Nota 4.7", "Telefone"],
    lastSeen: "Agora",
  },
  {
    id: "3",
    name: "Ponto do Sabor",
    category: "Restaurante",
    city: "Goiânia",
    state: "GO",
    address: "Setor Bueno, Goiânia - GO",
    rating: 4.6,
    reviews: 912,
    phone: "(62) 99810-4431",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ponto+do+Sabor+Goiania",
    status: "Contatado",
    notes: "Encontrado no Google Maps.",
    score: 9.1,
    signals: ["Sem site", "912 avaliações", "Nota 4.6", "Telefone"],
    lastSeen: "Hoje",
  },
  {
    id: "4",
    name: "Clínica Vida & Forma",
    category: "Clínica de estética",
    city: "Campinas",
    state: "SP",
    address: "Cambuí, Campinas - SP",
    rating: 4.9,
    reviews: 204,
    phone: "(19) 99712-6632",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Clinica+Vida+Forma+Campinas",
    status: "Interessado",
    notes: "Pediu exemplos de sites.",
    score: 9.0,
    signals: ["Sem site", "204 avaliações", "Nota 4.9", "Telefone"],
    lastSeen: "Ontem",
  },
  {
    id: "5",
    name: "Casa do Churrasco",
    category: "Restaurante",
    city: "Brasília",
    state: "DF",
    address: "Águas Claras, Brasília - DF",
    rating: 4.5,
    reviews: 638,
    phone: "(61) 99611-2088",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+do+Churrasco+Brasilia",
    status: "Novo",
    notes: "",
    score: 8.8,
    signals: ["Sem site", "638 avaliações", "Nota 4.5"],
    lastSeen: "Hoje",
  },
  {
    id: "6",
    name: "Espaço Beleza Natural",
    category: "Salão de beleza",
    city: "Ribeirão Preto",
    state: "SP",
    address: "Alto da Boa Vista, Ribeirão Preto - SP",
    rating: 4.8,
    reviews: 156,
    phone: "(16) 99188-3304",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Espaco+Beleza+Natural+Ribeirao+Preto",
    status: "Novo",
    notes: "",
    score: 8.7,
    signals: ["Sem site", "156 avaliações", "Nota 4.8"],
    lastSeen: "Hoje",
  },
  {
    id: "7",
    name: "Odonto Prime",
    category: "Clínica odontológica",
    city: "Curitiba",
    state: "PR",
    address: "Batel, Curitiba - PR",
    rating: 4.9,
    reviews: 341,
    phone: "(41) 99551-8840",
    website: "https://odontoprime.example.com",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Odonto+Prime+Curitiba",
    status: "Novo",
    notes: "",
    score: 6.2,
    signals: ["Site encontrado", "341 avaliações", "Nota 4.9"],
    lastSeen: "Hoje",
  },
  {
    id: "8",
    name: "Auto Center Horizonte",
    category: "Oficina mecânica",
    city: "São Paulo",
    state: "SP",
    address: "Tatuapé, São Paulo - SP",
    rating: 4.4,
    reviews: 522,
    phone: "(11) 99412-7622",
    website: null,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Auto+Center+Horizonte+Sao+Paulo",
    status: "Sem interesse",
    notes: "Já possui fornecedor.",
    score: 7.6,
    signals: ["Sem site", "522 avaliações", "Telefone"],
    lastSeen: "2 dias",
  },
];

const statusOptions: LeadStatus[] = [
  "Novo",
  "Contatado",
  "Respondeu",
  "Interessado",
  "Proposta",
  "Cliente",
  "Sem interesse",
];

const categories = [
  "Todos os nichos",
  "Clínica de estética",
  "Barbearia",
  "Restaurante",
  "Salão de beleza",
  "Clínica odontológica",
  "Oficina mecânica",
];

const states = [
  "Brasil inteiro",
  "MG",
  "SP",
  "GO",
  "DF",
  "PR",
  "RJ",
  "SC",
  "RS",
];

function scoreLabel(score: number) {
  if (score >= 9) return "Alta oportunidade";
  if (score >= 8) return "Boa oportunidade";
  return "Oportunidade";
}

function scoreClass(score: number) {
  if (score >= 9) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (score >= 8) return "text-amber-300 bg-amber-300/10 border-amber-300/20";
  return "text-zinc-300 bg-white/5 border-white/10";
}

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export default function LeadHunter() {
  // TanStack Start can render this route on the server.
  // Do not access localStorage during the initial render.
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("sitehunter-leads");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setLeads(parsed);
        }
      }
    } catch {
      // Keep the demo data when storage is unavailable or invalid.
    } finally {
      setStorageReady(true);
    }
  }, []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos os nichos");
  const [state, setState] = useState("Brasil inteiro");
  const [city, setCity] = useState("");
  const [onlyNoWebsite, setOnlyNoWebsite] = useState(true);
  const [minRating, setMinRating] = useState("0");
  const [minReviews, setMinReviews] = useState("0");
  const [sort, setSort] = useState<"score" | "reviews" | "rating">("score");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [toast, setToast] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("sitehunter-leads", JSON.stringify(leads));
    } catch {
      // Storage may be unavailable in private/restricted environments.
    }
  }, [leads, storageReady]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return [...leads]
      .filter((lead) => {
        if (onlyNoWebsite && lead.website) return false;
        if (savedOnly && lead.status === "Novo") return false;

        if (
          category !== "Todos os nichos" &&
          lead.category !== category
        ) {
          return false;
        }

        if (state !== "Brasil inteiro" && lead.state !== state) {
          return false;
        }

        if (
          city.trim() &&
          !lead.city.toLowerCase().includes(city.trim().toLowerCase())
        ) {
          return false;
        }

        if (Number(minRating) && lead.rating < Number(minRating)) {
          return false;
        }

        if (Number(minReviews) && lead.reviews < Number(minReviews)) {
          return false;
        }

        if (
          statusFilter !== "Todos" &&
          lead.status !== statusFilter
        ) {
          return false;
        }

        if (
          normalized &&
          !`${lead.name} ${lead.category} ${lead.city} ${lead.state}`
            .toLowerCase()
            .includes(normalized)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sort === "reviews") return b.reviews - a.reviews;
        if (sort === "rating") return b.rating - a.rating;
        return b.score - a.score;
      });
  }, [
    leads,
    query,
    category,
    state,
    city,
    onlyNoWebsite,
    minRating,
    minReviews,
    sort,
    statusFilter,
    savedOnly,
  ]);

  const noWebsiteCount = leads.filter((lead) => !lead.website).length;
  const highOpportunity = leads.filter((lead) => lead.score >= 9).length;
  const contacted = leads.filter(
    (lead) =>
      lead.status !== "Novo" &&
      lead.status !== "Sem interesse"
  ).length;

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === id ? { ...lead, ...patch } : lead
      )
    );

    if (activeLead?.id === id) {
      setActiveLead((current) =>
        current ? { ...current, ...patch } : current
      );
    }
  };

  const runSearch = async () => {
    setSearching(true);

    await new Promise((resolve) => setTimeout(resolve, 650));

    setSearching(false);
    setToast(
      "Busca simulada concluída. A interface já está pronta para conectar à API do Google Places."
    );
  };

  const openWhatsApp = (lead: Lead) => {
    const digits = lead.phone.replace(/\D/g, "");
    const message = `Olá, ${lead.name}! Tudo bem? Encontrei o perfil da empresa no Google e queria apresentar uma ideia de site profissional para vocês. Posso te mostrar uma demonstração?`;
    window.open(
      `https://wa.me/55${digits}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    updateLead(lead.id, { status: "Contatado" });
  };

  const exportCsv = () => {
    const header = [
      "Empresa",
      "Categoria",
      "Cidade",
      "Estado",
      "Avaliação",
      "Avaliações",
      "Telefone",
      "Site",
      "Score",
      "Status",
      "Observações",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.category,
      lead.city,
      lead.state,
      String(lead.rating),
      String(lead.reviews),
      lead.phone,
      lead.website || "",
      String(lead.score),
      lead.status,
      lead.notes,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sitehunter-leads-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setToast(`${filteredLeads.length} leads exportados.`);
  };

  const deleteLead = (id: string) => {
    setLeads((current) => current.filter((lead) => lead.id !== id));
    setActiveLead(null);
    setToast("Lead removido.");
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-zinc-100 selection:bg-emerald-400 selection:text-black">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #07090d; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #07090d; }
        ::-webkit-scrollbar-thumb { background: #272b32; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a404a; }

        .sh-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .sh-glow {
          background:
            radial-gradient(circle at 70% 0%, rgba(52,211,153,.10), transparent 28%),
            radial-gradient(circle at 0% 20%, rgba(99,102,241,.07), transparent 25%);
        }

        .sh-card {
          background: rgba(14,17,23,.82);
          border: 1px solid rgba(255,255,255,.075);
          box-shadow: 0 20px 70px rgba(0,0,0,.16);
          backdrop-filter: blur(18px);
        }

        .sh-input {
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.085);
          outline: none;
          transition: border .2s, background .2s, box-shadow .2s;
        }

        .sh-input:focus {
          border-color: rgba(52,211,153,.55);
          background: rgba(255,255,255,.055);
          box-shadow: 0 0 0 3px rgba(52,211,153,.07);
        }

        .sh-hover {
          transition: transform .2s, border-color .2s, background .2s;
        }

        .sh-hover:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,.15);
          background: rgba(255,255,255,.045);
        }

        @keyframes shPulse {
          0%,100% { opacity: .45; transform: scale(.94); }
          50% { opacity: 1; transform: scale(1); }
        }

        .sh-pulse { animation: shPulse 2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="sh-grid sh-glow min-h-screen">
        {/* TOP BAR */}
        <header className="sticky top-0 z-40 border-b border-white/[.06] bg-[#07090d]/85 backdrop-blur-2xl">
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 lg:px-7">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((value) => !value)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={20} />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 text-black shadow-lg shadow-emerald-400/10">
                  <Target size={17} strokeWidth={2.7} />
                </div>
                <div>
                  <div className="text-[14px] font-bold tracking-tight">
                    SiteHunter
                  </div>
                  <div className="hidden text-[9px] font-medium uppercase tracking-[.22em] text-zinc-500 sm:block">
                    Lead Intelligence
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.06] px-3 py-1.5">
                <span className="sh-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-emerald-300">
                  SISTEMA ONLINE
                </span>
              </div>

              <button className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-200">
                <Bell size={17} />
              </button>
              <button className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-200">
                <Settings size={17} />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-[1500px]">
          {/* SIDEBAR */}
          <aside
            className={`fixed bottom-0 left-0 top-16 z-30 w-64 border-r border-white/[.06] bg-[#090b10]/98 p-4 backdrop-blur-2xl transition-transform lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col">
              <div className="space-y-1">
                <SidebarItem
                  icon={<LayoutDashboard size={17} />}
                  label="Visão geral"
                  active
                />
                <SidebarItem
                  icon={<Search size={17} />}
                  label="Encontrar leads"
                  onClick={() => {
                    document
                      .getElementById("search")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setSidebarOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<Users size={17} />}
                  label="Meus leads"
                  onClick={() => setSavedOnly(true)}
                />
                <SidebarItem
                  icon={<BarChart3 size={17} />}
                  label="Performance"
                />
              </div>

              <div className="my-5 border-t border-white/[.06]" />

              <div className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.2em] text-zinc-600">
                Ferramentas
              </div>

              <div className="space-y-1">
                <SidebarItem
                  icon={<Flame size={17} />}
                  label="Alta oportunidade"
                  badge={String(highOpportunity)}
                  onClick={() => {
                    setSort("score");
                    setOnlyNoWebsite(true);
                  }}
                />
                <SidebarItem
                  icon={<ListFilter size={17} />}
                  label="Listas"
                />
                <SidebarItem
                  icon={<Download size={17} />}
                  label="Exportar"
                  onClick={exportCsv}
                />
              </div>

              <div className="mt-auto rounded-xl border border-emerald-400/10 bg-emerald-400/[.035] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={15} className="text-emerald-400" />
                  <span className="text-xs font-semibold">
                    Encontrar clientes
                  </span>
                </div>
                <p className="text-[11px] leading-5 text-zinc-500">
                  Priorize empresas sem site e com sinais de alta oportunidade.
                </p>
              </div>
            </div>
          </aside>

          {sidebarOpen && (
            <button
              className="fixed inset-0 top-16 z-20 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fechar menu"
            />
          )}

          {/* MAIN */}
          <main className="min-w-0 flex-1 px-4 py-7 lg:px-8 lg:py-9">
            <div className="mx-auto max-w-[1180px]">
              {/* HERO */}
              <section className="mb-8">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-400">
                      <span className="h-px w-5 bg-emerald-400" />
                      Lead intelligence
                    </div>
                    <h1 className="max-w-3xl text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl lg:text-5xl">
                      Encontre empresas que{" "}
                      <span className="text-emerald-400">
                        precisam de um site.
                      </span>
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                      Pesquise negócios em qualquer região do Brasil, filtre
                      oportunidades e organize sua prospecção em um só lugar.
                    </p>
                  </div>

                  <button
                    onClick={exportCsv}
                    className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[.035] px-4 text-xs font-semibold text-zinc-300 hover:bg-white/[.07]"
                  >
                    <Download size={15} />
                    Exportar
                  </button>
                </div>
              </section>

              {/* SEARCH */}
              <section id="search" className="sh-card rounded-2xl p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[.06]">
                      <Search size={14} className="text-zinc-300" />
                    </div>
                    <span className="text-sm font-semibold">
                      Nova busca
                    </span>
                  </div>

                  <button
                    onClick={() => setShowFilters((value) => !value)}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                  >
                    <SlidersHorizontal size={14} />
                    Filtros avançados
                  </button>
                </div>

                <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr_auto]">
                  <label className="relative block">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Nicho, empresa ou palavra-chave..."
                      className="sh-input h-12 w-full rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-zinc-600"
                    />
                  </label>

                  <SelectField
                    value={category}
                    onChange={setCategory}
                    options={categories}
                    icon={<Building2 size={15} />}
                  />

                  <SelectField
                    value={state}
                    onChange={setState}
                    options={states}
                    icon={<MapPin size={15} />}
                  />

                  <button
                    onClick={runSearch}
                    disabled={searching}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-xs font-black uppercase tracking-[.1em] text-[#04110b] transition hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-70"
                  >
                    {searching ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        Buscando
                      </>
                    ) : (
                      <>
                        Encontrar leads
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {showFilters && (
                  <div className="mt-4 grid gap-3 border-t border-white/[.06] pt-4 sm:grid-cols-2 lg:grid-cols-4">
                    <InputFilter
                      label="Cidade"
                      value={city}
                      onChange={setCity}
                      placeholder="Ex.: Belo Horizonte"
                    />

                    <SelectField
                      value={minRating}
                      onChange={setMinRating}
                      label="Avaliação mínima"
                      options={["0", "4.0", "4.5", "4.7", "4.8"]}
                    />

                    <SelectField
                      value={minReviews}
                      onChange={setMinReviews}
                      label="Mínimo de avaliações"
                      options={["0", "50", "100", "250", "500", "1000"]}
                    />

                    <SelectField
                      value={sort}
                      onChange={(value) =>
                        setSort(value as "score" | "reviews" | "rating")
                      }
                      label="Ordenar por"
                      options={["score", "reviews", "rating"]}
                      display={{
                        score: "Oportunidade",
                        reviews: "Avaliações",
                        rating: "Nota",
                      }}
                    />
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setOnlyNoWebsite((value) => !value)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${
                      onlyNoWebsite
                        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 bg-white/[.025] text-zinc-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        onlyNoWebsite ? "bg-emerald-400" : "bg-zinc-600"
                      }`}
                    />
                    Somente sem site
                  </button>

                  <button
                    onClick={() => setSavedOnly((value) => !value)}
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${
                      savedOnly
                        ? "border-indigo-400/25 bg-indigo-400/10 text-indigo-300"
                        : "border-white/10 bg-white/[.025] text-zinc-500"
                    }`}
                  >
                    Meus leads
                  </button>

                  <button
                    onClick={() => setStatusFilter("Novo")}
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${
                      statusFilter === "Novo"
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/10 text-zinc-500"
                    }`}
                  >
                    Novos
                  </button>

                  <button
                    onClick={() => {
                      setQuery("");
                      setCategory("Todos os nichos");
                      setState("Brasil inteiro");
                      setCity("");
                      setMinRating("0");
                      setMinReviews("0");
                      setStatusFilter("Todos");
                      setSavedOnly(false);
                      setOnlyNoWebsite(true);
                    }}
                    className="ml-auto text-[10px] font-medium text-zinc-600 hover:text-zinc-300"
                  >
                    Limpar filtros
                  </button>
                </div>
              </section>

              {/* METRICS */}
              <section className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <MetricCard
                  label="Leads encontrados"
                  value={leads.length}
                  icon={<Users size={16} />}
                  detail="+12% esta semana"
                  positive
                />
                <MetricCard
                  label="Sem site"
                  value={noWebsiteCount}
                  icon={<Globe2 size={16} />}
                  detail={`${Math.round(
                    (noWebsiteCount / Math.max(leads.length, 1)) * 100
                  )}% da base`}
                />
                <MetricCard
                  label="Alta oportunidade"
                  value={highOpportunity}
                  icon={<Flame size={16} />}
                  detail="Score 9.0+"
                  positive
                />
                <MetricCard
                  label="Em prospecção"
                  value={contacted}
                  icon={<MessageCircle size={16} />}
                  detail="Contato iniciado"
                />
              </section>

              {/* RESULTS HEADER */}
              <section className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-white">
                      Oportunidades
                    </h2>
                    <span className="rounded-full bg-white/[.06] px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
                      {filteredLeads.length}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-600">
                    Ordenado por potencial de oportunidade
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                    <Filter size={13} />
                    Filtros ativos:
                  </div>
                  <span className="rounded-md border border-emerald-400/15 bg-emerald-400/[.06] px-2 py-1 text-[10px] text-emerald-300">
                    Sem site
                  </span>
                </div>
              </section>

              {/* LEAD TABLE / CARDS */}
              <section className="sh-card overflow-hidden rounded-2xl">
                <div className="hidden grid-cols-[minmax(260px,1.5fr)_170px_150px_110px_110px_42px] gap-4 border-b border-white/[.06] px-5 py-3 text-[9px] font-bold uppercase tracking-[.16em] text-zinc-600 md:grid">
                  <span>Empresa</span>
                  <span>Localização</span>
                  <span>Presença digital</span>
                  <span>Reputação</span>
                  <span>Oportunidade</span>
                  <span />
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="px-6 py-20 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[.04]">
                      <Search size={19} className="text-zinc-600" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold">
                      Nenhum lead encontrado
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-600">
                      Ajuste os filtros ou faça uma nova busca para encontrar
                      outras oportunidades.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[.05]">
                    {filteredLeads.map((lead) => (
                      <LeadRow
                        key={lead.id}
                        lead={lead}
                        onOpen={() => setActiveLead(lead)}
                        onWhatsApp={() => openWhatsApp(lead)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* FOOTNOTE */}
              <div className="mt-5 flex items-start gap-2 text-[10px] leading-5 text-zinc-700">
                <Sparkles size={13} className="mt-0.5 shrink-0" />
                <p>
                  O score é uma heurística interna baseada nos sinais do lead.
                  Na versão conectada, os dados serão obtidos por uma fonte
                  externa de estabelecimentos e armazenados no seu banco.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* DETAIL DRAWER */}
      {activeLead && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveLead(null)}
            aria-label="Fechar"
          />

          <aside className="absolute bottom-0 right-0 top-0 w-full max-w-[520px] overflow-y-auto border-l border-white/[.08] bg-[#0b0e13] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[.06] bg-[#0b0e13]/90 px-5 py-4 backdrop-blur-xl">
              <div className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">
                Detalhes do lead
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[.05]">
                      <Building2 size={19} className="text-zinc-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight">
                        {activeLead.name}
                      </h2>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {activeLead.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg border px-2.5 py-2 text-center ${scoreClass(
                    activeLead.score
                  )}`}
                >
                  <div className="text-lg font-bold leading-none">
                    {activeLead.score.toFixed(1)}
                  </div>
                  <div className="mt-1 text-[8px] font-bold uppercase tracking-wider">
                    score
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <InfoMini
                  label="Avaliação"
                  value={`★ ${activeLead.rating}`}
                />
                <InfoMini
                  label="Reviews"
                  value={activeLead.reviews.toLocaleString("pt-BR")}
                />
                <InfoMini
                  label="Website"
                  value={activeLead.website ? "Encontrado" : "Não encontrado"}
                />
                <InfoMini label="Status" value={activeLead.status} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {activeLead.signals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-white/[.07] bg-white/[.03] px-2.5 py-1 text-[10px] text-zinc-400"
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <div className="mt-7 border-t border-white/[.06] pt-6">
                <DetailLine
                  icon={<MapPin size={15} />}
                  label="Localização"
                  value={`${activeLead.address}`}
                />
                <DetailLine
                  icon={<Phone size={15} />}
                  label="Telefone"
                  value={activeLead.phone}
                />
                <DetailLine
                  icon={<Globe2 size={15} />}
                  label="Site"
                  value={activeLead.website || "Nenhum site identificado"}
                />
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openWhatsApp(activeLead)}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-400 text-xs font-black text-[#04110b] hover:bg-emerald-300"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>

                <a
                  href={activeLead.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.03] text-xs font-semibold text-zinc-300 hover:bg-white/[.06]"
                >
                  <ExternalLink size={15} />
                  Google Maps
                </a>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                  Status da prospecção
                </label>

                <select
                  value={activeLead.status}
                  onChange={(event) =>
                    updateLead(activeLead.id, {
                      status: event.target.value as LeadStatus,
                    })
                  }
                  className="sh-input h-11 w-full rounded-xl px-3 text-sm text-zinc-200"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status} className="bg-[#0b0e13]">
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">
                  Observações
                </label>

                <textarea
                  value={activeLead.notes}
                  onChange={(event) =>
                    updateLead(activeLead.id, {
                      notes: event.target.value,
                    })
                  }
                  placeholder="Anote informações sobre este lead..."
                  rows={5}
                  className="sh-input w-full resize-none rounded-xl p-3 text-sm leading-6 text-zinc-200 placeholder:text-zinc-700"
                />
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-white/[.06] pt-5">
                <button
                  onClick={() => deleteLead(activeLead.id)}
                  className="flex items-center gap-2 text-[11px] font-medium text-red-400/70 hover:text-red-400"
                >
                  <Trash2 size={14} />
                  Excluir lead
                </button>

                <button
                  onClick={() => {
                    setToast("Alterações salvas.");
                    setActiveLead(null);
                  }}
                  className="flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-xs font-bold text-black"
                >
                  <Check size={14} />
                  Salvar
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-white/10 bg-[#11151c]/95 px-4 py-3 text-xs font-medium text-zinc-200 shadow-2xl backdrop-blur-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${
        active
          ? "bg-white/[.06] text-white"
          : "text-zinc-500 hover:bg-white/[.035] hover:text-zinc-200"
      }`}
    >
      <span className={active ? "text-emerald-400" : "text-zinc-600"}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="rounded-md bg-white/[.05] px-1.5 py-0.5 text-[9px] text-zinc-500">
          {badge}
        </span>
      )}
    </button>
  );
}

function SelectField({
  value,
  onChange,
  options,
  icon,
  label,
  display,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: ReactNode;
  label?: string;
  display?: Record<string, string>;
}) {
  return (
    <label className="relative block">
      {label && (
        <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.15em] text-zinc-600">
          {label}
        </span>
      )}

      {icon && (
        <span className="pointer-events-none absolute left-3 top-[calc(50%+2px)] -translate-y-1/2 text-zinc-600">
          {icon}
        </span>
      )}

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`sh-input h-12 w-full appearance-none rounded-xl pr-9 text-sm text-zinc-300 ${
          icon ? "pl-10" : "px-3"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0b0e13]">
            {display?.[option] || option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-[calc(50%+2px)] -translate-y-1/2 text-zinc-600"
      />
    </label>
  );
}

function InputFilter({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.15em] text-zinc-600">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="sh-input h-12 w-full rounded-xl px-3 text-sm text-zinc-300 placeholder:text-zinc-700"
      />
    </label>
  );
}

function MetricCard({
  label,
  value,
  icon,
  detail,
  positive,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  detail: string;
  positive?: boolean;
}) {
  return (
    <div className="sh-card rounded-xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-zinc-600">{label}</span>
        <span className="text-zinc-600">{icon}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {value.toLocaleString("pt-BR")}
      </div>
      <div
        className={`mt-1 flex items-center gap-1 text-[9px] ${
          positive ? "text-emerald-400" : "text-zinc-600"
        }`}
      >
        {positive && <ArrowUp size={11} />}
        {detail}
      </div>
    </div>
  );
}

function LeadRow({
  lead,
  onOpen,
  onWhatsApp,
}: {
  lead: Lead;
  onOpen: () => void;
  onWhatsApp: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      className="sh-hover cursor-pointer px-4 py-4 sm:px-5 md:grid md:grid-cols-[minmax(260px,1.5fr)_170px_150px_110px_110px_42px] md:items-center md:gap-4"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[.06] bg-white/[.035]">
          <Building2 size={16} className="text-zinc-500" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-zinc-100">
              {lead.name}
            </h3>
            {!lead.website && (
              <span className="hidden rounded bg-red-400/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-red-300 sm:inline">
                Sem site
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-[11px] text-zinc-600">
            {lead.category}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5 md:hidden">
            <span className="rounded bg-white/[.04] px-1.5 py-1 text-[9px] text-zinc-500">
              ★ {lead.rating}
            </span>
            <span className="rounded bg-white/[.04] px-1.5 py-1 text-[9px] text-zinc-500">
              {lead.reviews} avaliações
            </span>
            <span
              className={`rounded border px-1.5 py-1 text-[9px] ${scoreClass(
                lead.score
              )}`}
            >
              {lead.score.toFixed(1)} · {scoreLabel(lead.score)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 md:mt-0">
        <MapPin size={13} className="shrink-0 text-zinc-700" />
        <span className="truncate">
          {lead.city}, {lead.state}
        </span>
      </div>

      <div className="mt-3 md:mt-0">
        {lead.website ? (
          <span className="flex items-center gap-2 text-[10px] text-zinc-500">
            <Globe2 size={13} />
            Site encontrado
          </span>
        ) : (
          <span className="flex items-center gap-2 text-[10px] font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Sem site
          </span>
        )}
      </div>

      <div className="mt-3 hidden md:block">
        <div className="text-xs font-medium text-zinc-300">
          ★ {lead.rating}
        </div>
        <div className="mt-1 text-[9px] text-zinc-600">
          {lead.reviews.toLocaleString("pt-BR")} avaliações
        </div>
      </div>

      <div className="mt-3 hidden md:block">
        <span
          className={`inline-flex rounded-lg border px-2 py-1.5 text-[10px] font-bold ${scoreClass(
            lead.score
          )}`}
        >
          {lead.score.toFixed(1)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 md:mt-0">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onWhatsApp();
          }}
          className="rounded-lg p-2 text-zinc-600 hover:bg-emerald-400/10 hover:text-emerald-400"
          title="Abrir WhatsApp"
        >
          <MessageCircle size={15} />
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          className="rounded-lg p-2 text-zinc-600 hover:bg-white/5 hover:text-zinc-200"
          title="Mais detalhes"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </article>
  );
}

function InfoMini({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[.06] bg-white/[.025] p-3">
      <div className="text-[9px] uppercase tracking-[.15em] text-zinc-600">
        {label}
      </div>
      <div className="mt-1 text-xs font-semibold text-zinc-300">{value}</div>
    </div>
  );
}

function DetailLine({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-white/[.05] py-3.5 last:border-0">
      <div className="mt-0.5 text-zinc-600">{icon}</div>
      <div className="min-w-0">
        <div className="text-[9px] font-bold uppercase tracking-[.15em] text-zinc-600">
          {label}
        </div>
        <div className="mt-1 break-words text-xs leading-5 text-zinc-300">
          {value}
        </div>
      </div>
    </div>
  );
}


export const Route = createFileRoute("/")({
  component: LeadHunter,
});
