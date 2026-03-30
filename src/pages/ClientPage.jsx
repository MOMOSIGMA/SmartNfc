// Page client - Design moderne et lumineux
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
        <p style={{color:'#666', marginBottom:'2rem'}}>Retour à la liste des clients</p>
        <a href="/clients" className="btn-main">Voir tous les clients</a>
      </main>
    );
  }

  return (
    <main style={{margin:0, padding:0, background:'#F8F9FA', minHeight:'100vh'}}>
      {/* Header band avec gradient du client */}
      <div
        style={{
          background:`linear-gradient(135deg, ${client.couleur_primaire} 0%, ${client.couleur_secondaire} 100%)`,
          padding:'4rem 2rem 2rem',
          textAlign:'center',
          position:'relative',
          overflow:'hidden'
        }}
      >
        {/* Logo - flottant au-dessus du gradient */}
        <div style={{marginBottom:'1rem', zIndex:10, position:'relative'}}>
          <img
            src={client.logo_url}
            alt={client.nom}
            style={{
              width:'120px',
              height:'120px',
              borderRadius:'20px',
              objectFit:'cover',
              border:'5px solid white',
              boxShadow:'0 8px 24px rgba(0,0,0,0.25)',
              display:'block',
              margin:'0 auto'
            }}
          />
        </div>

        {/* Infos dans le band */}
        <h1 style={{fontSize:'2.2rem', margin:'1rem 0 0.5rem', fontWeight:'800', color:'white', textShadow:'0 2px 4px rgba(0,0,0,0.2)'}}>
          {client.nom}
        </h1>
        <p style={{fontSize:'1rem', margin:'0', color:'rgba(255,255,255,0.95)', fontStyle:'italic', textShadow:'0 1px 2px rgba(0,0,0,0.1)'}}>
          {client.description}
        </p>
      </div>

      {/* Contenu principal */}
      <div style={{maxWidth:'700px', margin:'0 auto', padding:'2rem'}}>
        
        {/* Section Contact - Boutons principaux */}
        <section style={{marginBottom:'2rem'}}>
          <h2 style={{fontSize:'1.3rem', marginBottom:'1.5rem', textAlign:'center', color:'#1a1a1a', fontWeight:'700'}}>
            📞 Nos moyens de contact
          </h2>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${client.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:client.couleur_primaire,
                color:'white',
                padding:'1.2rem 1.5rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 12px ${client.couleur_primaire}40`,
                border:'none',
                cursor:'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_primaire}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_primaire}40`;
              }}
            >
              💬 WhatsApp
            </a>

            {/* Appeler */}
            <a
              href={`tel:+${client.phone}`}
              style={{
                background:client.couleur_secondaire,
                color:'white',
                padding:'1.2rem 1.5rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 12px ${client.couleur_secondaire}40`,
                border:'none',
                cursor:'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_secondaire}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_secondaire}40`;
              }}
            >
              📞 Appeler
            </a>

            {/* Localisation */}
            <a
              href={client.localisation}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:'#00AEEF',
                color:'white',
                padding:'1.2rem 1.5rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:'0 4px 12px rgba(0, 174, 239, 0.4)',
                border:'none',
                cursor:'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 174, 239, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 174, 239, 0.4)';
              }}
            >
              📍 Notre localisation
            </a>
          </div>
        </section>

        {/* Section Réseaux sociaux */}
        <section style={{marginBottom:'2rem', background:'white', padding:'1.5rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize:'1.1rem', marginBottom:'1.2rem', textAlign:'center', color:'#1a1a1a', fontWeight:'700'}}>
            Nous suivre sur les réseaux
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            <a
              href={client.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:`linear-gradient(135deg, ${client.couleur_primaire}15, ${client.couleur_secondaire}15)`,
                border:`2px solid ${client.couleur_primaire}`,
                padding:'1rem',
                borderRadius:'10px',
                textAlign:'center',
                textDecoration:'none',
                color:'#1a1a1a',
                fontSize:'0.95rem',
                fontWeight:'600',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}30, ${client.couleur_secondaire}30)`;
                e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_primaire}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}15, ${client.couleur_secondaire}15)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              📲 Facebook
            </a>
            <a
              href={client.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background:`linear-gradient(135deg, ${client.couleur_primaire}15, ${client.couleur_secondaire}15)`,
                border:`2px solid ${client.couleur_primaire}`,
                padding:'1rem',
                borderRadius:'10px',
                textAlign:'center',
                textDecoration:'none',
                color:'#1a1a1a',
                fontSize:'0.95rem',
                fontWeight:'600',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}30, ${client.couleur_secondaire}30)`;
                e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_primaire}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}15, ${client.couleur_secondaire}15)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🎵 TikTok
            </a>
          </div>
        </section>

        {/* Catalogue si disponible */}
        {client.catalogue && (
          <section style={{marginBottom:'2rem'}}>
            <a
              href={client.catalogue}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:'block',
                background:`linear-gradient(135deg, ${client.couleur_primaire}, ${client.couleur_secondaire})`,
                color:'white',
                padding:'1.5rem',
                borderRadius:'12px',
                textAlign:'center',
                fontSize:'1.1rem',
                fontWeight:'700',
                textDecoration:'none',
                transition:'all 0.3s ease',
                boxShadow:`0 4px 12px ${client.couleur_primaire}40`,
                border:'none',
                cursor:'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_primaire}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_primaire}40`;
              }}
            >
              🛍️ Voir le catalogue complet
            </a>
          </section>
        )}

        {/* Autres clients */}
        {allClients.length > 1 && (
          <section style={{background:'white', padding:'1.5rem', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', marginBottom:'2rem'}}>
            <h2 style={{fontSize:'1.1rem', marginBottom:'1.2rem', textAlign:'center', color:'#1a1a1a', fontWeight:'700'}}>
              Découvrir d'autres clients
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px, 1fr))', gap:'0.8rem'}}>
              {allClients
                .filter(c => c.slug !== slug)
                .map(c => (
                  <a
                    key={c.slug}
                    href={`/${c.slug}`}
                    style={{
                      textDecoration:'none',
                      padding:'0.8rem',
                      borderRadius:'10px',
                      background:`linear-gradient(135deg, ${c.couleur_primaire}12, ${c.couleur_secondaire}12)`,
                      border:`2px solid ${c.couleur_primaire}`,
                      color:'#1a1a1a',
                      fontWeight:'600',
                      fontSize:'0.9rem',
                      transition:'all 0.3s ease',
                      textAlign:'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${c.couleur_primaire}25, ${c.couleur_secondaire}25)`;
                      e.currentTarget.style.boxShadow = `0 4px 12px ${c.couleur_primaire}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${c.couleur_primaire}12, ${c.couleur_secondaire}12)`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {c.nom}
                  </a>
                ))}
            </div>
          </section>
        )}

        {/* Retour */}
        <div style={{textAlign:'center', marginTop:'2rem', paddingBottom:'1rem'}}>
          <a href="/clients" style={{color:'#00AEEF', textDecoration:'none', fontSize:'0.95rem', fontWeight:'600'}}>
            ← Retour à la liste des clients
          </a>
        </div>
      </div>
    </main>
  );
}