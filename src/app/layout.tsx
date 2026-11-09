import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
// Só IDs no formato do GA4 entram no script inline.
const gaId=/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID||'')?process.env.NEXT_PUBLIC_GA_ID!:'';
import { site } from '@/lib/site';
import { getPublicSite, getServices } from '@/lib/sanity';
export async function generateMetadata():Promise<Metadata>{
 const content=await getPublicSite();
 const image=content.seoImageUrl||'/images/hero-poltrona.webp';
 return {
  metadataBase:new URL(site.url),
  title:{default:content.name+' | Advocacia em Londrina',template:'%s | '+content.name},
  description:content.description,
  openGraph:{title:content.name+' — Advocacia',description:content.description,locale:'pt_BR',type:'website',siteName:content.name,images:[{url:image,alt:'Identidade visual de '+content.name}]},
  robots:{index:true,follow:true},
 };
}
export default async function RootLayout({children}:{children:React.ReactNode}){
 const [publicSite,services]=await Promise.all([getPublicSite(),getServices()]);
 const address:{'@type':string;addressLocality:string;addressRegion:string;addressCountry:string;streetAddress?:string}={
 '@type':'PostalAddress',addressLocality:'Londrina',addressRegion:'PR',addressCountry:'BR'};
 if(publicSite.showAddress)address.streetAddress=publicSite.officeAddress;
 const jsonLd={'@context':'https://schema.org','@type':'LegalService',name:publicSite.name,url:publicSite.url,description:publicSite.description,telephone:'+'+publicSite.phoneE164,email:publicSite.email,address,
  image:new URL(publicSite.seoImageUrl||'/images/hero-poltrona.webp',site.url).href,
  areaServed:{'@type':'City',name:'Londrina'},
  ...(publicSite.mapsUrl?{hasMap:publicSite.mapsUrl}:{}),
  sameAs:[publicSite.instagram,publicSite.linkedin,publicSite.mapsUrl].filter(Boolean)};
 return <html lang="pt-BR"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/><Header/><main id="conteudo">{children}</main><Footer site={publicSite} services={services} cookieSettings={Boolean(gaId)}/>{gaId&&<Analytics id={gaId}/>}</body></html>;
}
