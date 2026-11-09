import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type {PublicSite,Service} from '@/lib/sanity';
import { CookieSettingsButton } from './Analytics';
export function Footer({site,services,cookieSettings=false}:{site:PublicSite;services:Service[];cookieSettings?:boolean}){
 return <footer className="footer"><div className="container">
  <div className="footer-grid">
   <div><div className="footer-brand"><Image src="/brand/monograma-dourado.png" alt="" width={37} height={56}/><span>ISABELA RIECHEL</span></div><p>Advocacia em Direito das Sucessões, Planejamento Patrimonial, Direito Imobiliário e Direito Civil.</p><p className="footer-location">{site.location}{site.showAddress&&site.officeAddress?<><br/>{site.officeAddress}</>:null}</p></div>
   <div><h3>Explore</h3><Link href="/sobre">Sobre Isabela</Link><Link href="/atuacao">Áreas de atuação</Link><Link href="/blog">Artigos jurídicos</Link><Link href="/contato">Contato</Link></div>
   <div><h3>Atuação</h3>{services.map(s=><Link href={'/atuacao/'+s.slug} key={s.slug}>{s.title}</Link>)}</div>
   <div><h3>Contato</h3><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{site.phoneDisplay} <ArrowUpRight size={14}/></a><a href={'mailto:'+site.email}>{site.email}</a><Link href="/contato">Solicitar atendimento</Link>{site.instagram&&<a href={site.instagram} rel="noopener noreferrer" target="_blank">Instagram <ArrowUpRight size={14}/></a>}{site.linkedin&&<a href={site.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn <ArrowUpRight size={14}/></a>}</div>
  </div>
  <div className="footer-base"><span>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</span><span>Conteúdo informativo. Não substitui orientação jurídica individualizada.</span><Link href="/privacidade">Privacidade</Link>{cookieSettings&&<CookieSettingsButton/>}</div>
 </div></footer>
}
