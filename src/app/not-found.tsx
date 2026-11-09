import Link from 'next/link';
export default function NotFound(){return <section className="section"><div className="container not-found"><span className="eyebrow">PÁGINA NÃO ENCONTRADA</span><h1>Esta página não está disponível.</h1><p>Você pode retornar ao início ou conhecer as áreas de atuação.</p><Link href="/" className="button button-dark">Voltar ao início</Link></div></section>}
