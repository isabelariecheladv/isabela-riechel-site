# Guia de administração — Isabela Riechel

## O que foi implementado

O endereço **`/admin`** abre um Sanity Studio integrado ao site, protegido pelo login da conta Sanity. Não é uma tela falsa: os conteúdos publicados são consultados pelo site Next.js. A navegação do painel contém:

| Seção | O que é editável |
|---|---|
| Identidade, contatos e agenda | Telefone, WhatsApp, e-mail, links sociais, endereço (opcional), link da agenda e descrição SEO |
| Página inicial | Títulos, apresentações, manifesto, chamadas e fotografias |
| Sobre Isabela | Biografia, credenciais, retratos e textos |
| Áreas de atuação (4) | Nome, destaques, explicações, tópicos e descrição SEO de cada uma das quatro páginas |
| Blog | Criar, editar, revisar, publicar ou retirar artigos do ar; carregar imagens |
| Caixa de mensagens | Ver solicitações recebidas (apenas com dataset privado e token seguro), alterar situação e anotações |
| Política de privacidade | Revisar o texto, aprovar e publicar após validação jurídica |

As quatro áreas são fixas e não é possível adicionar novas áreas através do painel sem modificação do código. Isso respeita a decisão editorial atual.

## Instalação inicial

1. Instale Node.js 22.12 ou superior e execute `npm install` na pasta do projeto.
2. Copie `.env.example` para `.env.local`.
3. Entre em https://www.sanity.io/manage, crie o projeto **Isabela Riechel** e um dataset **privado** (`production`). **Não use dataset público com mensagens de clientes.**
4. Nas configurações do projeto, gere um token de **leitura** para o servidor (variável `SANITY_READ_TOKEN`). Crie um token separado de **escrita** para o comando inicial (`SANITY_SEED_WRITE_TOKEN`) e outro de escrita para a caixa de mensagens (`SANITY_INBOX_WRITE_TOKEN`) se for utilizá-la. Nunca coloque tokens no front-end ou em arquivos commitados.
5. Copie o ID do projeto e o nome do dataset para `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`.
6. No Sanity, adicione `http://localhost:3000` como origem CORS com credenciais; na publicação, também `https://DOMINIO-DEFINITIVO`.
7. Execute `npm run seed -- --images` para criar os textos iniciais e importar as fotos. Este comando **não substitui** conteúdos já existentes. Use `npm run seed` para importar apenas textos.
8. Execute `npm run dev` e abra `http://localhost:3000/admin`. Entre com a conta autorizada do Sanity. Para conceder acesso a outras pessoas, utilize as configurações de membros do projeto Sanity (respeitando limites do plano contratado).
9. No painel, abra **Identidade, contatos e agenda** e confira telefone, e-mail, endereço, foto e agendamento. Publique o documento ao concluir as alterações.

> Se ainda não tiver criado um projeto Sanity, `/admin` exibe instruções de configuração. A interface de edição real só fica disponível após a conexão do projeto e autenticação.

## Como atualizar uma página

1. Entre no painel `/admin`.
2. Selecione **Página inicial**, **Sobre Isabela** ou uma das **Áreas de atuação**.
3. Altere textos e imagens. Se deixar um campo vazio, o site mantém o texto ou a foto original como fallback.
4. Clique em **Publish / Publicar**. A versão pública consulta apenas documentos publicados, não rascunhos.
5. Abra o site público. A atualização pode levar até **60 segundos** por causa do cache.

## Como publicar artigos

1. Entre em **Blog — artigos jurídicos** e clique em criar artigo.
2. Informe título, slug, área, resumo, corpo e imagem opcional.
3. Faça a revisão jurídica e assinale **Revisão jurídica concluída**.
4. Defina **Data de publicação**. Datas futuras somente aparecem a partir do horário definido (cache pode atrasar até 60 s).
5. Clique em **Publish / Publicar**. O site nunca apresenta rascunhos como artigos públicos.

## Agendamento — Google Calendar

1. Na conta Google Calendar destinada ao atendimento, crie uma página de horários de agendamento.
2. Copie a URL pública da página de reservas.
3. No painel, em **Identidade, contatos e agenda**, informe **Link da página de reservas do Google Calendar** e publique.
4. Se não houver URL configurada, o botão usa WhatsApp e informa que a agenda ainda não está disponível. **Não é necessário OAuth**: o site abre a página de reservas do Google; ele não acessa eventos privados da advogada.

## Caixa de mensagens — proteção de dados

A caixa de mensagens é **opcional**. Para ativá-la:

1. **Confirme no Sanity que o dataset é privado**. Não confie apenas na flag do arquivo `.env.local`.
2. Defina `SANITY_PRIVATE_DATASET=true` e informe `SANITY_INBOX_WRITE_TOKEN` como variável de ambiente **somente no servidor**.
3. Configure os acessos do projeto Sanity para que somente pessoas autorizadas tenham acesso às mensagens.
4. Revise a política de privacidade, defina prazo de retenção, tratamento de exclusão e procedimento interno de resposta ao titular antes de colocar a caixa em produção.
5. As mensagens são criadas pela API e aparecem na seção **Caixa de mensagens**, com estado Novo, Em atendimento e Concluído. Não disponibilize mensagens em queries públicas.

O formulário também pode encaminhar mensagens por e-mail via Resend (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`). Com ambos ativos, a API tenta registrar e enviar. Se pelo menos um canal receber a mensagem, confirma o recebimento. Se nenhum estiver configurado, comunica isso claramente e sugere WhatsApp. O envio pelo Resend exige endereço remetente de domínio verificado.

**Segurança:** o formulário conta com validação, campo invisível anti-spam e limitação de envios por processo. Em produção é recomendável proteção distribuída (Cloudflare Turnstile/Upstash) e política de retenção automatizada. Não são solicitados documentos, dados sigilosos de casos ou informações sensíveis no formulário público.

## Implantação

- Hospede o site Next.js na Vercel ou equivalente. Configure as variáveis de ambiente na hospedagem, **sem publicar tokens**.
- Configure o domínio definitivo, HTTPS e `NEXT_PUBLIC_SITE_URL`.
- Faça login pelo endereço `https://DOMINIO-DEFINITIVO/admin`.
- Se necessário, direcione `/studio` para `/admin` (redirecionamento incluído no projeto).
- Não há conta criada automaticamente nem senhas fictícias no código. O controle de acesso acontece pelo Sanity. Por padrão o domínio continua indefinido.
- O projeto não foi conectado a contas externas, não foi publicado e requer testes com as dependências instaladas em ambiente com internet.
