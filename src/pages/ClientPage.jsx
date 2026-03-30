// Page Client - Standalone NFC Card - Pas de navbar, juste les infos du client
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClientBySlug, getAllClients } from '../services/supabase';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaEnvelope } from 'react-icons/fa';

export default function ClientPage() {
  const { slug } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClient() {
      const data = await getClientBySlug(slug);
      setClient(data);
      setLoading(false);
    }
    loadClient();
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Chargement...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '1.5rem', color: '#333', fontWeight: 'bold', marginBottom: '1rem' }}>
            Client non trouvé
          </div>
          <div style={{ color: '#666' }}>Cette page n'existe pas</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Container principal */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Header coloré avec gradient */}
        <div style={{
          background: `linear-gradient(135deg, ${client.couleur_primaire} 0%, ${client.couleur_secondaire} 100%)`,
          padding: '4rem 2rem 2rem',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <img
            src={client.logo_url}
            alt={client.nom}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '20px',
              objectFit: 'cover',
              border: '5px solid white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              marginBottom: '1.5rem'
            }}
          />

          {/* Nom du client */}
          <h1 style={{
            fontSize: '2.2rem',
            margin: '0 0 0.5rem 0',
            fontWeight: '900',
            color: 'white',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            letterSpacing: '-0.5px'
          }}>
            {client.nom}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1rem',
            margin: '0',
            color: 'rgba(255,255,255,0.95)',
            fontWeight: '500',
            textShadow: '0 1px 4px rgba(0,0,0,0.15)'
          }}>
            {client.description}
          </p>
        </div>

        {/* Contenu scrollable */}
        <div style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>

          {/* Section Contact - Boutons principaux */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1rem',
              fontWeight: '700',
              color: '#333',
              margin: '0 0 1.5rem 0',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.7
            }}>
              Nous Contacter
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${client.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: '#25D366',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
                }}
              >
                <FaWhatsapp size={24} />
                <span>WhatsApp</span>
              </a>

              {/* Appel Direct */}
              <a
                href={`tel:+${client.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: client.couleur_primaire,
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 12px ${client.couleur_primaire}40`,
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${client.couleur_primaire}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_primaire}40`;
                }}
              >
                <FaPhone size={24} />
                <span>Appel Direct</span>
              </a>

              {/* localisation */}
              <a
                href={client.localisation}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: client.couleur_secondaire,
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 12px ${client.couleur_secondaire}40`,
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${client.couleur_secondaire}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${client.couleur_secondaire}40`;
                }}
              >
                <FaMapMarkerAlt size={24} />
                <span>Localisation</span>
              </a>

              {/* Email si disponible */}
              {client.email && (
                <a
                  href={`mailto:${client.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.2rem',
                    background: '#EA4335',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(234, 67, 53, 0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(234, 67, 53, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(234, 67, 53, 0.3)';
                  }}
                >
                  <FaEnvelope size={24} />
                  <span>Email</span>
                </a>
              )}
            </div>
          </section>

          {/* Réseaux sociaux */}
          {(client.facebook || client.tiktok) && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#333',
                margin: '0 0 1.5rem 0',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: 0.7
              }}>
                Suivre
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                {client.facebook && (
                  <a
                    href={client.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      background: '#1877F2',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(24, 119, 242, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 119, 242, 0.3)';
                    }}
                  >
                    <FaFacebook size={20} />
                    <span>Facebook</span>
                  </a>
                )}

                {client.tiktok && (
                  <a
                    href={client.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      background: '#000000',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    <FaTiktok size={20} />
                    <span>TikTok</span>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Catalogue */}
          {client.catalogue && (
            <section style={{ marginBottom: '2.5rem' }}>
              <a
                href={client.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  padding: '1.3rem',
                  background: `linear-gradient(135deg, ${client.couleur_primaire}, ${client.couleur_secondaire})`,
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 6px 20px ${client.couleur_primaire}40`,
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${client.couleur_primaire}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${client.couleur_primaire}40`;
                }}
              >
                <span>🛍️</span>
                <span>Voir le Catalogue</span>
              </a>
            </section>
          )}
        </div>

        {/* Footer minimal */}
        <div style={{
          padding: '1.5rem',
          textAlign: 'center',
          borderTop: '1px solid #eee',
          background: '#fafafa',
          color: '#999',
          fontSize: '0.85rem',
          fontWeight: '500'
        }}>
          Powered by SmartNFC
        </div>
      </div>
    </div>
  );
}