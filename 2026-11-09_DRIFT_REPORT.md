# Relatório de divergências — src/ (2026-11-09)

Escopo: os 15 README.md de `src/` comparados com o código atual. Nenhum arquivo de código mudou desde que os READMEs foram escritos.

## src/README.md

- A regra global "artigos só ficam públicos com `legalReview==true` e `publishedAt<=now()`" não é aplicada de forma idêntica: `lib/sanity.ts:getArticles` exige também `defined(slug.current)`, e `components/admin/AdminOverview.tsx` não exige. Veja `components/admin/README.md`.

## src/app/README.md

- Não documentado: `layout.tsx:generateMetadata` usa a imagem fixa `/images/hero-poltrona.webp` quando `seoImageUrl` está vazio.
- Não documentado: `sitemap.ts` lista as áreas a partir de `services` fixo (`lib/site.ts`), não de `getServices()`, e não inclui `/privacidade`.

## src/app/admin/[[...tool]]/README.md

No drift detected.

## src/app/api/contato/README.md

- O limite de 5000 bytes depende do cabeçalho `content-length`. Sem esse cabeçalho, `Number(null)` vira `0` e o corpo é lido sem limite. O README trata o limite como garantido.
- O honeypot (`website`) só é verificado depois do `contactSchema.safeParse`. Um robô que preenche `website` mas erra outro campo recebe 400, não o `{ok:true}` silencioso que o README descreve.
- O `throttle` conta o envio antes de checar se algum canal está configurado. Envios que recebem 503 consomem a cota do IP. Não documentado.
- O `Map` `throttle` nunca remove entradas antigas e cresce com cada IP novo enquanto o processo vive. Não documentado.
- `email` usa `z.email().max(160)` sem `trim()`, ao contrário de `name`, `phone` e `message`. Não documentado.

## src/app/atuacao/README.md

- Valor fixo no código: `page.tsx` mostra `{s.number} / 04`. O total de áreas está escrito à mão (também em `[slug]/page.tsx` e `app/page.tsx`). Não documentado.

## src/app/atuacao/[slug]/README.md

- Valor fixo no código: o rótulo `/ 04` (mesmo ponto acima).
- Não documentado: `generateMetadata` retorna `{}` para um `slug` desconhecido.

## src/app/blog/README.md

No drift detected.

## src/app/blog/[slug]/README.md

No drift detected.

## src/app/contato/README.md

No drift detected.

## src/app/privacidade/README.md

No drift detected.

## src/app/sobre/README.md

- Não documentado: imagens e textos do hero, a biografia e a citação também têm padrão fixo no código (`/images/retrato-profissional.webp`, `/images/retrato-pb.webp`), não só `paragraphs` e `credentials`.

## src/components/README.md

- Valor fixo no código: `Booking` e `ContactForm` usam `whatsapp='https://wa.me/5543991293349'` como padrão da prop, duplicando `lib/site.ts:site.whatsapp`. Se o número mudar só no Sanity ou em `site.ts`, um uso sem a prop mostra o número antigo. Não documentado.
- Não documentado: a prop `light` de `Booking` (classe `booking-light`) e o texto de `bookingMode` (`online`, `in-person`, outro → ambos).

## src/components/admin/README.md

- O README afirma que a contagem de artigos usa "o mesmo filtro de `lib/sanity.ts`". Não usa: `AdminOverview` exclui `drafts.**` mas não exige `defined(slug.current)`; `getArticles` exige `slug.current` e não exclui rascunhos explicitamente. Um artigo revisado sem slug conta no painel e não aparece no site.
- A contagem de `inquiry` com `status=="novo"` e o `bookingUrl` de `siteSettings` não excluem rascunhos. Não documentado.

## src/lib/README.md

No drift detected.

## src/sanity/README.md

- Não documentado: campos obrigatórios (`article.title`, `slug`, `category`, `body`; `privacyPage.body`), `slug` com `maxLength: 96`, e a lista de opções de `bookingMode` (`both`, `in-person`, `online`) e de `article.category`.
- O esquema `practiceArea` não amarra os documentos aos `_id` fixos `area-sucessoes`, `area-patrimonial`, `area-imobiliario`, `area-civil` que `lib/sanity.ts:getServices` consulta. Uma área criada pelo botão "novo" no Studio recebe outro `_id` e é ignorada pelo site. Não documentado.
