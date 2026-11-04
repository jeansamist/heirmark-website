import { publication } from "./homepage";
export type PublicationImage = { src:string; alt:string; width:number; height:number };
export type Publication = {
 id:string; slug:string; title:string; author?:string; shortDescription:string; longDescription?:string[];
 type:"collection"|"book"|"ebook"; format:string; cover:PublicationImage; additionalImages?:PublicationImage[];
 price?:number; currency?:string; availability:"available"|"unverified"|"unavailable";
 catalogPurchaseLabel?:string; purchaseFallbackUrl?:string; purchaseProvider?:"amazon"|"stripe"|"external"; catalogLabel?:string; tagline?:string; featured:boolean; presentation:"collection"|"independent"; detailUrl?:string; purchaseUrl?:string; quantitySupport:boolean; sortOrder:number;
 editorial?:{eyebrow:string; headline:string; opening?:string; included?:string[]; emphasis?:string; priceLabel?:string; cta:string; note:string};
};
export const publications:Publication[]=[{
 id:"heirmark-collection",slug:"heirmark-collection",title:"The HeirMark Collection",author:"Dr. Muria I. Nisbett",
 shortDescription:"The HeirMark Collection brings the Framework into your hands through three companion books designed to be experienced together.",
 longDescription:["Each book builds on the last, guiding families from awareness to action to legacy."],
 type:"collection",format:"Complete three-book collection",price:75,
 cover:{src:"/heirmark-collection-catalog-covers.webp",alt:"The three official HeirMark companion books, presented together as one Collection.",width:1617,height:820},
 availability:"unverified",featured:true,presentation:"collection",detailUrl:"/collection",purchaseUrl:"https://buy.stripe.com/4gM5kD0Rj8H20Hv4B07IY00",
 // Existing checkout returns a fixed payment link without forwarding quantity.
 catalogPurchaseLabel:"Buy Collection",purchaseFallbackUrl:"/collection#purchase-title",quantitySupport:false,sortOrder:10,purchaseProvider:"stripe",catalogLabel:"3-BOOK COLLECTION",tagline:"One Complete System. Three Companion Books.",
 editorial:{eyebrow:"THE HEIRMARK COLLECTION",headline:"One Complete System. Three Companion Books.",included:["Where Healing Becomes Heritage","The Language of Healing — Parent–Child Edition","Where Conversations Become Keepsakes"],emphasis:"Sold exclusively as a collection, by design.",priceLabel:"Complete three-book collection",cta:"Buy the Collection — $75",note:"All three companion books are included in one complete set."}
},{
 id:"grieving-a-parent",slug:"grieving-a-parent-who-is-still-alive",title:"Grieving a Parent Who Is Still Alive",author:"Dr. Muria I. Nisbett",
 shortDescription:"Some forms of grief emerge while a parent is still living, through emotional distance, changing relationships, or the loss of the connection we once knew or hoped to have.",
 longDescription:["In Grieving a Parent Who Is Still Alive, Dr. Muria I. Nisbett explores this often-unspoken experience, offering readers a compassionate space for reflection, understanding, and healing."],
 type:"ebook",format:"Kindle eBook",price:12.99,
 cover:{src:"/grieving-a-parent-book-mockup.webp",alt:"Official Grieving a Parent Who Is Still Alive book mockup, by Dr. Muria I. Nisbett.",width:1536,height:1024},
 availability:publication.availability==="available"?"available":"unverified",featured:true,presentation:"independent",purchaseUrl:publication.amazonUrl??undefined,detailUrl:"/books/grieving-a-parent-who-is-still-alive",catalogPurchaseLabel:"Buy on Amazon",quantitySupport:false,sortOrder:20,purchaseProvider:"amazon",catalogLabel:"KINDLE EBOOK",tagline:"Not every loss begins with goodbye.",
 editorial:{eyebrow:"AN INDEPENDENT PUBLICATION",headline:"Grieving a Parent Who Is Still Alive",opening:"Not every loss begins with goodbye.",cta:"Buy on Amazon — $12.99",note:"Available as a Kindle eBook on Amazon."}
}];
export function splitPublications(records:Publication[]) {
 const unique=[...new Map(records.map(book=>[book.id,book])).values()].sort((a,b)=>a.sortOrder-b.sortOrder||a.id.localeCompare(b.id));
 return {featured:unique.filter(book=>book.featured),additional:unique.filter(book=>!book.featured)};
}
export function publicationDestination(url?:string) {
 if(!url)return undefined;
 if(url.startsWith("/")&&!url.startsWith("//"))return url;
 try{const parsed=new URL(url);return parsed.protocol==="https:"&&!parsed.username&&!parsed.password?url:undefined}catch{return undefined}
}
export function publicationPrice(book:Publication) {
 if(book.price===undefined)return null;
 return book.currency?new Intl.NumberFormat("en-US",{style:"currency",currency:book.currency}).format(book.price):`$${book.price}`;
}

export function sortedPublications(records:Publication[]=publications) {
 return [...new Map(records.map(book=>[book.id,book])).values()].sort((a,b)=>a.sortOrder-b.sortOrder||a.id.localeCompare(b.id));
}
export function findPublication(slug:string) {return publications.find(book=>book.slug===slug);}


/** Only confirmed purchases are direct; a configured internal purchase section is a safe fallback. */
export function catalogPurchase(book:Publication) {
 const direct=book.availability==="available"?publicationDestination(book.purchaseUrl):undefined;
 const fallback=publicationDestination(book.purchaseFallbackUrl);
 const href=direct??(fallback?.startsWith("/")?fallback:undefined);
 const price=publicationPrice(book);
 return {href,label:`${book.catalogPurchaseLabel??"Buy"}${price?` · ${price}`:""}`};
}
