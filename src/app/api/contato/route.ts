import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';
import { z } from 'zod';
import { getPublicSite } from '@/lib/sanity';

const contactSchema=z.object({
 name:z.string().trim().min(2).max(100),
 email:z.email().max(160),
 phone:z.string().trim().max(30).optional().default(''),
 subject:z.enum(['Direito das Sucessões','Planejamento Patrimonial','Direito Imobiliário','Direito Civil','Outro assunto']),
 message:z.string().trim().min(10).max(600),
 consent:z.literal('yes'),
 website:z.string().optional().default(''),
});
const throttle=new Map<string,{count:number;until:number}>();
function clean(v:string){return v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}

export async function POST(request:NextRequest){
 const type=request.headers.get('content-type')||'';
 if(!type.includes('application/json'))return NextResponse.json({error:'Formato não aceito.'},{status:415});
 const size=Number(request.headers.get('content-length'));
 if(size>5000)return NextResponse.json({error:'Mensagem muito extensa.'},{status:413});
 // O content-length pode faltar; mede o corpo lido também.
 const body=await request.text();
 if(body.length>5000)return NextResponse.json({error:'Mensagem muito extensa.'},{status:413});
 let raw:unknown;
 try{raw=JSON.parse(body);}catch{return NextResponse.json({error:'Dados inválidos.'},{status:400});}
 if(raw&&typeof raw==='object'&&'website'in raw&&raw.website)return NextResponse.json({ok:true}); // Honeypot; não envia nem salva.
 const parsed=contactSchema.safeParse(raw);
 if(!parsed.success)return NextResponse.json({error:'Revise o preenchimento dos campos obrigatórios.'},{status:400});
 const v=parsed.data;
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
 const now=Date.now(),old=throttle.get(ip);
 if(old&&old.until>now&&old.count>=5)return NextResponse.json({error:'Limite temporário de envios. Tente mais tarde.'},{status:429});

 const recipient=process.env.CONTACT_TO_EMAIL|| (await getPublicSite()).email;
 const inboxEnabled=Boolean(process.env.SANITY_PRIVATE_DATASET==='true'&&process.env.SANITY_INBOX_WRITE_TOKEN&&process.env.NEXT_PUBLIC_SANITY_PROJECT_ID&&process.env.NEXT_PUBLIC_SANITY_DATASET);
 const emailEnabled=Boolean(process.env.RESEND_API_KEY&&process.env.CONTACT_FROM_EMAIL&&recipient);
 if(!inboxEnabled&&!emailEnabled)return NextResponse.json({code:'NOT_CONFIGURED',error:'Canal de recebimento não configurado.'},{status:503});
 for(const [key,entry] of throttle)if(entry.until<=now)throttle.delete(key);
 throttle.set(ip,!old||old.until<=now?{count:1,until:now+60*60*1000}:{count:old.count+1,until:old.until});

 let stored=false,sent=false;
 if(inboxEnabled){
  try{
   const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET!,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||'2026-03-01',useCdn:false,token:process.env.SANITY_INBOX_WRITE_TOKEN!});
   await client.create({_type:'inquiry',_id:`inquiry-${crypto.randomUUID()}`,name:v.name,email:v.email,phone:v.phone,subject:v.subject,message:v.message,receivedAt:new Date().toISOString(),status:'novo'});
   stored=true;
  }catch(error){console.error('Falha ao registrar solicitação:',error instanceof Error?error.name:'unknown');}
 }
 if(emailEnabled){
  try{
   const resend=new Resend(process.env.RESEND_API_KEY!);
   const response=await resend.emails.send({
    from:process.env.CONTACT_FROM_EMAIL!,to:[recipient],replyTo:v.email,
    subject:`Contato pelo site: ${v.subject}`,
    text:`Contato recebido pelo site Isabela Riechel\nNome: ${v.name}\nE-mail: ${v.email}\nTelefone: ${v.phone||'Não informado'}\nAssunto: ${v.subject}\n\nMensagem:\n${v.message}\n\nConsentimento informado: sim.`,
    html:`<div style="font-family:sans-serif;color:#253127"><h2>Novo contato pelo site</h2><p><strong>Nome:</strong> ${clean(v.name)}</p><p><strong>E-mail:</strong> ${clean(v.email)}</p><p><strong>Telefone:</strong> ${clean(v.phone||'Não informado')}</p><p><strong>Assunto:</strong> ${clean(v.subject)}</p><p style="white-space:pre-wrap">${clean(v.message)}</p><small>Consentimento informado: sim.</small></div>`
   });
   if(!response.error)sent=true;
   else console.error('Falha no serviço de e-mail:',response.error.name);
  }catch(error){console.error('Falha no envio por e-mail:',error instanceof Error?error.name:'unknown');}
 }
 if(!stored&&!sent)return NextResponse.json({error:'Não foi possível receber a mensagem. Utilize o WhatsApp ou o e-mail.'},{status:502});
 return NextResponse.json({ok:true,channel:stored&&sent?'both':stored?'inbox':'email'});
}
