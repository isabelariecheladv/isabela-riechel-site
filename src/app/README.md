# app — rotas do Next.js (App Router)

## Visão geral

Todas as páginas e a API do site. Os arquivos da raiz definem o layout global, a página inicial, a página 404, o `robots.txt` e o `sitemap.xml`.

## Interface

- `layout.tsx:generateMetadata()`: título, descrição e Open Graph a partir de `getPublicSite()`.
- `layout.tsx:RootLayout`: `<html lang="pt-BR">`, JSON-LD `LegalService`, `Header`, `<main id="conteudo">` e `Footer`.
- `page.tsx:Home`: página inicial (hero com "Solicitar atendimento" como ação principal, áreas, manifesto, sobre, até 3 artigos, chamada de contato). `page.tsx:metadata` define a URL canônica `/`.
- `icon.svg`: favicon quadrado com o monograma (o Google mostra o ícone nos resultados).
- `not-found.tsx:NotFound`: página 404.
- `robots.ts:robots()`: libera `/` e bloqueia `/admin`, `/studio` e `/api/`.
- `sitemap.ts:sitemap()`: páginas fixas, as 4 áreas e os artigos publicados.
- `studio/page.tsx:LegacyStudio`: redireciona `/studio` para `/admin` (sem README próprio).
- Subdiretórios:
  - [admin/[[...tool]]](<./admin/[[...tool]]/README.md>) — Sanity Studio em `/admin`.
  - [api/contato](./api/contato/README.md) — `POST /api/contato`.
  - [atuacao](./atuacao/README.md) — áreas de atuação.
  - [blog](./blog/README.md) — artigos.
  - [contato](./contato/README.md) — página de contato.
  - [privacidade](./privacidade/README.md) — política de privacidade.
  - [sobre](./sobre/README.md) — página Sobre.

## Invariantes

- O JSON-LD escapa `<` como `<` antes de entrar em `dangerouslySetInnerHTML`.
- `streetAddress` só entra no JSON-LD quando `showAddress` é `true`.
- O JSON-LD `LegalService` inclui `image`, `areaServed` (Londrina) e `sameAs` com Instagram, LinkedIn e `mapsUrl` quando preenchidos; `hasMap` só entra com `mapsUrl`.
- A seção de artigos da home só aparece quando existe ao menos um artigo publicado.
- Cada página indexável declara `alternates.canonical`; o `layout.tsx` não define canônica para não herdar `/` em todas.
- Os textos da página inicial têm padrão no código para cada campo vazio de `homePage`.
- `metadataBase` e o sitemap usam `site.url` (`NEXT_PUBLIC_SITE_URL`).
- Sem `seoImageUrl`, o Open Graph usa `/images/hero-poltrona.webp`.
- `sitemap.ts` lista as áreas a partir de `services` fixo (`lib/site.ts`), não de `getServices()`, e não inclui `/privacidade` (que é `noindex`).

## Efeitos colaterais

- Leituras do Sanity via `lib/sanity.ts` (cache de 60 s).

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
