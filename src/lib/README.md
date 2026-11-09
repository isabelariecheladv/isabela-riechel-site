# lib — conteúdo e dados do site

## Visão geral

Camada de dados do site. `site.ts` guarda os valores padrão fixos no código. `sanity.ts` busca o conteúdo editável no Sanity e, quando ele falta, usa esses padrões.

## Interface

- `site.ts:site`: nome, descrição, localização, telefone, e-mail, WhatsApp, `url` (de `NEXT_PUBLIC_SITE_URL`) e `bookingUrl` (de `NEXT_PUBLIC_GOOGLE_BOOKING_URL`).
- `site.ts:services`: as 4 áreas fixas (`direito-das-sucessoes`, `planejamento-patrimonial`, `direito-imobiliario`, `direito-civil`), `as const`.
- `site.ts:suggestedTopics`: pautas sugeridas exibidas quando não há artigos.
- `sanity.ts:sanityEnabled`: `true` quando `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` existem.
- `sanity.ts:getPublicSite()` → `PublicSite` (documento `siteSettings` combinado com `site`; inclui `mapsUrl`, vazio quando não preenchido).
- `sanity.ts:getHomeContent()` → `HomeContent` (documento `homePage`, ou `{}`).
- `sanity.ts:getAboutContent()` → `AboutContent` (documento `aboutPage`, ou `{}`).
- `sanity.ts:getServices()` → `Service[]` (documentos `area-*` combinados com `services`).
- `sanity.ts:getArticles()` / `getArticle(slug)` → `Article[]` / `Article | null`.
- `sanity.ts:getPrivacyContent()` → `PrivacyContent | null` (documento `privacyPage`).
- Tipos: `SiteContent`, `PublicSite`, `HomeContent`, `AboutContent`, `Service`, `Article`, `PrivacyContent`.

## Invariantes

- `sanity.ts` importa `server-only`: só pode ser usado em código de servidor.
- `fetchContent` nunca lança erro: sem cliente ou com falha na consulta, retorna `null` e o chamador usa os padrões de `site.ts`.
- `getServices()` sempre retorna as 4 áreas de `services`, na mesma ordem e com os mesmos `slug`. O Sanity só substitui textos (mapa `documents`: slug → `_id` `area-*`).
- Artigos só aparecem com `legalReview==true`, `defined(publishedAt)` e `publishedAt<=now()`, ordenados por `publishedAt desc`.
- `getPublicSite()` monta `whatsapp` a partir de `phoneDigits` (só dígitos) e só define `showAddress=true` quando `officeAddress` não está vazio.

## Efeitos colaterais

- Consultas HTTP ao Sanity (`useCdn:false`, token opcional `SANITY_READ_TOKEN`) com cache do Next `revalidate: 60`.
- Em caso de falha, `console.error('Consulta Sanity falhou:', …)`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
