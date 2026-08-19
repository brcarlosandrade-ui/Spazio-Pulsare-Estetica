import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Plus,
  Minus,
  Sparkles,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import draImage from "@/assets/doutora-jessica.jpg";
import heroImage from "@/assets/hero-clinic.jpg";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { IntroSplash } from "@/components/IntroSplash";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { listInstagramPosts } from "@/lib/instagram-posts";
import {
  clinic,
  differentials,
  faqs,
  getClinicOpenStatus,
  responsibleTechnician,
  steps,
  testimonials,
  treatmentGroups,
  siteUrl,
  whatsappUrl,
  type TreatmentGroup,
} from "@/lib/clinic";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spazio Pulsare | Estética & Bem-Estar em Curitiba" },
      {
        name: "description",
        content:
          "Cuidado que valoriza sua beleza natural com tratamentos exclusivos e planejados em estética e bem-estar em Curitiba - PR.",
      },
      {
        property: "og:title",
        content: "Spazio Pulsare | Estética & Bem-Estar",
      },
      {
        property: "og:description",
        content:
          "Tratamentos exclusivos e planejados para realçar sua beleza natural.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteUrl}/` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: clinic.clinicName,
          slogan: clinic.positioning,
          description: clinic.positioningDescription,
          telephone: clinic.contact.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "R. Prof. Nivaldo Braga, 1692 - Capão da Imbuia",
            addressLocality: "Curitiba",
            addressRegion: "PR",
            postalCode: "82810-150",
            addressCountry: "BR",
          },
          openingHours: "Mo-Sa 09:00-18:00",
        }),
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#antes-depois", label: "Antes & Depois" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

