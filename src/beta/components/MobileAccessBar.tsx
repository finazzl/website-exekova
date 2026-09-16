'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { taskOffer } from '../data/offer';

/** Mobile counterpart of the reference's dismissible product CTA. */
export default function MobileAccessBar() {
  const [visible,setVisible] = useState(false);
  const [dismissed,setDismissed] = useState(false);
  useEffect(()=>{
    const update=()=>{
      const closing=document.querySelector('.beta-closing');
      setVisible(window.scrollY>900 && (closing?.getBoundingClientRect().top ?? Infinity)>window.innerHeight);
    };
    update();window.addEventListener('scroll',update,{passive:true});
    return ()=>window.removeEventListener('scroll',update);
  },[]);
  if(dismissed || !visible) return null;
  return <aside className="mobile-access-bar" aria-label="exekova access"><button type="button" aria-label="Dismiss access bar" onClick={()=>setDismissed(true)}><Icon name="close" size={20}/></button><Image src="/brand/xkova-icon.webp" width={44} height={44} alt=""/><div><strong>exekova</strong><span>${taskOffer.current} / accepted task</span></div><a href="#request-access">Get access</a></aside>;
}
