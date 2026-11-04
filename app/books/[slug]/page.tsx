import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {findPublication,publicationDestination,publicationPrice} from "@/data/publications";
import {Description} from "../PublicationParts";
import BooksMotion from "../BooksMotion";
import "../books.css";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const book=findPublication((await params).slug);if(!book)return {title:"Publication not found"};
 const title=`${book.title} | HeirMark`,path=book.detailUrl??`/books/${book.slug}`;
 return withSocialMetadata({title:{absolute:title},description:book.shortDescription,openGraph:{title,description:book.shortDescription,images:[{url:book.cover.src,width:book.cover.width,height:book.cover.height,alt:book.cover.alt}]}},path);
}
export default async function PublicationDetail({params}:Props){
 const book=findPublication((await params).slug);if(!book)notFound();if(book.type==="collection")redirect("/collection");
 const purchase=publicationDestination(book.purchaseUrl),copy=book.editorial;
 return <main tabIndex={-1} id="main-content" className="bk-page"><BooksMotion/><PageSeo path={`/books/${book.slug}`} name={book.title}/><section className="bk-detail bk-container"><div className="bk-detail-art" data-bk-reveal><Image {...book.cover} alt={book.cover.alt} sizes="(max-width:768px) calc(100vw - 40px), 520px" priority/></div><div className="bk-detail-copy" data-bk-reveal><Link className="hm-text-link" href="/books">← Return to Books</Link>{copy&&<p className="bk-eyebrow">{copy.eyebrow}</p>}<h1>{book.title}</h1>{book.author&&<p className="bk-author">{book.author}</p>}{copy?.opening&&<p className="bk-opening">{copy.opening}</p>}<p>{book.shortDescription}</p>{book.longDescription?.map(text=><Description key={text} text={text} title={book.title}/>)}<p className="bk-format">{book.format}</p><p className="bk-price">{publicationPrice(book)}</p>{purchase&&book.availability==="available"?<a className="hm-button bk-purchase" href={purchase} target="_blank" rel="noopener noreferrer">{copy?.cta??"Buy publication"}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>:<button className="hm-button bk-purchase" disabled>{copy?.cta??"Buy publication"}</button>}{copy&&<p className="bk-note">{copy.note}</p>}</div></section></main>;
}
