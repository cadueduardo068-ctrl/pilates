# Pilates em Casa

React + Vite + TypeScript, Tailwind CSS, Lucide e Framer Motion. Layout central de até 650 px, baseado na estrutura visual de https://dinamicascriativas.netlify.app/. O conteúdo e as condições da página de referência não foram reutilizados.

## Executar

Node 20.19+ ou 22.12+.

```sh
npm ci
npm run dev
```

`npm run build` verifica TypeScript e gera uma versão de revisão em `dist`. Essa versão não significa liberação comercial.

## Concluir a configuração

1. Copie `.env.example` para `.env.local` e informe os dois links diferentes e reais da Cakto, responsável, e-mail, suporte e reembolso.
2. Coloque o vídeo final em `public/videos/pilates.mp4`; habilite `VITE_VIDEO_READY=true`. Substitua a miniatura em `public/images/video-poster.svg` ou ajuste o caminho em `src/config.ts`. Se houver atriz virtual, configure `video.dramatization=true`.
3. Em `src/config.ts`, cadastre `previews` com imagens otimizadas extraídas dos PDFs finais. O carrossel funciona por toque, botões e indicadores quando há imagens. A lista vazia não exibe páginas inventadas.
4. Confira se os PDFs finais correspondem a cada inclusão anunciada. Cadastre somente depoimentos reais e autorizados, marcados como verificados.
5. Revise e finalize os textos de privacidade, termos e reembolso em `src/main.tsx` conforme a operação comercial real. Confirme como ocorre a entrega no checkout; atualize a FAQ se necessário.
6. Após a revisão, defina `VITE_COMMERCIAL_REVIEWED=true`.

## Cloudflare Pages

Diretório raiz: esta pasta. Comando de build: **`npm run build:production`**. Saída: **`dist`**. Configure as variáveis `VITE_` no ambiente de build do Pages; elas são públicas e não devem conter segredos. O comando de produção bloqueia checkouts ausentes, iguais, de exemplo ou fora da Cakto, dados comerciais ausentes e vídeo indisponível. Não configure o comando de revisão como build de publicação.

## Eventos e privacidade

Nenhum rastreador é instalado. O clique no checkout emite somente um evento local `pilates:checkout` por clique quando `localStorage['pilates-analytics-consent']` contém `granted`. Antes de integrar Meta Pixel ou UTMify, implemente a interface de consentimento e um único listener; o consentimento não é concedido pela página atual. Apenas os parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` e `utm_id` são preservados na URL do checkout. Confirme o suporte da Cakto à atribuição antes de usar em campanhas.

## Pendências externas

Vídeo enviado e links específicos da Cakto foram configurados em .env.local. PDFs, prévias reais e informações comerciais ainda aguardam envio. A publicação permanece bloqueada pela revisão comercial pendente. O SVG continua como miniatura gráfica, sem representar página do produto ou depoimento verificado.

