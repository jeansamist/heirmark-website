"use client";
import InquiryTurnstile from "@/components/InquiryTurnstile";
import {useInquiry,inquirySuccess,inquiryFailure} from "@/components/useInquiry";
import InquiryHoneypot from "@/components/InquiryHoneypot";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { engagementTypes, eventFormats, validateBooking, type BookingValues, type BookingErrors } from "@/lib/booking-validation";
const initial: BookingValues = { fullName: "", email: "", organization: "", phone: "", engagementType: "", eventFormat: "", eventDate: "", location: "", details: "", consent: false };
export default function SpeakingForm() {
 const delivery=useInquiry("/api/booking");
 const [values,setValues] = useState(initial);
 const [step,setStep] = useState<1|2>(1);
 const [errors,setErrors] = useState<BookingErrors>({});
 const [status,setStatus] = useState<"idle"|"sending"|"error"|"success">("idle");
 const [message,setMessage] = useState("");
 const [validationNotice,setValidationNotice] = useState("");
 const locked = useRef(false);
 const panel = useRef<HTMLDivElement>(null);
 const focusTarget = useRef<string | null>(null);
 useEffect(()=>{ if (focusTarget.current) { document.getElementById(focusTarget.current)?.focus(); focusTarget.current=null; } },[step,errors,status]);
 const change = (key: keyof BookingValues, value: string|boolean) => { setValues(v=>({...v,[key]:value})); setErrors(e=>{ const next={...e,[key]:undefined}; if(key === "eventFormat") delete next.location; return next; }); };
 function invalid(next: BookingErrors) { const key=Object.keys(next)[0] as keyof BookingValues; focusTarget.current=`booking-${key}`; if(key==='fullName'||key==='email') { setStep(1); setValidationNotice(step===2 ? 'Please review Your Information in Step 1. Your event details have been kept.' : 'Please correct the highlighted fields before continuing.'); } else setValidationNotice('Please correct the highlighted fields before sending your request.'); setErrors(next); }
 function move(next: 1|2) { delivery.resetVerification(); focusTarget.current=next===1?'booking-fullName':'booking-engagementType';setValidationNotice('');setStep(next); }
 async function submit(event: FormEvent) {
  event.preventDefault(); if(locked.current)return;
  const next=validateBooking(values,step===1?1:undefined);
  if(Object.keys(next).length){invalid(next);return;}
  if(step===1){move(2);return;}
  if(!delivery.ready||(delivery.verificationRequired&&!delivery.turnstileToken))return;
  locked.current=true;setStatus('sending');setMessage('');
  try {
   const response=await fetch('/api/booking',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,turnstileToken:delivery.turnstileToken,website:String(new FormData(event.currentTarget as HTMLFormElement).get("website")||"")}),signal:AbortSignal.timeout(55000)});
   const data=await response.json();
   if(!response.ok||data.status!=='sent') { if(data.errors)invalid(data.errors);throw new Error(inquiryFailure); }
   focusTarget.current='booking-success';setStatus('success');
  } catch{setStatus('error');setMessage(inquiryFailure);}
  finally{locked.current=false;delivery.resetVerification();}
 }
 function field(key: Exclude<keyof BookingValues,'consent'>,label: string,type='text',required=false,autoComplete?:string) {
  const shared={id:`booking-${key}`,name:key,value:values[key],required,'aria-invalid':!!errors[key],'aria-describedby':errors[key]?`error-${key}`:undefined,onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>change(key,e.target.value)};
  return <div className="sp-field" key={key}><label htmlFor={shared.id}>{label}{!required&&<span> (optional)</span>}</label>{(key==='engagementType'||key==='eventFormat')?<select {...shared}><option value="">{key==='eventFormat'?'Select an event format':'Select an engagement type'}</option>{(key==='eventFormat'?eventFormats:engagementTypes).map(v=><option key={v}>{v}</option>)}</select>:key==='details'?<textarea {...shared} rows={4} placeholder="Tell us briefly about your event and how you would like Dr. Muria to contribute."/>:<input {...shared} type={type} autoComplete={autoComplete}/>}{errors[key]&&<p id={`error-${key}`} className="sp-error">{errors[key]}</p>}</div>;
 }
 return <section className="sp-form" aria-labelledby={status === "success" ? "booking-success" : "booking-step-title"}>
  {status==='success'?<div role="status" className="sp-success"><h2 id="booking-success" tabIndex={-1}>Thank You for Your Request!</h2><p>{inquirySuccess}</p></div>:<>
   <ol className="sp-progress" aria-label="Booking progress"><li aria-current={step===1?'step':undefined}>{step===2?<button type="button" className="sp-progress-back" disabled={status==='sending'} onClick={()=>move(1)} aria-label="Back to Step 1: edit your information">1 <span>Your Information</span><span aria-hidden="true" className="sp-edit-label">Edit</span></button>:<>1 <span>Your Information</span></>}</li><li aria-current={step===2?'step':undefined}>2 <span>Your Event</span></li></ol>
   <p id="booking-required-note" className="sp-required-note">All fields are required unless marked optional.</p>
   <p id="booking-step-title" className="sp-sr" role="status" aria-atomic="true">Step {step} of 2: {step===1?'Your Information':'Your Event'}</p>
   <form onSubmit={submit} noValidate aria-describedby="booking-required-note" aria-busy={status==='sending'}>
    <InquiryHoneypot/>
    {validationNotice && Object.values(errors).some(Boolean) && <p role="alert" className="sp-validation-summary">{validationNotice}</p>}
    <div key={step} ref={panel} className="sp-step">
    <fieldset disabled={status==='sending'}><legend className="sp-sr">{step===1?'Your Information':'Your Event'}</legend>
    {step===1?<div className="sp-fields">{field('fullName','Full Name','text',true,'name')}{field('email','Email Address','email',true,'email')}{field('organization','Organization / Institution','text',false,'organization')}{field('phone','Phone Number','tel',false,'tel')}</div>:<><div className="sp-fields">{field('engagementType','Type of Engagement','text',true)}{field('eventFormat','Event Format','text',true)}{field('eventDate','Event Date','date')}{field('location','Event Location (City & Country)','text',values.eventFormat !== 'Virtual')}{field('details','Brief Event Description','text',true)}</div><label className="sp-consent"><input id="booking-consent" type="checkbox" checked={values.consent} onChange={e=>change('consent',e.target.checked)} required aria-invalid={!!errors.consent} aria-describedby={errors.consent?'error-consent':undefined}/><span>I understand this is a booking request and that the HeirMark team will follow up to discuss availability and next steps.</span></label>{errors.consent&&<p id="error-consent" className="sp-error">{errors.consent}</p>}</>}
    </fieldset></div>
    {status==='error'&&<p role="alert" className="sp-error sp-submit-error">{message}</p>}
    {step===2&&delivery.verificationRequired&&<InquiryTurnstile action="booking" resetKey={delivery.verificationKey} onToken={delivery.setTurnstileToken}/>}
    <div className="sp-actions">{step===2&&<button type="button" className="sp-back" disabled={status==='sending'} onClick={()=>move(1)}>Back</button>}<button type="submit" className="hm-button" disabled={status==='sending'||(step===2&&(!delivery.ready||(delivery.verificationRequired&&!delivery.turnstileToken)))}>{step===1?'Continue':status==='sending'?'Sending…':'Send Booking Request'}</button></div>
    {step===2&&!delivery.ready&&<p role="status">{delivery.checking?"Checking booking availability…":"Booking submission is temporarily unavailable. Please try again later."}</p>}
    <p role="status" className="sp-sr">{status==='sending'?'Sending your booking request.':''}</p>
   </form>
  </>}
 </section>;
}


