import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { getServices } from '@/lib/sanity';
export const metadata:Metadata={title:'Áreas de atuação em Londrina',alternates:{canonical:'/atuacao'},description:'Conheça as quatro áreas de atuação de Isabela Riechel: sucessões, planejamento patrimonial, imobiliário e civil.'};
export default async function Practice(){const services=await getServices();return <><div className="page-hero"><div className="container"><span className="eyebrow">ADVOCACIA E CONSULTORIA JURÍDICA</span><h1>Áreas de <em>atuação.</em></h1><p>Uma abordagem individualizada para questões jurídicas que envolvem pessoas, patrimônio e relações civis.</p></div></div><section className="section"><div className="container"><div className="practice-list">{services.map(s=><Link key={s.slug} href={'/atuacao/'+s.slug} className="practice-row"><span className="practice-number">{s.number} / 04</span><div><span className="eyebrow">{s.lead}</span><h2>{s.title}</h2><p>{s.short}</p></div><ArrowUpRight size={25}/></Link>)}</div></div></section></>}