function Home() {
  return (
    <IntroSplash>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Treatments />
          <Differentials />
          <AntesDepois />
          <Testimonials />
          <Faq />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </IntroSplash>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#675249]/15 bg-[#F4F3F4]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3 xl:px-10">
        <a href="#topo" className="flex items-center">
          <span className="font-display text-lg font-semibold tracking-[0.22em] text-[#675249] sm:text-xl">
            SPAZIO PULSARE
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-[#675249] transition-colors hover:text-[#946652]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
            Agendar avaliação
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2 lg:hidden"
          >
            <span className="block h-px w-5 bg-foreground" />
            <span className="mt-1.5 block h-px w-5 bg-foreground" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-[#675249]/15 bg-[#F4F3F4] px-5 py-3 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-[#675249]"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    setStatus(getClinicOpenStatus());
  }, []);

  return (
    <section id="topo" className="relative overflow-hidden bg-[#DCB8A1]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <Reveal>
          <p className="eyebrow">{clinic.tagline}</p>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl text-[#101215]">
            Cuidado que valoriza
            <span className="block gradient-text">sua beleza natural</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#101215]/75">
            {clinic.positioningDescription}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Agendar avaliação
            </a>
            <a href="#tratamentos" className="btn-ghost">
              Conhecer tratamentos
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[#675249]/20 pt-7">
            {[
              ["Facial", "Rejuvenescimento"],
              ["Lavieen", "Brilho & textura"],
              ["Botox", "Naturalidade"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-sm font-semibold text-foreground">{k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          {status && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#675249]/20 bg-[#F4F3F4] px-3 py-1.5 text-xs text-[#675249]">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    status.open ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  aria-hidden
                />
                {status.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#675249]/20 bg-[#F4F3F4] px-3 py-1.5 text-xs text-[#675249]">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[#946652]" aria-hidden />
                {responsibleTechnician}
              </span>
            </div>
          )}
        </Reveal>

        <Reveal delay={140} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 shadow-[var(--shadow-elegant)]">
            <img
              src={heroImage}
              alt="Sala de atendimento da Spazio Pulsare"
              width={1408}
              height={1600}
              className="h-[420px] w-full object-cover lg:h-[560px]"
            />
          </div>
          <div className="surface-card float-slow absolute -bottom-6 left-4 flex items-center gap-3 px-5 py-4 sm:left-8">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            <p className="font-display text-sm font-semibold text-[#101215]">
              Protocolos personalizados
              <span className="block text-xs font-normal text-[#101215]/70">
                Avaliação individualizada
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "default" | "light";
}) {
  const isLight = tone === "light";

  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow" style={isLight ? { color: "#F2D8AE" } : undefined}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl sm:text-4xl" style={isLight ? { color: "#FFF7F1" } : undefined}>
        {title}
      </h2>
      {text && (
        <p className="mt-4" style={isLight ? { color: "rgba(255,255,255,0.8)" } : undefined}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

const TREATMENT_ITEMS_LIMIT = 5;

function TreatmentCard({ group, delay }: { group: TreatmentGroup; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = group.items.length - TREATMENT_ITEMS_LIMIT;
  const visibleItems = expanded ? group.items : group.items.slice(0, TREATMENT_ITEMS_LIMIT);

  return (
    <Reveal delay={delay}>
      <article
        className="surface-card h-full border border-transparent p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]"
        style={{ backgroundColor: "#F8F7F5" }}
      >
        <h3 className="font-display text-xl text-[#101215]">{group.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#101215]/70">
          {group.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {visibleItems.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[#675249]/10 bg-[#DCB8A1]/30 px-3 py-1.5 text-xs text-[#675249]"
            >
              {item}
            </li>
          ))}
        </ul>
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-3 text-xs font-semibold text-[#946652] hover:text-[#675249]"
          >
            {expanded ? "Mostrar menos" : `+${hiddenCount} mais`}
          </button>
        )}
      </article>
    </Reveal>
  );
}

function Treatments() {
  return (
    <section id="tratamentos" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 lg:py-28">
      <SectionHead
        eyebrow="Tratamentos"
        title="Um cuidado para cada objetivo"
        text="Protocolos conduzidos com técnica, segurança e olhar clínico — sempre adaptados ao seu momento."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {treatmentGroups.map((g, i) => (
          <TreatmentCard key={g.id} group={g} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-24 bg-[#F3F1EF] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          eyebrow="Diferenciais"
          title="Como funciona o seu cuidado"
          text="Da primeira conversa ao acompanhamento, cada etapa é pensada para gerar resultados naturais e duradouros."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {differentials.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <div className="surface-card h-full border border-[#675249]/10 bg-[#F4F3F4] p-7">
                <h3 className="font-display text-lg text-[#101215]">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#101215]/70">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li className="border-t border-[#675249]/15 pt-5">
                <span className="font-display text-2xl text-[#946652]">{s.n}</span>
                <h3 className="mt-2 font-display text-base">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-[#F3F1EF] py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1.2fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#D9B77A]/60 bg-[#F4F3F4] p-3 shadow-[0_30px_90px_-32px_rgba(103,82,73,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,183,122,0.28),transparent_58%)]" />
            <img
              src={draImage}
              alt="Dra. Jéssica Oliveira, biomédica esteta da Spazio Pulsare"
              loading="lazy"
              width={1200}
              height={1500}
              className="relative h-[560px] w-full rounded-[1.6rem] object-cover object-[center_18%]"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Sobre</p>
          <h2 className="mt-3 text-3xl sm:text-4xl text-[#101215]">
            Dra. Jéssica Oliveira
          </h2>
          <p className="mt-2 text-sm font-medium tracking-[0.12em] text-[#946652] uppercase">Biomédica Esteta · CRBM 0625</p>
          <div className="mt-6 space-y-4 leading-relaxed text-[#101215]/75">
            <p>
              À frente da Spazio Pulsare, a Dra. Jéssica Oliveira une estética facial e corporal,
              beleza e cuidado pessoal em um atendimento exclusivo, com escuta atenta e protocolos
              desenhados para valorizar sua beleza natural.
            </p>
            <p>
              Desde 2017, a clínica acompanha pessoas que desejam realçar sua beleza com segurança,
              sofisticação e um olhar clínico cuidadoso, preservando identidade, equilíbrio e bem-estar.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Conversar sobre o meu caso
            </a>
            <a href={clinic.social.instagram} target="_blank" rel="noreferrer" className="btn-ghost">
              Ver Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const INSTAGRAM_EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

function loadInstagramEmbedScript(onLoad: () => void) {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${INSTAGRAM_EMBED_SCRIPT_SRC}"]`,
  );
  if (existing) {
    if (window.instgrm) onLoad();
    else existing.addEventListener("load", onLoad);
    return;
  }
  const script = document.createElement("script");
  script.src = INSTAGRAM_EMBED_SCRIPT_SRC;
  script.async = true;
  script.addEventListener("load", onLoad);
  document.body.appendChild(script);
}

function AntesDepois() {
  const { data: posts } = useQuery({
    queryKey: ["instagram-posts"],
    queryFn: () => listInstagramPosts(),
    staleTime: 5 * 60 * 1000,
  });

  const autoplay = useRef(Autoplay({ delay: 5500, stopOnInteraction: true }));
  const hasNavigatedManually = useRef(false);
  const carouselRootRef = useRef<HTMLDivElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    const markNavigatedManually = () => {
      hasNavigatedManually.current = true;
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    carouselApi.on("pointerDown", markNavigatedManually);
    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("pointerDown", markNavigatedManually);
    };
  }, [carouselApi]);

  const pauseAutoplay = () => autoplay.current.stop();
  const resumeAutoplayIfUntouched = () => {
    if (!hasNavigatedManually.current) autoplay.current.play();
  };

  // Hovering directly over an embedded Instagram post (a cross-origin iframe) never
  // fires mouseenter on ancestors — the browser doesn't bubble hover across that
  // boundary. Focus does cross it: clicking into a post to interact blurs the
  // window, which is a reliable signal the visitor is engaging with that card.
  useEffect(() => {
    const handleBlur = () => {
      const active = document.activeElement;
      if (active instanceof HTMLIFrameElement && carouselRootRef.current?.contains(active)) {
        pauseAutoplay();
      }
    };
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", resumeAutoplayIfUntouched);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", resumeAutoplayIfUntouched);
    };
  }, []);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    loadInstagramEmbedScript(() => window.instgrm?.Embeds.process());
  }, [posts]);

  if (!posts || posts.length === 0) return null;

  return (
    <section id="antes-depois" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 lg:py-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHead
          eyebrow="Antes & Depois"
          title="Resultados reais, no ritmo de cada pele"
          text="Uma seleção de casos acompanhados pela nossa equipe."
        />
        <div className="flex shrink-0 gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              hasNavigatedManually.current = true;
              autoplay.current.stop();
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            aria-label="Caso anterior"
            className="rounded-full border-[#675249]/20 text-[#675249] hover:bg-[#F3F1EF] disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              hasNavigatedManually.current = true;
              autoplay.current.stop();
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            aria-label="Próximo caso"
            className="rounded-full border-[#675249]/20 text-[#675249] hover:bg-[#F3F1EF] disabled:pointer-events-auto"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <Carousel
        ref={carouselRootRef}
        setApi={setCarouselApi}
        opts={{ align: "start" }}
        plugins={[autoplay.current]}
        className="mt-12"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplayIfUntouched}
        onTouchStart={pauseAutoplay}
      >
        <CarouselContent className="-ml-6">
          {posts.map((post, i) => (
            <CarouselItem key={post.url} className="pl-6 sm:basis-1/2 lg:basis-1/3">
              <Reveal delay={i * 60}>
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                />
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-24 bg-[#D9B39A] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          eyebrow="Depoimentos"
          title="Quem já cuidou por aqui"
          text="Experiências que traduzem bem-estar, confiança e resultados naturais."
          tone="light"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="surface-card h-full border border-white/20 bg-[#F4F3F4]/85 p-7 shadow-none">
                <blockquote className="text-sm leading-relaxed text-[#101215]/85">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 font-display text-sm font-semibold text-[#101215]">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 lg:py-28">
      <SectionHead eyebrow="Dúvidas frequentes" title="Perguntas mais comuns" />
      <div className="mt-10 divide-y divide-border border-y border-border">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-base font-semibold">{f.q}</span>
                {isOpen ? (
                  <Minus className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                )}
              </button>
              {isOpen && (
                <p className="-mt-1 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const { contact } = clinic;
  return (
    <section id="contato" className="scroll-mt-24 bg-[#2E2A28] py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Contato"
            title="Vamos cuidar de você"
            text="Agende sua avaliação e receba um plano de tratamento feito sob medida."
            tone="light"
          />
          <Reveal delay={100}>
            <ul className="mt-10 space-y-5 text-sm text-white/80">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D9B77A]" aria-hidden />
                <a href={`tel:+55${contact.whatsapp.slice(2)}`} className="text-white hover:text-[#D9B77A]">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9B77A]" aria-hidden />
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#D9B77A]"
                >
                  {contact.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D9B77A]" aria-hidden />
                <span className="text-white/80">{contact.hours}</span>
              </li>
              {contact.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D9B77A]" aria-hidden />
                  <a href={`mailto:${contact.email}`} className="text-white hover:text-[#D9B77A]">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Agendar pelo WhatsApp
              </a>
              <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="btn-ghost border-white/20 text-white hover:bg-white/5 hover:text-[#D9B77A]">
                Ver no mapa
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="h-full overflow-hidden rounded-[2rem] border border-border/70 shadow-[var(--shadow-soft)]">
            <iframe
              title="Mapa da localização da Spazio Pulsare"
              src="https://www.google.com/maps?q=R.%20Prof.%20Nivaldo%20Braga%2C%201692%20-%20Cap%C3%A3o%20da%20Imbuia%2C%20Curitiba%20-%20PR%2C%2082810-150&output=embed"
              loading="lazy"
              className="h-[360px] w-full lg:h-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const { social } = clinic;
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 sm:flex-row sm:justify-between">
        <p className="font-display text-2xl font-semibold tracking-[0.28em] text-[#101215] sm:text-3xl">
          SPAZIO PULSARE
        </p>
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {clinic.clinicName} · {clinic.tagline}
        </p>
        {(social.instagram || social.facebook) && (
          <div className="flex gap-3">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
