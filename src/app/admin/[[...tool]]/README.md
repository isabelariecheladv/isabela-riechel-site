# app/admin/[[...tool]] — rota /admin

## Visão geral

Monta o Sanity Studio em `/admin` e em todas as subrotas.

## Interface

- `page.tsx:Admin`: renderiza `Studio`.
- `Studio.tsx:Studio` (`'use client'`): renderiza `NextStudio` com o `sanity.config.ts` da raiz. O Sanity precisa ficar no cliente; importado no servidor, o build falha (export padrão do `swr` inexistente).
- `page.tsx:dynamic = 'force-dynamic'` e `page.tsx:metadata` (`robots: index:false, follow:false`).
- `layout.tsx:AdminLayout`: envolve a página em `.studio-page`.

## Invariantes

- Sem `NEXT_PUBLIC_SANITY_PROJECT_ID` ou `NEXT_PUBLIC_SANITY_DATASET`, mostra instruções de configuração em vez do Studio.
- A rota não é indexada (`metadata.robots` e `app/robots.ts`).

## Efeitos colaterais

- Nenhum no servidor. O login e a edição acontecem no Studio, pelo navegador, com a conta Sanity.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
