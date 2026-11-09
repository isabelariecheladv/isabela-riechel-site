# app/blog — lista de artigos

## Visão geral

Página `/blog`, com os artigos publicados ou, quando não há artigos, as pautas sugeridas.

## Interface

- `page.tsx:metadata` (canônica `/blog`), `page.tsx:Blog`.
- Subdiretório: [[slug]](<./[slug]/README.md>) — página de cada artigo.

## Invariantes

- Sem artigos, mostra `suggestedTopics` com o rótulo de pauta sugerida, nunca como artigo publicado.

## Efeitos colaterais

- Lê o Sanity via `getArticles()`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
