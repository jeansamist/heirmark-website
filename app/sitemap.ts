import type { MetadataRoute } from "next";
import { publications } from "@/data/publications";
import { eventCatalog } from "@/data/event-catalog";
import { publishedStories } from "@/data/journal";
import { siteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
 const paths=["/","/framework","/collection","/books","/events","/speaking","/partnerships","/contact","/journal",
 ...publications.filter(b=>b.type!=="collection").map(b=>b.detailUrl??`/books/${b.slug}`),
 ...eventCatalog.map(e=>`/events/${e.slug}`),...publishedStories().map(s=>`/journal/${s.slug}`)];
 // No reliable modification dates are stored in the current catalogs.
 return [...new Set(paths)].map(path=>({url:siteUrl(path)}));
}
