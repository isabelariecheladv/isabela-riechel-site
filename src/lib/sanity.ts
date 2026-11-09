import 'server-only';
import { createClient } from 'next-sanity';
import { services as defaultServices, site as defaultSite } from './site';

export const sanityEnabled=Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET);
const publicClient=sanityEnabled?createClient({
 projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET!,
 apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-01',
 useCdn:false,
 token:process.env.SANITY_READ_TOKEN || undefined,
}):null;

async function fetchContent<T>(query:string,params:Record<string,unknown>={}):Promise<T|null>{
 if(!publicClient)return null;
 try{return await publicClient.fetch<T>(query,params,{next:{revalidate:60}})}
 catch(err){console.error('Consulta Sanity falhou:',err instanceof Error?err.message:'erro desconhecido');return null;}
}

export type SiteContent={
 publicName?:string;phoneDisplay?:string;phoneDigits?:string;email?:string;bookingUrl?:string;
 bookingHelp?:string;bookingMode?:string;city?:string;showAddress?:boolean;
 officeAddress?:string;instagram?:string;linkedin?:string;mapsUrl?:string;siteDescription?:string;seoImageUrl?:string;
};
export type PublicSite=typeof defaultSite & {officeAddress:string;showAddress:boolean;instagram:string;linkedin:string;mapsUrl:string;bookingHelp:string;seoImageUrl:string;bookingMode:string;};
export async function getPublicSite():Promise<PublicSite>{
 const s=await fetchContent<SiteContent>(`*[_id=="siteSettings"][0]{publicName,phoneDisplay,phoneDigits,email,bookingUrl,bookingHelp,bookingMode,city,showAddress,officeAddress,instagram,linkedin,mapsUrl,siteDescription,"seoImageUrl":seoImage.asset->url}`);
 const digits=s?.phoneDigits?.replace(/\D/g,'')||defaultSite.phoneE164;
 const mail=s?.email?.trim()||defaultSite.email;
 return {...defaultSite,
   name:s?.publicName?.trim()||defaultSite.name,
   phoneDisplay:s?.phoneDisplay||defaultSite.phoneDisplay,
   phoneE164:digits,whatsapp:`https://wa.me/${digits}`,email:mail,
   description:s?.siteDescription||defaultSite.description,
   location:s?.city||defaultSite.location,
   bookingUrl:s?.bookingUrl||defaultSite.bookingUrl,
   bookingHelp:s?.bookingHelp||'',bookingMode:s?.bookingMode||'both',
   showAddress:Boolean(s?.showAddress&&s?.officeAddress?.trim()),officeAddress:s?.officeAddress?.trim()||'',
   instagram:s?.instagram||'',linkedin:s?.linkedin||'',mapsUrl:s?.mapsUrl||'',seoImageUrl:s?.seoImageUrl||''
 };
}

export type HomeContent={
 heroEyebrow?:string;heroTitle?:string;heroEmphasis?:string;heroDescription?:string;heroImageUrl?:string;heroImageAlt?:string;
 servicesTitle?:string;servicesEmphasis?:string;servicesDescription?:string;
 statementTitle?:string;statementEmphasis?:string;statementDescription?:string;
 aboutTitle?:string;aboutEmphasis?:string;aboutParagraphOne?:string;aboutParagraphTwo?:string;aboutImageUrl?:string;aboutImageAlt?:string;
 editorialTitle?:string;editorialEmphasis?:string;contactTitle?:string;contactEmphasis?:string;contactDescription?:string;
};
export async function getHomeContent():Promise<HomeContent>{
 return await fetchContent<HomeContent>(`*[_id=="homePage"][0]{heroEyebrow,heroTitle,heroEmphasis,heroDescription,"heroImageUrl":heroImage.asset->url,"heroImageAlt":heroImage.alt,servicesTitle,servicesEmphasis,servicesDescription,statementTitle,statementEmphasis,statementDescription,aboutTitle,aboutEmphasis,aboutParagraphOne,aboutParagraphTwo,"aboutImageUrl":aboutImage.asset->url,"aboutImageAlt":aboutImage.alt,editorialTitle,editorialEmphasis,contactTitle,contactEmphasis,contactDescription}`)||{};
}

export type AboutContent={heroTitle?:string;heroEmphasis?:string;heroLead?:string;heroImageUrl?:string;heroImageAlt?:string;bioTitle?:string;paragraphs?:string[];credentials?:string[];portraitImageUrl?:string;portraitImageAlt?:string;quote?:string};
export async function getAboutContent():Promise<AboutContent>{return await fetchContent<AboutContent>(`*[_id=="aboutPage"][0]{heroTitle,heroEmphasis,heroLead,"heroImageUrl":heroImage.asset->url,"heroImageAlt":heroImage.alt,bioTitle,paragraphs,credentials,"portraitImageUrl":portraitImage.asset->url,"portraitImageAlt":portraitImage.alt,quote}`)||{}}

export type Service = {
 number:string;slug:string;title:string;short:string;lead:string;description:string;topics:string[];seoDescription?:string;
};
const documents:Record<string,string>={
 'direito-das-sucessoes':'area-sucessoes',
 'planejamento-patrimonial':'area-patrimonial',
 'direito-imobiliario':'area-imobiliario',
 'direito-civil':'area-civil',
};
export async function getServices():Promise<Service[]>{
 const custom=await fetchContent<Array<{_id:string;title?:string;short?:string;lead?:string;description?:string;topics?:string[];seoDescription?:string}>>(`*[_id in ["area-sucessoes","area-patrimonial","area-imobiliario","area-civil"]]{_id,title,short,lead,description,topics,seoDescription}`);
 return defaultServices.map(s=>{
  const d=custom?.find(x=>x._id===documents[s.slug]);
  return {...s, title:d?.title?.trim()||s.title,lead:d?.lead?.trim()||s.lead,short:d?.short?.trim()||s.short,description:d?.description?.trim()||s.description,topics:d?.topics?.length?d.topics:[...s.topics],seoDescription:d?.seoDescription};
 });
}

export type Article={_id:string;title:string;slug:string;excerpt?:string;category?:string;publishedAt?:string;body?:Array<{_type:string}&Record<string,unknown>>;coverImageUrl?:string;coverImageAlt?:string};
const articleFields=`_id,title,"slug":slug.current,excerpt,category,publishedAt,body,"coverImageUrl":coverImage.asset->url,"coverImageAlt":coverImage.alt`;
export async function getArticles():Promise<Article[]>{return await fetchContent<Article[]>(`*[_type=="article" && defined(slug.current) && legalReview==true && defined(publishedAt) && publishedAt<=now()] | order(publishedAt desc){${articleFields}}`)||[];}
export async function getArticle(slug:string):Promise<Article|null>{return await fetchContent<Article>(`*[_type=="article" && slug.current==$slug && legalReview==true && defined(publishedAt) && publishedAt<=now()][0]{${articleFields}}`,{slug});}
export type PrivacyContent={approved?:boolean;body?:Array<{_type:string}&Record<string,unknown>>;lastReview?:string};
export async function getPrivacyContent():Promise<PrivacyContent|null>{return await fetchContent<PrivacyContent>(`*[_id=="privacyPage"][0]{approved,body,lastReview}`)}
