# Vídeo de abertura (intro splash)

Coloque aqui os arquivos do vídeo de abertura exibido antes do site carregar:

- `intro.mp4` — obrigatório.
- `intro.webm` — opcional, mas recomendado (melhor compressão em navegadores compatíveis).

Nenhum outro arquivo do projeto precisa mudar — o componente `src/components/IntroSplash.tsx`
já referencia `/videos/intro.mp4` e `/videos/intro.webm`. Se os arquivos não existirem, o site
carrega normalmente (a intro é pulada automaticamente).
