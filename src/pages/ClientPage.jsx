// Page client - Design professionnel et moderne
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
    <main style={{margin:0, padding:0, minHeight:'100vh'}}>
      {/* Hero Header avec gradient du client */}
      <div
        style={{
          background:`linear-gradient(135deg, ${client.couleur_primaire} 0%, ${client.couleur_secondaire} 100%)`,
          padding:'4rem 2rem',
          textAlign:'center',
          position:'relative',
          boxShadow:'0 10px 40px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{maxWidth:'800px', margin:'0 auto'}}>
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
                border:'6px solid rgba(255,255,255,0.8)',
                boxShadow:'0 12px 40px rgba(0,0,0,0.3)',
                display:'block',
                margin:'0 auto'
              }}
            />
          </div>

          {/* Texte header */}
          <h1 style={{
            fontSize:'2.8rem', 
            margin:'1rem 0 0.5rem', 
            fontWeight:'900', 
            color:'white', 
            textShadow:'0 3px 8px rgba(0,0,0,0.25)',
            letterSpacing:'-0.5px'
          }}>
            {client.nom}
          </h1>
          <p style={{
            fontSize:'1.1rem', 
            margin:'0.5rem 0', 
            color:'rgba(255,255,255,0.95)',
            fontStyle:'italic',
            textShadow:'0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {client.description}
          </p>
        </div>
      </div>

      {/* Contenu principal sur fond sombre */}
      <div style={{
        background:'linear-gradient(135deg, var(--noir) 0%, var(--bleu-fonce) 100%)',
        minHeight:'100vh',
        padding:'3rem 2rem'
      }}>
        <div style={{maxWidth:'700px', margin:'0 auto'}}>
          
          {/* Section Contact - Design moderne */}
          <section style={{marginBottom:'3rem'}}>
            <h2 style={{
              fontSize:'1.5rem', 
              marginBottom:'1.5rem', 
              textAlign:'center', 
              color:'var(--blanc)',
              fontWeight:'700',
              letterSpacing:'-0.3px'
            }}>
              📞 Nous Contacter
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
                  padding:'1.2rem',
                  borderRadius:'14px',
                  textAlign:'center',
                  fontSize:'1.05rem',
                  fontWeight:'700',
                  textDecoration:'none',
                  transition:'all 0.3s ease',
                  boxShadow:`0 8px 20px ${client.couleur_primaire}50`,
                  border:'none',
                  cursor:'pointer',
                  letterSpacing:'0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px ${client.couleur_primaire}70`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_primaire}50`;
                }}
              >
                💬 Message WhatsApp
              </a>

              {/* Appeler */}
              <a
                href={`tel:+${client.phone}`}
                style={{
                  background:client.couleur_secondaire,
                  color:'white',
                  padding:'1.2rem',
                  borderRadius:'14px',
                  textAlign:'center',
                  fontSize:'1.05rem',
                  fontWeight:'700',
                  textDecoration:'none',
                  transition:'all 0.3s ease',
                  boxShadow:`0 8px 20px ${client.couleur_secondaire}50`,
                  border:'none',
                  cursor:'pointer',
                  letterSpacing:'0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 30px ${client.couleur_secondaire}70`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_secondaire}50`;
                }}
              >
                📞 Appel Direct
              </a>

              {/* Localisation */}
              <a
                href={client.localisation}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:'linear-gradient(135deg, #00D4FF 0%, #0099FF 100%)',
                  color:'white',
                  padding:'1.2rem',
                  borderRadius:'14px',
                  textAlign:'center',
                  fontSize:'1.05rem',
                  fontWeight:'700',
                  textDecoration:'none',
                  transition:'all 0.3s ease',
                  boxShadow:'0 8px 20px rgba(0, 174, 239, 0.5)',
                  border:'none',
                  cursor:'pointer',
                  letterSpacing:'0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 174, 239, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 174, 239, 0.5)';
                }}
              >
                📍 Voir sur Google Maps
              </a>
            </div>
          </section>

          {/* Réseaux sociaux - Glass design */}
          <section style={{
            background:'rgba(255,255,255,0.08)',
            backdropFilter:'blur(10px)',
            border:'1px solid rgba(0, 174, 239, 0.15)',
            padding:'2rem',
            borderRadius:'16px',
            marginBottom:'3rem'
          }}>
            <h2 style={{
              fontSize:'1.3rem', 
              marginBottom:'1.5rem', 
              textAlign:'center', 
              color:'var(--blanc)',
              fontWeight:'700'
            }}>
              📱 Nous Suivre
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <a
                href={client.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:`linear-gradient(135deg, ${client.couleur_primaire}20, ${client.couleur_secondaire}20)`,
                  border:`2px solid ${client.couleur_primaire}`,
                  padding:'1rem',
                  borderRadius:'12px',
                  textAlign:'center',
                  textDecoration:'none',
                  color:'var(--blanc)',
                  fontSize:'1rem',
                  fontWeight:'700',
                  transition:'all 0.3s ease',
                  cursor:'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}40, ${client.couleur_secondaire}40)`;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_primaire}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}20, ${client.couleur_secondaire}20)`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                f Facebook
              </a>
              <a
                href={client.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:`linear-gradient(135deg, ${client.couleur_primaire}20, ${client.couleur_secondaire}20)`,
                  border:`2px solid ${client.couleur_primaire}`,
                  padding:'1rem',
                  borderRadius:'12px',
                  textAlign:'center',
                  textDecoration:'none',
                  color:'var(--blanc)',
                  fontSize:'1rem',
                  fontWeight:'700',
                  transition:'all 0.3s ease',
                  cursor:'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}40, ${client.couleur_secondaire}40)`;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${client.couleur_primaire}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${client.couleur_primaire}20, ${client.couleur_secondaire}20)`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ♪ TikTok
              </a>
            </div>
          </section>

          {/* Catalogue */}
          {client.catalogue && (
            <section style={{marginBottom:'3rem'}}>
              <a
                href={client.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:'block',
                  background:`linear-gradient(135deg, ${client.couleur_primaire}, ${client.couleur_secondaire})`,
                  color:'white',
                  padding:'1.5rem',
                  borderRadius:'14px',
                  textAlign:'center',
                  fontSize:'1.1rem',
                  fontWeight:'700',
                  textDecoration:'none',
                  transition:'all 0.3s ease',
                  boxShadow:`0 10px 30px ${client.couleur_primaire}50`,
                  border:'none',
                  cursor:'pointer',
                  letterSpacing:'0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 15px 40px ${client.couleur_primaire}70`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${client.couleur_primaire}50`;
                }}
              >
                🛍️ Voir le Catalogue Complet
              </a>
            </section>
          )}

          {/* Autres clients */}
          {allClients.length > 1 && (
            <section style={{
              background:'rgba(255,255,255,0.08)',
              backdropFilter:'blur(10px)',
              border:'1px solid rgba(0, 174, 239, 0.15)',
              padding:'2rem',
              borderRadius:'16px'
            }}>
              <h2 style={{
                fontSize:'1.3rem', 
                marginBottom:'1.5rem', 
                textAlign:'center', 
                color:'var(--blanc)',
                fontWeight:'700'
              }}>
                Autres Clients
              </h2>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px, 1fr))', gap:'1rem'}}>
                {allClients
                  .filter(c => c.slug !== slug)
                  .map(c => (
                    <a
                      key={c.slug}
                      href={`/${c.slug}`}
                      style={{
                        textDecoration:'none',
                        padding:'1rem',
                        borderRadius:'12px',
                        background:`linear-gradient(135deg, ${c.couleur_primaire}15, ${c.couleur_secondaire}15)`,
                        border:`2px solid ${c.couleur_primaire}`,
                        color:'var(--blanc)',
                        fontWeight:'700',
                        fontSize:'0.95rem',
                        transition:'all 0.3s ease',
                        textAlign:'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${c.couleur_primaire}30, ${c.couleur_secondaire}30)`;
                        e.currentTarget.style.boxShadow = `0 8px 20px ${c.couleur_primaire}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${c.couleur_primaire}15, ${c.couleur_secondaire}15)`;
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
          <div style={{textAlign:'center', marginTop:'3rem', paddingBottom:'2rem'}}>
            <a href="/clients" style={{
              color:'var(--bleu-neon)', 
              textDecoration:'none', 
              fontSize:'1rem', 
              fontWeight:'600',
              transition:'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00AEEF'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--bleu-neon)'}
            >
              ← Retour à la liste
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}