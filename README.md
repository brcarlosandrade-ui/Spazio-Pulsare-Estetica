# Aurelle Clínica Estética — Landing Page Premium

Template de landing page premium para clínicas de estética, construído com Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP e Framer Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build   # build de produção
npm run start   # servir o build de produção
npm run lint    # ESLint
```

## Re-skinning para outra clínica

Todo o conteúdo da página (nome da clínica, contatos, redes sociais, links de navegação, textos do hero, procedimentos, diferenciais, depoimentos, títulos de seção) vive em um único arquivo:

- `src/content/site.config.ts` — edite este arquivo para trocar de marca sem tocar em nenhum componente.

Outros pontos de customização:

- `tailwind.config.ts` — paleta de cores, tipografia e sombras.
- `src/app/layout.tsx` — fontes (Playfair Display + Inter) e metadados.
- `public/videos/hero.mp4` — vídeo do hero, sincronizado ao scroll via GSAP ScrollTrigger em `src/components/hero/Hero.tsx`.
- Imagens de placeholder: URLs do Unsplash definidas em `site.config.ts` (ou coloque arquivos em `public/images/` e aponte para eles).

## Estrutura

- `src/app/` — App Router (layout, página, estilos globais).
- `src/components/hero/` — hero com vídeo sincronizado ao scroll.
- `src/components/sections/` — seções da página (Sobre, Procedimentos, Diferenciais, Depoimentos, CTA).
- `src/components/layout/` — header e footer.
- `src/components/ui/` — primitivos reutilizáveis (Button, Card).
- `src/content/site.config.ts` — fonte única de todo o conteúdo.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger (hero com vídeo sincronizado ao scroll)
- Framer Motion (reveals de seção)
- lucide-react (ícones)
