export type EventContentBlock =
  | {type:"paragraph";text:string}
  | {type:"heading";text:string}
  | {type:"list";items:string[];ordered?:boolean};
export type EventRecord={slug:string;title:string;category:string;description:string;fullDescription?:string;content?:EventContentBlock[];startDate:string;endDate?:string;time?:string;timeZone?:string;location?:string;format?:"In Person"|"Virtual"|"Hybrid";admission:"free"|"paid";price?:number;currency?:string;registrationUrl?:string;registrationVerified?:boolean;registrationStatus:"closed"|"open"|"sold-out"|"cancelled";historical?:boolean;image?:string;imageAlt?:string};
const description="A transformative workshop where participants explore personal and ancestral narratives to foster healing and connection.";
export const eventCatalog:EventRecord[]=[{slug:"healing-through-story",title:"Healing Through Story",category:"Workshop",description,fullDescription:description,startDate:"2026-10-15",time:"10:00 AM – 4:00 PM",location:"New York, NY",admission:"paid",price:100,registrationStatus:"closed",historical:true,image:"/gallery/heirmark-healing-through-story-workshop.webp",imageAlt:"Attendee applauding during a community gathering."}];
export function isPast(e:EventRecord,now=new Date()){return e.historical===true||(e.endDate??e.startDate)<now.toISOString().slice(0,10)}
export function safeRegistrationUrl(raw?:string){if(!raw)return null;try{const u=new URL(raw);return u.protocol==="https:"&&!u.username&&!u.password?u.href:null}catch{return null}}
export function registrationAction(e:EventRecord,now=new Date()){if(isPast(e,now)||e.registrationStatus!=="open"||!e.registrationVerified)return null;const href=safeRegistrationUrl(e.registrationUrl);if(!href||(e.admission==="paid"&&(e.price===undefined||!e.currency)))return null;return {href,label:e.admission==="free"?"Register for Free":"Get Tickets"}}
export function eventStatus(e:EventRecord){return e.registrationStatus==="cancelled"?"Cancelled":isPast(e)?"Past Event":e.registrationStatus==="sold-out"?"Sold Out":registrationAction(e)?"Registration Open":"Upcoming"}
export function eventDate(e:EventRecord){return new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(e.startDate+"T12:00:00Z"))}
export function admission(e:EventRecord){return e.admission==="free"?"Free":e.price===undefined?null:e.currency?new Intl.NumberFormat("en-US",{style:"currency",currency:e.currency}).format(e.price):`$${e.price}`}
