"use client";
import {useEffect} from "react";
export default function JournalMotion(){
 useEffect(()=>{
 const root=document.querySelector('.jr-page'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(!root||reduced.matches||!('IntersectionObserver' in window))return;
 const mobile=matchMedia('(max-width:768px)'),active=new Set<Animation>();
 const reveal=(el:Element,delay=0)=>{if(reduced.matches||!el.animate)return;const a=el.animate([{opacity:0,transform:`translateY(${mobile.matches?9:14}px)`},{opacity:1,transform:'none'}],{duration:mobile.matches?400:550,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});active.add(a);a.onfinish=()=>active.delete(a)};
 root.querySelectorAll('.jr-hero>*').forEach((el,i)=>reveal(el,i*80));
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){observer.unobserve(e.target);const parent=e.target.parentElement!;const index=Array.from(parent.children).indexOf(e.target);const columns=getComputedStyle(parent).gridTemplateColumns.split(' ').length;reveal(e.target,e.target.matches('.jr-card')&&!mobile.matches?index%columns*80:0)}}),{threshold:.12});
 root.querySelectorAll('[data-jr-reveal]').forEach(el=>observer.observe(el));
 const mutations=new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n instanceof Element&&n.matches('[data-jr-reveal]'))observer.observe(n)})));
 mutations.observe(root,{childList:true,subtree:true});
 const finish=()=>active.forEach(a=>a.finish());const stop=()=>{observer.disconnect();mutations.disconnect();active.forEach(a=>a.cancel());active.clear()};
 reduced.addEventListener('change',stop);root.addEventListener('focusin',finish);
 return()=>{stop();reduced.removeEventListener('change',stop);root.removeEventListener('focusin',finish)};
 },[]);return null;
}
