import { ArrowUpRight, CalendarDays, MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';
export function Booking({light=false,bookingUrl='',whatsapp=site.whatsapp,bookingHelp='',bookingMode='both'}:{light?:boolean;bookingUrl?:string;whatsapp?:string;bookingHelp?:string;bookingMode?:string}){
 const configured=Boolean(bookingUrl && /^https:\/\//.test(bookingUrl));
 const modeLabel=bookingMode==='online'?'Atendimento online.':bookingMode==='in-person'?'Atendimento presencial.':'Atendimento presencial ou online.';
 return <div className={'booking-card '+(light?'booking-light':'')}>
   <div className="booking-icon"><CalendarDays size={22}/></div>
   <div><h3>Agendamento de atendimento</h3><p>{configured?(bookingHelp||('Consulte os horários disponíveis pela agenda online. '+modeLabel)):'A agenda online será disponibilizada em breve. Enquanto isso, solicite um horário pelo WhatsApp.'}</p></div>
   <a className="button button-gold" href={configured?bookingUrl:whatsapp} rel="noopener noreferrer" target="_blank">{configured?'Consultar horários':'Solicitar horário'} {configured?<ArrowUpRight size={17}/>:<MessageCircle size={17}/>}</a>
  </div>
}
