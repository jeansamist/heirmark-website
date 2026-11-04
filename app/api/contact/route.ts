import { sendContactFormEmail } from "@/lib/email";
import { inquiryTypes } from "@/lib/contact-validation";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const failure="We couldn't send your message right now. Please try again.";
export async function POST(request:NextRequest){
 let body:Record<string,unknown>;
 try{const parsed=await request.json();if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))throw new Error();body=parsed;}catch{return NextResponse.json({error:failure},{status:400});}
 const value=(key:string)=>typeof body[key]==="string"?(body[key] as string).trim():"";
 const fullName=value("fullName"),email=value("email"),message=value("message"),inquiryType=value("inquiryType");
 if(!fullName||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||(body.inquiryType!==undefined&&!inquiryTypes.some(type=>type===inquiryType)))return NextResponse.json({error:failure},{status:400});
 try{const result=await sendContactFormEmail({fullName,email,message,...(inquiryType?{inquiryType}:{})});
 if(!result.sent)return NextResponse.json({error:failure},{status:result.skipped?503:502});
 return NextResponse.json({status:"sent"});
 }catch{return NextResponse.json({error:failure},{status:502});}
}
