import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getArticle, getArticles } from '@/lib/sanity';
type Props={params:Promise<{slug:string}>};
export async function generateStaticParams(){const a=await getArticles();return a.map(t=>({slug:t.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const a=await getArticle(slug);return a?{title:a.title,description:a.excerpt,alternates:{canonical:'/blog/'+a.slug}}:{};}
export default async function ArticlePage({params}:Props){const {slug}=await params;const a=await getArticle(slug);if(!a)notFound();return <><section className="article-hero"><div className="container narrow"><Link href="/blog" className="back-link"><ArrowLeft size={17}/> Voltar aos artigos</Link><span className="eyebrow">{a.category||'CONTEÚDO JURÍDICO'}</span><h1>{a.title}</h1><p>{a.excerpt}</p>{a.publishedAt&&<span className="article-date">Publicado em {new Intl.DateTimeFormat('pt-BR',{dateStyle:'long'}).format(new Date(a.publishedAt))}</span>}</div></section><article className="section"><div className="container narrow article-body">{a.coverImageUrl&&<div className="article-cover"><Image src={a.coverImageUrl} alt={a.coverImageAlt||a.title} fill sizes="(max-width: 900px) 100vw, 800px" className="cover-img"/></div>}<PortableText value={(a.body||[]) as Parameters<typeof PortableText>[0]['value']}/><hr/><p className="article-disclaimer">Este material possui finalidade exclusivamente informativa e não substitui análise jurídica do caso concreto. Legislação e entendimentos podem ser alterados.</p></div></article></>}
