"use client";
import {useEffect,useRef,useState} from "react";
export const inquiryFailure="We couldn't send your inquiry right now. Your information has been kept. Please try again shortly.";
export const inquirySuccess="Your inquiry has been accepted for sending. Inbox delivery is not yet confirmed.";
export function useInquiry(endpoint:string){
 const [ready,setReady]=useState(false),[checking,setChecking]=useState(true),[status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [turnstileToken,setTurnstileToken]=useState(''),[verificationKey,setVerificationKey]=useState(0);
 function resetVerification(){setTurnstileToken('');setVerificationKey(value=>value+1);}
 const locked=useRef(false),sent=useRef(false);
 useEffect(()=>{let cancelled=false;const abort=new AbortController();const timer=setTimeout(()=>abort.abort(),25000);
 fetch(endpoint,{cache:'no-store',signal:abort.signal}).then(r=>r.ok?r.json():null).then(data=>{if(!cancelled)setReady(data?.ready===true)}).catch(()=>{if(!cancelled)setReady(false)}).finally(()=>{clearTimeout(timer);if(!cancelled)setChecking(false)});
 return ()=>{cancelled=true;abort.abort();clearTimeout(timer)};},[endpoint]);
 async function send(values:object){
 if(locked.current||sent.current||!ready||!turnstileToken)return null;
 locked.current=true;setStatus('sending');
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),55000);
 try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,turnstileToken}),signal:controller.signal});const data=await response.json();
 if(!response.ok||data.status!=='sent'){setStatus('error');return {errors:data.errors as Record<string,string>|undefined};}
 sent.current=true;setStatus('success');return {errors:undefined};
 }catch{setStatus('error');return {errors:undefined};}finally{clearTimeout(timer);locked.current=false;resetVerification();}
 }
 return {ready,checking,status,send,turnstileToken,setTurnstileToken,verificationKey,resetVerification};
}
