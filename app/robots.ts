import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
export default function robots(): MetadataRoute.Robots {
 const privatePaths=["/api/","/success/","/thank-you/"];
 return {rules:[
  {userAgent:"*",allow:"/",disallow:privatePaths},
  // Specific groups repeat private restrictions: wildcard rules are not inherited.
  {userAgent:["OAI-SearchBot","PerplexityBot"],allow:"/",disallow:privatePaths},
  {userAgent:["GPTBot","ClaudeBot"],disallow:"/"},
 ],sitemap:siteUrl("/sitemap.xml")};
}
