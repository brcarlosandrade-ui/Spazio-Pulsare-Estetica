# Seven Beauties — Rebrand Design

Data: 2026-08-08

## Contexto

Site clonado do template "Aurelle Clínica Estética" (Next.js + `site.config.ts` como fonte única de conteúdo). Objetivo: adaptar para o novo cliente, **Seven Beauties — Estética Integrativa**, clínica liderada pela Dra. Rosimeri Celestino Ribeiro (Fisioterapeuta, Crefito 8/76223-F), em Curitiba-PR.

Decisão do cliente: manter a paleta de cores atual do template (dusty rose / champagne / graphite), mudar apenas conteúdo, marca e — onde necessário — estrutura.

## Identidade visual

- Logo fornecida em `public/images/seven_beauties_logo_vetor.svg` — vetor com fundo transparente: estrela rosa (gradiente `#d84a8a`→`#f08bb8`), silhueta feminina, texto "Seven Beauties" (script), "Estética Integrativa" (subtítulo) e credenciais da Dra. Rosimeri.
- **Header**: extrair apenas a estrela (marca) do SVG em um arquivo próprio (`public/images/logo-mark.svg`), usada como ícone pequeno ao lado do wordmark em texto "Seven Beauties" (mantém o padrão atual do Header, que é texto). O lockup completo (com credenciais) é pesado demais para a barra fixa.
- **Footer**: usar o SVG completo (`seven_beauties_logo_vetor.svg`) na coluna de marca, no lugar do texto solto.
- **Favicon**: novo `src/app/icon.svg` com a marca (estrela), substituindo o favicon genérico do template (convenção do Next.js App Router).
- Paleta de cores do Tailwind (`dustyRose`, `roseTaupe`, `warmWhite`, `champagne`, `graphite`) **não muda**.

## Conteúdo institucional (`site.config.ts`)

- `clinicName`: "Seven Beauties"
- `tagline`: "Estética Integrativa"
- `contact.phone`: "(41) 99610-6171"
- `contact.whatsapp`: gerado a partir do telefone (`5541996106171`), mesma mensagem padrão de agendamento
- `contact.address`: "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230"
- `contact.email`: sem valor — o cliente não forneceu um e-mail real. Campo torna-se opcional (`email?: string`) e a linha some do rodapé quando ausente, em vez de inventar um endereço.
- Novo campo `contact.hours`: "Segunda a sexta, das 8h às 18h" — exibido no rodapé.
- Novo campo `contact.mapsUrl`: link do Google Maps fornecido pelo cliente (`https://maps.app.goo.gl/3mRjeqNLjDRRwJ3y7`) — usado como link "Ver no Google Maps" perto do mapa embutido no rodapé.
- `social.instagram` / `social.facebook`: sem valor por enquanto (cliente ainda não tem essas redes). Campos tornam-se opcionais; o Footer só renderiza os ícones de rede social cujo valor existir.

## Seção Sobre

- `eyebrow`: "A clínica"
- `title`: "Cuidado integrativo para corpo e pele"
- `paragraph`: "Na Seven Beauties, unimos estética e fisioterapia em um cuidado verdadeiramente integrativo. Sob a direção da Dra. Rosimeri Celestino Ribeiro, fisioterapeuta especializada em estética, a clínica reúne procedimentos faciais e corporais, terapias integrativas e acompanhamento em saúde e bem-estar em um só lugar — com técnica, escuta e resultados que respeitam o tempo de cada corpo."
- `signatureName`: "Dra. Rosimeri Celestino Ribeiro"
- `signatureRole`: "Fisioterapeuta • Crefito 8/76223-F"
- `imageUrl`: mantém placeholder do Unsplash (cliente não enviou foto própria ainda — trocar quando disponível)

## Seção Procedimentos — mudança estrutural

O template atual usa uma grade "flat" de 6 cards (`Procedure[]`). A Seven Beauties tem 27 serviços em 5 categorias — não cabe em grade flat sem ficar longo demais.

**Nova estrutura de dados** (substitui `Procedure[]` por `ProcedureCategory[]`):

```ts
export interface ProcedureItem {
  name: string;
  description: string;
}

export interface ProcedureCategory {
  id: string;
  icon: "sparkles" | "waves" | "zap" | "leaf" | "heartpulse";
  title: string;
  items: ProcedureItem[];
}
```

**Novo componente `Procedures.tsx`**: abas por categoria (pills clicáveis, estado local `useState` para categoria ativa) acima da grade de cards. Cada card mostra nome + descrição de 1 linha (sem CTA individual — mantém o botão de agendar no header/CTA geral).

**Categorias e conteúdo:**

