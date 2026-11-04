import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type {Metadata} from "next";import {notFound} from "next/navigation";
import {eventCatalog,eventDate} from "@/data/event-catalog";import {EventArtwork,EventEssentials,EventRegistration,EventLongContent} from "../EventParts";import EventsMotion from "../EventsMotion";import "../events.css";
export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const e=eventCatalog.find(e=>e.slug===slug);if(!e)return {title:"Event not found"};
 return withSocialMetadata({title:{absolute:`${e.title} | HeirMark Events`},description:`${e.category} · ${eventDate(e)}${e.location?` · ${e.location}`:""}. ${e.description}`},`/events/${slug}`,e.image?{url:e.image,alt:e.imageAlt}:undefined);
}
export default async function EventDetail({params}:Props){const {slug}=await params;const e=eventCatalog.find(e=>e.slug===slug);if(!e)notFound();return <main tabIndex={-1} id="main-content" className="ev-page"><EventsMotion/><PageSeo path={`/events/${e.slug}`} name={e.title}/><div className="ev-container ev-detail-scalable ev-section"><header className="ev-detail-intro"><p className="ev-eyebrow">{e.category.toUpperCase()}</p><h1>{e.title}</h1><p>{e.description}</p></header><div className="ev-presentation"><div className="ev-detail-art" data-ev-reveal><EventArtwork event={e}/></div><aside className="ev-info" data-ev-reveal><h2>Event Details</h2><EventEssentials event={e}/><EventRegistration event={e} integrated/></aside></div><EventLongContent event={e}/></div></main>}
