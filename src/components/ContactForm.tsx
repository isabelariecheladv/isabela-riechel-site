'use client';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
export function ContactForm(){
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'|'unconfigured'>('idle');
 const [error,setError]=useState('');
 async function submit(event:FormEvent<HTMLFormElement>){
   event.preventDefault();setStatus('sending');setError('');
   const form=event.currentTarget;
   const data=Object.fromEntries(new FormData(form).entries());
   try {
     const resp=await fetch('/api/contato',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
     const json=await resp.json();
     if(resp.ok){setStatus('sent');form.reset();return;}
     if(json.code==='NOT_CONFIGURED'){setStatus('unconfigured');return;}
     setError(json.error||'Não foi possível enviar sua mensagem.');setStatus('error');
   } catch {setError('Não foi possível acessar o envio neste momento.');setStatus('error');}
 }
 return <div className="form-panel">
    {status==='sent'?<div className="form-result" role="status"><CheckCircle2 size={35}/><h3>Mensagem recebida</h3><p>O contato foi registrado no canal configurado. O retorno ocorrerá conforme a disponibilidade profissional.</p><button className="text-button" type="button" onClick={()=>setStatus('idle')}>Enviar outra mensagem</button></div>:<>
      <span className="eyebrow">FORMULÁRIO DE CONTATO</span><h2>Conte brevemente o assunto.</h2><p>Preencha os dados essenciais. Evite enviar informações sigilosas ou documentos neste formulário.</p>
      <form onSubmit={submit} className="contact-form">
       <label>Nome completo <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Seu nome"/></label>
       <div className="form-two"><label>E-mail <input type="email" name="email" required maxLength={160} autoComplete="email" placeholder="seu@email.com"/></label><label>Telefone <input name="phone" maxLength={30} autoComplete="tel" placeholder="(00) 00000-0000"/></label></div>
       <label>Assunto <select name="subject" required defaultValue=""><option value="" disabled>Selecione uma área</option><option>Direito das Sucessões</option><option>Planejamento Patrimonial</option><option>Direito Imobiliário</option><option>Direito Civil</option><option>Outro assunto</option></select></label>
       <label>Mensagem resumida <textarea name="message" rows={4} maxLength={600} required placeholder="Descreva o assunto em linhas gerais, sem dados sensíveis."/></label>
       <label className="check-line"><input type="checkbox" required name="consent" value="yes"/><span>Concordo com o uso dos dados enviados exclusivamente para resposta ao contato, conforme a <a href="/privacidade">Política de Privacidade</a>.</span></label>
       <div className="honey" aria-hidden="true"><label>Não preencha <input name="website" tabIndex={-1} autoComplete="off"/></label></div>
       <button className="button button-dark" type="submit" disabled={status==='sending'}>{status==='sending'?'Enviando...':'Enviar mensagem'} <ArrowUpRight size={18}/></button>
       {status==='error'&&<p className="feedback-error" role="alert">{error}</p>}
       {status==='unconfigured'&&<p className="feedback-error" role="alert">O envio pelo site ainda está em configuração. Utilize o WhatsApp ou o e-mail desta página.</p>}
      </form>
    </>}
   </div>
}
