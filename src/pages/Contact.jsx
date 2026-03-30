import React from 'react';

export default function Contact() {
  return (
    <main>
      <section style={{textAlign:'center'}}>
        <h1 style={{fontSize: '1.7rem', marginBottom: 12, color:'var(--bleu-neon)'}}>Contact</h1>
        <a href="https://wa.me/221771234567" className="btn-main">WhatsApp</a>
        <a href="tel:+221771234567" className="btn-main" style={{background:'var(--violet)'}}>Appeler</a>
        <a href="https://goo.gl/maps/xxxx" className="btn-main" style={{background:'var(--bleu-fonce)', color:'var(--blanc)'}}>Localisation</a>
      </section>
    </main>
  );
}