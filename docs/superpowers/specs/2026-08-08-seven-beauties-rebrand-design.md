# Seven Beauties — Rebrand Design

Data: 2026-08-08 (revisado)

## Contexto

Site clonado do template "Aurelle Clínica Estética" (Next.js + `site.config.ts` como fonte única de conteúdo). Objetivo: adaptar para o novo cliente, **Seven Beauties**, clínica liderada pela Dra. Rosimeri Celestino Ribeiro (Fisioterapeuta, **Crefito 8/75223-F**), em Curitiba-PR.

Decisão do cliente: manter a paleta de cores atual do template, mudar conteúdo, marca e estrutura onde necessário. O resultado final deve parecer uma clínica premium própria — **não** um template Aurelle com textos trocados.

> ⚠️ Correção importante: o número correto do Crefito é **8/75223-F** (não 8/76223-F, que aparecia numa revisão anterior deste documento). Usar `8/75223-F` em todas as ocorrências no projeto.

## Posicionamento de marca

- **Nome**: Seven Beauties
- **Tagline**: Estética Integrativa
- **Posicionamento principal** (headline conceitual da marca, usado em copy institucional/meta description, **não** como nome de procedimento): **"Estética Avançada & Integrativa"**
- **Descrição de marca**: "Tratamentos faciais, corporais e terapias integrativas personalizados para você."

`"Estética Avançada"` é conceito de posicionamento — **não deve virar um card de procedimento** na seção de tratamentos.

## Identidade visual

- Logo em `public/images/seven_beauties_logo_vetor.svg` — vetor com fundo transparente: estrela rosa (gradiente `#d84a8a`→`#f08bb8`), silhueta feminina, "Seven Beauties" (script), "Estética Integrativa" (subtítulo) e credenciais da Dra. Rosimeri.
- Foto placeholder da Dra. Rosimeri disponível em `public/images/modelo_doutora.png` (imagem de exemplo — **não é a foto real**; usar como placeholder até a cliente enviar a foto profissional definitiva). Substitui o placeholder genérico do Unsplash usado anteriormente na seção Sobre.
- **Header**: extrair apenas a estrela (marca) do SVG em arquivo próprio (`public/images/logo-mark.svg`), usada como símbolo pequeno ao lado do wordmark em texto "Seven Beauties". Nav + CTA de agendamento completam o header. Não usar o lockup completo (com credenciais) na barra fixa — visualmente pesado demais.
- **Footer**: usar o SVG completo (`seven_beauties_logo_vetor.svg`) na coluna de marca, junto com a linha de identificação da Dra. Rosimeri (ver seção Footer abaixo).
- **Favicon**: novo `src/app/icon.svg` com a marca (estrela), substituindo o favicon genérico do template.
- **Paleta**: Tailwind (`dustyRose`, `roseTaupe`, `warmWhite`, `champagne`, `graphite`) **não muda**. Mas o uso deve ser mais sofisticado e equilibrado — evitar aparência excessivamente "rosa", infantil ou de salão de beleza genérico. A página deve transmitir estética premium, elegância, feminilidade sofisticada, confiança, cuidado, saúde e bem-estar.

## Conteúdo institucional (`site.config.ts`)

- `clinicName`: "Seven Beauties"
- `tagline`: "Estética Integrativa"
- `positioning`: "Estética Avançada & Integrativa" *(novo campo — headline de posicionamento, usado em copy institucional/metadata, não em UI de procedimento)*
- `positioningDescription`: "Tratamentos faciais, corporais e terapias integrativas personalizados para você." *(novo campo)*
- `contact.phone`: "(41) 99610-6171"
- `contact.whatsapp`: gerado a partir do telefone (`5541996106171`), mesma mensagem padrão de agendamento
- `contact.address`: "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230"
- `contact.hours`: "Segunda a sexta, das 8h às 18h"
- `contact.mapsUrl`: `https://maps.app.goo.gl/3mRjeqNLjDRRwJ3y7`
- `contact.email`: sem valor — campo opcional (`email?: string`); linha some da UI quando ausente. **Não inventar e-mail.**
- `social.instagram` / `social.facebook`: sem valor por enquanto — campos opcionais; UI só renderiza os ícones cujo valor existir. **Não inventar redes sociais.**

## Estrutura final da landing page

Ordem das seções (pode ser levemente ajustada por justificativa clara de UX/conversão, mas nenhuma seção abaixo pode ser removida):

