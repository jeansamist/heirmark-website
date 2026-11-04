import type {JournalStory} from "@/data/journal-types";
import {splitJournalStories} from "@/data/journal-rules";
import {HeirMarkIcon} from "@/components/home/HeirMarkIcon";
import {StoryCard} from "./JournalParts";
import JournalGrid from "./JournalGrid";
export default function JournalListing({stories}:{stories:JournalStory[]}){const {featured,remaining}=splitJournalStories(stories);return <section className="jr-container jr-listing" aria-label="Journal stories">{!featured?<div className="jr-empty" data-jr-reveal><HeirMarkIcon name="journal"/><h2>Our Stories Are Coming Soon.</h2><p>We&apos;re preparing a space to share news, community stories, events, and updates from HeirMark. Check back soon.</p></div>:<><StoryCard story={featured} featured/><JournalGrid stories={remaining}/></>}</section>}
