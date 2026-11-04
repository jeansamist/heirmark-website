"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
const withoutInvitation = new Set(["/speaking", "/framework", "/contact", "/partnerships"]);
export default function GlobalFooter(){const pathname=usePathname();return <Footer showInvitation={!withoutInvitation.has(pathname.replace(/\/$/, ""))}/>;}
