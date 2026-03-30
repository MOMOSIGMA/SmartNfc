// Page client - Design unique et professionnel par client
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClientBySlug, getAllClients } from '../services/supabase';

export default function ClientPage() {
  const { slug } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    async function loadClient() {
      const data = await getClientBySlug(slug);
      const all = await getAllClients();
      setClient(data);
      setAllClients(all);
      setLoading(false);
    }
    loadClient();
  }, [slug]);

  if (loading) {
    return (
      <main style={{padding:'5rem 2rem', textAlign:'center'}}>
        <h1>Chargement...</h1>
      </main>
    );
  }

  if (!client) {
    return (
      <main style={{padding:'5rem 2rem', textAlign:'center'}}>
        <h1>Client non trouvé 😕</h1>
        <p style={{color:'rgba(255,255,255,0.7)', marginBottom:'2rem'}}>Retour à la liste des clients</p>
        <a href="/clients" className="btn-main">Voir tous les clients</a>
      </main>
    );
  }

  return (
    <main style={{margin:0, padding:0}}>
      {/* Header avec couleur du client */}
      <div
        style={{
          background:`linear-gradient(135deg, ${client.couleur_primaire} 0%, ${client.couleur_secondaire} 100%)`,
          padding:'3rem 2rem 2rem',
          color:'var(--noir)'
        }}
      >
        <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'center'}}>
          {/* Logo */}
          <div style={{marginBottom:'1.5rem'}}>
            <img
              src={client.logo_url}
              alt={client.nom}
              style={{
                width:'140px',
                height:'140px',
                borderRadius:'20px',
                objectFit:'cover',
                border:'4px solid rgba(255,255,255,0.3)',
                boxShadow:'0 8px 32px rgba(0,0,0,0.2)'
              }}
            />
          </div>
          
          {/* Nom */}
          <h1 style={{fontSize:'2.5rem', margin:'0.5rem 0', fontWeight:'800', color:'var(--noir)'}}>
            {client.nom}
          </h1>

          {/* Description */}
          <p style={{fontSize:'1.1rem', margin:'0.8rem 0 0', color:'rgba(0,0,0,0.8)', fontStyle:'italic'}}>
            {client.description}
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{maxWidth:'800px', margin:'0 auto', padding:'3rem 2rem'}}>
        
        {/* Section Contact - Les gros boutons */}
        <section style={{marginBottom:'3rem'}}>
          <h2 style={{fontSize:'1.4rem', marginBottom:'1.5rem', textAlign:'center', color:'var(--blanc)'}}>
            Nous Contacter
          </h2>
          <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${client.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:client.couleur_primaire,
                color:'var(--noir)',
                padding:'1.2rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1.1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 15px ${client.couleur_primaire}66`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${client.couleur_primaire}88`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${client.couleur_primaire}66`;
              }}
            >
              💬 Nous envoyer un message WhatsApp
            </a>

            {/* Appeler */}
            <a
              href={`tel:+${client.phone}`}
              style={{
                background:client.couleur_secondaire,
                color:'var(--noir)',
                padding:'1.2rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1.1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 15px ${client.couleur_secondaire}66`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${client.couleur_secondaire}88`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${client.couleur_secondaire}66`;
              }}
            >
              📞 Appeler directement
            </a>

            {/* Localisation */}
            <a
              href={client.localisation}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:'var(--bleu-neon)',
                color:'var(--noir)',
                padding:'1.2rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1.1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 15px var(--bleu-neon)66`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 25px var(--bleu-neon)88`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px var(--bleu-neon)66`;
              }}
            >
              📍 Notre localisation sur Google Maps
            </a>
          </div>
        </section>

        {/* Section Réseaux sociaux */}
        <section style={{marginBottom:'3rem'}}>
          <h2 style={{fontSize:'1.2rem', marginBottom:'1.5rem', textAlign:'center', color:'var(--blanc)'}}>
            Nous suivre
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            <a
              href={client.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:`linear-gradient(135deg, ${client.couleur_primaire}33, ${client.couleur_secondaire}33)`,
                border:`2px solid ${client.couleur_primaire}`,
                padding:'1rem',
                borderRadius:'10px',
                textAlign:'center',
                textDecoration:'none',
                color:'var(--blanc)',
                fontSize:'1rem',
                fontWeight:'600',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}66, ${client.couleur_secondaire}66)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}33, ${client.couleur_secondaire}33)`;
              }}
            >
              📲 Facebook
            </a>
            <a
              href={client.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:`linear-gradient(135deg, ${client.couleur_primaire}33, ${client.couleur_secondaire}33)`,
                border:`2px solid ${client.couleur_primaire}`,
                padding:'1rem',
                borderRadius:'10px',
                textAlign:'center',
                textDecoration:'none',
                color:'var(--blanc)',
                fontSize:'1rem',
                fontWeight:'600',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}66, ${client.couleur_secondaire}66)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}33, ${client.couleur_secondaire}33)`;
              }}
            >
              🎵 TikTok
            </a>
          </div>
        </section>

        {/* Catalogue si disponible */}
        {client.catalogue && (
          <section style={{marginBottom:'3rem'}}>
            <h2 style={{fontSize:'1.2rem', marginBottom:'1.5rem', textAlign:'center', color:'var(--blanc)'}}>
              Voir notre catalogue
            </h2>
            <a
              href={client.catalogue}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:'block',
                background:`linear-gradient(135deg, ${client.couleur_primaire}, ${client.couleur_secondaire})`,
                color:'var(--noir)',
                padding:'1.2rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1.1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 15px ${client.couleur_primaire}66`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${client.couleur_primaire}88`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${client.couleur_primaire}66`;
              }}
            >
              🛒 Consulter le catalogue complet
            </a>
          </section>
        )}

        {/* Divider */}
        <hr style={{border:'none', borderTop:`1px solid ${client.couleur_primaire}33`, margin:'3rem 0'}} />

        {/* Autres clients */}
        {allClients.length > 1 && (
          <section style={{textAlign:'center'}}>
            <h2 style={{fontSize:'1.2rem', marginBottom:'1.5rem', color:'var(--blanc)'}}>
              Découvrir d'autres clients
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1rem'}}>
              {allClients
                .filter(c => c.slug !== slug)
                .map(c => (
                  <a
                    key={c.slug}
                    href={`/${c.slug}`}
                    style={{
                      textDecoration:'none',
                      padding:'1rem',
                      borderRadius:'10px',
                      background:`linear-gradient(135deg, ${c.couleur_primaire}22, ${c.couleur_secondaire}22)`,
                      border:`2px solid ${c.couleur_primaire}33`,
                      color:'var(--blanc)',
                      fontWeight:'600',
                      transition:'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = c.couleur_primaire;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${c.couleur_primaire}44, ${c.couleur_secondaire}44)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${c.couleur_primaire}33`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${c.couleur_primaire}22, ${c.couleur_secondaire}22)`;
                    }}
                  >
                    {c.nom}
                  </a>
                ))}
            </div>
          </section>
        )}

        {/* Retour */}
        <div style={{textAlign:'center', marginTop:'3rem'}}>
          <a href="/clients" style={{color:'var(--bleu-neon)', textDecoration:'none', fontSize:'0.95rem'}}>
            ← Retour à la liste des clients
          </a>
        </div>
      </div>
    </main>
  );
}