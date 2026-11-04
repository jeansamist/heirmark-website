import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type {Metadata} from "next";
import {publishedStories} from "@/data/journal";
import JournalListing from "./JournalListing";
import JournalMotion from "./JournalMotion";
import "./journal.css";
const title="HeirMark Journal | News, Stories & Updates";
const description="Discover news, announcements, community stories, events, and updates from HeirMark.";
export const metadata:Metadata=withSocialMetadata({title:{absolute:title},description,alternates:{canonical:"/journal"},openGraph:{title,description,url:"/journal"}}, "/journal");
export const dynamic="force-dynamic";
export default function JournalPage(){return <main tabIndex={-1} id="main-content" className="jr-page"><PageSeo path="/journal" name="HeirMark Journal"/><JournalMotion/><header className="jr-container jr-hero"><p className="jr-eyebrow">HEIRMARK JOURNAL</p><h1>News, Stories &amp; Updates.</h1></header><JournalListing stories={publishedStories()}/></main>}
