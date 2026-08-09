# Seven Beauties Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the cloned "Aurelle" template into the Seven Beauties site: new brand, new content/data model, three new sections (Conceito/Pilares, À frente da Seven Beauties, Localização), and a restructured, category-based Procedimentos section — per `docs/superpowers/specs/2026-08-08-seven-beauties-rebrand-design.md`.

**Architecture:** Content-driven Next.js 14 App Router site. All copy/data lives in `src/content/site.config.ts`; presentational components read from it and contain no hardcoded client content. This plan extends that schema (positioning, pillars, procedure categories, leadership) and adds three new section components, wired into `src/app/page.tsx` in the spec's required order.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, lucide-react. No automated test suite exists in this repo (marketing site, no jest/vitest/playwright configured) — verification per task is `npm run lint` + `npm run build` (TypeScript type-check), with a final manual visual QA pass over `npm run dev` in Task 11.

## Global Constraints

- Crefito number is **`8/75223-F`** everywhere (not `8/76223-F`) — copied verbatim from the spec.
- Do not invent: e-mail, social links, Dra. Rosimeri's academic background/specializations/years of experience, or additional testimonials.
- Keep the existing Tailwind palette (`dustyRose`, `roseTaupe`, `warmWhite`, `champagne`, `graphite`) unchanged — no new color tokens.
- "Estética Avançada" is brand positioning only — never rendered as a procedure card.
- Exactly 27 services across 5 categories (Estética Facial, Estética Corporal, Procedimentos Estéticos, Terapias Integrativas, Saúde e Bem-Estar) — no 28th "Estética Avançada" item.
- Testimonials section stays exactly as-is (fictitious placeholders) — no structural or content change.
- Final section order on the page: Header, Hero, Conceito/Pilares, Sobre, Procedimentos, Diferenciais, À frente da Seven Beauties, Depoimentos, Localização, CTA Final, Footer.
- Procedure/service descriptions use cautious, professional language — no absolute outcome promises (spec §6 examples).

---

### Task 1: Brand mark assets — logo mark SVG + favicon

**Files:**
- Create: `public/images/logo-mark.svg`
- Create: `src/app/icon.svg`

**Interfaces:**
- Produces: a small, transparent-background star mark at `/images/logo-mark.svg`, referenced by Task 3 (Header) via `<Image src="/images/logo-mark.svg" .../>`.

- [ ] **Step 1: Create the cropped star-mark SVG**

Extract only the star + silhouette paths from `public/images/seven_beauties_logo_vetor.svg` (drop the text elements), tightly cropped to the star's bounding box.

Create `public/images/logo-mark.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 35 510 455" role="img" aria-labelledby="title">
  <title id="title">Seven Beauties</title>
  <defs>
    <linearGradient id="pink" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d84a8a"/>
      <stop offset="100%" stop-color="#f08bb8"/>
    </linearGradient>
  </defs>
  <path d="M235 45 L310 205 L485 205 L348 302 L400 480 L235 380 L70 480 L122 302 L-15 205 L160 205 Z"
        fill="url(#pink)"/>
  <path d="M235 112 L280 232 L405 232 L307 301 L344 420 L235 350 L126 420 L163 301 L65 232 L190 232 Z"
        fill="#24262d"/>
  <path d="M235 137 L266 247 L378 247 L291 307 L322 396 L235 340 L148 396 L179 307 L92 247 L204 247 Z"
        fill="#fafafa"/>
  <path d="M229 162
           C214 174 207 190 210 204
           C213 218 222 227 226 237
           C229 246 222 253 211 260
           C202 266 199 276 202 286
           C205 297 216 306 223 315
           C231 325 232 337 227 348
           C222 360 216 372 218 384
           C220 397 229 407 239 412
           C235 397 238 382 245 369
           C252 356 260 345 258 332
           C256 319 246 309 243 298
           C240 287 244 276 253 268
           C263 258 269 246 265 235
           C261 224 251 218 246 207
           C241 197 243 184 251 172
           C242 174 235 177 229 162 Z"
        fill="#d84a8a"/>
</svg>
```

- [ ] **Step 2: Create the favicon**

