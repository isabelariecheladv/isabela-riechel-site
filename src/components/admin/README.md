# components/admin — painel inicial do Studio

## Visão geral

Tela de visão geral exibida dentro do Sanity Studio, com indicadores do conteúdo.

## Interface

- `AdminOverview.tsx:AdminOverview`: componente cliente (`'use client'`), sem props.

## Invariantes

- Usa `useClient({apiVersion:'2026-03-01'})` e só funciona dentro do Studio.
- Conta como publicados apenas artigos fora de `drafts.**` com `defined(slug.current)`, `legalReview==true`, `defined(publishedAt)` e `publishedAt<=now()`, as mesmas condições de `lib/sanity.ts:getArticles`.
- As contagens de `inquiry` (`status=="novo"`) e o `bookingUrl` de `siteSettings` não excluem rascunhos.
- O cartão de áreas mostra `${areas}/4`, com o total 4 fixo no código.
- Ignora a resposta da consulta se o componente já foi desmontado (flag `active`).

## Efeitos colaterais

- Uma consulta GROQ de leitura ao montar: contagem de `article`, de `inquiry` com `status=="novo"`, de `practiceArea`, e o `bookingUrl` de `siteSettings`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
