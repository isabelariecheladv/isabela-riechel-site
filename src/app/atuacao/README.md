# app/atuacao — lista de áreas de atuação

## Visão geral

Página `/atuacao`, com a lista das 4 áreas e link para o detalhe de cada uma.

## Interface

- `page.tsx:metadata` (título com Londrina, canônica `/atuacao`), `page.tsx:Practice`.
- Subdiretório: [[slug]](<./[slug]/README.md>) — página de cada área.

## Invariantes

- A lista vem de `getServices()`, então mantém sempre as 4 áreas fixas.
- O rótulo `{s.number} / 04` tem o total escrito à mão (também em `[slug]/page.tsx` e `app/page.tsx`).

## Efeitos colaterais

- Lê o Sanity via `getServices()`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
