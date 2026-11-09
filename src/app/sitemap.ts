import type { MetadataRoute } from 'next';
import { services, site } from '@/lib/site';
import { getArticles } from '@/lib/sanity';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const urls=['','/sobre','/atuacao','/blog','/contato',...services.map(s=>'/atuacao/'+s.slug),...(await getArticles()).map(a=>'/blog/'+a.slug)];return urls.map(path=>({url:site.url+path,lastModified:new Date(),changeFrequency:path.startsWith('/blog')?'weekly':'monthly',priority:path===''?1:.65}));}
