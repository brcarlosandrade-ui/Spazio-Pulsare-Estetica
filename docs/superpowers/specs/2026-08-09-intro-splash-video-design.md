# Intro Splash Video — Design

## Contexto

O site (`Seven Beauties`, TanStack Start + React 19, rota única `/` em `src/routes/index.tsx`) vai ganhar uma intro em vídeo (~4s, com a logo da clínica) que toca em tela cheia antes de revelar o site. O vídeo em si será fornecido depois pelo usuário; este trabalho deixa a mecânica pronta para receber o arquivo.

## Componente

Novo componente `src/components/IntroSplash.tsx`, usado dentro de `Home()` em `src/routes/index.tsx`, envolvendo o retorno atual (header/main/footer). Não entra em `__root.tsx`, para não afetar páginas de erro/404.

```tsx
function Home() {
  return (
    <IntroSplash>
      <div className="min-h-screen bg-background">
        <Header />
        ...
      </div>
    </IntroSplash>
  );
}
```

`IntroSplash` renderiza os `children` normalmente (o site já monta e carrega por baixo) e, por cima, uma camada `fixed inset-0 z-[100]` com o vídeo, controlada por estado local.

## Arquivo de vídeo

- `public/videos/intro.mp4` — obrigatório.
- `public/videos/intro.webm` — opcional, usado como `<source>` alternativa antes do mp4 (melhor compressão em browsers compatíveis).

O usuário solta os arquivos com esses nomes nessa pasta; nenhum outro código precisa mudar.

## Comportamento / estado

- **Estado inicial (SSR-safe):** `visible` começa `true` sempre (tanto no server quanto no primeiro render client), evitando mismatch de hidratação — o servidor não tem como saber se é a primeira visita da aba.
- **Checagem de sessão:** em `useEffect` (só roda no client, depois do mount), lê `sessionStorage.getItem('sb-intro-seen')`.
  - Se já existe → esconde a intro imediatamente, sem animação de fade (o usuário nunca chega a ver o vídeo).
  - Se não existe → mantém a intro visível, toca o vídeo e segue o fluxo abaixo.
- **Fim natural:** evento `onEnded` do `<video>` dispara o fade-out.
- **Timeout de segurança:** `setTimeout` de 4000ms também dispara o fade-out (cobre o caso do vídeo não disparar `onEnded` por algum motivo, ou durar mais que o esperado).
- **Clique/toque em qualquer lugar da camada:** pula na hora (mesmo fade-out).
- **`prefers-reduced-motion: reduce`:** checado no mesmo `useEffect` — se ativo, esconde a intro imediatamente, sem sequer tentar tocar o vídeo.
- **Erro ao carregar o vídeo (`onError`):** esconde a intro imediatamente. Garante que um arquivo ausente/corrompido nunca trava o acesso ao site — hoje, sem o arquivo, é exatamente o caminho que vai rodar em dev.
- **Fade-out:** transição CSS de opacidade (~400ms) antes de desmontar a camada (`pointer-events-none` já no início do fade, para não bloquear cliques no site enquanto some).
- **Marcar como visto:** ao disparar qualquer um dos gatilhos de saída (fim, timeout, clique, erro, reduced-motion), grava `sessionStorage.setItem('sb-intro-seen', '1')`.

## Vídeo em si

- `<video autoPlay muted playsInline preload="auto">` — `muted` + `playsInline` são obrigatórios para autoplay funcionar em mobile (iOS Safari em especial).
- `object-fit: cover`, ocupando a tela cheia.
- Fundo da camada usa `var(--color-background)` (mesmo warm-white do site) atrás do vídeo, evitando flash branco/preto durante o carregamento.
- Sem controles, sem loop (o timeout/onEnded cuida do encerramento em 4s mesmo que o arquivo enviado seja mais longo).

## Fora de escopo

- Não há necessidade de testar em navegadores sem suporte a `<video>` (baseline moderno já cobre isso via fallback de erro).
- Sem configuração/CMS para ligar/desligar a intro — é comportamento fixo por ora.
- Sem versionamento do vídeo em si (arquivo será adicionado depois, fora deste trabalho).
