import PageSeo from "@/components/seo/PageSeo";
import { withSocialMetadata } from "@/lib/seo-metadata";
import type { Metadata } from "next";
import {sortedPublications} from "@/data/publications";
import PublicationCatalog from "./PublicationCatalog";
import BooksMotion from "./BooksMotion";
import "./books.css";
const title="HeirMark Books & Publications | Explore Our Books";
const description="Discover the HeirMark Collection and Grieving a Parent Who Is Still Alive by Dr. Muria I. Nisbett. Explore books on healing, relationships, and legacy.";
export const metadata:Metadata=withSocialMetadata({title:{absolute:title},description,alternates:{canonical:"/books"},openGraph:{title,description,url:"/books"}}, "/books");
export default function BooksPage(){return <main tabIndex={-1} id="main-content" className="bk-page"><PageSeo path="/books" name="Our Books"/><BooksMotion/><header className="bk-hero bk-container"><p className="bk-eyebrow">OUR BOOKS &amp; PUBLICATIONS</p><h1>Discover HeirMark&apos;s Books &amp; Publications.</h1></header><PublicationCatalog books={sortedPublications()}/></main>}
