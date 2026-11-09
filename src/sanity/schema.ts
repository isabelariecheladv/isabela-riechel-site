import { defineField, defineType } from 'sanity';

const editableTitle = (name: string, title: string, group?: string) => defineField({name, title, type:'string',...(group?{group}:{})});
const editableText = (name: string, title: string, rows = 3, group?: string) => defineField({name, title, type:'text', rows,...(group?{group}:{})});
const imageField = (name: string, title: string, group?:string) => defineField({name,title,type:'image',...(group?{group}:{}),options:{hotspot:true},fields:[defineField({name:'alt',title:'Descrição acessível da imagem',type:'string'})]});
const httpsUrl = (Rule: any) => Rule.custom((value: string | undefined) => !value || /^https:\/\//i.test(value) ? true : 'Informe uma URL HTTPS válida.');

export const siteSettingsType = defineType({
 name:'siteSettings',title:'Identidade e contatos',type:'document',
 groups:[{name:'contact',title:'Contato'},{name:'booking',title:'Agendamento'},{name:'presence',title:'Endereço e redes'},{name:'seo',title:'SEO'}],
 fields:[
  defineField({name:'publicName',title:'Nome da marca',type:'string',initialValue:'Isabela Riechel',group:'contact'}),
  defineField({name:'phoneDisplay',title:'Telefone exibido',type:'string',initialValue:'(43) 99129-3349',group:'contact'}),
  defineField({name:'phoneDigits',title:'WhatsApp — número com código do país',type:'string',initialValue:'5543991293349',description:'Somente números (55 + DDD + telefone).',group:'contact',validation:r=>r.custom(v=>!v||/^\d{12,14}$/.test(v)?true:'Utilize apenas números com o código do país, ex.: 5543999999999.')}),
  defineField({name:'email',title:'E-mail público',type:'string',initialValue:'isabelariecheladv@gmail.com',group:'contact',validation:r=>r.email()}),
  defineField({name:'bookingUrl',title:'Link da página de reservas do Google Calendar',type:'url',description:'Abra o Google Calendar > Horários de agendamento > Compartilhar e cole o link público. Sem link, aparece o WhatsApp.',group:'booking',validation:httpsUrl}),
  editableText('bookingHelp','Instruções para o agendamento',3,'booking'),
  defineField({name:'bookingMode',title:'Modalidade do atendimento',type:'string',options:{list:[{title:'Presencial ou online',value:'both'},{title:'Somente presencial',value:'in-person'},{title:'Somente online',value:'online'}]},initialValue:'both',group:'booking'}),
  editableTitle('city','Cidade','presence'),
  defineField({name:'showAddress',title:'Mostrar endereço do escritório publicamente',type:'boolean',initialValue:false,group:'presence'}),
  defineField({name:'officeAddress',title:'Endereço completo (divulgar somente após conferência)',type:'text',rows:2,group:'presence',hidden:({document})=>!document?.showAddress}),
  defineField({name:'instagram',title:'Instagram',type:'url',group:'presence',validation:httpsUrl}),
  defineField({name:'linkedin',title:'LinkedIn',type:'url',group:'presence',validation:httpsUrl}),
  defineField({name:'mapsUrl',title:'Link do Perfil da Empresa no Google (Maps)',type:'url',description:'No Google Maps, abra o perfil do escritório > Compartilhar > Copiar link.',group:'presence',validation:httpsUrl}),
  editableText('siteDescription','Descrição institucional para SEO',3,'seo'),
  defineField({name:'seoImage',title:'Imagem de compartilhamento',type:'image',options:{hotspot:true},group:'seo'}),
 ],
 preview:{prepare:()=>({title:'Configurações do site',subtitle:'Telefone, e-mail, endereço, agenda e SEO'})}
});

export const homePageType = defineType({
 name:'homePage',title:'Página inicial',type:'document',
 groups:[{name:'hero',title:'Abertura'},{name:'services',title:'Áreas e manifesto'},{name:'about',title:'Sobre Isabela'},{name:'ending',title:'Artigos e contato'}],
 fields:[
  defineField({name:'heroEyebrow',title:'Linha superior',type:'string',initialValue:'ADVOCACIA · LONDRINA / PR',group:'hero'}),
  editableTitle('heroTitle','Título principal — parte normal','hero'),
  editableTitle('heroEmphasis','Título principal — destaque itálico','hero'),
  editableText('heroDescription','Texto de apresentação',4,'hero'),
  imageField('heroImage','Foto de destaque (substitui a fotografia original)','hero'),
  editableTitle('servicesTitle','Título da seção de atuação','services'),
  editableTitle('servicesEmphasis','Título da seção de atuação — itálico','services'),
  editableText('servicesDescription','Introdução às áreas',3,'services'),
  editableTitle('statementTitle','Manifesto — início','services'),
  editableTitle('statementEmphasis','Manifesto — destaque','services'),
  editableText('statementDescription','Texto do manifesto',3,'services'),
  editableTitle('aboutTitle','Título da seção sobre Isabela','about'),
  editableTitle('aboutEmphasis','Título da seção sobre Isabela — itálico','about'),
  editableText('aboutParagraphOne','Sobre Isabela — primeiro parágrafo',3,'about'),
  editableText('aboutParagraphTwo','Sobre Isabela — segundo parágrafo',3,'about'),
  imageField('aboutImage','Foto da seção sobre Isabela','about'),
  editableTitle('editorialTitle','Título dos artigos','ending'),
  editableTitle('editorialEmphasis','Título dos artigos — itálico','ending'),
  editableTitle('contactTitle','Título do contato','ending'),
  editableTitle('contactEmphasis','Título do contato — itálico','ending'),
  editableText('contactDescription','Texto da chamada para contato',3,'ending'),
 ],
 preview:{prepare:()=>({title:'Página inicial',subtitle:'Títulos, textos e fotografias da home'})}
});

export const aboutPageType = defineType({
 name:'aboutPage',title:'Página Sobre',type:'document',
 fields:[
  editableTitle('heroTitle','Título — primeira parte'),
  editableTitle('heroEmphasis','Título — destaque'),
  editableText('heroLead','Texto de abertura'),
  imageField('heroImage','Retrato de abertura'),
  editableTitle('bioTitle','Título da biografia'),
  defineField({name:'paragraphs',title:'Parágrafos da biografia',type:'array',of:[{type:'text',rows:3}]}),
  defineField({name:'credentials',title:'Destaques profissionais',type:'array',of:[{type:'string'}],validation:r=>r.max(6)}),
  imageField('portraitImage','Foto da seção final'),
  editableText('quote','Frase institucional (não atribuir como declaração literal sem confirmação)',2),
 ],
 preview:{prepare:()=>({title:'Sobre Isabela',subtitle:'Biografia, formação e retratos'})}
});

export const practiceAreaType = defineType({
 name:'practiceArea',title:'Área de atuação',type:'document',
 description:'Há somente quatro áreas fixas. Edite títulos e textos sem alterar as rotas do site.',
 fields:[
  defineField({name:'title',title:'Nome da área',type:'string'}),
  defineField({name:'lead',title:'Destaque / serviço principal',type:'string'}),
  editableText('short','Resumo exibido nos cartões'),
  editableText('description','Descrição detalhada da atuação',5),
  defineField({name:'topics',title:'Tópicos relacionados',type:'array',of:[{type:'string'}],validation:r=>r.max(12)}),
  editableText('seoDescription','Descrição SEO (opcional)',2),
 ],
 preview:{select:{title:'title',subtitle:'lead'}}
});

export const privacyPageType=defineType({
 name:'privacyPage',title:'Política de privacidade',type:'document',
 fields:[
  defineField({name:'approved',title:'Conteúdo revisado e aprovado para publicação',type:'boolean',initialValue:false,description:'Ative somente após revisão jurídica e de privacidade.'}),
  defineField({name:'body',title:'Texto da política',type:'array',of:[{type:'block'}],validation:r=>r.required()}),
  defineField({name:'lastReview',title:'Data da última revisão',type:'date'})
 ],
 preview:{prepare:()=>({title:'Política de privacidade',subtitle:'Texto legal editável'})}
});

export const articleType = defineType({
 name:'article',title:'Artigos jurídicos',type:'document',
 groups:[{name:'editorial',title:'Conteúdo'},{name:'publication',title:'Publicação e revisão'},{name:'seo',title:'SEO'}],
 fields:[
  defineField({name:'title',title:'Título',type:'string',group:'editorial',validation:r=>r.required().min(12)}),
  defineField({name:'slug',title:'Endereço (slug)',type:'slug',group:'editorial',options:{source:'title',maxLength:96},validation:r=>r.required()}),
  defineField({name:'category',title:'Área',type:'string',group:'editorial',options:{list:['Direito das Sucessões','Planejamento Patrimonial','Direito Imobiliário','Direito Civil']},validation:r=>r.required()}),
  defineField({name:'excerpt',title:'Resumo / descrição SEO',type:'text',rows:3,group:'seo',validation:r=>r.max(240)}),
  imageField('coverImage','Imagem de capa (opcional)','editorial'),
  defineField({name:'body',title:'Conteúdo',type:'array',of:[{type:'block'}],group:'editorial',validation:r=>r.required()}),
  defineField({name:'publishedAt',title:'Data de publicação',type:'datetime',group:'publication',description:'A data deve ter chegado para o artigo aparecer. Não deixar em branco.'}),
  defineField({name:'legalReview',title:'Revisão jurídica concluída',type:'boolean',initialValue:false,group:'publication',description:'Confirme fontes, atualização legislativa e conformidade com a publicidade da advocacia.'}),
 ],
 preview:{select:{title:'title',subtitle:'category',media:'coverImage'}}
});

export const inquiryType = defineType({
 name:'inquiry',title:'Mensagens recebidas',type:'document',
 description:'Mensagens pessoais. Usar somente com dataset PRIVADO e controle de acesso. Não registrar detalhes sigilosos.',
 fields:[
  defineField({name:'receivedAt',title:'Recebido em',type:'datetime',readOnly:true}),
  defineField({name:'name',title:'Nome',type:'string',readOnly:true}),
  defineField({name:'email',title:'E-mail',type:'string',readOnly:true}),
  defineField({name:'phone',title:'Telefone',type:'string',readOnly:true}),
  defineField({name:'subject',title:'Assunto',type:'string',readOnly:true}),
  defineField({name:'message',title:'Mensagem (resumo enviado)',type:'text',readOnly:true}),
  defineField({name:'status',title:'Situação do atendimento',type:'string',initialValue:'novo',options:{layout:'radio',list:[{title:'Novo',value:'novo'},{title:'Em atendimento',value:'em-atendimento'},{title:'Concluído',value:'concluido'}]}}),
  editableText('internalNote','Anotação administrativa (evite dados sigilosos)',3),
 ],
 preview:{select:{title:'name',subtitle:'subject'}}
});

export const schemaTypes=[siteSettingsType,homePageType,aboutPageType,practiceAreaType,privacyPageType,articleType,inquiryType];
