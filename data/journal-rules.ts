import type {JournalStory} from "./journal-types";
export function selectPublishedStories(records:JournalStory[],now=new Date()) {
 return records.filter(story=>story.status==="published"&&Number.isFinite(Date.parse(story.publishedAt))&&Date.parse(story.publishedAt)<=now.getTime()).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt)||a.id.localeCompare(b.id)).filter((story,index,all)=>all.findIndex(item=>item.id===story.id||item.slug===story.slug)===index);
}
export function splitJournalStories(stories:JournalStory[]){const featured=stories.find(story=>story.featured)??stories[0];return {featured,remaining:stories.filter(story=>story.id!==featured?.id)}}
export function journalLink(href:string,internalOnly=false) {
 if(/^\/(?![\/\\])/.test(href)&&!/[\\\s]/.test(href))return href;
 if(internalOnly)return undefined;
 try{const url=new URL(href);return url.protocol==="https:"&&!url.username&&!url.password?href:undefined}catch{return undefined}
}
export function journalDate(value:string){return new Date(value).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}
