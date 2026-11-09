# app/atuacao/[slug] — página de uma área

## Visão geral

Página de detalhe de cada área de atuação em `/atuacao/<slug>`.

## Interface

- `page.tsx:generateStaticParams()`: os 4 `slug` de `services` em `lib/site.ts`.
- `page.tsx:generateMetadata({params})`: título `<área> em Londrina`, `seoDescription` (ou `short`) e canônica `/atuacao/<slug>`.
- `page.tsx:Service({params})`: a página.

## Invariantes

- Um `slug` que não existe em `getServices()` chama `notFound()`; `generateMetadata` retorna `{}` nesse caso.
- O rótulo `{s.number} / 04` tem o total de áreas escrito à mão.
- O título é dividido para deixar a última palavra em itálico.

## Efeitos colaterais

- Lê o Sanity via `getServices()`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
