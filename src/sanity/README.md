# sanity — esquemas do painel

## Visão geral

Define os tipos de documento que o Sanity Studio (`/admin`) permite editar. É carregado pelo `sanity.config.ts` na raiz do projeto.

## Interface

- `schema.ts:schemaTypes`: lista com todos os tipos abaixo.
- `siteSettingsType` (`siteSettings`): nome, telefone, `phoneDigits`, e-mail, `bookingUrl`, `bookingHelp`, `bookingMode`, cidade, `showAddress`, `officeAddress`, Instagram, LinkedIn, `mapsUrl` (link do Perfil da Empresa no Google), SEO.
- `homePageType` (`homePage`): textos e imagens da página inicial.
- `aboutPageType` (`aboutPage`): textos, biografia, `credentials` e retratos da página Sobre.
- `practiceAreaType` (`practiceArea`): textos de uma área de atuação.
- `privacyPageType` (`privacyPage`): `approved`, `body`, `lastReview`.
- `articleType` (`article`): título, `slug`, `category`, `excerpt`, `coverImage`, `body`, `publishedAt`, `legalReview`.
- `inquiryType` (`inquiry`): mensagens do formulário de contato, com `status` (`novo`, `em-atendimento`, `concluido`).

## Invariantes

- URLs (`bookingUrl`, `instagram`, `linkedin`, `mapsUrl`) precisam ser HTTPS (`httpsUrl`).
- `phoneDigits` precisa ter de 12 a 14 dígitos.
- Limites: `credentials` até 6 itens; `practiceArea.topics` até 12; `article.excerpt` até 240 caracteres; `article.title` no mínimo 12.
- Os campos de `inquiry` são `readOnly`, exceto `status` e `internalNote`. O tipo deve ser usado só com dataset privado.
- `officeAddress` fica oculto no painel enquanto `showAddress` está desligado.
- Obrigatórios: `article.title`, `article.slug` (`maxLength: 96`, gerado do título), `article.category`, `article.body` e `privacyPage.body`.
- Opções fixas: `bookingMode` (`both`, `in-person`, `online`) e `article.category` (as 4 áreas).
- O site só lê os documentos `practiceArea` com `_id` `area-sucessoes`, `area-patrimonial`, `area-imobiliario` e `area-civil` (`lib/sanity.ts:getServices`). O `sanity.config.ts` da raiz registra esses 4 como singletons e mostra só eles no menu.

## Efeitos colaterais

- Nenhum. O arquivo só declara esquemas.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
