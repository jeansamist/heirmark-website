import "server-only";
import { siteUrl, entityIds } from "./site-url";
import type { Publication } from "@/data/publications";
import type { EventRecord } from "@/data/event-catalog";
import type { JournalStory } from "@/data/journal-types";
export type SchemaNode = { "@type": string; "@id": string; [key:string]: unknown };
export const ref = (id:string) => ({"@id":id});
export function graph(nodes:SchemaNode[]) {return {"@context":"https://schema.org","@graph":nodes};}
export function siteEntities(): SchemaNode[] {return [
 {"@type":"Organization","@id":entityIds.organization,name:"HeirMark",url:siteUrl(),logo:siteUrl("/heirmark-official-logo.png"),founder:ref(entityIds.founder)},
 {"@type":"WebSite","@id":entityIds.website,name:"HeirMark",url:siteUrl(),publisher:ref(entityIds.organization)},
 {"@type":"Person","@id":entityIds.founder,name:"Dr. Muria I. Nisbett",description:"Dr. Muria I. Nisbett is a therapist, author, and founder of HeirMark, a culturally grounded initiative that brings together healing, identity, connection, and legacy.",url:siteUrl("/#founder-title")},
];}
export function webpage(path:string,name:string,type="WebPage",mainEntity?:string):SchemaNode {return {"@type":type,"@id":siteUrl(`${path}#webpage`),url:siteUrl(path),name,isPartOf:ref(entityIds.website),publisher:ref(entityIds.organization),...(mainEntity?{mainEntity:ref(mainEntity)}:{})};}
export function breadcrumbs(path:string,items:{name:string;path:string}[]):SchemaNode {return {"@type":"BreadcrumbList","@id":siteUrl(`${path}#breadcrumbs`),itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,item:siteUrl(item.path)}))};}
export function bookNode(book:Publication):SchemaNode {
 const path=book.detailUrl??`/books/${book.slug}`;
 return {"@type":"Book","@id":siteUrl(`${path}#book`),name:book.title,description:book.shortDescription,url:siteUrl(path),image:siteUrl(book.cover.src),...(book.author?{author:book.author==="Dr. Muria I. Nisbett"?ref(entityIds.founder):{"@type":"Person",name:book.author}}:{}),...(book.type==="ebook"?{bookFormat:"https://schema.org/EBook"}:{})};
}
export function eventNode(event:EventRecord):SchemaNode {return {"@type":"Event","@id":siteUrl(`/events/${event.slug}#event`),url:siteUrl(`/events/${event.slug}`),name:event.title,description:event.description,startDate:event.startDate,...(event.endDate?{endDate:event.endDate}:{}),...(event.location?{location:{"@type":"Place",name:event.location}}:{}),...(event.image?{image:siteUrl(event.image)}:{})};}
export function articleNode(story:JournalStory):SchemaNode {return {"@type":"Article","@id":siteUrl(`/journal/${story.slug}#article`),headline:story.title,description:story.summary,url:siteUrl(`/journal/${story.slug}`),datePublished:story.publishedAt,mainEntityOfPage:ref(siteUrl(`/journal/${story.slug}#webpage`)),publisher:ref(entityIds.organization),...(story.image?{image:siteUrl(story.image)}:{}),...(story.author?{author:story.author==="Dr. Muria I. Nisbett"?ref(entityIds.founder):{"@type":"Person",name:story.author}}:{})};}