Next.js App Router auto-detects `src/app/icon.svg` and serves it as the site favicon/icon, taking precedence over `src/app/favicon.ico` in modern browsers. Reuse the same mark:

Create `src/app/icon.svg` with identical content to `public/images/logo-mark.svg` above (same `<svg>` markup).

- [ ] **Step 3: Verify the SVGs are valid**

Run: `npm run build`
Expected: PASS (static assets don't affect the TypeScript build; this just confirms Task 1 didn't break anything already in place).

- [ ] **Step 4: Commit**

```bash
git add public/images/logo-mark.svg src/app/icon.svg
git commit -m "feat: add Seven Beauties star-mark asset and favicon"
```

---

### Task 2: Data model rewrite + Procedures component

This is the core content/schema task. `site.config.ts` and `src/lib/icons.ts` change together, and `Procedures.tsx` must be rewritten in the same task because its old shape (`siteConfig.procedures: Procedure[]`) is replaced by `siteConfig.procedureCategories: ProcedureCategory[]` — leaving `Procedures.tsx` un-migrated would break the TypeScript build.

**Files:**
- Modify: `src/lib/icons.ts`
- Modify: `src/content/site.config.ts`
- Modify: `src/components/sections/Procedures.tsx`

**Interfaces:**
- Produces: `IconName` union type, `Pillar`, `ProcedureItem`, `ProcedureCategory` interfaces, and the full `siteConfig` object — consumed by Tasks 3, 4, 7, 8, 9, 10.
- Produces: `siteConfig.leadership: { name: string; role: string; credential: string; imageUrl: string; text: string }` — consumed by Tasks 4 and 8.
- Produces: `siteConfig.pillars: Pillar[]` and `siteConfig.sections.pillarsTitle: string` — consumed by Task 7.
- Produces: `siteConfig.contact.hours: string` and `siteConfig.contact.mapsUrl: string` — consumed by Tasks 4 and 9.
- Produces: `siteConfig.contact.email?: string`, `siteConfig.social.instagram?: string`, `siteConfig.social.facebook?: string` (all now optional) — consumed by Task 4.
- Produces: `siteConfig.positioning: string`, `siteConfig.positioningDescription: string` — consumed by Task 10 (metadata).
- Produces: `siteConfig.sections.leadershipEyebrow/leadershipTitle/locationEyebrow/locationTitle: string` — consumed by Tasks 8 and 9.

- [ ] **Step 1: Rewrite the icon map**

Replace the full contents of `src/lib/icons.ts`:

```ts
import {
  Sparkles,
  Waves,
  Zap,
  Leaf,
  HeartPulse,
  ShieldCheck,
  Users,
  Gem,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  waves: Waves,
  zap: Zap,
  leaf: Leaf,
  heartpulse: HeartPulse,
  shield: ShieldCheck,
  users: Users,
  gem: Gem,
};
```

- [ ] **Step 2: Rewrite `site.config.ts`**

Replace the full contents of `src/content/site.config.ts`:

