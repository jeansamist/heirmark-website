"use client";
import {useState} from "react";
import type {Publication} from "@/data/publications";
import {PublicationCard} from "./PublicationParts";
export default function PublicationCatalog({books}:{books:Publication[]}) {
 const [count,setCount]=useState(6);if(!books.length)return null;
 return <section className="bk-catalog bk-container" aria-label="Books and publications"><div className={`bk-catalog-grid ${books.length<=2?"bk-catalog-small":""}`} id="publication-catalog">{books.slice(0,count).map((book,i)=><PublicationCard key={book.id} book={book} priority={i<2}/>)}</div>{count<books.length&&<button className="hm-button hm-button-secondary bk-load" aria-controls="publication-catalog" onClick={()=>{const firstNew=count;setCount(n=>n+6);requestAnimationFrame(()=>{const card=document.querySelectorAll<HTMLElement>("#publication-catalog .bk-card")[firstNew];if(card){card.tabIndex=-1;card.focus({preventScroll:true})}})}}>Load More Publications</button>}<p className="sr-only" aria-live="polite">{Math.min(count,books.length)} of {books.length} publications shown</p><noscript><div className={`bk-catalog-grid ${books.length<=2?"bk-catalog-small":""}`}>{books.slice(6).map(book=><PublicationCard key={book.id} book={book}/>)}</div><style>{`.bk-load{display:none}`}</style></noscript></section>;
}