1. Header
2. Hero
3. Conceito / Pilares
4. Sobre a Seven Beauties
5. Tratamentos / Procedimentos
6. Diferenciais
7. À frente da Seven Beauties — Dra. Rosimeri
8. Depoimentos
9. Localização / Contato
10. CTA Final
11. Footer

## 1. Header

- Símbolo/estrela da marca em tamanho pequeno (`logo-mark.svg`) + wordmark "Seven Beauties" em texto.
- Nav com os links existentes (Sobre, Procedimentos, Depoimentos — revisar âncoras conforme novas seções).
- CTA de agendamento (WhatsApp), mantido como está.
- Aparência limpa, elegante, premium.

## 2. Hero

- `title`: **"Estética, saúde e bem-estar em um só lugar."**
- `subtitle`: "Tratamentos faciais, corporais e terapias integrativas personalizados para você."
- `ctaPrimaryLabel`: "Agendar Avaliação"
- `ctaSecondaryLabel`: "Conheça nossos tratamentos"
- Apresentação visual premium, elegante e contemporânea.
- **Vídeo de fundo**: mantido o vídeo genérico atual do template (`public/videos/hero*.mp4/webm`) **apenas provisoriamente**. O código do Hero (GSAP + ScrollTrigger, scroll-sync) já é agnóstico ao arquivo de vídeo e continua funcionando sem alterações quando os arquivos forem substituídos — nenhuma mudança de código necessária para a troca futura, só substituir os três arquivos em `public/videos/`.
- **Pendência futura**: vídeo próprio da Seven Beauties, produzido especificamente para a marca, incorporando a logo. Registrado como pendência, não bloqueia esta etapa.

## 3. Conceito / Pilares (seção nova)

Nova seção entre Hero e Sobre, explicando visualmente o posicionamento "Estética Avançada & Integrativa".

- `title`: "Um cuidado que olha para você por inteiro"
- Três pilares, apresentados com boa hierarquia visual, bastante espaço em branco e ícones elegantes — **não** como três cards genéricos de template:

| Pilar | Texto |
|---|---|
| **Estética** | Tratamentos faciais e corporais pensados para valorizar sua beleza. |
| **Terapias Integrativas** | Técnicas voltadas ao equilíbrio, cuidado e bem-estar. |
| **Saúde** | Fisioterapia, nutrição e fonoaudiologia integradas ao cuidado. |

**Nova estrutura de dados** (`site.config.ts`):

```ts
export interface Pillar {
  icon: "sparkles" | "leaf" | "heartpulse";
  title: string;
  text: string;
}

pillars: Pillar[];
sectionsIntro: { eyebrow?: string; title: string }; // "Um cuidado que olha para você por inteiro"
```

Ícones sugeridos (reaproveitando o `iconMap` já usado nas categorias de procedimentos): `sparkles` (Estética), `leaf` (Terapias Integrativas), `heartpulse` (Saúde).

## 4. Sobre a Seven Beauties

- `eyebrow`: "A clínica"
- `title`: "Cuidado integrativo para corpo e pele"
- `paragraph`: mantém a apresentação institucional da clínica como espaço que une estética, fisioterapia, terapias integrativas e outras áreas de saúde e bem-estar (texto já redigido na primeira versão do spec, sem necessidade de reescrita — apenas corrigir o Crefito onde citado).
- `signatureName`: "Dra. Rosimeri Celestino Ribeiro"
- `signatureRole`: "Fisioterapeuta • Crefito 8/75223-F"
- `imageUrl`: `/images/modelo_doutora.png` (placeholder local, substitui o Unsplash)

Esta seção mantém o tom institucional/filosófico próximo ao topo da página. A seção 7 ("À frente da Seven Beauties") é um segundo ponto de contato, mais adiante na página, focado em autoridade/confiança — os textos das duas seções não devem ser idênticos, mas os fatos citados devem ser consistentes entre si.

## 5. Tratamentos / Procedimentos

Estrutura por categorias com abas/pills (mantido da versão anterior do spec) — **não** usar grade flat com todos os serviços.

**Estrutura de dados** (substitui `Procedure[]` por `ProcedureCategory[]`):

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

Componente com abas por categoria (pills clicáveis, estado local para categoria ativa) acima da grade de cards. Cada card mostra nome + descrição de 1 linha.

**27 serviços em 5 categorias** (confirmado — "Estética Avançada" do banner original é posicionamento de marca, não um 28º procedimento; não criar card para ele).

