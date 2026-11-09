import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { services as defaults } from '@/lib/site';
import { getServices } from '@/lib/sanity';
type Params={params:Promise<{slug:string}>};
export function generateStaticParams(){return defaults.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{const {slug}=await params;const s=(await getServices()).find(x=>x.slug===slug);return s?{title:s.title+' em Londrina',description:s.seoDescription||s.short,alternates:{canonical:'/atuacao/'+s.slug}}:{};}
export default async function Service({params}:Params){const {slug}=await params;const s=(await getServices()).find(x=>x.slug===slug);if(!s)notFound();return <><div className="page-hero service-page-hero"><div className="container"><Link className="back-link" href="/atuacao"><ArrowLeft size={16}/> Todas as áreas</Link><span className="eyebrow">{s.number} / 04 — ÁREAS DE ATUAÇÃO</span><h1>{s.title.split(' ').slice(0,-1).join(' ')} <em>{s.title.split(' ').slice(-1)}</em></h1><p>{s.short}</p></div></div><section className="section"><div className="container detail-layout"><div><span className="eyebrow">CONHEÇA A ATUAÇÃO</span><h2>{s.lead}</h2><p className="detail-lead">{s.description}</p><Link href="/contato" className="button button-dark">Solicitar atendimento <ArrowUpRight size={17}/></Link></div><div className="detail-panel"><h3>Questões relacionadas</h3><ul>{s.topics.map(t=><li key={t}><Check size={17}/>{t}</li>)}</ul><p>O enquadramento jurídico e a estratégia de atuação dependem da análise dos documentos e das circunstâncias de cada caso.</p></div></div></section></>}
