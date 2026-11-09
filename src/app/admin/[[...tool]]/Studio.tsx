'use client';
// O Sanity só pode ser carregado no cliente: no build de servidor ele importa um export do swr que não existe lá.
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
export function Studio(){return <NextStudio config={config}/>;}
