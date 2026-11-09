'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Google Analytics 4 só é carregado depois do "Aceitar" (LGPD, art. 7º, I). Sem consentimento, nada é enviado.
const KEY='cookie-consent';
type GtagWindow=Window&{gtag?:(...args:unknown[])=>void};
function read(){try{return localStorage.getItem(KEY);}catch{return null;}}
function save(value:string){try{localStorage.setItem(KEY,value);}catch{}}

/** Registra uma conversão; não faz nada sem consentimento (gtag só existe após o aceite). */
export function track(name:string,params:Record<string,string>={}){(window as GtagWindow).gtag?.('event',name,params);}

export function Analytics({id}:{id:string}){
 const [consent,setConsent]=useState<string|null|undefined>(undefined);
 useEffect(()=>{
  setConsent(read());
  const reopen=()=>setConsent(null);
  window.addEventListener('cookie-settings',reopen);
  return ()=>window.removeEventListener('cookie-settings',reopen);
 },[]);
 useEffect(()=>{
  if(consent!=='granted')return;
  const onClick=(event:MouseEvent)=>{
   const link=(event.target as Element|null)?.closest?.('a');
   if(!link)return;
   if(link.closest('.booking-card'))track('booking_click');
   else if(link.href.includes('wa.me/'))track('contact_whatsapp');
   else if(link.href.startsWith('mailto:'))track('contact_email');
  };
  document.addEventListener('click',onClick);
  return ()=>document.removeEventListener('click',onClick);
 },[consent]);
 function choose(value:'granted'|'denied'){
  const wasGranted=read()==='granted';
  save(value);setConsent(value);
  if(value==='denied'&&wasGranted)location.reload(); // descarrega o script já carregado
 }
 return <>
  {consent==='granted'&&<>
   <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/>
   <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}</Script>
  </>}
  {consent===null&&<div className="cookie-banner" role="dialog" aria-label="Preferências de cookies">
   <p>Usamos cookies de estatística (Google Analytics) para entender como o site é encontrado e utilizado. Nenhum dado do formulário é enviado. <a href="/privacidade">Política de privacidade</a>.</p>
   <div className="cookie-actions">
    <button type="button" className="button button-cream" onClick={()=>choose('denied')}>Recusar</button>
    <button type="button" className="button button-gold" onClick={()=>choose('granted')}>Aceitar</button>
   </div>
  </div>}
 </>;
}

export function CookieSettingsButton(){
 return <button type="button" className="cookie-settings" onClick={()=>window.dispatchEvent(new Event('cookie-settings'))}>Preferências de cookies</button>;
}