### ✨ Estética Facial (ícone: sparkles)
| Serviço | Descrição |
|---|---|
| Toxina Botulínica | Suaviza linhas de expressão com resultado natural. |
| Fios de PDO | Sustentação e efeito lifting sem cirurgia. |
| Preenchedores Faciais | Volume e contorno que valorizam suas feições. |
| Skinbooster | Hidratação profunda para uma pele com viço natural. |
| Peeling Químico | Renovação celular para uma textura mais uniforme. |
| Dermaplaning | Esfoliação suave que revela um viço imediato. |
| Microagulhamento | Estimula colágeno para firmeza e textura renovada. |
| Rejuvenescimento Facial | Protocolo completo para um aspecto mais jovem. |
| Limpeza de Pele | Ritual de cuidado profundo para uma pele saudável. |
| Mesoterapia | Ativos direto na pele para hidratação e viço. |

### 💎 Estética Corporal (ícone: waves)
| Serviço | Descrição |
|---|---|
| Criolipólise | Reduz gordura localizada sem cirurgia. |
| Drenagem Linfática | Reduz inchaço e melhora a circulação. |
| Massagem Redutora | Auxilia na redução de medidas e modelagem corporal. |
| Massagem Relaxante | Alívio da tensão para corpo e mente. |
| Massagem Terapêutica | Cuidado direcionado para dores e tensões específicas. |
| Massagem Miofascial | Libera tensões profundas e melhora a mobilidade. |
| Pós-Operatório | Acompanhamento especializado para uma recuperação segura. |

### ⚡ Procedimentos Estéticos (ícone: zap)
| Serviço | Descrição |
|---|---|
| Eletroterapia na Estética | Correntes terapêuticas para resultados estéticos precisos. |
| PEIM – Microvasos | Tratamento especializado para vasinhos e microvasos. |
| Depilação a Laser | Redução duradoura de pelos com tecnologia a laser. |
| Depilação com Cera | Pele lisa com método tradicional e cuidadoso. |

### 🌿 Terapias Integrativas (ícone: leaf)
| Serviço | Descrição |
|---|---|
| Acupuntura | Equilíbrio e bem-estar através da medicina tradicional chinesa. |
| Auriculoterapia | Estímulo de pontos específicos na orelha para equilíbrio do corpo. |
| Ventosaterapia | Alívio de tensões musculares e melhora da circulação. |
| Ozonioterapia | Ação antioxidante e regeneradora para corpo e pele. |

### 👩‍⚕️ Saúde e Bem-Estar (ícone: heartpulse)
| Serviço | Descrição |
|---|---|
| Nutrição | Orientação alimentar personalizada para seus objetivos. |
| Fonoaudiologia | Cuidado especializado com voz, fala e funções orofaciais. |

**Ícones**: adicionar `waves`, `zap`, `heartpulse` ao `iconMap` (`src/lib/icons.ts`), reaproveitar `sparkles` e `leaf` já existentes. Remover do `iconMap`/tipos os ícones que só serviam aos procedimentos antigos e não são mais usados (`droplet`, `wand`, `syringe`, `sun`, `heart` — a checar contra uso real antes de remover).

## Diferenciais

Reescrever os 4 cards (mantém ícones existentes `users`, `sparkles`, `shield`, `gem`):

1. **Equipe Multidisciplinar** (users) — "Fisioterapia, estética e bem-estar sob um só cuidado, com profissionais especializados."
2. **Abordagem Integrativa** (sparkles) — "Procedimentos estéticos aliados a terapias como acupuntura e ozonioterapia."
3. **Segurança Clínica** (shield) — "Atendimento conduzido por fisioterapeuta registrada no Crefito, com protocolos rigorosos."
4. **Atendimento Personalizado** (gem) — "Cada plano de tratamento é único, pensado para o seu objetivo e seu tempo."

## Depoimentos

Mantidos como estão (fictícios/placeholder) — decisão explícita do cliente, sem depoimentos reais disponíveis ainda.

## Hero

- `title`: "Estética integrativa para revelar sua melhor versão."
- `subtitle`: "Estética facial, corporal e terapias integrativas em um só lugar, com acompanhamento profissional especializado."
- `ctaPrimaryLabel` / `ctaSecondaryLabel`: mantidos ("Agendar Avaliação" / "Conheça nossos tratamentos")
- Vídeo de fundo: mantido o vídeo genérico atual (`public/videos/hero*.mp4/webm`) — cliente não enviou vídeo próprio. Pendência para o futuro.

## CTA final

Mantido o texto atual (genérico, já funciona bem): eyebrow "Vamos começar", título "Sua melhor versão começa com uma conversa.", subtítulo "Agende uma avaliação personalizada com nossa equipe.", botão via WhatsApp.

## Metadados (`layout.tsx`)

`<title>` e `description` recalculados a partir do novo `clinicName`/`tagline` (já dinâmico, nenhuma mudança de código necessária além do conteúdo).

## Pendências (fora do escopo desta rodada)

- Foto real da Dra. Rosimeri para a seção Sobre.
- Vídeo de hero próprio da clínica.
- Links reais de Instagram/Facebook (quando existirem).
- E-mail de contato (se o cliente quiser exibir um).

## Fora de escopo

- Nenhuma mudança de paleta de cores.
- Nenhuma mudança de depoimentos (mantidos fictícios por decisão do cliente).
