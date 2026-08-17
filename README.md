# Seven Beauties: EstÃ©tica Integrativa

Vamos criar um site para uma clinica de estÃ©tica, saÃºde e bem estar. 
Eu extrai um design system de um site que podemos usar como modelo estÃ¡ em anexo o arquivo .md
vou te passar todos os dados da clinica abaixo:

## Posicionamento de marca

- **Nome**: Seven Beauties

- **Tagline**: EstÃ©tica Integrativa

- **Posicionamento principal** (headline conceitual da marca, usado em copy institucional/meta description, **nÃ£o** como nome de procedimento): **"EstÃ©tica AvanÃ§ada & Integrativa"**

- **DescriÃ§Ã£o de marca**: "Tratamentos faciais, corporais e terapias integrativas personalizados para vocÃª."


`"EstÃ©tica AvanÃ§ada"` Ã© conceito de posicionamento â€” **nÃ£o deve virar um card de procedimento** na seÃ§Ã£o de tratamentos.

---
##Paleta

Fique a vontade para colocar as cores, a principio o que imaginei foi isso:
- **Paleta**: Tailwind (`dustyRose`, `roseTaupe`, `warmWhite`, `champagne`, `graphite`). Mas o uso deve ser mais sofisticado e equilibrado â€” evitar aparÃªncia excessivamente "rosa", infantil ou de salÃ£o de beleza genÃ©rico. A pÃ¡gina deve transmitir estÃ©tica premium, elegÃ¢ncia, feminilidade sofisticada, confianÃ§a, cuidado, saÃºde e bem-estar.

---
## ConteÃºdo institucional 

- `clinicName`: "Seven Beauties"

- `tagline`: "EstÃ©tica Integrativa"

- `positioning`: "EstÃ©tica AvanÃ§ada & Integrativa" *(novo campo â€” headline de posicionamento, usado em copy institucional/metadata, nÃ£o em UI de procedimento)*

- `positioningDescription`: "Tratamentos faciais, corporais e terapias integrativas personalizados para vocÃª." *(novo campo)*

- `contact.phone`: "(41) 99610-6171"

- `contact.whatsapp`: gerado a partir do telefone (`5541996106171`), mesma mensagem padrÃ£o de agendamento

- `contact.address`: "Rua Frederico Stadler JÃºnior, 456 - CapÃ£o da Imbuia, Curitiba - PR, 82210-230"

- `contact.hours`: "Segunda a sexta, das 8h Ã s 18h"

- `contact.mapsUrl`: `https://maps.app.goo.gl/3mRjeqNLjDRRwJ3y7`

- `contact.email`: sem valor â€” campo opcional (`email?: string`); linha some da UI quando ausente. **NÃ£o inventar e-mail.**

- `social.instagram` / `social.facebook`: sem valor por enquanto â€” campos opcionais; UI sÃ³ renderiza os Ã­cones cujo valor existir. **NÃ£o inventar redes sociais.**
---
Inclua animaÃ§Ãµes discretas e respeite prefers-reduced-motion.

- Criar uma faixa/marquee com uma cor que combine com estilo,  contÃ­nua com textos como:

  â€œESTÃ‰TICA FACIAL â€¢ ESTÃ‰TICA CORPORAL â€¢ TERAPIAS INTEGRATIVAS â€¢ SAÃšDE â€¢ BEM ESTAR â€¢ ESTÃ‰TICA AVANÃ‡ADAâ€

- Movimento da direita para a esquerda, linear, infinito e suave.

- Duplicar a sequÃªncia de textos no trilho para o loop ser contÃ­nuo, sem salto visÃ­vel.

- DuraÃ§Ã£o aproximada: 34 segundos no desktop; ajustar para manter legibilidade no mobile.

- Pausar a animaÃ§Ã£o quando o usuÃ¡rio passar o mouse ou navegar por teclado sobre a faixa, se ela tiver links.

- Reduzir ou desativar movimentos para usuÃ¡rios com `prefers-reduced-motion`.

- Usar animaÃ§Ãµes apenas como acabamento: entradas suaves no hero, leve flutuaÃ§Ã£o de elementos decorativos e Ã­cones, sem excesso.

---
Se tiver duvida em alguma seÃ§Ã£o ou qquer coisa me pergunte antes

Este projeto foi iniciado no [Lovable](https://lovable.dev) e depois baixado
para desenvolvimento direto neste repositÃ³rio â€” **nÃ£o estÃ¡ mais sincronizado
com o editor do Lovable**.

**Live app**: https://seven-beauties-murex.vercel.app

## DomÃ­nio do site (SEO / prÃ©via de link)

O domÃ­nio pÃºblico usado nas tags `og:url`, `canonical` e na imagem de
prÃ©via (`og:image`/`twitter:image` â€” a miniatura que aparece ao
compartilhar o link no WhatsApp etc.) fica centralizado na constante
`siteUrl` em [`src/lib/clinic.ts`](src/lib/clinic.ts).

**Ao configurar um domÃ­nio prÃ³prio, atualize sÃ³ essa constante** â€” os
outros arquivos (`src/routes/__root.tsx` e `src/routes/index.tsx`) jÃ¡
leem o valor de lÃ¡.


## Antes & Depois (upload de fotos pela clínica)

A seção pública "Antes & Depois" e a página /admin/antes-depois dependem de
uma conta Cloudinary (da clínica, não sua — ver decisão no design doc) e de
quatro variáveis de ambiente, listadas em .env.example:

- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET — em
  Cloudinary Console > Settings > Access Keys.
- UPLOAD_PASSWORD — senha simples que protege a página de upload.

Para desenvolvimento local, copie .env.example para .env e preencha os
valores (esse arquivo não é versionado). Na Vercel, configure as mesmas
variáveis em Project Settings > Environment Variables.

## Development

Prefer working locally? You need Node.js and npm â€” [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

