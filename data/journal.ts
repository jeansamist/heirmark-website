import "server-only";
import type {JournalStory} from "./journal-types";
import {selectPublishedStories} from "./journal-rules";
// Add approved content here. Drafts never leave this server-only module.
export const journalStories:JournalStory[]=[];
export function publishedStories(now=new Date()){return selectPublishedStories(journalStories,now)}
export function publishedStory(slug:string){return publishedStories().find(story=>story.slug===slug)}
