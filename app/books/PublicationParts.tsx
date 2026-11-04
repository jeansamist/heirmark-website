import Image from "next/image";
import Link from "next/link";
import {type Publication,publicationDestination,catalogPurchase} from "@/data/publications";
export function Description({text,title}:{text:string;title:string}) {
 const index=text.indexOf(title);return <p>{index<0?text:<>{text.slice(0,index)}<em>{title}</em>{text.slice(index+title.length)}</>}</p>;
}
export function PublicationCard({book,priority=false}:{book:Publication;priority?:boolean}) {
 const destination=publicationDestination(book.detailUrl),purchase=catalogPurchase(book);
 const external=purchase.href?.startsWith("https:");
 return <article className="bk-card" data-bk-reveal><div className="bk-card-image"><Image {...book.cover} alt={book.cover.alt} sizes="(max-width:600px) calc(100vw - 32px), (max-width:1000px) 45vw, 580px" priority={priority}/></div><div className="bk-card-copy"><p className="bk-eyebrow">{book.catalogLabel??book.format}</p><h2>{book.title}</h2><p className="bk-card-description">{book.tagline??book.shortDescription}</p><div className="bk-card-actions"><p className="bk-card-format">{book.format}</p>{purchase.href?<a className="hm-button bk-card-buy" href={purchase.href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined}>{purchase.label}{external&&<span className="sr-only"> (opens in a new tab)</span>}</a>:<button className="hm-button bk-card-buy" disabled>{purchase.label}</button>}{destination&&<Link className="bk-card-action" href={destination} aria-label={`View details: ${book.title}`}>View Details <span aria-hidden="true">→</span></Link>}</div></div></article>;
}