```ts
export type IconName =
  | "sparkles"
  | "waves"
  | "zap"
  | "leaf"
  | "heartpulse"
  | "shield"
  | "users"
  | "gem";

export interface Pillar {
  icon: IconName;
  title: string;
  text: string;
}

export interface ProcedureItem {
  name: string;
  description: string;
}

export interface ProcedureCategory {
  id: string;
  icon: IconName;
  title: string;
  items: ProcedureItem[];
}

export interface Differentiator {
  icon: IconName;
  title: string;
  text: string;
}

export interface Testimonial {
  name: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

export interface SiteConfig {
  clinicName: string;
  tagline: string;
  positioning: string;
  positioningDescription: string;
  contact: {
    phone: string;
    whatsapp: string;
    email?: string;
    address: string;
    hours: string;
    mapsUrl: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
  };
  nav: { label: string; href: string }[];
  sections: {
    pillarsTitle: string;
    proceduresEyebrow: string;
    proceduresTitle: string;
    differentiatorsEyebrow: string;
    differentiatorsTitle: string;
    leadershipEyebrow: string;
    leadershipTitle: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    locationEyebrow: string;
    locationTitle: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };
  pillars: Pillar[];
  about: {
    eyebrow: string;
    title: string;
    paragraph: string;
    signatureName: string;
    signatureRole: string;
    imageUrl: string;
  };
  procedureCategories: ProcedureCategory[];
  differentiators: Differentiator[];
  leadership: {
    name: string;
    role: string;
    credential: string;
    imageUrl: string;
    text: string;
  };
  testimonials: Testimonial[];
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
}

export const siteConfig: SiteConfig = {
  clinicName: "Seven Beauties",
  tagline: "Estética Integrativa",
  positioning: "Estética Avançada & Integrativa",
  positioningDescription:
    "Tratamentos faciais, corporais e terapias integrativas personalizados para você.",
  contact: {
    phone: "(41) 99610-6171",
    whatsapp: `https://wa.me/5541996106171?text=${encodeURIComponent(
      "Olá, vi o site e quero agendar uma avaliação"
    )}`,
    address:
      "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230",
    hours: "Segunda a sexta, das 8h às 18h",
    mapsUrl: "https://maps.app.goo.gl/3mRjeqNLjDRRwJ3y7",
  },
  social: {},
  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Procedimentos", href: "#procedimentos" },
    { label: "Equipe", href: "#equipe" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],
  sections: {
    pillarsTitle: "Um cuidado que olha para você por inteiro",
    proceduresEyebrow: "Tratamentos",
    proceduresTitle: "Procedimentos",
    differentiatorsEyebrow: "Por que escolher",
    differentiatorsTitle: "Uma clínica que cuida de você, não só da pele",
    leadershipEyebrow: "Quem cuida",
    leadershipTitle: "À frente da Seven Beauties",
    testimonialsEyebrow: "Depoimentos",
    testimonialsTitle: "O que dizem sobre nós",
    locationEyebrow: "Onde estamos",
    locationTitle: "Venha nos conhecer",
  },
  hero: {
    title: "Estética, saúde e bem-estar em um só lugar.",
    subtitle:
      "Tratamentos faciais, corporais e terapias integrativas personalizados para você.",
    ctaPrimaryLabel: "Agendar Avaliação",
    ctaSecondaryLabel: "Conheça nossos tratamentos",
  },
  pillars: [
    {
      icon: "sparkles",
      title: "Estética",
      text: "Tratamentos faciais e corporais pensados para valorizar sua beleza.",
    },
    {
      icon: "leaf",
      title: "Terapias Integrativas",
      text: "Técnicas voltadas ao equilíbrio, cuidado e bem-estar.",
    },
    {
      icon: "heartpulse",
      title: "Saúde",
      text: "Fisioterapia, nutrição e fonoaudiologia integradas ao cuidado.",
    },
  ],
  about: {
    eyebrow: "A clínica",
    title: "Cuidado integrativo para corpo e pele",
    paragraph:
      "Na Seven Beauties, unimos estética e fisioterapia em um cuidado verdadeiramente integrativo. Sob a direção da Dra. Rosimeri Celestino Ribeiro, fisioterapeuta especializada em estética, a clínica reúne procedimentos faciais e corporais, terapias integrativas e acompanhamento em saúde e bem-estar em um só lugar — com técnica, escuta e resultados que respeitam o tempo de cada corpo.",
    signatureName: "Dra. Rosimeri Celestino Ribeiro",
    signatureRole: "Fisioterapeuta • Crefito 8/75223-F",
    imageUrl: "/images/modelo_doutora.png",
  },
  procedureCategories: [
    {
      id: "estetica-facial",
      icon: "sparkles",
      title: "Estética Facial",
      items: [
        { name: "Toxina Botulínica", description: "Aplicação indicada para suavização de linhas de expressão, conforme avaliação individual." },
        { name: "Fios de PDO", description: "Procedimento voltado à sustentação facial, indicado conforme avaliação." },
        { name: "Preenchedores Faciais", description: "Procedimento indicado para contorno e volume facial, conforme avaliação individual." },
        { name: "Skinbooster", description: "Procedimento voltado à hidratação profunda da pele." },
        { name: "Peeling Químico", description: "Procedimento indicado para renovação da textura da pele, conforme avaliação." },
        { name: "Dermaplaning", description: "Técnica de esfoliação suave da pele." },
        { name: "Microagulhamento", description: "Procedimento indicado para estímulo de colágeno, conforme avaliação profissional." },
        { name: "Rejuvenescimento Facial", description: "Protocolo voltado ao cuidado facial, conforme avaliação individual." },
        { name: "Limpeza de Pele", description: "Procedimento de higienização e cuidado profundo da pele." },
        { name: "Mesoterapia", description: "Técnica de aplicação de ativos voltada à hidratação da pele." },
      ],
    },
    {
      id: "estetica-corporal",
      icon: "waves",
      title: "Estética Corporal",
      items: [
        { name: "Criolipólise", description: "Procedimento não invasivo voltado ao tratamento de gordura localizada." },
        { name: "Drenagem Linfática", description: "Técnica manual voltada à redução de inchaço e melhora da circulação." },
        { name: "Massagem Redutora", description: "Técnica manual associada à modelagem corporal, conforme avaliação." },
        { name: "Massagem Relaxante", description: "Técnica voltada ao alívio da tensão e ao relaxamento." },
        { name: "Massagem Terapêutica", description: "Técnica direcionada ao cuidado de tensões e desconfortos específicos." },
        { name: "Massagem Miofascial", description: "Técnica manual voltada à liberação de tensões e melhora da mobilidade." },
        { name: "Pós-Operatório", description: "Acompanhamento fisioterapêutico especializado no período pós-cirúrgico." },
      ],
    },
    {
      id: "procedimentos-esteticos",
      icon: "zap",
      title: "Procedimentos Estéticos",
      items: [
        { name: "Eletroterapia na Estética", description: "Uso de correntes terapêuticas conforme indicação e avaliação profissional." },
        { name: "PEIM – Microvasos", description: "Procedimento indicado para tratamento de microvasos, conforme avaliação." },
        { name: "Depilação a Laser", description: "Técnica de depilação por tecnologia a laser." },
        { name: "Depilação com Cera", description: "Técnica tradicional de depilação com cera." },
      ],
    },
    {
      id: "terapias-integrativas",
      icon: "leaf",
      title: "Terapias Integrativas",
      items: [
        { name: "Acupuntura", description: "Terapia integrativa realizada conforme indicação e avaliação profissional." },
        { name: "Auriculoterapia", description: "Técnica de estímulo de pontos auriculares, conforme indicação profissional." },
        { name: "Ventosaterapia", description: "Técnica manual voltada ao alívio de tensões musculares." },
        { name: "Ozonioterapia", description: "Terapia integrativa realizada conforme indicação e avaliação profissional." },
      ],
    },
    {
      id: "saude-bem-estar",
      icon: "heartpulse",
      title: "Saúde e Bem-Estar",
      items: [
        { name: "Nutrição", description: "Acompanhamento nutricional conforme avaliação individual." },
        { name: "Fonoaudiologia", description: "Acompanhamento especializado em voz, fala e funções orofaciais." },
      ],
    },
  ],
  differentiators: [
    {
      icon: "users",
      title: "Equipe Multidisciplinar",
      text: "Profissionais de diferentes áreas trabalhando para oferecer um cuidado mais completo.",
    },
    {
      icon: "sparkles",
      title: "Abordagem Integrativa",
      text: "Estética, fisioterapia e terapias integrativas reunidas em uma abordagem personalizada.",
    },
    {
      icon: "shield",
      title: "Atendimento Profissional",
      text: "Cuidado conduzido por profissionais habilitados e especializados em suas áreas.",
    },
    {
      icon: "gem",
      title: "Plano Personalizado",
      text: "Cada pessoa possui necessidades diferentes. Por isso, o tratamento é pensado de acordo com seus objetivos.",
    },
  ],
  leadership: {
    name: "Dra. Rosimeri Celestino Ribeiro",
    role: "Fisioterapeuta",
    credential: "Crefito 8/75223-F",
    imageUrl: "/images/modelo_doutora.png",
    text: "Fisioterapeuta responsável pela condução clínica da Seven Beauties, unindo estética, terapias integrativas e cuidados de saúde em um único acompanhamento.",
  },
  testimonials: [
    {
      name: "Camila R.",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Um atendimento impecável, do acolhimento aos resultados. Me senti cuidada em cada etapa.",
    },
    {
      name: "Beatriz S.",
      avatarUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Resultado extremamente natural. A equipe entende exatamente o que equilíbrio significa.",
    },
    {
      name: "Fernanda A.",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Ambiente sofisticado e uma equipe que realmente escuta o que você deseja.",
    },
    {
      name: "Juliana M.",
      avatarUrl:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Profissionais extremamente atenciosos. Expliquei minhas expectativas e o resultado superou.",
    },
    {
      name: "Renata P.",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Já procurei outras clínicas antes, mas nenhuma com esse nível de cuidado e discrição.",
    },
    {
      name: "Isabela T.",
      avatarUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      text: "Cada detalhe do atendimento transmite confiança. Recomendo de olhos fechados.",
    },
  ],
  cta: {
    eyebrow: "Vamos começar",
    title: "Sua jornada de cuidado começa com uma conversa.",
    subtitle: "Agende uma avaliação personalizada com nossa equipe.",
    buttonLabel: "Agendar pelo WhatsApp",
  },
};
```

