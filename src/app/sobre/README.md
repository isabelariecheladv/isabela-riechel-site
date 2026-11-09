# app/sobre — página Sobre

## Visão geral

Página `/sobre`, com biografia, formação e retratos.

## Interface

- `page.tsx:metadata` (canônica `/sobre`), `page.tsx:About`.

## Invariantes

- Todo campo vazio de `aboutPage` usa o padrão do código: textos do hero, biografia (`paragraphs`), destaques (`credentials`), citação e as imagens `/images/retrato-profissional.webp` e `/images/retrato-pb.webp`.

## Efeitos colaterais

- Lê o Sanity via `getAboutContent()`.

## Verificação

- Tipos: `npm run lint` (executa `tsc --noEmit`)
- Build: `npm run build`
- Não existe script `test` no `package.json`.
