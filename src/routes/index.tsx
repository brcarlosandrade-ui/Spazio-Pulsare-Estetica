import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";

import logoAsset from "@/assets/logo.svg.asset.json";
import draAsset from "@/assets/dra.png.asset.json";
import heroImage from "@/assets/hero-clinic.jpg";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { IntroSplash } from "@/components/IntroSplash";
import {
  clinic,
  differentials,
  faqs,
  steps,
  testimonials,
  treatmentGroups,
  whatsappUrl,
} from "@/lib/clinic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seven Beauties | Estética Avançada & Integrativa em Curitiba" },
      {
        name: "description",
        content:
          "Tratamentos faciais, corporais e terapias integrativas personalizados para você. Clínica de estética, saúde e bem-estar em Curitiba - PR.",
      },
      {
        property: "og:title",
        content: "Seven Beauties | Estética Avançada & Integrativa",
      },
      {
        property: "og:description",
        content:
          "Tratamentos faciais, corporais e terapias integrativas personalizados para você.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
            streetAddress: "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia",
            addressLocality: "Curitiba",
            addressRegion: "PR",
            postalCode: "82210-230",
            addressCountry: "BR",
          },
          openingHours: "Mo-Fr 08:00-18:00",
        }),
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#duvidas", label: "Dúvidas" },
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
          <About />
          <Testimonials />
          <Faq />
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
        <a href="#topo" className="flex items-center">
          <img
            src={logoAsset.url}
            alt="Seven Beauties Estética Integrativa"
            className="h-11 w-auto sm:h-12"
            width={1400}
            height={650}
          />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-rose-taupe"
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
        <nav className="border-t border-border/60 bg-background px-5 py-3 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
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
  return (
    <section id="topo" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ backgroundImage: "var(--gradient-veil)" }}
      />
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <Reveal>
          <p className="eyebrow">{clinic.tagline}</p>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Estética Avançada
            <span className="block gradient-text">&amp; Integrativa</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
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
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
            {[
              ["Facial", "Rejuvenescimento"],
              ["Corporal", "Contorno & drenagem"],
              ["Integrativo", "Corpo e mente"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-display text-sm font-semibold text-foreground">{k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 shadow-[var(--shadow-elegant)]">
            <img
              src={heroImage}
              alt="Sala de atendimento da clínica Seven Beauties"
              width={1408}
              height={1600}
              className="h-[420px] w-full object-cover lg:h-[560px]"
            />
          </div>
          <div className="surface-card float-slow absolute -bottom-6 left-4 flex items-center gap-3 px-5 py-4 sm:left-8">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            <p className="font-display text-sm font-semibold">
              Protocolos personalizados
              <span className="block text-xs font-normal text-muted-foreground">
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
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
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
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treatmentGroups.map((g, i) => (
          <Reveal key={g.id} delay={i * 90}>
            <article className="surface-card h-full p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]">
              <h3 className="font-display text-xl">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {g.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-24 bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          eyebrow="Diferenciais"
          title="Como funciona o seu cuidado"
          text="Da primeira conversa ao acompanhamento, cada etapa é pensada para gerar resultados naturais e duradouros."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {differentials.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <div className="surface-card h-full p-7">
                <h3 className="font-display text-lg">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li className="border-t border-rose-taupe/30 pt-5">
                <span className="font-display text-2xl text-primary">{s.n}</span>
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
    <section id="sobre" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border/70 shadow-[var(--shadow-elegant)]">
            <img
              src={draAsset.url}
              alt="Dra. Rosimeri Celestino Ribeiro, fisioterapeuta da Seven Beauties"
              loading="lazy"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Sobre</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            Dra. Rosimeri Celestino Ribeiro
          </h2>
          <p className="mt-2 text-sm text-rose-taupe">Fisioterapeuta · Crefito 8/75223-F</p>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              À frente da Seven Beauties, a Dra. Rosimeri une fisioterapia dermatofuncional,
              estética avançada e terapias integrativas em um único cuidado — com escuta
              atenta e protocolos desenhados para cada pessoa.
            </p>
            <p>
              A proposta é simples e exigente ao mesmo tempo: realçar a sua beleza natural
              enquanto se cuida da saúde e do bem-estar, com técnica atualizada e resultados
              coerentes com a sua identidade.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            Conversar sobre o meu caso
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-24 bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Depoimentos" title="Quem já cuidou por aqui" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="surface-card h-full p-7">
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 font-display text-sm font-semibold">
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
    <section id="contato" className="scroll-mt-24 bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Contato"
            title="Vamos cuidar de você"
            text="Agende sua avaliação e receba um plano de tratamento feito sob medida."
          />
          <Reveal delay={100}>
            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a href={`tel:+55${contact.whatsapp.slice(2)}`} className="hover:text-rose-taupe">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-rose-taupe"
                >
                  {contact.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{contact.hours}</span>
              </li>
              {contact.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <a href={`mailto:${contact.email}`} className="hover:text-rose-taupe">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Agendar pelo WhatsApp
              </a>
              <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                Ver no mapa
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="h-full overflow-hidden rounded-[2rem] border border-border/70 shadow-[var(--shadow-soft)]">
            <iframe
              title="Mapa da localização da Seven Beauties"
              src="https://www.google.com/maps?q=Rua%20Frederico%20Stadler%20J%C3%BAnior%2C%20456%20-%20Cap%C3%A3o%20da%20Imbuia%2C%20Curitiba%20-%20PR&output=embed"
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
        <img
          src={logoAsset.url}
          alt="Seven Beauties Estética Integrativa"
          loading="lazy"
          className="h-10 w-auto"
          width={1400}
          height={650}
        />
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
