import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Instagram,
  MapPin,
  Menu,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: LifeBoxHome,
});

const CAREERS_URL =
  "https://vendoorvagas.com.br/vagas/?city=Goi%C3%A2nia&q=Lifebox+&cityName=Goi%C3%A2nia";

const WAITLIST_URL =
  "https://www.vucafood.com.br/lifeboxburger/1/fila-de-espera";

const GOOGLE_MAPS_URL =
  "https://www.google.com/searchviewer/10?sca_esv=15948584a4935e14&output=search&svid=CAwSKRInCgNwdnESIE9oWXdlREE2TUhnNE5UVTNNek0yWlRsaFl6UXhNRGxoGAo";

const burgers = [
  {
    name: "Picanha Premium",
    description:
      "Sabor marcante, carne suculenta e ingredientes selecionados.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Tradicional",
    description: "O clássico que nunca sai de moda.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Texano",
    description: "Intenso, defumado e cheio de personalidade.",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Retro",
    description: "Uma combinação irresistível com alma clássica.",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Agridoce",
    description: "Contraste de sabores para surpreender a cada mordida.",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Titan Burger",
    description:
      "Grande, intenso e feito para quem não passa despercebido.",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Duplo Apetitoso",
    description: "Mais carne. Mais sabor. Mais experiência.",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Smash Life",
    description: "Crocante por fora, suculento por dentro.",
    image:
      "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=1000&q=85",
  },
];

