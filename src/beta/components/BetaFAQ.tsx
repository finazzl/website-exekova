'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { taskFaq } from '../data/offer';

export default function BetaFAQ() {
  const [selected, setSelected] = useState(0);
  return <section className="beta-section beta-faq" id="faq" aria-labelledby="faq-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">FAQS</span><h2 id="faq-title">Clear before<br/><em>you start.</em></h2></div>
    <div className="faq-conversation"><div className="faq-questions"><h3>Questions</h3><div className="faq-items">{taskFaq.map((item, index) => <details key={item.q} name="beta-faq" open={selected === index} onToggle={event => { if (event.currentTarget.open) setSelected(index); }}><summary onClick={event => { if (window.matchMedia('(min-width: 701px)').matches) { event.preventDefault(); setSelected(index); } }}>{item.q}<Icon name="arrow" size={15}/></summary><p>{item.a}</p></details>)}</div></div>
      <div className="faq-answer" aria-live="polite"><h3>Answer</h3><div className="faq-question-bubble" key={`q-${selected}`}>{taskFaq[selected].q}</div><p className="faq-answer-bubble" key={`a-${selected}`}>{taskFaq[selected].a}</p><a href="#request-access">Bring your first task<Icon name="arrow" size={15}/></a></div>
    </div>
  </div></section>;
}
