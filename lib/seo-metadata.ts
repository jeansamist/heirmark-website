import "server-only";
import type { Metadata } from "next";
import { siteUrl } from "./site-url";
export type SocialImage = { url: string; width?: number; height?: number; alt?: string };
export const fallbackImage: SocialImage = {url:"/gallery/heirmark-table-conversation.jpg",width:4608,height:3072,alt:"Two women talking at a table."};
const imageDimensions: Record<string, {width:number;height:number}> = {
  "/gallery/heirmark-healing-through-story-workshop.webp": {width:1179,height:781},
};
export const socialImages: Record<string, SocialImage> = {
  "/books": {url:"/heirmark-collection-catalog-covers.webp",width:1617,height:820,alt:"The three official HeirMark companion books."},
  "/events": {url:"/gallery/heirmark-events-group-conversation.webp",width:1600,height:800,alt:"Adults sharing stories in a small group discussion."},
  "/partnerships": {url:"/gallery/heirmark-community-partnerships-hero.webp",width:1600,height:1067,alt:"Community members participating in a collaborative group discussion."},
};
/** Preserve page titles/descriptions and any existing approved image selection. */
export function withSocialMetadata(metadata: Metadata, path: string, image?: SocialImage): Metadata {
  const rawTitle = metadata.title;
  const title = typeof rawTitle === "string" ? (rawTitle === "HeirMark" ? rawTitle : `${rawTitle} | HeirMark`) : rawTitle && "absolute" in rawTitle ? rawTitle.absolute : "HeirMark";
  const selected = metadata.openGraph?.images ?? [image ?? socialImages[path] ?? fallbackImage];
  const images = (Array.isArray(selected) ? selected : [selected]).map(entry => {
    if (typeof entry === "string" || entry instanceof URL) return {url:siteUrl(String(entry))};
    return {...imageDimensions[new URL(String(entry.url), siteUrl()).pathname],...entry,url:siteUrl(String(entry.url))};
  });
  return {...metadata,alternates:{...metadata.alternates,canonical:siteUrl(path)},
    openGraph:{...metadata.openGraph,title:metadata.openGraph?.title ?? title,description:metadata.openGraph?.description ?? metadata.description ?? undefined,url:siteUrl(path),images},
    twitter:{...metadata.twitter,card:"summary_large_image",title:metadata.twitter?.title ?? title,description:metadata.twitter?.description ?? metadata.description ?? undefined,images},
  };
}
