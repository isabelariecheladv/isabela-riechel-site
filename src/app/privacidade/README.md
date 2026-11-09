# app/privacidade — política de privacidade

## Visão geral

Página `/privacidade`.

## Interface

- `page.tsx:metadata` (`robots: index:false, follow:true`), `page.tsx:Privacy`.

## Invariantes

- Mostra o texto do Sanity só se `legal.approved` for `true` e `body` não estiver vazio. Caso contrário, mostra a minuta fixa no código, marcada como sujeita a revisão.

## Efeitos colaterais

- Lê o Sanity via `getPublicSite()` e `getPrivacyContent()`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
