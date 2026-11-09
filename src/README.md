# src — site Isabela Riechel (blueprint)

## Visão geral do sistema

Site institucional em Next.js (App Router) com conteúdo editável no Sanity. As páginas leem o Sanity no servidor e, quando ele não está configurado ou falha, usam os textos padrão do código. O formulário de contato envia para a caixa privada do Sanity e/ou por e-mail (Resend).

## Subdiretórios e fronteiras

- app: [./app/README.md](./app/README.md) — rotas, layout global, SEO e a API `POST /api/contato`.
- components: [./components/README.md](./components/README.md) — `Header`, `Footer`, `ContactForm`, `Booking` e `admin/AdminOverview`.
- lib: [./lib/README.md](./lib/README.md) — padrões fixos (`site`, `services`, `suggestedTopics`) e funções de leitura do Sanity (`getPublicSite`, `getServices`, `getArticles`…).
- sanity: [./sanity/README.md](./sanity/README.md) — esquemas do Studio (`schemaTypes`).

## Invariantes globais

- Acesso ao Sanity no servidor passa por `lib/sanity.ts` (`server-only`); a única exceção é a gravação de `inquiry` em `app/api/contato/route.ts`.
- O site precisa funcionar sem Sanity: toda leitura tem padrão em `lib/site.ts` ou no próprio componente.
- As 4 áreas de atuação e seus `slug` são fixos no código; o Sanity só altera os textos.
- Artigos só ficam públicos com `defined(slug.current)`, `legalReview==true` e `publishedAt<=now()` (`lib/sanity.ts`); a contagem do painel (`components/admin`) usa as mesmas condições.
- As opções de assunto de `ContactForm` precisam bater com o `z.enum` da API.

## Efeitos colaterais globais

- Leitura do Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_READ_TOKEN`).
- Gravação de `inquiry` no Sanity (`SANITY_INBOX_WRITE_TOKEN`, `SANITY_PRIVATE_DATASET`).
- Envio de e-mail pelo Resend (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`).

## Verificação do sistema

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
