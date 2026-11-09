import { defineConfig, defineSingleton } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schema';
import { AdminOverview } from './src/components/admin/AdminOverview';

const areas = [
 ['area-sucessoes','Direito das Sucessões'],
 ['area-patrimonial','Planejamento Patrimonial'],
 ['area-imobiliario','Direito Imobiliário'],
 ['area-civil','Direito Civil'],
] as const;

export default defineConfig({
 name:'isabela-riechel',
 title:'Isabela Riechel | Administração',
 projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'abc123de',
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
 basePath:'/admin',
 document:{
  singletons:[
   'siteSettings','homePage','aboutPage','privacyPage',
   ...areas.map(([documentId,title])=>defineSingleton({documentId,schemaType:'practiceArea',title}))
  ],
  // Solicitações são criadas exclusivamente pela API do formulário, não manualmente.
  newDocumentOptions:(prev)=>prev.filter(item=>item.templateId!=='inquiry'),
 },
 plugins:[structureTool({structure:S=>S.list().title('Gestão do site').items([
  S.listItem().title('Visão geral').id('overview').child(S.component(AdminOverview).title('Visão geral')),
  S.divider(),
  S.listItem().title('Identidade, contatos e agenda').id('siteSettings').child(S.document().singleton('siteSettings')),
  S.listItem().title('Página inicial').id('homePage').child(S.document().singleton('homePage')),
  S.listItem().title('Página Sobre Isabela').id('aboutPage').child(S.document().singleton('aboutPage')),
  S.listItem().title('Áreas de atuação (4)').id('areas').child(S.list().title('Áreas de atuação').items(areas.map(([id,title])=>S.listItem().title(title).id(id).child(S.document().singleton(id))))),
  S.divider(),
  S.documentTypeListItem('article').title('Blog — artigos jurídicos'),
  S.divider(),
  S.listItem().title('Caixa de mensagens').id('inquiries').child(S.documentTypeList('inquiry').title('Mensagens recebidas').defaultOrdering([{field:'receivedAt',direction:'desc'}])),
  S.listItem().title('Política de privacidade').id('privacyPage').child(S.document().singleton('privacyPage')),
 ])})],
 schema:{types:schemaTypes},
});
