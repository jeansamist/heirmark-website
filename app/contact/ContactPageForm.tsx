"use client";
import {useState,type FormEvent} from "react";
import {inquiryTypes,validateContact,type ContactValues} from "@/lib/contact-validation";
export default function ContactPageForm(){
 const [errors,setErrors]=useState<Partial<Record<keyof ContactValues,string>>>({});
 function values(form:HTMLFormElement){const data=new FormData(form);return Object.fromEntries(["fullName","email","inquiryType","message"].map(k=>[k,String(data.get(k)||"").trim()])) as ContactValues;}
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget;setErrors(validateContact(values(form)));requestAnimationFrame(()=>form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());}
 function validateField(event:React.FocusEvent<HTMLFormElement>){const input=event.target as unknown as HTMLInputElement;const name=input.name as keyof ContactValues;if(!["fullName","email","inquiryType","message"].includes(name))return;const next=validateContact(values(event.currentTarget));setErrors(previous=>({...previous,[name]:next[name]}));}
 const attrs=(name:keyof ContactValues)=>({id:`ct-${name}`,name,required:true,"aria-invalid":errors[name]?true:undefined,"aria-describedby":errors[name]?`ct-${name}-error`:undefined});
 const error=(name:keyof ContactValues)=>errors[name]&&<p className="ct-error" id={`ct-${name}-error`}>{errors[name]}</p>;
 return <section className="ct-form-panel" aria-labelledby="ct-form-title"><h2 id="ct-form-title">Send Us a Message</h2><form onSubmit={submit} onBlur={validateField} noValidate>
 <fieldset><legend className="ct-sr">Send Us a Message</legend>
 <div className="ct-field"><label htmlFor="ct-fullName">Full Name <span aria-hidden="true">*</span></label><input {...attrs("fullName")} autoComplete="name"/>{error("fullName")}</div>
 <div className="ct-field"><label htmlFor="ct-email">Email Address <span aria-hidden="true">*</span></label><input {...attrs("email")} type="email" autoComplete="email"/>{error("email")}</div>
 <div className="ct-field"><label htmlFor="ct-inquiryType">Inquiry Type <span aria-hidden="true">*</span></label><select {...attrs("inquiryType")} defaultValue=""><option value="" disabled>Select inquiry type</option>{inquiryTypes.map(type=><option key={type}>{type}</option>)}</select>{error("inquiryType")}</div>
 <div className="ct-field"><label htmlFor="ct-message">Your Message <span aria-hidden="true">*</span></label><textarea {...attrs("message")} rows={6}/>{error("message")}</div>
 </fieldset>
 <button className="hm-button" disabled aria-describedby="ct-submission-note" type="submit">Send Message</button>
 <p id="ct-submission-note" className="ct-submission-note">Message submission will be available soon.</p>
 </form></section>;
}

