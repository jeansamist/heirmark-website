import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { HeirMarkIcon, type IconName } from "@/components/home/HeirMarkIcon";
import CollectionMotion from "./CollectionMotion";
import { collectionCovers } from "@/data/homepage";
import copy from "@/data/collection-copy.json";
import "./collection.css";

const mobileHero = getImageProps({ src: "/heirmark-collection-mobile-960.webp", alt: "", width: 960, height: 775, sizes: "100vw" }).props;
const coverBounds = [[213,183,524,713],[190,205,521,720],[175,211,551,755]];
const checkout = "https://buy.stripe.com/4gM5kD0Rj8H20Hv4B07IY00";
const title = "HeirMark Collection | Three Companion Books";
const description = "Explore the HeirMark Collection, three companion books designed to help families understand their identity, strengthen connections, and preserve their legacy.";
export const metadata: Metadata = withSocialMetadata({
  title: { absolute: title }, description, alternates: { canonical: "/collection" },
  openGraph: { title, description, url: "/collection", images: [{ url: "/heirmark-collection-hero.webp", width: 3000, height: 2000 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/heirmark-collection-hero.webp"] },
}, "/collection");
function Rich({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => part.startsWith("**") ? <strong key={i}>{part.slice(2,-2)}</strong> : part.startsWith("*") ? <em key={i}>{part.slice(1,-1)}</em> : part)}</>;
}
function PurchaseButton({ label = "Buy the Collection" }: { label?: string }) {
  return <Link className="hm-button" href={checkout}>{label}<span aria-hidden="true">↗</span></Link>;
}
function CoverArtwork({ i, className = "" }: { i: number; className?: string }) {
 return <div className={`hc-cover ${className}`} style={{
              "--cover-ratio": `${coverBounds[i][2]} / ${coverBounds[i][3]}`,
              "--cover-width": `${coverBounds[i][2] / coverBounds[i][3] * 590}px`,
              "--image-width": `${collectionCovers[i].width / coverBounds[i][2] * 100}%`,
              "--image-left": `${-coverBounds[i][0] / coverBounds[i][2] * 100}%`,
              "--image-top": `${-coverBounds[i][1] / coverBounds[i][3] * 100}%`,
            } as React.CSSProperties}>
              <Image src={collectionCovers[i].src} alt={copy.inside.books[i].title} width={collectionCovers[i].width} height={collectionCovers[i].height} sizes="(max-width: 767px) 540px, 660px" />
            </div>;
}
export default function CollectionPage() {
  return <>
    <CollectionMotion />
    <main tabIndex={-1} id="main-content" className="hc-page"><PageSeo path="/collection" name="The HeirMark Collection"/>
      <section className="hc-section hc-hero" aria-labelledby="collection-title">
        <div className="hc-container hc-hero-grid">
          <div className="hc-hero-copy" data-reveal>
            <p className="hc-eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="collection-title">{copy.hero.title}</h1>
            {copy.hero.paragraphs.map(p => <p key={p}>{p}</p>)}
          </div>
          <picture className="hc-hero-image"><source media="(max-width: 768px)" type="image/webp" srcSet={mobileHero.srcSet} sizes={mobileHero.sizes} /><Image src="/heirmark-collection-pedestals.png" alt="Three HeirMark companion books displayed together on stone pedestals." width={1254} height={1012} sizes="(max-width: 767px) 100vw, 50vw" loading="eager" fetchPriority="high" /></picture>
          <div className="hc-hero-purchase"><PurchaseButton label="Buy the Collection $75" /><p className="hc-detail">3-book collection</p></div>
        </div>
      </section>
      <section className="hc-section hc-journey" aria-labelledby="journey-title">
        <div className="hc-container">
          <div className="hc-intro" data-reveal><p className="hc-eyebrow">{copy.journey.eyebrow}</p><h2 id="journey-title">{copy.journey.title}</h2>{copy.journey.paragraphs.map(p=><p key={p}>{p.includes("HeirMark Framework")?<>{p.split("HeirMark Framework")[0]}<Link href="/framework" style={{textDecoration:"underline",textUnderlineOffset:"4px"}}>HeirMark Framework</Link>{p.split("HeirMark Framework")[1]}</>:p}</p>)}</div>
          <div className="hc-pillars">{copy.journey.pillars.map(p=><article key={p.title} data-reveal><div className="hc-pillar-icon"><HeirMarkIcon name={p.title.toLowerCase() as IconName}/></div><h3>{p.title}</h3><p className="hc-strong">{p.heading}</p><p>{p.description}</p></article>)}</div>
          <p className="hc-closing">{copy.journey.closing}</p>
        </div>
      </section>
      <section className="hc-inside" aria-labelledby="inside-title">
        <div className="hc-container hc-intro hc-inside-intro" data-reveal><p className="hc-eyebrow">{copy.inside.eyebrow}</p><h2 id="inside-title">{copy.inside.title}</h2></div>
        {copy.inside.books.map((book,i)=><article key={book.title} className={`hc-section hc-book hc-book-${i+1}`} aria-labelledby={`book-${i+1}-title`}>
          <div className="hc-container hc-book-grid">
            <p className="hc-eyebrow hc-book-label">{book.eyebrow}</p>
            <CoverArtwork i={i} />
            <div className="hc-book-copy" data-reveal>
              <h3 id={`book-${i+1}-title`}>{book.title}</h3>
              {book.edition && <p className="hc-edition">{book.edition}</p>}
              <p className="hc-strong">{book.support}</p>
              {book.paragraphs.map(p=><p key={p}><Rich text={p}/></p>)}
              <p className="hc-list-label">{book.listLabel}</p><ul>{book.points.map(p=><li key={p}>{p}</li>)}</ul>
              <p className="hc-role"><Rich text={book.role}/></p>
            </div>
          </div>
        </article>)}
      </section>
      <section className="hc-section hc-life" aria-labelledby="life-title">
        <div className="hc-container hc-split">
          <Image src="/gallery/heirmark-table-conversation.jpg" alt="Two women sharing a conversation at a HeirMark gathering." width={4608} height={3072} sizes="(max-width: 767px) 100vw, 48vw" data-reveal />
          <div data-reveal><p className="hc-eyebrow">{copy.life.eyebrow}</p><h2 id="life-title">{copy.life.title}</h2>{copy.life.paragraphs.map(p=><p key={p}>{p}</p>)}<p className="hc-strong">{copy.life.closing}</p></div>
        </div>
      </section>
      <section className="hc-section hc-purchase" aria-labelledby="purchase-title">
        <div className="hc-container hc-split">
          <div className="hc-product-composition" data-reveal><Image className="hc-product-box" src="/heirmark-presentation-box-cutout.png" alt="Official HeirMark branded presentation box, included with the Collection." width={2712} height={2323} sizes="(max-width: 767px) 65vw, 30vw" /><div className="hc-product-books">{collectionCovers.map((cover,i)=><CoverArtwork key={cover.src} i={i} />)}</div></div>
          <div data-reveal><p className="hc-eyebrow">{copy.purchase.eyebrow}</p><h2 id="purchase-title">{copy.purchase.title}</h2>{copy.purchase.paragraphs.map(p=><p key={p}>{p}</p>)}<p className="hc-price"><strong>$75</strong><span> | COMPLETE THREE-BOOK COLLECTION</span></p><p className="hc-strong">{copy.purchase.emphasis}</p><p>{copy.purchase.explanation}</p><PurchaseButton /><p className="hc-detail">{copy.purchase.detail}</p></div>
        </div>
      </section>
    </main>
    
  </>;
}


