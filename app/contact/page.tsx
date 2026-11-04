import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import ContactPageForm from "./ContactPageForm";
import "./contact.css";
const description = "Get in touch with the HeirMark team for general inquiries, books, events, media requests, and opportunities to connect.";
export const metadata: Metadata = withSocialMetadata({title:{absolute:"Contact HeirMark | Get in Touch"},description,alternates:{canonical:"/contact"},openGraph:{title:"Contact HeirMark | Get in Touch",description,url:"/contact"}}, "/contact");
export default function ContactPage(){return <><main tabIndex={-1} id="main-content" className="ct-page"><PageSeo path="/contact" name="Contact HeirMark"/><div className="ct-layout">
<header className="ct-intro"><p className="ct-eyebrow">CONTACT HEIRMARK</p><h1>Let&apos;s Start a Conversation.</h1><p>Have a question or an idea you&apos;d like to share? We&apos;d love to hear from you.</p></header>
<ContactPageForm/>
<section className="ct-pathways" aria-labelledby="pathways-title"><h2 id="pathways-title">Looking for Something Specific?</h2>
<Link className="ct-pathway" href="/speaking"><div><h3>Speaking Engagements</h3><span>Book Dr. Muria Nisbett</span></div><span className="ct-arrow" aria-hidden="true">↗</span></Link>
<Link className="ct-pathway" href="/partnerships"><div><h3>Partnerships</h3><span>Explore Partnerships</span></div><span className="ct-arrow" aria-hidden="true">↗</span></Link>
</section></div></main></>}