- [ ] **Step 3: Rewrite `Procedures.tsx` for category tabs**

Replace the full contents of `src/components/sections/Procedures.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";
import { iconMap } from "@/lib/icons";

export default function Procedures() {
  const [activeId, setActiveId] = useState(siteConfig.procedureCategories[0].id);
  const activeCategory =
    siteConfig.procedureCategories.find((category) => category.id === activeId) ??
    siteConfig.procedureCategories[0];

  return (
    <section id="procedimentos" className="bg-champagne/40 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow className="justify-center">
          {siteConfig.sections.proceduresEyebrow}
        </SectionEyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-3 text-center font-display text-3xl text-graphite md:text-4xl"
        >
          {siteConfig.sections.proceduresTitle}
        </motion.h2>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {siteConfig.procedureCategories.map((category) => {
            const Icon = iconMap[category.icon];
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 sm:text-sm ${
                  isActive
                    ? "border-roseTaupe bg-roseTaupe text-warmWhite"
                    : "border-graphite/15 bg-white/50 text-graphite/70 hover:border-roseTaupe/40"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {category.title}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {activeCategory.items.map((item) => (
            <Card key={item.name} className="flex h-full flex-col">
              <h3 className="font-display text-xl text-graphite">{item.name}</h3>
              <p className="mt-3 flex-1 text-sm text-graphite/70">{item.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: PASS, no errors.

Run: `npm run build`
Expected: PASS. This is the key checkpoint — it confirms every consumer of `siteConfig` that has been touched so far (only `Procedures.tsx`) still type-checks. (`Header.tsx`, `Footer.tsx` still compile at this point because `contact.email`/`social.instagram`/`social.facebook` becoming optional doesn't break code that only reads them, and `clinicName`/`about.*`/`differentiators`/`hero.*`/`cta.*`/`testimonials` keep their shapes unchanged.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/icons.ts src/content/site.config.ts src/components/sections/Procedures.tsx
git commit -m "feat: rebuild content model and Procedures section for Seven Beauties"
```