Linguagem das descrições **revisada** para tom profissional, informativo e cauteloso — evitar promessas absolutas de resultado ou afirmações categóricas de saúde/estética. Não inventar indicações clínicas, resultados ou benefícios não confirmados pela cliente.

### ✨ Estética Facial (ícone: sparkles)
| Serviço | Descrição |
|---|---|
| Toxina Botulínica | Aplicação indicada para suavização de linhas de expressão, conforme avaliação individual. |
| Fios de PDO | Procedimento voltado à sustentação facial, indicado conforme avaliação. |
| Preenchedores Faciais | Procedimento indicado para contorno e volume facial, conforme avaliação individual. |
| Skinbooster | Procedimento voltado à hidratação profunda da pele. |
| Peeling Químico | Procedimento indicado para renovação da textura da pele, conforme avaliação. |
| Dermaplaning | Técnica de esfoliação suave da pele. |
| Microagulhamento | Procedimento indicado para estímulo de colágeno, conforme avaliação profissional. |
| Rejuvenescimento Facial | Protocolo voltado ao cuidado facial, conforme avaliação individual. |
| Limpeza de Pele | Procedimento de higienização e cuidado profundo da pele. |
| Mesoterapia | Técnica de aplicação de ativos voltada à hidratação da pele. |

### 💎 Estética Corporal (ícone: waves)
| Serviço | Descrição |
|---|---|
| Criolipólise | Procedimento não invasivo voltado ao tratamento de gordura localizada. |
| Drenagem Linfática | Técnica manual voltada à redução de inchaço e melhora da circulação. |
| Massagem Redutora | Técnica manual associada à modelagem corporal, conforme avaliação. |
| Massagem Relaxante | Técnica voltada ao alívio da tensão e ao relaxamento. |
| Massagem Terapêutica | Técnica direcionada ao cuidado de tensões e desconfortos específicos. |
| Massagem Miofascial | Técnica manual voltada à liberação de tensões e melhora da mobilidade. |
| Pós-Operatório | Acompanhamento fisioterapêutico especializado no período pós-cirúrgico. |

### ⚡ Procedimentos Estéticos (ícone: zap)
| Serviço | Descrição |
|---|---|
| Eletroterapia na Estética | Uso de correntes terapêuticas conforme indicação e avaliação profissional. |
| PEIM – Microvasos | Procedimento indicado para tratamento de microvasos, conforme avaliação. |
| Depilação a Laser | Técnica de depilação por tecnologia a laser. |
| Depilação com Cera | Técnica tradicional de depilação com cera. |

### 🌿 Terapias Integrativas (ícone: leaf)
| Serviço | Descrição |
|---|---|
| Acupuntura | Terapia integrativa realizada conforme indicação e avaliação profissional. |
| Auriculoterapia | Técnica de estímulo de pontos auriculares, conforme indicação profissional. |
| Ventosaterapia | Técnica manual voltada ao alívio de tensões musculares. |
| Ozonioterapia | Terapia integrativa realizada conforme indicação e avaliação profissional. |

### 👩‍⚕️ Saúde e Bem-Estar (ícone: heartpulse)
| Serviço | Descrição |
|---|---|
| Nutrição | Acompanhamento nutricional conforme avaliação individual. |
| Fonoaudiologia | Acompanhamento especializado em voz, fala e funções orofaciais. |

**Ícones**: adicionar `waves`, `zap`, `heartpulse` ao `iconMap` (`src/lib/icons.ts`), reaproveitar `sparkles` e `leaf` (também usados nos Pilares). Remover do `iconMap`/tipos os ícones que só serviam aos procedimentos antigos do template Aurelle e não são mais usados (`droplet`, `wand`, `syringe`, `sun`, `heart` — checar contra uso real antes de remover).

## 6. Diferenciais

Quatro cards, textos revisados para evitar linguagem de garantia de segurança ou resultado:

1. **Equipe Multidisciplinar** (ícone: users) — "Profissionais de diferentes áreas trabalhando para oferecer um cuidado mais completo."
2. **Abordagem Integrativa** (ícone: sparkles) — "Estética, fisioterapia e terapias integrativas reunidas em uma abordagem personalizada."
3. **Atendimento Profissional** (ícone: shield) — "Cuidado conduzido por profissionais habilitados e especializados em suas áreas." *(substitui o título anterior "Segurança Clínica", que soava como garantia)*
4. **Plano Personalizado** (ícone: gem) — "Cada pessoa possui necessidades diferentes. Por isso, o tratamento é pensado de acordo com seus objetivos."

