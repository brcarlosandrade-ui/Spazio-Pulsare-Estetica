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

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://seven-beauties-integrative.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b2afaa5e-7f82-442c-8b98-a6e203bbe532).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
