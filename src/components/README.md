# components — componentes de interface

## Visão geral

Componentes React compartilhados pelas páginas do site público.

## Interface

- `Header.tsx:Header`: cabeçalho e menu (`'use client'`). Itens: Sobre, Atuação, Artigos, Contato (o logo leva ao início).
- `Footer.tsx:Footer({site, services})`: rodapé. Recebe `PublicSite` e `Service[]` de `lib/sanity.ts`.
- `ContactForm.tsx:ContactForm()`: formulário de contato (`'use client'`), sem props.
- `Booking.tsx:Booking({light, bookingUrl, whatsapp, bookingHelp, bookingMode})`: cartão de agendamento.
- Subdiretório: [admin](./admin/README.md) — `AdminOverview` do Studio.

## Invariantes

- `Booking` só usa `bookingUrl` se começar com `https://`; caso contrário, o botão aponta para o WhatsApp.
- `Booking` traduz `bookingMode`: `online`, `in-person`, qualquer outro valor = presencial ou online. A prop `light` adiciona a classe `booking-light`.
- `Booking` usa `lib/site.ts:site.whatsapp` como padrão da prop `whatsapp`. As páginas passam o valor de `getPublicSite()`, que pode vir do Sanity.
- `ContactForm` envia `name`, `email`, `phone`, `subject`, `message`, `consent=yes` e o honeypot `website`. As opções de `subject` precisam bater com o `z.enum` de `app/api/contato/route.ts`.
- `ContactForm` mostra o aviso de canal não configurado quando a API responde `code: 'NOT_CONFIGURED'`.
- `Header` marca o item atual por `usePathname()` (igualdade ou prefixo, exceto `/`).

## Efeitos colaterais

- `ContactForm`: `fetch('/api/contato', {method:'POST'})` com JSON; limpa o formulário quando o envio dá certo.
- Os demais componentes não têm efeitos colaterais.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
