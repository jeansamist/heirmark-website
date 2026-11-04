/** Canonical origin shared by server metadata and Next.js configuration. */
export const SITE_ORIGIN = "https://www.theheirmarkframework.com";
export const LEGACY_HOST = new URL(SITE_ORIGIN).hostname.replace(/^www\./, "");
export function siteUrl(path = "/"): string {
  const url = new URL(path, SITE_ORIGIN);
  if (url.hostname === LEGACY_HOST || url.hostname === new URL(SITE_ORIGIN).hostname) {
    url.protocol = "https:";
    url.host = new URL(SITE_ORIGIN).host;
  }
  return url.href;
}
export const entityIds = {
  organization: siteUrl("/#organization"), website: siteUrl("/#website"),
  founder: siteUrl("/#muria-nisbett"), framework: siteUrl("/framework#framework"),
};
