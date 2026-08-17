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

## Antes & Depois (upload de fotos pela clínica)

A seção pública "Antes & Depois" e a página `/admin/antes-depois` dependem de
uma conta Cloudinary (da clínica, não sua — ver decisão no design doc) e de
quatro variáveis de ambiente, listadas em `.env.example`:

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — em
  Cloudinary Console > Settings > Access Keys.
- `UPLOAD_PASSWORD` — senha simples que protege a página de upload.

Para desenvolvimento local, copie `.env.example` para `.env` e preencha os
valores (esse arquivo não é versionado). Na Vercel, configure as mesmas
variáveis em Project Settings > Environment Variables.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
