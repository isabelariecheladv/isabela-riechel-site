# app/contato — página de contato

## Visão geral

Página `/contato`, com WhatsApp, e-mail, localização, agendamento e formulário.

## Interface

- `page.tsx:metadata`, `page.tsx:Contact`. Usa `Booking` e `ContactForm` de [components](../../components/README.md).

## Invariantes

- O endereço só aparece quando `site.showAddress` é `true`.
- `Booking` só aparece quando `site.bookingUrl` começa com `https://`; sem agenda, o WhatsApp do bloco de contatos é o único atalho para ele na página.
- `metadata.alternates.canonical` é `/contato`.

## Efeitos colaterais

- Lê o Sanity via `getPublicSite()`. O envio do formulário é feito por `ContactForm`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
