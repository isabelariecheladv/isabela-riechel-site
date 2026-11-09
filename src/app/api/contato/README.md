# app/api/contato — API do formulário de contato

## Visão geral

Recebe o formulário de contato, valida os dados e entrega a mensagem pela caixa privada do Sanity, por e-mail (Resend), ou pelos dois.

## Interface

- `route.ts:POST(request)`. Corpo JSON validado por `contactSchema` (zod): `name` (2–100), `email` (até 160), `phone` (até 30, opcional), `subject` (enum com 5 opções), `message` (10–600), `consent` (`'yes'`), `website` (honeypot).
- Respostas: `200 {ok, channel: 'both'|'inbox'|'email'}`, `400`, `413`, `415`, `429`, `502`, `503 {code:'NOT_CONFIGURED'}`.

## Invariantes

- Só aceita `content-type` JSON (senão 415).
- Recusa com 413 quando o cabeçalho `content-length` ou o corpo lido (`request.text()`) passa de 5000 caracteres.
- A ordem das verificações é: tipo, tamanho, JSON, honeypot, `contactSchema`, limite por IP, canais configurados.
- Com `website` preenchido, responde `{ok:true}` sem salvar nem enviar nada, mesmo que os outros campos sejam inválidos.
- `email` não passa por `trim()` (diferente de `name`, `phone` e `message`).
- Limite de 5 envios por IP (`x-forwarded-for`) por hora, guardado no `Map` `throttle` em memória. Ele zera quando o processo reinicia e não é compartilhado entre instâncias. Entradas vencidas são removidas a cada envio contado.
- Só conta para o limite o envio que passa da checagem de canais: respostas 503 não consomem a cota.
- Caixa privada ativa só com `SANITY_PRIVATE_DATASET==='true'`, `SANITY_INBOX_WRITE_TOKEN`, `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`.
- E-mail ativo só com `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` e destinatário (`CONTACT_TO_EMAIL`, ou o e-mail de `getPublicSite()`).
- O HTML do e-mail escapa os valores com `clean()`.
- Retorna 502 se nenhum canal ativo conseguiu receber a mensagem.

## Efeitos colaterais

- Grava um documento `inquiry` (`_id` `inquiry-<uuid>`, `status:'novo'`) no Sanity.
- Envia e-mail pelo Resend, com `replyTo` igual ao e-mail do visitante.
- Pode consultar o Sanity via `getPublicSite()` para achar o destinatário.
- Falhas vão para `console.error` só com o nome do erro.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
