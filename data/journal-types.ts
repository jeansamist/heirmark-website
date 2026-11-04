export type JournalInline = string | { text:string; href:string };
export type JournalBlock =
 | {type:"paragraph";content:JournalInline[]}
 | {type:"heading";text:string}
 | {type:"list";ordered?:boolean;items:JournalInline[][]};
export type JournalStory = {
 id:string;slug:string;title:string;category:string;summary:string;publishedAt:string;
 image:string;imageAlt:string;body:JournalBlock[];status:"draft"|"published";
 author?:string;featured?:boolean;relatedLinks?:{label:string;href:string}[];
 announcement?:{headline:string;mobileHeadline?:string;order:number;approved:boolean};
};
