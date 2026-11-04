import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import SpeakingForm from "./SpeakingForm";
import "./speaking.css";
const title="Book Dr. Muria Nisbett | Speaking & Facilitation | HeirMark";
const description="Invite Dr. Muria Nisbett to speak, facilitate a workshop, or lead a meaningful experience centered on healing, connection, and legacy. Submit a booking request.";
export const metadata: Metadata=withSocialMetadata({title:{absolute:title},description,alternates:{canonical:'/speaking'},openGraph:{title,description,url:'/speaking',images:[{url:'/dr-muria-nisbett-speaking-portrait.webp',width:1200,height:1000}]},twitter:{card:'summary_large_image',title,description,images:['/dr-muria-nisbett-speaking-portrait.webp']}}, "/speaking");
export default function SpeakingPage(){return <><main tabIndex={-1} id="main-content" className="sp-page"><PageSeo path="/speaking" name="Book Dr. Muria Nisbett"/><div className="sp-layout"><div className="sp-portrait"><Image src="/dr-muria-nisbett-speaking-portrait.webp" alt="Dr. Muria Nisbett seated in an orange blazer, with her hands resting together." width={1200} height={1000} priority sizes="(max-width: 768px) 100vw, 44vw"/></div><div className="sp-content"><header className="sp-intro"><p className="sp-eyebrow">SPEAKING &amp; FACILITATION</p><h1>Book Dr. Muria Nisbett</h1><p>Invite Dr. Muria Nisbett to speak, facilitate, or guide a meaningful experience centered on healing, connection, and legacy.</p><p>Whether you&apos;re planning a conference, workshop, educational gathering, or community event, we&apos;d love to learn more about your vision.</p></header><SpeakingForm/></div></div></main></>}