---

### Task 3: Header — add star mark next to wordmark

**Files:**
- Modify: `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: `siteConfig.clinicName: string`, `siteConfig.nav`, `siteConfig.contact.whatsapp`, `siteConfig.hero.ctaPrimaryLabel` (unchanged, already used by this file); `/images/logo-mark.svg` from Task 1.

- [ ] **Step 1: Add the logo mark image to the brand link**

In `src/components/layout/Header.tsx`, add the import:

```tsx
import Image from "next/image";
```

Replace the brand `<Link>`:

```tsx
        <Link
          href="#top"
          className="font-cormorant text-2xl font-bold tracking-wide text-graphite md:text-3xl"
        >
          {siteConfig.clinicName}
        </Link>
```

with:

```tsx
        <Link href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-mark.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden
            className="h-8 w-8"
          />
          <span className="font-cormorant text-2xl font-bold tracking-wide text-graphite md:text-3xl">
            {siteConfig.clinicName}
          </span>
        </Link>
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add star mark to header wordmark"
```

---

### Task 4: Footer — full logo, leadership line, conditional email/social, hours, maps link

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `siteConfig.leadership.{name,role,credential}` (from Task 2), `siteConfig.contact.{phone,address,hours,email,mapsUrl}` (from Task 2), `siteConfig.social.{instagram,facebook}` (now optional, from Task 2).

- [ ] **Step 1: Replace the Footer implementation**

Replace the full contents of `src/components/layout/Footer.tsx`:

```tsx
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.address
  )}&output=embed`;

  const hasSocial = Boolean(siteConfig.social.instagram || siteConfig.social.facebook);

  return (
    <footer className="bg-champagne px-6 py-20 md:px-12 md:py-24">
      <SectionEyebrow className="mx-auto mb-16 max-w-7xl justify-center">
        Onde estamos
      </SectionEyebrow>
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1fr_1.3fr]">
        <div>
          <Image
            src="/images/seven_beauties_logo_vetor.svg"
            alt={siteConfig.clinicName}
            width={220}
            height={102}
            className="h-auto w-44"
          />
          <div className="mt-4 text-sm text-graphite/70">
            <p>{siteConfig.leadership.name}</p>
            <p>
              {siteConfig.leadership.role} • {siteConfig.leadership.credential}
            </p>
          </div>
        </div>
        <div>
          <div className="space-y-3 text-sm text-graphite/80">
            <p className="flex items-center gap-2">
              <Phone size={16} /> {siteConfig.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {siteConfig.contact.address}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={16} /> {siteConfig.contact.hours}
            </p>
            {siteConfig.contact.email && (
              <p className="flex items-center gap-2">
                <Mail size={16} /> {siteConfig.contact.email}
              </p>
            )}
          </div>
          {hasSocial && (
            <div className="mt-6 flex gap-4 text-graphite/80">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  aria-label="Instagram"
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <InstagramIcon />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  aria-label="Facebook"
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
          )}
        </div>
        <div className="h-48 w-full overflow-hidden rounded-2xl shadow-soft md:h-full md:min-h-[180px]">
          <iframe
            src={mapSrc}
            title={`Mapa de localização — ${siteConfig.clinicName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-graphite/10 pt-6 text-xs text-graphite/50">
        © {new Date().getFullYear()} {siteConfig.clinicName}. Todos os
        direitos reservados.
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: rebuild footer with full logo, leadership line and conditional contacts"
```

---

### Task 5: New section — Conceito / Pilares

**Files:**
- Create: `src/components/sections/Pillars.tsx`

**Interfaces:**
- Consumes: `siteConfig.pillars: Pillar[]`, `siteConfig.sections.pillarsTitle: string` (from Task 2), `iconMap` (from Task 2).
- Produces: default-exported `Pillars` component, consumed by Task 10 (`page.tsx`).

- [ ] **Step 1: Create the component**

Create `src/components/sections/Pillars.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import { iconMap } from "@/lib/icons";

export default function Pillars() {
  return (
    <section id="conceito" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.pillarsTitle}
        </h2>
      </div>
      <div className="mx-auto mt-20 grid max-w-5xl gap-16 md:grid-cols-3">
        {siteConfig.pillars.map((pillar, index) => {
          const Icon = iconMap[pillar.icon];
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
              className="text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-roseTaupe/30">
                <Icon className="text-roseTaupe" size={26} strokeWidth={1.25} />
              </span>
              <h3 className="mt-6 font-display text-xl text-graphite">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">{pillar.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS. (Component isn't wired into `page.tsx` yet — Task 10 — so it must compile standalone but won't render until then.)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Pillars.tsx
git commit -m "feat: add Conceito/Pilares section component"
```

---

### Task 6: New section — À frente da Seven Beauties

**Files:**
- Create: `src/components/sections/Leadership.tsx`

**Interfaces:**
- Consumes: `siteConfig.leadership.{name,role,credential,imageUrl,text}`, `siteConfig.sections.{leadershipEyebrow,leadershipTitle}` (from Task 2).
- Produces: default-exported `Leadership` component, consumed by Task 10.

- [ ] **Step 1: Create the component**

Create `src/components/sections/Leadership.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

export default function Leadership() {
  return (
    <section
      id="equipe"
      className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-2 md:items-center md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative h-[420px] w-full overflow-hidden rounded-2xl md:order-2 md:h-[520px]"
      >
        <Image
          src={siteConfig.leadership.imageUrl}
          alt={siteConfig.leadership.name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="md:order-1"
      >
        <SectionEyebrow lines={false}>{siteConfig.sections.leadershipEyebrow}</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.leadershipTitle}
        </h2>
        <p className="mt-6 leading-relaxed text-graphite/70">{siteConfig.leadership.text}</p>
        <p className="mt-10 font-display italic text-graphite/80">
          {siteConfig.leadership.name}
        </p>
        <p className="text-sm text-graphite/50">
          {siteConfig.leadership.role} • {siteConfig.leadership.credential}
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Leadership.tsx
git commit -m "feat: add À frente da Seven Beauties leadership section"
```

---

### Task 7: New section — Localização / Contato

**Files:**
- Create: `src/components/sections/Location.tsx`

**Interfaces:**
- Consumes: `siteConfig.contact.{address,hours,mapsUrl,whatsapp}`, `siteConfig.sections.{locationEyebrow,locationTitle}`, `siteConfig.clinicName` (from Task 2), `Button` and `SectionEyebrow` (existing, unchanged).
- Produces: default-exported `Location` component, consumed by Task 10.

- [ ] **Step 1: Create the component**

Create `src/components/sections/Location.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { siteConfig } from "@/content/site.config";

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.address
  )}&output=embed`;

  return (
    <section id="localizacao" className="bg-champagne/40 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow className="justify-center">
          {siteConfig.sections.locationEyebrow}
        </SectionEyebrow>
        <h2 className="mt-3 text-center font-display text-3xl text-graphite md:text-4xl">
          {siteConfig.sections.locationTitle}
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-72 w-full overflow-hidden rounded-2xl shadow-soft md:h-96"
          >
            <iframe
              src={mapSrc}
              title={`Mapa de localização — ${siteConfig.clinicName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="space-y-6"
          >
            <p className="flex items-start gap-3 text-graphite/80">
              <MapPin size={20} className="mt-0.5 shrink-0 text-roseTaupe" />
              {siteConfig.contact.address}
            </p>
            <p className="flex items-start gap-3 text-graphite/80">
              <Clock size={20} className="mt-0.5 shrink-0 text-roseTaupe" />
              {siteConfig.contact.hours}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={siteConfig.contact.mapsUrl} variant="secondary">
                Ver no Google Maps
              </Button>
              <Button href={siteConfig.contact.whatsapp} variant="whatsapp">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle size={18} />
                  Agendar pelo WhatsApp
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Location.tsx
git commit -m "feat: add Localização/Contato section component"
```

---

### Task 8: Page composition and metadata

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `Pillars` (Task 5), `Leadership` (Task 6), `Location` (Task 7) default exports; `siteConfig.positioning`, `siteConfig.positioningDescription` (Task 2).

- [ ] **Step 1: Wire the new sections into the page in spec order**

Replace the full contents of `src/app/page.tsx`:

```tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Pillars from "@/components/sections/Pillars";
import About from "@/components/sections/About";
import Procedures from "@/components/sections/Procedures";
import Differentiators from "@/components/sections/Differentiators";
import Leadership from "@/components/sections/Leadership";
import Testimonials from "@/components/sections/Testimonials";
import Location from "@/components/sections/Location";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <About />
        <Procedures />
        <Differentiators />
        <Leadership />
        <Testimonials />
        <Location />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
```

This matches the spec order: Header, Hero, Conceito/Pilares, Sobre, Procedimentos, Diferenciais, À frente da Seven Beauties, Depoimentos, Localização, CTA Final, Footer.

- [ ] **Step 2: Update metadata to use the new positioning fields**

In `src/app/layout.tsx`, replace:

```tsx
export const metadata: Metadata = {
  title: `${siteConfig.clinicName} — ${siteConfig.tagline}`,
  description: siteConfig.tagline,
};
```

with:

```tsx
export const metadata: Metadata = {
  title: `${siteConfig.clinicName} — ${siteConfig.positioning}`,
  description: siteConfig.positioningDescription,
};
```

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS. This is the first point where every section is wired together — a real compile error anywhere in the tree (e.g. a typo'd prop) will surface here.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: wire new sections into page and update site metadata"
```

---

### Task 9: Final integration — lint, build, and manual visual QA

**Files:** none (verification only).

- [ ] **Step 1: Full lint and build**

Run: `npm run lint`
Expected: PASS, zero errors/warnings.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 2: Grep for stale references**

Run: `grep -rn "76223" src public docs/superpowers/plans docs/superpowers/specs 2>/dev/null` (or the `Grep` tool with pattern `76223`)
Expected: no matches (the old, incorrect Crefito number must not remain anywhere in `src/`).

Run: `grep -rn "Aurelle\|Marina Costa\|aurelleclinica" src` (or the `Grep` tool)
Expected: no matches in `src/` (leftover template branding must not remain in code/content — matches in `docs/superpowers/specs/*.md` referencing the original template name are fine and expected).

- [ ] **Step 3: Manual visual QA**

Run: `npm run dev`, open `http://localhost:3000`, and check:

- Header: star mark + "Seven Beauties" wordmark, nav (Sobre, Procedimentos, Equipe, Depoimentos) all scroll to their sections, "Agendar Avaliação" button opens WhatsApp with the new phone number.
- Hero: new title/subtitle render; on desktop, scrolling the hero still scrub-syncs the video (GSAP ScrollTrigger unaffected); mobile shows the autoplay/loop fallback.
- Conceito/Pilares: three pillars (Estética, Terapias Integrativas, Saúde) render between Hero and Sobre.
- Sobre: new title/paragraph, `modelo_doutora.png` renders as the image, signature shows "Dra. Rosimeri Celestino Ribeiro" / "Fisioterapeuta • Crefito 8/75223-F".
- Procedimentos: 5 category pills render; clicking each swaps the grid to that category's items only; count services per category (10 + 7 + 4 + 4 + 2 = 27 total) with no "Estética Avançada" card anywhere.
- Diferenciais: 4 updated cards render, including "Atendimento Profissional" (not "Segurança Clínica").
- À frente da Seven Beauties: renders with `modelo_doutora.png`, name, role, Crefito.
- Depoimentos: unchanged carousel, still works (prev/next, autoplay, dots).
- Localização: map, address, hours, "Ver no Google Maps" (opens the provided link), "Agendar pelo WhatsApp" button.
- CTA Final: new title/subtitle/button text.
- Footer: full SVG logo renders (not broken/missing), leadership line, phone/address/hours, no e-mail row, no social icons row (none provided), Google Maps embed still works.

- [ ] **Step 4: Fix any issues found, then re-run Steps 1–3 until clean.**

- [ ] **Step 5: Final commit (only if Step 4 required changes)**

```bash
git add -A
git commit -m "fix: address visual QA findings from Seven Beauties rebrand"
```

---

## Self-Review Notes

- **Spec coverage:** §1 Header → Task 3; §2 Hero → Task 2 (content) + Task 9 (video behavior verified unchanged); §3 Pilares → Task 5; §4 Sobre → Task 2 (content, image path); §5 À frente → Task 6; §6 Procedimentos → Task 2 (data + component); §7 Diferenciais → Task 2 (content); §8 Depoimentos → verified unchanged in Task 9; §9 Header decision → Task 3; §10 Footer → Task 4; §11 Localização → Task 7; §12 CTA Final → Task 2 (content); §13 Identidade visual (palette unchanged) → no task touches `tailwind.config.ts`, verified by omission; §14 Hero video pending → documented in Task 2/Hero content, no code change since GSAP logic is video-agnostic; §15 Estrutura final → Task 8; §16 Regras gerais → Global Constraints section above + Task 9 grep checks.
- **Placeholder scan:** no TBD/TODO markers; all code blocks are complete, runnable content.
- **Type consistency:** `IconName` union defined once in Task 2 and reused for `Pillar.icon`, `ProcedureCategory.icon`, `Differentiator.icon`; `iconMap` keys (`sparkles`, `waves`, `zap`, `leaf`, `heartpulse`, `shield`, `users`, `gem`) match `IconName` exactly. `siteConfig.leadership` shape declared in Task 2 matches its usage in Task 4 (`Footer.tsx`) and Task 6 (`Leadership.tsx`) — same three fields (`name`, `role`, `credential`) plus `imageUrl`/`text`.
