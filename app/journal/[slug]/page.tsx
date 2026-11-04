import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {publishedStory} from "@/data/journal";
import {ArticleContent} from "../JournalParts";
import JournalMotion from "../JournalMotion";
import "../journal.css";
type Props={params:Promise<{slug:string}>};
export const dynamic="force-dynamic";
async function getStory(params:Props["params"]){const story=publishedStory((await params).slug);if(!story)notFound();return story}
export async function generateMetadata({params}:Props):Promise<Metadata>{const story=await getStory(params);return withSocialMetadata({title:{absolute:`${story.title} | HeirMark Journal`},description:story.summary,openGraph:{type:"article",title:story.title,description:story.summary,publishedTime:story.publishedAt}},`/journal/${story.slug}`,story.image?{url:story.image,alt:story.imageAlt}:undefined)}
export default async function JournalArticle({params}:Props){const story=await getStory(params);return <main tabIndex={-1} id="main-content" className="jr-page"><JournalMotion/><PageSeo path={`/journal/${story.slug}`} name={story.title}/><ArticleContent story={story}/></main>}
