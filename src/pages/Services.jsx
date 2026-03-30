import React from 'react';

export default function Services() {
  return (
    <main>
      <section style={{textAlign:'center'}}>
        <h1 style={{fontSize: '1.7rem', marginBottom: 12, color:'var(--bleu-neon)'}}>Nos services</h1>
        <ul style={{fontSize:'1.1rem', lineHeight:1.7, marginBottom:16, color:'var(--blanc)', listStyle:'none', padding:0}}>
          <li>✔ Carte simple</li>
          <li>✔ Carte pro</li>
          <li>✔ Carte personnalisée</li>
          <li>✔ Catalogue digital</li>
        </ul>
        <div style={{fontSize:'1.1rem', color:'var(--bleu-neon)'}}>Prix : à partir de 5.000 FCFA</div>
      </section>
    </main>
  );
}