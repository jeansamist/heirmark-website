import "server-only";
import {JsonLd} from "@/components/JsonLd";
import {graph,webpage,breadcrumbs,bookNode,eventNode,articleNode,ref,type SchemaNode} from "@/lib/structured-data";
import {entityIds,siteUrl} from "@/lib/site-url";
import {publications} from "@/data/publications";
import {eventCatalog} from "@/data/event-catalog";
import {publishedStories,publishedStory} from "@/data/journal";
import framework from "@/data/framework-copy.json";
export default function PageSeo({path,name}:{path:string;name:string}) {
 const nodes:SchemaNode[]=[];
 const home={name:"Home",path:"/"};
 let mainEntity:string|undefined;
 let type="WebPage";
 if(path==="/")mainEntity=entityIds.organization;
 if(path==="/framework") {
  mainEntity=entityIds.framework;
  nodes.push({"@type":"CreativeWork","@id":mainEntity,name:"The HeirMark Framework",url:siteUrl(path),description:framework.hero.intro,publisher:ref(entityIds.organization),about:framework.pillars.chapters.map(p=>({"@type":"Thing",name:p.title,description:p.support}))});
  nodes.push(breadcrumbs(path,[home,{name:"The HeirMark Framework",path}]));
 }
 if(path==="/collection") {
  const book=publications.find(b=>b.type==="collection")!;
  mainEntity=siteUrl(path+"#product");
  nodes.push({"@type":"Product","@id":mainEntity,name:book.title,description:book.shortDescription,url:siteUrl(path),image:siteUrl(book.cover.src),brand:ref(entityIds.organization),additionalProperty:{"@type":"PropertyValue",name:"Included packaging",value:"Branded HeirMark presentation box"}});
  nodes.push(breadcrumbs(path,[home,{name:"Our Books",path:"/books"},{name:book.title,path}]));
 }
 if(["/books","/events","/journal"].includes(path)) {
  type="CollectionPage";mainEntity=siteUrl(path+"#list");
  const items=path==="/books"?publications.map(b=>({name:b.title,path:b.detailUrl??`/books/${b.slug}`})):path==="/events"?eventCatalog.map(e=>({name:e.title,path:`/events/${e.slug}`})):publishedStories().map(s=>({name:s.title,path:`/journal/${s.slug}`}));
  nodes.push({"@type":"ItemList","@id":mainEntity,numberOfItems:items.length,itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,url:siteUrl(item.path)}))});
 }
 if(path.startsWith("/books/")) {
  const book=publications.find(b=>`/books/${b.slug}`===path&&b.type!=="collection");
  if(book){const node=bookNode(book);mainEntity=node["@id"];nodes.push(node,breadcrumbs(path,[home,{name:"Our Books",path:"/books"},{name:book.title,path}]))}
 }
 if(path.startsWith("/events/")) {
  const event=eventCatalog.find(e=>`/events/${e.slug}`===path);
  if(event){const node=eventNode(event);mainEntity=node["@id"];nodes.push(node,breadcrumbs(path,[home,{name:"Events",path:"/events"},{name:event.title,path}]))}
 }
 if(path.startsWith("/journal/")) {
  const story=publishedStory(path.slice("/journal/".length));
  if(!story)return null;
  const node=articleNode(story);mainEntity=node["@id"];nodes.push(node,breadcrumbs(path,[home,{name:"Journal",path:"/journal"},{name:story.title,path}]))
 }
 const page=webpage(path,name,type,mainEntity);
 if(nodes.some(n=>n["@type"]==="BreadcrumbList"))page.breadcrumb=ref(siteUrl(path+"#breadcrumbs"));
 nodes.unshift(page);
 return <JsonLd data={graph(nodes)}/>;
}
