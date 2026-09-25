import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Play,
  Sparkles,
  Star,
  Utensils,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/")({
  component: LifeBoxHome,
})

const CAREERS_URL =
  "https://vendoorvagas.com.br/vagas/?city=Goi%C3%A2nia&q=Lifebox+&cityName=Goi%C3%A2nia"

const WAITLIST_URL =
  "https://www.vucafood.com.br/lifeboxburger/1/fila-de-espera"

const GOOGLE_MAPS_URL =
  "https://www.google.com/searchviewer/10?sca_esv=15948584a4935e14&output=search&svid=CAwSKRInCgNwdESIE9oWXdlREE2TUhnNE5UVTNNek0yWlRsaFl6UXhNRGxoGAo"

const locations = [
  {
    city: "GOIÂNIA",
    neighborhood: "Setor Oeste",
    menu: "https://www.vucafood.com.br/lifeboxburger/1/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/goiania-go/lifebox-burger---setor-oeste-setor-oeste/9a68c339-3db3-447f-b5dc-299723b1dbc2?UTM_Medium=share",
  },
  {
    city: "GOIÂNIA",
    neighborhood: "Jardim Goiás",
    menu: "https://www.vucafood.com.br/lifeboxburger/2/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/goiania-go/lifebox---jd-goias-jardim-goias/4788c1db-008b-4ac2-bdfb-915f428af8b4?UTM_Medium=share",
  },
  {
    city: "BRASÍLIA",
    neighborhood: "Águas Claras",
    menu: "https://www.vucafood.com.br/lifeboxburger/3/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/brasilia-df/lifebox---aguas-claras-norte-aguas-claras/918f9427-cc7a-4e74-9b6c-57fb18d4f5e9",
  },
  {
    city: "BRASÍLIA",
    neighborhood: "Lago Sul",
    menu: "https://www.vucafood.com.br/lifeboxburger/lago-sul/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/brasilia-df/lifebox---lago-sul-asa-sul/376817bb-fe9b-4ad4-b6aa-86eac4e35400",
  },
  {
    city: "BELO HORIZONTE",
    neighborhood: "Savassi",
    menu: "https://www.vucafood.com.br/lifeboxburger/Savassi/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/belo-horizonte-mg/lifebox-savassi/82961731-2e86-45e5-a6cb-ceea93018708",
  },
  {
    city: "BELO HORIZONTE",
    neighborhood: "Buritis",
    menu: "https://www.vucafood.com.br/lifeboxburger/1924/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/belo-horizonte-mg/lifebox-buritis---bh-estoril/c07bc283-77f6-4b8d-9fcb-c24de5986705",
  },
  {
    city: "SÃO PAULO",
    neighborhood: "Campinas",
    menu: "https://www.vucafood.com.br/lifeboxburger/campinas-sp/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/campinas-sp/lifebox----campinas-cambui/8ccab3ee-bf11-44c4-b9de-6b544ecc9828",
  },
  {
    city: "SÃO PAULO",
    neighborhood: "Ribeirão Preto",
    menu: "https://www.vucafood.com.br/lifeboxburger/2384/cardapio-digital",
    ifood:
      "https://www.ifood.com.br/delivery/ribeirao-preto-sp/lifebox-burger---ribeirao-preto-alto-da-boa-vista/dc1490de-7459-4f5c-a345-0bea72609fe1?utm_medium=share",
  },
]

const burgers = [
  {
    name: "PICANHA PREMIUM",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "TEXANO",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "TITAN BURGER",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1200&q=90",
  },
  {
    name: "SMASH LIFE",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=90",
  },
]

const shakes = [
  {
    name: "SHAKES LIFEBOX",
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "CHOCO LIFE",
    image:
      "https://images.unsplash.com/photo-1553787499-6f0f9e1f7e0c?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "ENCANTO DE UVA",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=90",
  },
]

function LifeBoxHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLocation, setActiveLocation] = useState(0)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const selectedLocation = locations[activeLocation]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808] text-white">
      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a
            href="#inicio"
            className="text-2xl font-black tracking-[-0.08em] transition hover:scale-105"
          >
            LIFEBOX<span className="text-[#ff5a1f]">.</span>
          </a>

          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/75 lg:flex">
            <a className="transition hover:text-white" href="#inicio">
              Início
            </a>
            <a className="transition hover:text-white" href="#cardapio">
              Cardápio
            </a>
            <a className="transition hover:text-white" href="#unidades">
              Unidades
            </a>
            <a className="transition hover:text-white" href="#sobre">
              Sobre
            </a>
            <a
              className="transition hover:text-white"
              href={CAREERS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Trabalhe Conosco
            </a>
          </nav>

          <a
            href="#unidades"
            className="hidden rounded-full bg-[#ff5a1f] px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_40px_rgba(255,90,31,0.25)] transition hover:scale-105 hover:bg-[#ff6d38] lg:block"
          >
            Pedir agora
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/95 px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-sm font-bold uppercase tracking-[0.15em]">
              <a href="#inicio" onClick={() => setMenuOpen(false)}>
                Início
              </a>
              <a href="#cardapio" onClick={() => setMenuOpen(false)}>
                Cardápio
              </a>
              <a href="#unidades" onClick={() => setMenuOpen(false)}>
                Unidades
              </a>
              <a href="#sobre" onClick={() => setMenuOpen(false)}>
                Sobre
              </a>
              <a
                href={CAREERS_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Trabalhe Conosco
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO COM VÍDEO */}
      <section
        id="inicio"
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        {/* VIDEO */}
       <video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2000&q=90"
  style={{ minWidth: "100%", minHeight: "100%" }}
  onError={(e) => {
    console.error("ERRO AO CARREGAR VÍDEO:", e.currentTarget.error);
  }}
>
  <source
    src="/videos/lifebox-burger-loop.mp4"
    type="video/mp4"
  />
</video>

        {/* ESCURECIMENTO CINEMÁTICO */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />

        {/* GRANDE GLOW */}
        <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#ff5a1f]/10 blur-[130px]" />

        {/* CONTEÚDO */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-36 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#ff5a1f]" />

              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff7040]">
                Burger • Steaks • Shakes
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl md:text-8xl lg:text-[112px]">
              MAIS QUE
              <br />
              UM BURGER.
              <br />
              <span className="text-[#ff5a1f]">UMA EXPERIÊNCIA.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Angus, ingredientes selecionados e combinações que fazem cada
              mordida valer a pena.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#unidades"
                className="group flex h-14 items-center justify-center gap-3 rounded-full bg-[#ff5a1f] px-8 text-xs font-black uppercase tracking-[0.18em] shadow-[0_15px_50px_rgba(255,90,31,0.3)] transition hover:scale-[1.03] hover:bg-[#ff6d38]"
              >
                Pedir agora
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#cardapio"
                className="flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 text-xs font-black uppercase tracking-[0.18em] backdrop-blur-md transition hover:bg-white/10"
              >
                Ver cardápio
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-5 hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 lg:flex">
            <ArrowDown size={14} className="animate-bounce" />
            Scroll para descobrir
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="sobre" className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Sparkles size={16} className="text-[#ff5a1f]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5a1f]">
                  A experiência LIFEBOX
                </span>
              </div>

              <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
                BURGER,
                <br />
                STEAKS
                <br />
                <span className="text-white/30">& SHAKES.</span>
              </h2>
            </div>

            <div className="lg:pl-16">
              <p className="text-xl leading-8 text-white/70">
                Não é só sobre comer. É sobre aquele momento em que o burger
                chega à mesa, o queijo derrete, o cheiro toma conta e você sabe
                que fez a escolha certa.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <Utensils className="mb-5 text-[#ff5a1f]" size={23} />
                  <p className="text-sm font-bold">Ingredientes selecionados</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <Star className="mb-5 text-[#ff5a1f]" size={23} />
                  <p className="text-sm font-bold">Experiência única</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BURGERS */}
      <section id="cardapio" className="border-y border-white/5 bg-[#0d0d0d] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5a1f]">
                Signature Burgers
              </span>

              <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                SEU PRÓXIMO
                <br />
                <span className="text-white/30">FAVORITO.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {burgers.map((burger) => (
              <div
                key={burger.name}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111]"
              >
                <div className="relative aspect-[0.9] overflow-hidden">
                  <img
                    src={burger.image}
                    alt={burger.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-xl font-black tracking-tight">
                      {burger.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD PORN */}
      <section className="relative overflow-hidden py-28 sm:py-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=2200&q=90"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#ff7040]">
              Prepare-se
            </span>

            <h2 className="mt-5 text-6xl font-black leading-[0.85] tracking-[-0.07em] sm:text-8xl lg:text-[110px]">
              VOCÊ VAI
              <br />
              SENTIR
              <br />
              <span className="text-[#ff5a1f]">VONTADE.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* SHAKES */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5a1f]">
              Para fechar
            </span>

            <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              SHAKES &
              <br />
              <span className="text-white/30">SOBREMESAS.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {shakes.map((shake) => (
              <div
                key={shake.name}
                className="group relative aspect-square overflow-hidden rounded-[30px] border border-white/10"
              >
                <img
                  src={shake.image}
                  alt={shake.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <h3 className="absolute bottom-7 left-7 text-2xl font-black">
                  {shake.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section
        id="unidades"
        className="border-t border-white/5 bg-[#0d0d0d] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5a1f]">
              Encontre seu LIFEBOX
            </span>

            <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              ESCOLHA SUA
              <br />
              <span className="text-white/30">UNIDADE.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {locations.map((location, index) => (
              <div
                key={`${location.city}-${location.neighborhood}`}
                className="rounded-[30px] border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/20 sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff5a1f]">
                      {location.city}
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      {location.neighborhood}
                    </h3>
                  </div>

                  <MapPin className="text-white/30" size={23} />
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <a
                    href={location.menu}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center justify-center rounded-full bg-white text-xs font-black uppercase tracking-wider text-black transition hover:bg-[#ff5a1f] hover:text-white"
                  >
                    Cardápio
                  </a>

                  <a
                    href={location.ifood}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-black uppercase tracking-wider transition hover:bg-white/10"
                  >
                    iFood
                  </a>

                  <a
                    href={WAITLIST_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-xs font-black uppercase tracking-wider transition hover:bg-white/10"
                  >
                    <Clock3 size={14} />
                    Fila
                  </a>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-xs font-black uppercase tracking-wider transition hover:bg-white/10"
                  >
                    <MapPin size={14} />
                    Como chegar
                  </a>
                </div>

                <a
                  href={CAREERS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex h-11 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition hover:text-white"
                >
                  Trabalhe conosco
                </a>

                <button
                  onClick={() => setActiveLocation(index)}
                  className="sr-only"
                  aria-label={`Selecionar ${location.neighborhood}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-[35px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8 sm:p-14">
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <Instagram size={28} className="mb-7 text-[#ff5a1f]" />

                <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                  @LIFEBOXBURGER
                </h2>

                <p className="mt-5 max-w-lg text-white/50">
                  Acompanhe nossos burgers, novidades e tudo que acontece por
                  trás da experiência LIFEBOX.
                </p>
              </div>

              <a
                href="https://www.instagram.com/lifeboxburger/"
                target="_blank"
                rel="noreferrer"
                className="flex h-14 items-center justify-center gap-3 rounded-full bg-white px-7 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#ff5a1f] hover:text-white"
              >
                Instagram
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CARREIRAS */}
      <section className="border-y border-white/5 bg-[#0d0d0d] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5a1f]">
            Faça parte
          </span>

          <h2 className="mx-auto mt-5 max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.07em] sm:text-8xl">
            QUER SER UM
            <br />
            <span className="text-[#ff5a1f]">LIFER?</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-white/55">
            Venha fazer parte do time LIFEBOX.
          </p>

          <a
            href={CAREERS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-[#ff5a1f] px-8 text-xs font-black uppercase tracking-[0.18em] transition hover:scale-105 hover:bg-[#ff6d38]"
          >
            Trabalhe conosco
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-32 sm:py-44">
        <div className="absolute inset-0 bg-[#ff5a1f]" />

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 text-center lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/60">
            LIFEBOX BURGER
          </p>

          <h2 className="mt-5 text-6xl font-black leading-[0.85] tracking-[-0.07em] text-black sm:text-8xl lg:text-[110px]">
            SEU PRÓXIMO
            <br />
            BURGER ESTÁ AQUI.
          </h2>

          <a
            href="#unidades"
            className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-black px-9 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:scale-105"
          >
            Pedir agora
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:flex-row sm:items-center lg:px-8">
          <div>
            <div className="text-2xl font-black tracking-[-0.08em]">
              LIFEBOX<span className="text-[#ff5a1f]">.</span>
            </div>

            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              Burger • Steaks • Shakes
            </p>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} LIFEBOX
          </div>
        </div>
      </footer>

      {/* CTA MOBILE */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <a
          href="#unidades"
          className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#ff5a1f] text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_50px_rgba(255,90,31,0.4)]"
        >
          Pedir agora
          <ArrowRight size={17} />
        </a>
      </div>
    </div>
  )
}
