'use client';
import {useEffect,useState} from 'react';
import {useClient} from 'sanity';

type Snapshot={articles:number;inquiries:number;areas:number;bookingUrl?:string};
const panel={background:'#F5E8DB',minHeight:'100%',padding:'clamp(22px,4vw,54px)',color:'#253127',fontFamily:'Arial,sans-serif'} as const;
export function AdminOverview(){
 const client=useClient({apiVersion:'2026-03-01'});
 const [data,setData]=useState<Snapshot|null>(null);
 const [error,setError]=useState('');
 useEffect(()=>{
  let active=true;
  const query=`{
   "articles":count(*[_type=="article" && !(_id in path("drafts.**")) && defined(slug.current) && legalReview==true && defined(publishedAt) && publishedAt<=now()]),
   "inquiries":count(*[_type=="inquiry" && status=="novo"]),
   "areas":count(*[_type=="practiceArea" && !(_id in path("drafts.**"))]),
   "bookingUrl":*[_id=="siteSettings"][0].bookingUrl
  }`;
  client.fetch<Snapshot>(query).then(result=>{if(active)setData(result)}).catch(()=>{if(active)setError('Não foi possível carregar os indicadores. Verifique as permissões.');});
  return ()=>{active=false};
 },[client]);
 const cards=[
  {title:'Artigos publicados',value:data?String(data.articles):'—',text:'Somente artigos revisados e com data de publicação válida'},
  {title:'Novas mensagens',value:data?String(data.inquiries):'—',text:'Disponível quando a caixa de mensagens privada estiver ativa'},
  {title:'Áreas configuradas',value:data?`${data.areas}/4`:'—',text:'As quatro áreas jurídicas definidas para o site'},
  {title:'Agendamento online',value:data?(data.bookingUrl?'Configurado':'Pendente'):'—',text:'Link de reservas do Google Calendar'}
 ];
 return <div style={panel}>
  <div style={{maxWidth:1120,margin:'0 auto'}}>
   <p style={{fontSize:11,fontWeight:700,letterSpacing:3,color:'#4F6154',margin:'0 0 18px'}}>ISABELA RIECHEL · GERENCIAMENTO</p>
   <h1 style={{font:'normal clamp(37px,4vw,58px)/1.1 Georgia,serif',margin:'0 0 16px'}}>Visão geral do site</h1>
   <p style={{maxWidth:660,lineHeight:1.8,color:'#4F6154',margin:'0 0 38px'}}>Use o menu lateral para atualizar as páginas, editar fotos, publicar artigos, ajustar a agenda e acompanhar as solicitações recebidas.</p>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:15}}>
    {cards.map(c=><div key={c.title} style={{background:'#fffdf9',border:'1px solid #d9d5ca',padding:23,minHeight:166}}><span style={{fontSize:11,color:'#4F6154',fontWeight:700,letterSpacing:1}}>{c.title.toUpperCase()}</span><strong style={{display:'block',font:'normal 36px Georgia,serif',margin:'20px 0 10px'}}>{c.value}</strong><p style={{color:'#5a6458',lineHeight:1.6,fontSize:12,margin:0}}>{c.text}</p></div>)}
   </div>
   {error&&<p role="alert" style={{color:'#9c4538',marginTop:12}}>{error}</p>}
   <div style={{marginTop:35,padding:25,background:'#253127',color:'#F5E8DB'}}>
    <h2 style={{font:'normal 27px Georgia,serif',margin:'0 0 12px'}}>Como editar o site</h2>
    <p style={{lineHeight:1.8,fontSize:13,maxWidth:790}}>Selecione uma seção à esquerda, faça as alterações e clique em <strong>Publicar</strong>. As páginas do site consultam a versão publicada. Alterações podem levar até 60 segundos para aparecer. Rascunhos e artigos sem revisão não são exibidos ao público.</p>
    <a href="/" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',color:'#253127',background:'#C89D5B',fontWeight:700,textDecoration:'none',fontSize:13,padding:'13px 19px',marginTop:8}}>Abrir o site público ↗</a>
   </div>
   <p style={{fontSize:12,lineHeight:1.8,color:'#677166',marginTop:25}}>Acesso protegido pelo Sanity. Não compartilhe credenciais. Para publicações jurídicas, mantenha conferência de conteúdo e conformidade com a OAB.</p>
  </div>
 </div>;
}
