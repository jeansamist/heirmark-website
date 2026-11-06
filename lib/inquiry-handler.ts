import "server-only";
import { turnstileConfigured, verifyTurnstile } from "./turnstile";
import { NextResponse } from "next/server";
import { validateContact } from "./contact-validation";
import { validateBooking } from "./booking-validation";
import { validateInquiry } from "./partnership-validation";
import { sendContactFormEmail, sendBookingRequestEmail, sendPartnershipInquiryEmail, inquiryEmailReady } from "./email";
const failure="We couldn't send your inquiry right now. Your information has been kept. Please try again shortly.";
const json=(data:object,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function inquiryStatus(){return json({ready:turnstileConfigured() && await inquiryEmailReady()});}
export function inquiryHandler(kind:'contact'|'booking'|'partnership') {
 return async function POST(request:Request) {
  try {
   const origin=request.headers.get('origin');
   if(origin && origin!==new URL(request.url).origin)return json({error:failure},403);
   if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return json({error:failure},415);
   if(Number(request.headers.get('content-length'))>32768)return json({error:'Your inquiry is too long.'},413);
   const reader=request.body?.getReader();if(!reader)return json({error:failure},400);
   let size=0;const chunks:Uint8Array[]=[];
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>32768){await reader.cancel();return json({error:'Your inquiry is too long.'},413);}chunks.push(value);}
   let body:Record<string,unknown>;
   try{const bytes=Buffer.concat(chunks);body=JSON.parse(bytes.toString('utf8'));if(!body||typeof body!=='object'||Array.isArray(body))throw Error();}catch{return json({error:failure},400);}
   if(body.website!==undefined && (typeof body.website!=='string'||body.website!==''))return json({error:failure},400);
   const keys=kind==='contact'?['fullName','email','inquiryType','message']:kind==='booking'?['fullName','email','organization','phone','engagementType','eventFormat','eventDate','location','details']:['fullName','email','organization','interest','idea'];
   if(keys.some(key=>body[key]!==undefined && typeof body[key]!=='string'))return json({error:failure},400);
   // Preserve control characters until validation; trim only after validation.
   const str=(key:string)=>typeof body[key]==='string'?body[key] as string:'';
   const contact={fullName:str('fullName'),email:str('email'),inquiryType:str('inquiryType'),message:str('message')};
   const booking={fullName:str('fullName'),email:str('email'),organization:str('organization'),phone:str('phone'),engagementType:str('engagementType'),eventFormat:str('eventFormat'),eventDate:str('eventDate'),location:str('location'),details:str('details'),consent:body.consent===true};
   const partnership={fullName:str('fullName'),email:str('email'),organization:str('organization'),interest:str('interest'),idea:str('idea'),acknowledgment:body.acknowledgment===true};
   const errors=kind==='contact'?validateContact(contact):kind==='booking'?validateBooking(booking):validateInquiry(partnership);
   if(Object.keys(errors).length)return json({error:'Please check the highlighted fields.',errors},400);
   if(!turnstileConfigured())return json({error:failure},503);
   if(!await verifyTurnstile(body.turnstileToken,kind,request.url))return json({error:'Please complete security verification again.',code:'verification_failed'},403);
   if(!await inquiryEmailReady())return json({error:failure},503);
   const result=kind==='contact'?await sendContactFormEmail(contact):kind==='booking'?await sendBookingRequestEmail(booking):await sendPartnershipInquiryEmail(partnership);
   if(!result.sent)return json({error:failure},result.skipped?503:502);
   return json({status:'sent'});
  }catch{return json({error:failure},502);}
 };
}
