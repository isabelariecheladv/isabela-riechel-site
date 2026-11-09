'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const menu = [ ['Sobre','/sobre'], ['Atuação','/atuacao'], ['Artigos','/blog'], ['Contato','/contato'] ];
export function Header(){
 const [open,setOpen]=useState(false);const path=usePathname();
 return <header className="site-header">
   <div className="header-inner container">
     <Link href="/" className="brand" aria-label="Isabela Riechel — início" onClick={()=>setOpen(false)}>
       <Image src="/brand/monograma-escuro.png" alt="" width={32} height={49} className="brand-icon" priority/>
       <span className="brand-name">ISABELA RIECHEL <small>ADVOCACIA</small></span>
     </Link>
     <nav className={'main-nav '+(open?'is-open':'')} aria-label="Navegação principal">
      {menu.map(([name,link])=><Link key={link} className={path===link || (link!=='/' && path.startsWith(link))?'current':''} href={link} onClick={()=>setOpen(false)}>{name}</Link>)}
      <Link className="mobile-contact" href="/contato" onClick={()=>setOpen(false)}>Solicitar atendimento <ArrowUpRight size={17}/></Link>
     </nav>
     <Link href="/contato" className="header-action">Solicitar atendimento <ArrowUpRight size={16}/></Link>
     <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open?'Fechar menu':'Abrir menu'} onClick={()=>setOpen(!open)}>{open?<X size={24}/>:<Menu size={24}/>}</button>
   </div>
 </header>;
}
