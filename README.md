# Isabela Riechel — Site e ambiente de administração (v2)

Site institucional em Next.js + TypeScript com **CMS administrativo em `/admin`**, integrado ao Sanity Studio. Conteúdo e fotografias originais da identidade visual foram preservados. A administração contém visão geral, edição da home, biografia, quatro áreas jurídicas, blog, contatos, Google Calendar, SEO e caixa de mensagens opcional.

## Abrir o projeto

Pré-requisitos: Node.js 22.12+ e acesso à internet para instalar pacotes.

```bash
npm install
cp .env.example .env.local
# Preencha NEXT_PUBLIC_SANITY_PROJECT_ID, dataset e SANITY_READ_TOKEN
npm run seed -- --images
npm run dev
```

- Site: http://localhost:3000
- Painel administrativo: http://localhost:3000/admin
- Atalho legado: http://localhost:3000/studio (redireciona para `/admin`)
- Prévia **apenas visual** do site público, sem instalação: `previsao-visual.html`

**Leia [`ADMINISTRACAO.md`](./ADMINISTRACAO.md)** para habilitar o painel, configurar a autenticação e entender as permissões dos dados. Sem criar/conectar um projeto Sanity, `/admin` apresenta orientações de configuração, não um editor com dados fictícios.

## Identidade visual

As cores vieram do documento `docs/identidade-visual-original.pdf`:

| Cor | Código |
|---|---|
| Creme | `#F5E8DB` |
| Verde sálvia | `#4F6154` |
| Verde profundo | `#253127` |
| Dourado | `#C89D5B` |
| Cinza | `#D8D8D8` |
| Grafite | `#1E2329` |

O monograma é a versão recortada do próprio manual, e as seis fotografias originais foram convertidas para WebP sem mudanças de identidade. O manual indica **Book Antiqua** para títulos e **Louis George Café** para corpo de texto. O projeto não distribui arquivos dessas fontes. Para usar as fontes exatas na web, é necessária licença adequada e inclusão dos arquivos autorizados.

## Conteúdo e áreas

As quatro áreas são Direito das Sucessões, Planejamento Patrimonial, Direito Imobiliário e Direito Civil, com destaque editorial para inventário extrajudicial e planejamento sucessório. O CMS permite alterar os textos, mas não adicionar novas áreas sem revisão da arquitetura do site. Links internos e slugs existentes permanecem estáveis.

O blog exige revisão jurídica e data de publicação para exibir artigos publicamente. Quando ainda não há artigos, a interface mostra apenas pautas **identificadas como sugestões**, e não como matérias assinadas pela advogada.

## Integrações

- **Sanity:** conteúdo publicado, autenticação de editores e administração em `/admin`. Dataset **privado** recomendado/obrigatório quando a caixa de mensagens estiver ativa. Conteúdos publicados são lidos **somente no servidor**, via `SANITY_READ_TOKEN`.
- **Google Calendar:** o campo de URL de agendamento pode ser alterado em `/admin`. O site abre uma página de horários do Google; não acessa eventos privados.
- **Formulário:** encaminhamento por Resend e/ou registro em caixa privada do Sanity. Sem os canais configurados, não informa envio bem-sucedido.
- **Vercel:** publicação recomendada com HTTPS, domínio próprio e variáveis de ambiente privadas.

## Limitações antes da publicação

- É necessário criar as contas, cadastrar domínio e configurar tokens/variáveis. Não foram criados usuários nem conectadas contas externas.
- Confirmar número profissional na OAB, endereço e dados institucionais antes da publicação.
- Revisar política de privacidade e regras de publicidade da advocacia, incluindo normas mais recentes da OAB, antes de disponibilizar o site ao público.
- Implantar proteção contra spam e retenção de mensagens adequada ao volume do site.
- O projeto passou em análise **sintática** dos arquivos TypeScript/TSX; não foi possível executar `npm install` e `next build` neste ambiente devido à indisponibilidade de rede para o registro npm. É indispensável testar o build e a autenticação antes do deploy.

## Estrutura de diretórios

- `src/app` — páginas públicas, rotas de contato e painel administrativo
- `src/sanity/schema.ts` — formulários do CMS
- `sanity.config.ts` — organização do menu e autenticação via Sanity
- `src/components/admin/AdminOverview.tsx` — visão geral do painel
- `src/lib/sanity.ts` — consultas públicas seguras e fallback do conteúdo
- `scripts/seed.mjs` — inicialização não destrutiva de conteúdo e fotografias
- `public/images` e `public/brand` — mídias originais do projeto
- `docs/identidade-visual-original.pdf` — referência de identidade visual

Não há publicação de dados de clientes, relatos de processos, promessas de resultado ou honorários.
