"use client";
import {useState} from "react";
import type {JournalStory} from "@/data/journal-types";
import {StoryCard} from "./JournalParts";
export default function JournalGrid({stories}:{stories:JournalStory[]}){
 // Six total stories initially: one feature plus five grid stories.
 const [count,setCount]=useState(5);if(!stories.length)return null;
 return <><div className="jr-grid" id="journal-grid">{stories.slice(0,count).map(story=><StoryCard key={story.id} story={story}/>)}</div>{count<stories.length&&<button className="hm-button hm-button-secondary jr-load" aria-controls="journal-grid" onClick={()=>{const firstNew=count;setCount(n=>n+6);requestAnimationFrame(()=>{const card=document.querySelectorAll<HTMLElement>('#journal-grid .jr-card')[firstNew];if(card){card.tabIndex=-1;card.focus({preventScroll:true})}})}}>Load More</button>}<p className="sr-only" aria-live="polite">{Math.min(count,stories.length)+1} of {stories.length+1} stories shown</p><noscript><div className="jr-grid">{stories.slice(5).map(story=><StoryCard key={story.id} story={story}/>)}</div><style>{`.jr-load{display:none}`}</style></noscript></>;
}
