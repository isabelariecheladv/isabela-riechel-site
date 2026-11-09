import { Studio } from './Studio';
export const dynamic='force-dynamic';
export const metadata={title:'Administração — Isabela Riechel',robots:{index:false,follow:false}};
export default function Admin(){
 if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET)
  return <div className="admin-setup"><h1>Administração do site</h1><p>O painel está instalado, mas ainda precisa conectar o projeto Sanity.</p><ol><li>Crie um projeto em <a href="https://www.sanity.io/manage">sanity.io/manage</a> e um dataset <strong>privado</strong>.</li><li>Configure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET e SANITY_READ_TOKEN.</li><li>Cadastre este domínio nas origens CORS do Sanity e adicione os usuários autorizados.</li><li>Reabra <strong>/admin</strong> e entre com a conta Sanity.</li></ol><p>Leia ADMINISTRACAO.md para configurar o painel e os formulários.</p></div>;
 return <Studio/>;
}
