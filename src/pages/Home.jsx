import React from 'react';
import { mockClients } from '../services/supabase';

export default function Home() {
  return (
    <main>
      {/* SECTION 1 : Hero */}
      <section style={{textAlign:'center'}}>
        <h1 style={{fontSize:'2.2rem', marginBottom:8, color:'var(--bleu-neon)', textShadow:'0 0 12px var(--bleu-neon)'}}>Transformez votre contact en 1 seconde</h1>
        <p style={{fontSize:'1.1rem', marginBottom:20, color:'var(--blanc)'}}>Avec nos cartes NFC intelligentes, vos clients vous contactent instantanément</p>
        <div style={{display:'flex', gap:12, justifyContent:'center', marginBottom:20, flexWrap:'wrap'}}>
          <a href="https://wa.me/221771234567" className="btn-main">Commander maintenant</a>
          <a href="#demo" className="btn-main" style={{background:'var(--violet)'}}>Voir démo</a>
        </div>
        <video src="/demo.mp4" controls style={{width:'100%', maxWidth:340, borderRadius:16, boxShadow:'0 0 24px var(--bleu-neon)'}} poster="/assets/hero.png">Votre navigateur ne supporte pas la vidéo.</video>
      </section>
      <div className="tech-line"></div>
      {/* SECTION 2 : Comment ça marche */}
      <section style={{textAlign:'center'}}>
        <h2 style={{color:'var(--bleu-neon)', fontSize:'1.3rem'}}>Comment ça marche ?</h2>
        <div style={{display:'flex', justifyContent:'space-around', margin:'1.5rem 0', flexWrap:'wrap', gap:'1rem'}}>
          <div>
            <div style={{fontSize:'2.2rem'}}>📲</div>
            <div style={{fontSize:'1rem'}}>Approchez le téléphone</div>
          </div>
          <div>
            <div style={{fontSize:'2.2rem'}}>⚡</div>
            <div style={{fontSize:'1rem'}}>Vos infos apparaissent</div>
          </div>
          <div>
            <div style={{fontSize:'2.2rem'}}>🤝</div>
            <div style={{fontSize:'1rem'}}>Le client vous contacte</div>
          </div>
        </div>
      </section>
      <div className="tech-line"></div>
      {/* SECTION 3 : Offres */}
      <section style={{textAlign:'center'}}>
        <h2 style={{color:'var(--bleu-neon)', fontSize:'1.3rem'}}>Nos offres</h2>
        <ul style={{listStyle:'none', padding:0, color:'var(--blanc)', fontSize:'1.1rem', margin:'1rem 0'}}>
          <li>✔ Carte simple</li>
          <li>✔ Carte pro</li>
          <li>✔ Carte personnalisée</li>
          <li>✔ Catalogue digital</li>
        </ul>
      </section>
      <div className="tech-line"></div>
      {/* SECTION 4 : Démo clients */}
      <section id="demo" style={{textAlign:'center'}}>
        <h2 style={{color:'var(--bleu-neon)', fontSize:'1.3rem'}}>Exemples de nos clients 🌟</h2>
        <p style={{fontSize:'1rem', color:'rgba(255,255,255,0.8)', marginBottom:'2rem'}}>Clique sur un exemple pour voir leur page</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem', margin:'2rem 0'}}>
          {mockClients.map(client => (
            <a 
              key={client.slug} 
              href={`/${client.slug}`}
              style={{
                textDecoration:'none',
                background:'linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(108, 92, 231, 0.1))',
                border:'1px solid rgba(0, 174, 239, 0.3)',
                borderRadius:'16px',
                padding:'1.5rem',
                transition:'all 0.3s ease',
                cursor:'pointer',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                hover:{transform:'translateY(-5px)'}
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 174, 239, 0.2), rgba(108, 92, 231, 0.2))';
                e.currentTarget.style.borderColor = 'var(--bleu-neon)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(108, 92, 231, 0.1))';
                e.currentTarget.style.borderColor = 'rgba(0, 174, 239, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img src={client.image} alt={client.nom} style={{width:100, height:100, borderRadius:'12px', marginBottom:'1rem', objectFit:'cover'}} />
              <h3 style={{color:'var(--blanc)', fontSize:'1.1rem', marginBottom:'0.5rem'}}>{client.nom}</h3>
              <p style={{color:'var(--bleu-neon)', fontSize:'0.9rem', marginBottom:'1rem'}}>→ Voir profil</p>
            </a>
          ))}
        </div>
      </section>
      <div className="tech-line"></div>
      {/* SECTION 5 : Call to action */}
      <section style={{textAlign:'center'}}>
        <h2 style={{color:'var(--bleu-neon)', fontSize:'1.3rem'}}>Commandez votre carte maintenant</h2>
        <a href="https://wa.me/221771234567" className="btn-main">💬 WhatsApp</a>
      </section>
    </main>
  );
}