const locations = [
  {
    city: "GOIÂNIA",
    neighborhood: "Setor Oeste",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/1/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/goiania-go/lifebox-burger---setor-oeste-setor-oeste/9a68c339-3db3-447f-b5dc-299723b1dbc2?UTM_Medium=share",
  },
  {
    city: "GOIÂNIA",
    neighborhood: "Jardim Goiás",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/2/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/goiania-go/lifebox---jd-goias-jardim-goias/4788c1db-008b-4ac2-bdfb-915f428af8b4?UTM_Medium=share",
  },
  {
    city: "BRASÍLIA",
    neighborhood: "Águas Claras",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/3/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/brasilia-df/lifebox---aguas-claras-norte-aguas-claras/918f9427-cc7a-4e74-9b6c-57fb18d4f5e9",
  },
  {
    city: "BRASÍLIA",
    neighborhood: "Lago Sul",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/lago-sul/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/brasilia-df/lifebox---lago-sul-asa-sul/376817bb-fe9b-4ad4-b6aa-86eac4e35400",
  },
  {
    city: "BELO HORIZONTE",
    neighborhood: "Savassi",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/Savassi/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/belo-horizonte-mg/lifebox-savassi/82961731-2e86-45e5-a6cb-ceea93018708",
  },
  {
    city: "BELO HORIZONTE",
    neighborhood: "Buritis",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/1924/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/belo-horizonte-mg/lifebox-buritis---bh-estoril/c07bc283-77f6-4b8d-9fcb-c24de5986705",
  },
  {
    city: "SÃO PAULO",
    neighborhood: "Campinas",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/campinas-sp/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/campinas-sp/lifebox----campinas-cambui/8ccab3ee-bf11-44c4-b9de-6b544ecc9828",
  },
  {
    city: "SÃO PAULO",
    neighborhood: "Ribeirão Preto",
    menu:
      "https://www.vucafood.com.br/lifeboxburger/2384/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/ribeirao-preto-sp/lifebox-burger---ribeirao-preto-alto-da-boa-vista/dc1490de-7459-4f5c-a345-0bea72609fe1?utm_medium=share",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=900&q=85",
];

function LifeBoxHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-white selection:bg-orange-500 selection:text-white">

      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:h-24 md:px-10">
          <a
            href="#inicio"
            onClick={closeMenu}
            className="text-2xl font-black tracking-[-0.08em] md:text-3xl"
          >
            LIFE<span className="text-orange-500">BOX</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a className="text-sm text-white/70 transition hover:text-white" href="#inicio">
              Início
            </a>
            <a className="text-sm text-white/70 transition hover:text-white" href="#cardapio">
              Cardápio
            </a>
            <a className="text-sm text-white/70 transition hover:text-white" href="#unidades">
              Unidades
            </a>
            <a className="text-sm text-white/70 transition hover:text-white" href="#experiencia">
              Sobre
            </a>
            <a className="text-sm text-white/70 transition hover:text-white" href="#carreiras">
              Trabalhe Conosco
            </a>
          </nav>

          <div className="hidden lg:block">
            <a
              href="#cardapio"
              className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-orange-500 hover:text-white"
            >
              PEDIR AGORA
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-5 py-6 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-1">
              {[
                ["Início", "#inicio"],
                ["Cardápio", "#cardapio"],
                ["Unidades", "#unidades"],
                ["Sobre", "#experiencia"],
                ["Trabalhe Conosco", "#carreiras"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-4 text-lg font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}

              <a
                href="#cardapio"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-4 font-black"
              >
                PEDIR AGORA
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 pt-40 md:px-10 md:pb-24">
          <div className="max-w-5xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              <span className="h-px w-10 bg-orange-500" />
              Burger • Steaks • Shakes
            </div>

            <h1 className="max-w-5xl text-[15vw] font-black uppercase leading-[0.83] tracking-[-0.075em] sm:text-7xl md:text-8xl lg:text-[8rem]">
              MAIS QUE
              <br />
              UM <span className="text-orange-500">BURGER.</span>
              <br />
              UMA EXPERIÊNCIA.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              Angus, ingredientes selecionados e combinações que fazem cada
              mordida valer a pena.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cardapio"
                className="group flex min-h-14 items-center justify-center gap-3 rounded-full bg-orange-500 px-7 font-black transition hover:scale-[1.02] hover:bg-orange-400"
              >
                PEDIR AGORA
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#cardapio"
                className="flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 font-bold backdrop-blur-md transition hover:bg-white/10"
              >
                VER CARDÁPIO
              </a>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            <ArrowDown size={16} className="animate-bounce" />
            Scroll para descobrir
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experiencia"
        className="relative bg-[#0b0b0b] px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              A experiência
            </p>

            <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-8xl">
              BURGER,
              <br />
              STEAKS
              <br />
              <span className="text-white/30">& SHAKES.</span>
            </h2>
          </div>

          <div>
            <p className="text-xl leading-8 text-white/70 md:text-2xl">
              Uma experiência criada para quem não quer apenas comer.
              <span className="text-white"> Quer viver o momento.</span>
            </p>

            <div className="mt-8 h-px w-full bg-white/10" />

            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-3xl font-black">01</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Produto
                </p>
              </div>

              <div>
                <p className="text-3xl font-black">02</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Ambiente
                </p>
              </div>

              <div>
                <p className="text-3xl font-black">03</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Experiência
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="cardapio" className="bg-[#080808] py-24 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-end justify-between gap-6 px-5 md:px-10">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Signature
              </p>

              <h2 className="text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
                SEU PRÓXIMO
                <br />
                <span className="text-white/30">FAVORITO.</span>
              </h2>
            </div>

            <a
              href="#unidades"
              className="hidden items-center gap-2 text-sm font-bold text-white/60 transition hover:text-white md:flex"
            >
              ENCONTRAR UNIDADE
              <ChevronRight size={18} />
            </a>
          </div>

          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
            {burgers.map((burger, index) => (
              <article
                key={burger.name}
                className="group min-w-[78vw] snap-start overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] sm:min-w-[390px] lg:min-w-[410px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={burger.image}
                    alt={burger.name}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-bold backdrop-blur-md">
                    0{index + 1}
                  </div>

                  <div className="absolute inset-x-5 bottom-5">
                    <h3 className="text-3xl font-black uppercase tracking-tight">
                      {burger.name}
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">
                      {burger.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                    LIFEBOX
                  </span>

                  <a
                    href="#unidades"
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black text-black transition hover:bg-orange-500 hover:text-white"
                  >
                    PEDIR
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD PORN */}
      <section className="relative overflow-hidden bg-orange-500 px-5 py-24 text-black md:px-10 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-6xl">
            <p className="mb-6 text-xs font-black uppercase tracking-[0.3em]">
              Prepare-se
            </p>

            <h2 className="text-[14vw] font-black uppercase leading-[0.78] tracking-[-0.08em] md:text-[8rem]">
              VOCÊ VAI
              <br />
              SENTIR
              <br />
              VONTADE.
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.slice(0, 4).map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-[1.75rem] ${
                  index === 1 ? "sm:translate-y-12" : ""
                }`}
              >
                <img
                  src={image}
                  alt="Experiência gastronômica LIFEBOX"
                  loading="lazy"
                  className="aspect-square h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHAKES */}
      <section className="bg-[#080808] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Depois do burger
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] md:text-7xl">
              SHAKES
              <br />
              &<br />
              <span className="text-white/30">SOBREMESAS.</span>
            </h2>

            <p className="mt-7 max-w-md text-base leading-7 text-white/60">
              Para fechar a experiência do jeito certo. Cremosos, intensos e
              feitos para dividir — ou não.
            </p>
          </div>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              {
                name: "Shakes Lifebox",
                image:
                  "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=85",
              },
              {
                name: "Choco Life",
                image:
                  "https://images.unsplash.com/photo-1553787499-6f7f0a9c4c0a?auto=format&fit=crop&w=1000&q=85",
              },
              {
                name: "Encanto de Uva",
                image:
                  "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1000&q=85",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="group relative min-w-[78vw] snap-start overflow-hidden rounded-[2rem] sm:min-w-[330px]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <h3 className="absolute bottom-6 left-6 text-2xl font-black uppercase">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section
        id="unidades"
        className="bg-[#101010] px-5 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Find your Lifebox
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] md:text-8xl">
              ENCONTRE
              <br />
              <span className="text-white/30">SEU LIFEBOX.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <article
                key={`${location.city}-${location.neighborhood}`}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-orange-500/40 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <MapPin size={20} className="text-orange-500" />

                  <ArrowUpRight
                    size={19}
                    className="text-white/25 transition group-hover:text-white"
                  />
                </div>

                <p className="mt-8 text-xs font-bold tracking-[0.2em] text-white/40">
                  {location.city}
                </p>

                <h3 className="mt-2 text-2xl font-black uppercase">
                  {location.neighborhood}
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <a
                    href={location.menu}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 px-3 py-3 text-center text-[10px] font-black uppercase transition hover:bg-white hover:text-black"
                  >
                    Cardápio
                  </a>

                  <a
                    href={location.ifood}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-orange-500 px-3 py-3 text-center text-[10px] font-black uppercase transition hover:bg-orange-400"
                  >
                    iFood
                  </a>

                  <a
                    href={WAITLIST_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 px-3 py-3 text-center text-[10px] font-black uppercase transition hover:bg-white hover:text-black"
                  >
                    Fila
                  </a>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 px-3 py-3 text-center text-[10px] font-black uppercase transition hover:bg-white hover:text-black"
                  >
                    Como chegar
                  </a>
                </div>

                <a
                  href={CAREERS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex w-full items-center justify-center rounded-xl border border-white/10 px-3 py-3 text-[10px] font-black uppercase transition hover:bg-orange-500 hover:text-white"
                >
                  Trabalhe conosco
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS */}
      <section className="bg-[#080808] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {[
              {
                number: "01",
                title: "Ingredientes selecionados",
                icon: <Sparkles size={20} />,
              },
              {
                number: "02",
                title: "Combinações autorais",
                icon: <Star size={20} />,
              },
              {
                number: "03",
                title: "Experiência inesquecível",
                icon: <ShoppingBag size={20} />,
              },
            ].map((item) => (
              <div key={item.number} className="py-10 md:px-10 md:py-14">
                <div className="flex items-center justify-between text-orange-500">
                  {item.icon}
                  <span className="text-sm font-bold">{item.number}</span>
                </div>

                <h3 className="mt-16 max-w-xs text-3xl font-black uppercase leading-none tracking-tight">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-[#101010] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Social
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
                VEM VIVER
                <br />
                A EXPERIÊNCIA
                <br />
                <span className="text-white/30">LIFEBOX.</span>
              </h2>
            </div>

            <a
              href="https://www.instagram.com/lifeboxburger/"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-bold transition hover:bg-white hover:text-black"
            >
              <Instagram size={18} />
              @lifeboxburger
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-2xl ${
                  index === 0 || index === 3 ? "md:translate-y-8" : ""
                }`}
              >
                <img
                  src={image}
                  alt="LIFEBOX"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section
        id="carreiras"
        className="bg-[#080808] px-5 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1500px] rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Carreira
              </p>

              <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] md:text-8xl">
                QUER SER
                <br />
                UM <span className="text-orange-500">LIFER?</span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                Faça parte de uma equipe que transforma atendimento, produto e
                experiência em momentos inesquecíveis.
              </p>
            </div>

            <a
              href={CAREERS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 font-black text-black transition hover:bg-orange-500 hover:text-white"
            >
              TRABALHE CONOSCO
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative min-h-[75svh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

        <div className="relative z-10 flex min-h-[75svh] items-end px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto w-full max-w-[1500px]">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              A próxima mordida começa aqui
            </p>

            <h2 className="max-w-6xl text-6xl font-black uppercase leading-[0.82] tracking-[-0.07em] md:text-[8rem]">
              SEU PRÓXIMO
              <br />
              BURGER
              <br />
              <span className="text-orange-500">ESTÁ AQUI.</span>
            </h2>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#unidades"
                className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-orange-500 px-7 font-black transition hover:bg-orange-400"
              >
                PEDIR AGORA
                <ArrowUpRight size={19} />
              </a>

              <a
                href="#unidades"
                className="flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 bg-black/30 px-7 font-bold backdrop-blur-md transition hover:bg-white hover:text-black"
              >
                ENCONTRAR UMA UNIDADE
                <MapPin size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 pb-28 pt-16 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="text-4xl font-black tracking-[-0.08em]">
                LIFE<span className="text-orange-500">BOX</span>
              </div>

              <p className="mt-4 text-sm text-white/40">
                Burger • Steaks • Shakes
              </p>
            </div>

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">
                Navegação
              </p>

              <div className="flex flex-col gap-3 text-sm text-white/60">
                <a href="#cardapio" className="hover:text-white">
                  Cardápio
                </a>

                <a href="#unidades" className="hover:text-white">
                  Unidades
                </a>

                <a href="#carreiras" className="hover:text-white">
                  Trabalhe Conosco
                </a>
              </div>
            </div>

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">
                Social
              </p>

              <a
                href="https://www.instagram.com/lifeboxburger/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
              >
                <Instagram size={17} />
                Instagram
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-white/30 sm:flex-row">
            <p>
              © {new Date().getFullYear()} LIFEBOX. Todos os direitos
              reservados.
            </p>

            <p>Uma experiência além do burger.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE CTA */}
      <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <a
          href="#unidades"
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-orange-500 text-sm font-black text-white shadow-2xl shadow-black/50"
        >
          <ShoppingBag size={18} />
          PEDIR AGORA
        </a>
      </div>
    </main>
  );
}
