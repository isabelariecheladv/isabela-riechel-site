# app/blog/[slug] — página de artigo

## Visão geral

Página de um artigo jurídico em `/blog/<slug>`.

## Interface

- `page.tsx:generateStaticParams()`: slugs de `getArticles()`.
- `page.tsx:generateMetadata({params})`: título, `excerpt` e URL canônica `/blog/<slug>`.
- `page.tsx:ArticlePage({params})`: renderiza `body` com `PortableText`.

## Invariantes

- Artigo não encontrado (ou sem revisão jurídica, ou com data futura) chama `notFound()`.
- Toda página termina com o aviso de conteúdo informativo.

## Efeitos colaterais

- Lê o Sanity via `getArticle(slug)` e `getArticles()`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