## 7. À frente da Seven Beauties (seção nova)

Seção dedicada a apresentar a Dra. Rosimeri, distinta da seção Sobre — foco em autoridade, proximidade e confiança.

- `title`: "À frente da Seven Beauties"
- Nome: "Dra. Rosimeri Celestino Ribeiro"
- Cargo: "Fisioterapeuta"
- Registro: "Crefito 8/75223-F"
- Foto: `public/images/modelo_doutora.png` (placeholder — cliente ainda não enviou a foto real)
- Texto de apoio: apenas reaproveitar informações já estabelecidas no projeto (ex.: papel na condução clínica integrando estética, terapias integrativas e saúde). **Não inventar** formação acadêmica, especializações, anos de experiência ou qualquer dado não fornecido pela cliente.

## 8. Depoimentos

Mantidos como estão (fictícios/placeholder) — decisão intencional nesta etapa. **Não remover a seção. Não alterar a estrutura.** Registrado como pendência futura: substituir por depoimentos reais quando a cliente fornecer material.

## 9. Localização / Contato (seção nova/fortalecida)

Seção própria, próxima ao final da página (antes do CTA final), focada em conversão de visitantes já decididos a visitar a clínica:

- Endereço: "Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230"
- Horário: "Segunda a sexta, das 8h às 18h"
- Mapa embutido (mesmo padrão de embed já usado)
- Botão "Ver no Google Maps" → `contact.mapsUrl`
- Botão de WhatsApp → `contact.whatsapp`

Distinta do bloco de contato no Footer (que é o rodapé padrão do site, presente em todas as páginas); esta seção é um bloco de conversão dedicado, dentro do fluxo da landing page.

## 10. CTA Final

- `eyebrow`: "Vamos começar"
- `title`: "Sua jornada de cuidado começa com uma conversa."
- `subtitle`: "Agende uma avaliação personalizada com nossa equipe."
- `buttonLabel`: "Agendar pelo WhatsApp"

## 11. Footer

- Logo completa (`seven_beauties_logo_vetor.svg`) na coluna de marca.
- Texto de identificação:
  - Seven Beauties
  - Estética Integrativa
  - Dra. Rosimeri Celestino Ribeiro
  - Fisioterapeuta
  - Crefito 8/75223-F
- Telefone: (41) 99610-6171
- Endereço: Rua Frederico Stadler Júnior, 456 - Capão da Imbuia, Curitiba - PR, 82210-230
- Horário: Segunda a sexta, das 8h às 18h
- Link do Google Maps (`contact.mapsUrl`)
- E-mail e redes sociais: continuam opcionais, ícones/linhas só aparecem se os valores existirem. **Não inventar.**

## Metadados (`layout.tsx`)

`<title>` e `description` recalculados a partir de `clinicName` / `positioning` / `positioningDescription` (ex.: title "Seven Beauties — Estética Avançada & Integrativa", description = `positioningDescription`).

## Regras gerais (aplicam-se a todo o projeto)

- Não inventar informações sobre a clínica ou sobre a Dra. Rosimeri.
- Não inventar e-mail.
- Não inventar redes sociais.
- Não inventar formação, especializações ou experiência profissional.
- Não inventar depoimentos adicionais — manter os placeholders existentes.
- Usar `Crefito 8/75223-F` em **todas** as ocorrências do projeto.
- Não alterar a paleta de cores do Tailwind.
- Não transformar "Estética Avançada" em procedimento — é posicionamento de marca ("Estética Avançada & Integrativa").
- Priorizar percepção premium e profissional em toda a UI.
- O resultado final deve ser claramente adaptado à Seven Beauties, não parecer um template Aurelle com textos substituídos.

## Pendências (fora do escopo desta rodada)

- Foto real da Dra. Rosimeri (Sobre e "À frente da Seven Beauties" usam `modelo_doutora.png` como placeholder).
- Vídeo de hero próprio da clínica, incorporando a logo da Seven Beauties.
- Links reais de Instagram/Facebook (quando existirem).
- E-mail de contato (se a cliente quiser exibir um).
- Depoimentos reais de clientes.

## Fora de escopo

- Nenhuma mudança de paleta de cores.
- Nenhuma mudança estrutural na seção de Depoimentos.
- Nenhuma implementação de código nesta etapa (este documento é a especificação; a implementação é a próxima etapa, via plano separado).
