# Pilates em Casa

React + Vite + TypeScript, Tailwind CSS, Lucide e Framer Motion. Layout central de até 650 px, baseado na estrutura visual de https://dinamicascriativas.netlify.app/. O conteúdo e as condições da página de referência não foram reutilizados.

## Executar

Node 20.19+ ou 22.12+.

```sh
npm ci
npm run dev
```

`npm run build` e `npm run build:production` verificam TypeScript e geram o site em `dist`. O build não exige variáveis comerciais; sem links válidos, os botões de compra permanecem desabilitados.

## Concluir a configuração

1. Copie `.env.example` para `.env.local` e informe os dois links diferentes e reais da Cakto, responsável, e-mail, suporte e reembolso.
2. O vídeo em `public/videos/pilates.mp4` é exibido automaticamente, sem variável de ambiente. Substitua a miniatura em `public/images/video-poster.svg` ou ajuste o caminho em `src/config.ts`. Se houver atriz virtual, configure `video.dramatization=true`.
3. Em `src/config.ts`, cadastre `previews` com imagens otimizadas extraídas dos PDFs finais. O carrossel funciona por toque, botões e indicadores quando há imagens. A lista vazia não exibe páginas inventadas.
4. Confira se os PDFs finais correspondem a cada inclusão anunciada. Cadastre somente depoimentos reais e autorizados, marcados como verificados.
5. Revise e finalize os textos de privacidade, termos e reembolso em `src/main.tsx` conforme a operação comercial real. Confirme como ocorre a entrega no checkout; atualize a FAQ se necessário.
6. Após a revisão, defina `VITE_COMMERCIAL_REVIEWED=true`.

## Cloudflare Workers e Pages

No Workers Builds, use esta pasta como diretório raiz, **`npm run build:production`** como comando de build e **`npx wrangler deploy`** como comando de deploy. O `wrangler.toml` publica os arquivos de `dist` no Worker `pilates`, incluindo o fallback de navegação da aplicação. Não é necessário um Worker com código “Hello World”.

Para Cloudflare Pages, use o mesmo comando de build e **`dist`** como diretório de saída; o deploy é gerenciado pelo Pages.

As variáveis `VITE_` são opcionais para publicar o site e públicas: não devem conter segredos. Configure-as no ambiente de build para habilitar checkouts e preencher informações comerciais. A verificação comercial pode ser executada separadamente com **`npm run validate:commercial`**; ela não bloqueia build nem deploy.

## Eventos e privacidade

Nenhum rastreador é instalado. O clique no checkout emite somente um evento local `pilates:checkout` por clique quando `localStorage['pilates-analytics-consent']` contém `granted`. Antes de integrar Meta Pixel ou UTMify, implemente a interface de consentimento e um único listener; o consentimento não é concedido pela página atual. Apenas os parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` e `utm_id` são preservados na URL do checkout. Confirme o suporte da Cakto à atribuição antes de usar em campanhas.

## Pendências externas

O vídeo está presente em `public/videos/pilates.mp4` e é exibido automaticamente. Links da Cakto e dados comerciais devem ser configurados no ambiente de build; arquivos `.env.local` não são versionados. PDFs, prévias reais e informações comerciais ainda aguardam envio. O site pode ser publicado enquanto esses dados são preparados. O SVG continua como miniatura gráfica, sem representar página do produto ou depoimento verificado.

