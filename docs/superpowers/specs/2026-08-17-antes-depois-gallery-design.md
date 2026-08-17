# Antes & Depois — Design

## Contexto

O site (Spazio Pulsare, TanStack Start + React 19, hospedado na Vercel) vai ganhar uma seção pública "Antes & Depois" com fotos de resultados de pacientes. A cliente (dona da clínica) precisa conseguir publicar novas fotos sozinha, sem depender de deploy ou pedido ao desenvolvedor a cada atualização.

## Visão geral do fluxo

1. A cliente acessa uma página administrativa `/admin/antes-depois` (sem link em nenhum menu — URL passada diretamente a ela), preenche senha, nome do tratamento, um rótulo do caso, e seleciona as duas fotos (antes / depois), e envia.
2. Uma server function confere a senha e, se válida, sobe as duas imagens ao Cloudinary via SDK Node.js, já nomeadas e marcadas com uma tag.
3. A seção pública "Antes & Depois" chama outra server function que lista as imagens marcadas no Cloudinary, casa os pares pelo nome, e renderiza.

Nenhuma credencial do Cloudinary é exposta ao navegador — todo o acesso à API (upload e listagem) acontece em código server-side (server functions do TanStack Start, mesmo padrão já usado pelo middleware em `src/start.ts`).

## Cloudinary

- Conta própria da clínica no Cloudinary (plano gratuito cobre o volume esperado).
- Pasta única `spazio-pulsare/antes-depois/`.
- Convenção de nome gerada pelo servidor a partir do formulário (a cliente não precisa nomear arquivos): `{tratamento-slug}-{caso-slug}-antes` e `{tratamento-slug}-{caso-slug}-depois`, onde slug = minúsculas, sem acento, espaços viram hífen.
- Tag `antes-depois` em ambos os arquivos de cada par, usada para a listagem.
- Credenciais como variáveis de ambiente na Vercel (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`), mais `UPLOAD_PASSWORD` para a senha da página admin.

## Server functions (`src/server/antes-depois.ts`)

- `uploadAntesDepois`: recebe senha, tratamento, rótulo do caso, arquivo "antes", arquivo "depois". Confere a senha contra `UPLOAD_PASSWORD` antes de qualquer chamada ao Cloudinary; se inválida, retorna erro sem gastar chamada de API. Se válida, sobe as duas imagens via `cloudinary.uploader.upload`, usando o `public_id` e a tag descritos acima.
- `listAntesDepois`: chama a Admin API do Cloudinary (`resources_by_tag('antes-depois')`), agrupa os arquivos por prefixo do nome (tudo antes de `-antes` / `-depois`), e retorna uma lista ordenada (mais recente primeiro) de `{ treatment, caseLabel, beforeUrl, afterUrl }`.

## Página admin (`src/routes/admin.antes-depois.tsx`)

- Rota `/admin/antes-depois`, não referenciada em nenhum menu de navegação.
- Formulário: campo de senha, campo "Tratamento", campo "Nome/rótulo do caso", dois seletores de arquivo (Antes / Depois), botão Enviar.
- Estados de carregando/sucesso/erro; em erro (senha errada, upload falhou, arquivo faltando), mostra mensagem inline sem limpar os campos já preenchidos.
- Sem sessão/login — a senha é conferida a cada envio. Suficiente como trava simples; não é o mesmo nível de segurança de uma autenticação real (ver "Fora de escopo").

## Seção pública

- Novo componente `AntesDepois()` em `src/routes/index.tsx` (mesmo padrão das seções existentes: `SectionHead`, `Reveal`, paleta de cores do site).
- Posição no fluxo da página: depois de "Sobre" e antes de "Depoimentos" — mostra prova de resultado logo após a cliente conhecer a clínica, e antes do reforço social dos depoimentos.
- Busca os pares via a server function `listAntesDepois` usando `useQuery` (react-query já configurado no `router.tsx`).
- Cada par renderiza como cartão com as duas fotos lado a lado (não é um slider de comparação arrastável — mantém simples, sem nova dependência), com o nome do tratamento como legenda.
- Estado vazio (nenhum par publicado ainda): a seção não aparece — não mostra placeholder nem erro ao público.

## Tratamento de erro

- Falha ao listar (Cloudinary fora do ar, credenciais erradas, variáveis de ambiente ausentes): a seção pública some silenciosamente (loga no servidor); nunca derruba o restante da página.
- Falha ao subir: a página admin mostra a mensagem de erro; a cliente tenta de novo.
- Reenvio do mesmo tratamento + mesmo rótulo de caso: sobrescreve o par anterior no Cloudinary (mesmo `public_id`) — comportamento aceitável para v1, sem tratamento especial.

## Fora de escopo (v1)

- Apagar ou editar um caso já publicado pelo site — a cliente faz isso direto pelo painel do Cloudinary quando precisar.
- Aprovação/moderação antes de publicar — o que sobe aparece na hora.
- Autenticação real por usuário — só uma senha compartilhada.
- Testes automatizados do fluxo de upload (o projeto não tem suíte de testes hoje).
