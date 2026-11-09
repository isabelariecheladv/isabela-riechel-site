/**
 * Inicializa documentos de conteúdo SEM sobrescrever alterações feitas no /admin.
 * Uso: npm run seed
 * Opcional para copiar fotos originais ao gerenciador de mídias: npm run seed -- --images
 * Requer SANITY_SEED_WRITE_TOKEN e arquivo .env.local.
 */
import {createClient} from '@sanity/client';
import {createReadStream,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||'production';
const token=process.env.SANITY_SEED_WRITE_TOKEN;
if(!projectId||!token){console.error('Informe NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_SEED_WRITE_TOKEN em .env.local.');process.exit(1)}
const client=createClient({projectId,dataset,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||'2026-03-01',token,useCdn:false});
const withImages=process.argv.includes('--images');
async function picture(file){
 const filename=resolve('public/images',file);
 if(!withImages||!existsSync(filename))return undefined;
 const asset=await client.assets.upload('image',createReadStream(filename),{filename:file});
 return {_type:'image',asset:{_type:'reference',_ref:asset._id}};
}
const seedDocs=[
 {_id:'siteSettings',_type:'siteSettings',publicName:'Isabela Riechel',phoneDisplay:'(43) 99129-3349',phoneDigits:'5543991293349',email:'isabelariecheladv@gmail.com',city:'Londrina, Paraná',showAddress:false,bookingMode:'both',bookingHelp:'Consulte os horários disponíveis pela agenda online.',siteDescription:'Advocacia em Direito das Sucessões, Planejamento Patrimonial, Direito Imobiliário e Direito Civil em Londrina/PR.'},
 {_id:'homePage',_type:'homePage',heroEyebrow:'ADVOCACIA · LONDRINA / PR',heroTitle:'Um olhar jurídico para',heroEmphasis:'o que realmente importa.',heroDescription:'Orientação jurídica em sucessões, planejamento patrimonial e relações civis, com atenção às pessoas, ao patrimônio e às particularidades de cada história.',servicesTitle:'Conhecimento jurídico,',servicesEmphasis:'aplicado à sua realidade.',servicesDescription:'Uma atuação pautada pela análise cuidadosa de cada situação, com especial atenção às questões sucessórias e patrimoniais.',statementTitle:'Decisões relevantes merecem',statementEmphasis:'escuta, precisão e responsabilidade.',statementDescription:'Da organização de um inventário ao planejamento de questões patrimoniais, cada situação demanda compreensão dos fatos e atenção às possibilidades jurídicas.',aboutTitle:'Conheça',aboutEmphasis:'Isabela Riechel.',aboutParagraphOne:'Graduada em Direito pela Universidade Estadual de Londrina (UEL) e pós-graduada em Direito Civil e Processo Civil pela mesma instituição.',aboutParagraphTwo:'Sua atuação compreende questões sucessórias, patrimoniais, imobiliárias e civis, com valorização da orientação individualizada e das soluções extrajudiciais quando adequadas ao caso.',editorialTitle:'Informação para',editorialEmphasis:'decisões conscientes.',contactTitle:'O primeiro passo é',contactEmphasis:'uma boa conversa.',contactDescription:'Compartilhe brevemente o assunto para que seja possível orientar o próximo contato.'},
 {_id:'aboutPage',_type:'aboutPage',heroTitle:'O direito exige',heroEmphasis:'conhecimento, atenção e humanidade.',heroLead:'A compreensão de cada situação começa pela escuta e pela análise criteriosa dos caminhos juridicamente possíveis.',bioTitle:'Isabela Riechel',paragraphs:['Advogada graduada em Direito pela Universidade Estadual de Londrina (UEL), com pós-graduação em Direito Civil e Processo Civil pela mesma instituição.','Atua nas áreas de Direito das Sucessões, Planejamento Patrimonial, Direito Imobiliário e Direito Civil. Valoriza uma prática jurídica que una rigor técnico, comunicação compreensível e atenção às particularidades das pessoas atendidas.','Na condução das questões jurídicas, considera a resolução extrajudicial de conflitos sempre que essa alternativa se mostrar adequada e juridicamente possível.'],credentials:['Formação jurídica pela UEL','Pós-graduação em Direito Civil e Processo Civil','Atuação em questões sucessórias e patrimoniais'],quote:'Cada história exige análise própria. O trabalho jurídico começa por compreender o que está em questão.'},
 {_id:'area-sucessoes',_type:'practiceArea',title:'Direito das Sucessões',lead:'Inventário extrajudicial',short:'Orientação em inventários, partilhas, testamentos e questões sucessórias.',description:'Atuação na organização jurídica da sucessão, com avaliação da via extrajudicial quando estiverem presentes os requisitos legais.',topics:['Inventário extrajudicial e judicial','Partilha de bens','Testamentos e disposições de última vontade','Orientação jurídica a herdeiros e meeiros']},
 {_id:'area-patrimonial',_type:'practiceArea',title:'Planejamento Patrimonial',lead:'Planejamento sucessório',short:'Organização patrimonial e planejamento sucessório considerando as particularidades de cada família.',description:'Análise de instrumentos jurídicos para organizar a titularidade, a administração e a transmissão do patrimônio, conforme as circunstâncias do caso.',topics:['Planejamento sucessório','Doações e cláusulas de proteção patrimonial','Testamentos','Avaliação jurídica de estruturas patrimoniais']},
 {_id:'area-imobiliario',_type:'practiceArea',title:'Direito Imobiliário',lead:'Segurança nas relações imobiliárias',short:'Análise de contratos, documentação imobiliária e relações envolvendo imóveis.',description:'Consultoria e atuação em assuntos imobiliários, com exame dos documentos e riscos jurídicos pertinentes.',topics:['Análise e elaboração de contratos','Compra, venda e locação','Regularização documental','Questões possessórias e imobiliárias']},
 {_id:'area-civil',_type:'practiceArea',title:'Direito Civil',lead:'Orientação jurídica individualizada',short:'Assessoria em contratos, obrigações e relações jurídicas de natureza civil.',description:'Análise preventiva e atuação em controvérsias civis, com atenção à possibilidade de soluções consensuais.',topics:['Contratos e obrigações','Responsabilidade civil','Negociação e composição extrajudicial','Questões patrimoniais civis']},
];
if(withImages){
 const images=[['homePage','heroImage','hero-poltrona.webp'],['homePage','aboutImage','retrato-profissional.webp'],['aboutPage','heroImage','retrato-profissional.webp'],['aboutPage','portraitImage','retrato-pb.webp']];
 for(const [id,key,file] of images){
  const doc=seedDocs.find(x=>x._id===id);if(!doc)continue;
  const exists=await client.getDocument(id);
  if(exists)continue; // evita upload desnecessário e preserva personalizações
  console.log('Enviando fotografia:',file);
  doc[key]=await picture(file);
 }
}
for(const doc of seedDocs){
 await client.createIfNotExists(doc);
 console.log('Documento inicializado sem sobrescrever:',doc._id);
}
console.log('Concluído. Abra /admin para gerenciar o site.');
