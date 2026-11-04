"use client";
import { useEffect } from "react";
export default function FrameworkMotion(){
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.fw-page');
  if(!root)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=matchMedia('(max-width: 768px)');
  const active=new Set<Animation>();let stopped=false;
  const animate=(el:Element|null,delay=0,image=false,icon=false)=>{
   if(!el||stopped||reduced.matches||!Element.prototype.animate)return;
   const a=el.animate(icon?[{opacity:0,transform:'scale(.97)'},{opacity:1,transform:'scale(1)'}]:[{opacity:0,transform:`translateY(${mobile.matches?12:16}px)`},{opacity:1,transform:'translateY(0)'}],{duration:mobile.matches?450:image?650:550,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
   active.add(a);a.onfinish=()=>active.delete(a);a.oncancel=()=>active.delete(a);
  };
  const reveal=(el:Element)=>{
   if(el.matches('.fw-foundation-grid')){animate(el.firstElementChild,0,true);animate(el.lastElementChild,80);}
   else if(el.matches('.fw-chapter')){animate(el.querySelector('.fw-number'));animate(el.querySelector('.fw-chapter-heading'),70);animate(el.querySelector('.fw-chapter-body'),140);animate(el.querySelector('.fw-chapter-icon'),210,false,true);}
   else if(el.matches('.fw-application')){const i=Array.from(el.parentElement!.children).indexOf(el);animate(el,mobile.matches?0:i%2*80);}
   else animate(el,0,el.tagName==='IMG');
  };
  let observer:IntersectionObserver|undefined;
  const stop=()=>{stopped=true;observer?.disconnect();active.forEach(a=>a.cancel());active.clear()};
  if(!reduced.matches&&'IntersectionObserver' in window&&typeof Element.prototype.animate==='function'){
   try{
    observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!stopped){observer?.unobserve(entry.target);reveal(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
    root.querySelectorAll('.fw-hero-copy > *').forEach((el,i)=>animate(el,i*70));animate(root.querySelector('.fw-hero-photo'),280,true);
    root.querySelectorAll('.fw-foundation-grid,.fw-pillars > .fw-container > .fw-intro,.fw-chapter,.fw-closing,.fw-meaning .fw-intro,.fw-meaning-copy > p,.fw-meaning .fw-wide,.fw-meaning-close,.fw-practice .fw-intro,.fw-application,.fw-journey .fw-intro,.fw-pathway').forEach(el=>observer!.observe(el));
   }catch{stop()}
  }
  const preference=()=>{if(reduced.matches)stop()};
  const restore=(event:PageTransitionEvent)=>{if(event.persisted)stop()};
  const focus=()=>active.forEach(a=>a.finish());
  reduced.addEventListener('change',preference);window.addEventListener('pageshow',restore);root.addEventListener('focusin',focus);
  return()=>{stop();reduced.removeEventListener('change',preference);window.removeEventListener('pageshow',restore);root.removeEventListener('focusin',focus)};
 },[]);
 return null;
}

