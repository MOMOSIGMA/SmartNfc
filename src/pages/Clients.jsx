import React, { useState, useEffect } from 'react';
import { getAllClients } from '../services/supabase';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      const data = await getAllClients();
      setClients(data);
      setLoading(false);
    }
    loadClients();
  }, []);

  if (loading) {
    return (
      <main style={{padding:'5rem 2rem', textAlign:'center'}}>
        <h1>Chargement des clients...</h1>
      </main>
    );
  }

  return (
    <main>
      <section style={{textAlign:'center', paddingTop:'4rem'}}>
        <h1 style={{background:'linear-gradient(135deg, var(--blanc), var(--bleu-neon))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'1rem'}}>Nos Clients</h1>
        <p style={{fontSize:'1.1rem', color:'rgba(255,255,255,0.8)', marginBottom:'3rem'}}>Découvrez les entrepreneurs qui font confiance à 2AB Digital Solutions</p>

        {clients.length === 0 ? (
          <div style={{padding:'2rem', textAlign:'center', color:'rgba(255,255,255,0.6)'}}>
            <p>Aucun client disponible pour le moment.</p>
          </div>
        ) : (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',
            gap:'2rem',
            maxWidth:'1200px',
            margin:'0 auto'
          }}>
            {clients.map(client => (
              <a
                key={client.slug}
                href={`/p/${client.slug}`}
                style={{
                  textDecoration:'none',
                  background:'linear-gradient(135deg, rgba(0, 174, 239, 0.05), rgba(108, 92, 231, 0.05))',
                  border:`2px solid ${client.couleur_primaire}33`,
                  borderRadius:'16px',
                  padding:'2rem',
                  transition:'all 0.3s ease',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  cursor:'pointer',
                  position:'relative',
                  overflow:'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = client.couleur_primaire;
                  e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}22, ${client.couleur_secondaire}22)`;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 8px 25px ${client.couleur_primaire}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${client.couleur_primaire}33`;
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 174, 239, 0.05), rgba(108, 92, 231, 0.05))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Logo */}
                <div style={{width:'100px', height:'100px', borderRadius:'16px', marginBottom:'1.5rem', overflow:'hidden', border:`2px solid ${client.couleur_primaire}`}}>
                  <img src={client.logo_url} alt={client.nom} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                </div>

                {/* Nom */}
                <h3 style={{color:'var(--blanc)', fontSize:'1.3rem', marginBottom:'0.5rem'}}>{client.nom}</h3>

                {/* Description */}
                <p style={{fontSize:'0.95rem', color:`${client.couleur_primaire}`, marginBottom:'1rem', fontStyle:'italic'}}>
                  {client.description}
                </p>

                {/* Badges */}
                <div style={{display:'flex', gap:'0.5rem', marginBottom:'1rem', flexWrap:'wrap', justifyContent:'center'}}>
                  {client.catalogue && (
                    <span style={{background:client.couleur_primaire, color:'var(--noir)', fontSize:'0.75rem', padding:'0.4rem 0.8rem', borderRadius:'20px', fontWeight:'bold'}}>📦 Catalogue</span>
                  )}
                  <span style={{background:client.couleur_secondaire, color:'var(--noir)', fontSize:'0.75rem', padding:'0.4rem 0.8rem', borderRadius:'20px', fontWeight:'bold'}}>✨ Actif</span>
                </div>

                {/* CTA */}
                <div style={{color:client.couleur_primaire, fontSize:'0.9rem', fontWeight:'600'}}>Voir le profil →</div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
