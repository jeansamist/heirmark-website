"use client";
import Link from "next/link";
/** Compatibility exports keep existing booking CTA styling while using one destination. */
export function BookingModalProvider({children}:{children:React.ReactNode}){return <>{children}</>}
export function BookingModalTrigger({children,className}:{children:React.ReactNode;className?:string}){return <Link href="/speaking" className={className}>{children}</Link>}
