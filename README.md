# Seven Beauties: Estética Integrativa

Vamos criar um site para uma clinica de estética, saúde e bem estar. 
Eu extrai um design system de um site que podemos usar como modelo está em anexo o arquivo .md
vou te passar todos os dados da clinica abaixo:

## Posicionamento de marca

- **Nome**: Seven Beauties

- **Tagline**: Estética Integrativa

- **Posicionamento principal** (headline conceitual da marca, usado em copy institucional/meta description, **não** como nome de procedimento): **"Estética Avançada & Integrativa"**

- **Descrição de marca**: "Tratamentos faciais, corporais e terapias integrativas personalizados para você."


`"Estética Avançada"` é conceito de posicionamento — **não deve virar um card de procedimento** na seção de tratamentos.

---
##Paleta

Fique a vontade para colocar as cores, a principio o que imaginei foi isso:
- **Paleta**: Tailwind (`dustyRose`, `roseTaupe`, `warmWhite`, `champagne`, `graphite`). Mas o uso deve ser mais sofisticado e equilibrado — evitar aparência excessivamente "rosa", infantil ou de salão de beleza genérico. A página deve transmitir estética premium, elegância, feminilidade sofisticada, confiança, cuidado, saúde e bem-estar.

---
## Conteúdo institucional 

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
---
Inclua animações discretas e respeite prefers-reduced-motion.

- Criar uma faixa/marquee com uma cor que combine com estilo,  contínua com textos como:

  “ESTÉTICA FACIAL • ESTÉTICA CORPORAL • TERAPIAS INTEGRATIVAS • SAÚDE • BEM ESTAR • ESTÉTICA AVANÇADA”

- Movimento da direita para a esquerda, linear, infinito e suave.

- Duplicar a sequência de textos no trilho para o loop ser contínuo, sem salto visível.

- Duração aproximada: 34 segundos no desktop; ajustar para manter legibilidade no mobile.

- Pausar a animação quando o usuário passar o mouse ou navegar por teclado sobre a faixa, se ela tiver links.

- Reduzir ou desativar movimentos para usuários com `prefers-reduced-motion`.

- Usar animações apenas como acabamento: entradas suaves no hero, leve flutuação de elementos decorativos e ícones, sem excesso.

---
Se tiver duvida em alguma seção ou qquer coisa me pergunte antes

Este projeto foi iniciado no [Lovable](https://lovable.dev) e depois baixado
para desenvolvimento direto neste repositório — **não está mais sincronizado
com o editor do Lovable**.

**Live app**: https://seven-beauties-murex.vercel.app

## Domínio do site (SEO / prévia de link)

O domínio público usado nas tags `og:url`, `canonical` e na imagem de
prévia (`og:image`/`twitter:image` — a miniatura que aparece ao
compartilhar o link no WhatsApp etc.) fica centralizado na constante
`siteUrl` em [`src/lib/clinic.ts`](src/lib/clinic.ts).

**Ao configurar um domínio próprio, atualize só essa constante** — os
outros arquivos (`src/routes/__root.tsx` e `src/routes/index.tsx`) já
leem o valor de lá.

## Antes & Depois (posts do Instagram)

A seção pública "Antes & Depois" lê uma planilha do Google Sheets mantida
pela própria clínica, com duas colunas: `url` (link do post do Instagram) e
`ativo` (SIM/NÃO). Não existe mais página de admin nem senha — a clínica
adiciona um caso novo direto na planilha.

Passo a passo pra clínica publicar um novo caso:

1. Postar o antes/depois no Instagram normalmente.
2. Copiar o link da publicação.
3. Abrir a planilha "Antes & Depois", colar o link numa linha nova e marcar
   `ativo` como `SIM`.
4. O site atualiza sozinho em até ~5 minutos (tempo de cache).

Configuração (uma vez só):

1. Criar a planilha com as colunas `url` e `ativo`.
2. `Arquivo > Compartilhar > Publicar na Web`, formato **CSV**. Isso gera uma
   URL pública tipo `https://docs.google.com/spreadsheets/d/e/SEU_ID/pub?output=csv`.
3. Colocar essa URL na variável `INSTAGRAM_SHEET_CSV_URL`, listada em
   `.env.example`.

Para desenvolvimento local, copie `.env.example` para `.env` e preencha o
valor (esse arquivo não é versionado). Na Vercel, configure a mesma variável
em Project Settings > Environment Variables.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
