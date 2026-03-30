// Page Client - Standalone NFC Card - Professionnel & moderne
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClientBySlug } from '../services/supabase';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaInstagram, FaPlus, FaShoppingBag } from 'react-icons/fa';

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

  const addToContacts = () => {
    // Créer une vCard pour ajouter le contact
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${client.nom}
TEL:${client.phone}
EMAIL:${client.email || ''}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${client.slug}.vcf`;
    a.click();
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white'
      }}>
        <div style={{ fontSize: '1rem' }}>Chargement...</div>
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
        background: '#1a1a1a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Client non trouvé
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Container principal */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#222',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        textAlign: 'center'
      }}>

        {/* Logo en cercle avec glow */}
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          border: '5px solid white',
          margin: '0 auto 1.8rem',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: '0 0 30px rgba(100, 200, 255, 0.6), 0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <img
            src={client.logo_url}
            alt={client.nom}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Nom et description */}
        <h1 style={{
          fontSize: '1.9rem',
          margin: '0 0 0.3rem 0',
          color: '#ffffff',
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>
          {client.nom}
        </h1>
        <p style={{
          fontSize: '0.95rem',
          margin: '0 0 2.2rem 0',
          color: '#b0b0b0',
          fontWeight: '500',
          lineHeight: '1.4'
        }}>
          {client.description}
        </p>

        {/* Boutons principaux - Gros et dominants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.8rem' }}>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${client.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '1.1rem 1.5rem',
              background: '#25D366',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '1.05rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(37, 211, 102, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
            }}
          >
            <FaWhatsapp size={22} />
            <span>WhatsApp</span>
          </a>

          {/* Appeler */}
          <a
            href={`tel:+${client.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '1.1rem 1.5rem',
              background: '#0066CC',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '1.05rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 6px 20px rgba(0, 102, 204, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(0, 102, 204, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.4)';
            }}
          >
            <FaPhone size={22} />
            <span>Appeler</span>
          </a>

          {/* Localisation */}
          <a
            href={client.localisation}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '1.1rem 1.5rem',
              background: '#DC3545',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '1.05rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 6px 20px rgba(220, 53, 69, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(220, 53, 69, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
            }}
          >
            <FaMapMarkerAlt size={22} />
            <span>Localisation</span>
          </a>
        </div>

        {/* Réseaux sociaux - Petits boutons en grille 3 */}
        {(client.facebook || client.tiktok || client.instagram) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '1.8rem'
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
                  padding: '1.1rem 0.8rem',
                  background: '#1877F2',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '14px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(24, 119, 242, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(24, 119, 242, 0.35)';
                }}
              >
                <FaFacebook size={28} />
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
                  padding: '1.1rem 0.8rem',
                  background: '#000000',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '14px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(80, 80, 80, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(150, 150, 150, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(80, 80, 80, 0.35)';
                }}
              >
                <FaTiktok size={28} />
                <span>TikTok</span>
              </a>
            )}

            {client.instagram && (
              <a
                href={client.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.1rem 0.8rem',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFC837 50%, #639FFF 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '14px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(255, 107, 107, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 107, 107, 0.35)';
                }}
              >
                <FaInstagram size={28} />
                <span>Instagram</span>
              </a>
            )}
          </div>
        )}

        {/* Boutons secondaires */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.8rem' }}>
          {/* Catalogue */}
          {client.catalogue && (
            <a
              href={client.catalogue}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                padding: '1rem',
                background: '#333333',
                color: '#e0e0e0',
                textDecoration: 'none',
                borderRadius: '14px',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                border: '1px solid #444444',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3a3a3a';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#333333';
                e.currentTarget.style.color = '#e0e0e0';
              }}
            >
              <FaShoppingBag size={20} />
              <span>Voir Catalogue</span>
            </a>
          )}

          {/* Ajouter au contact */}
          <button
            onClick={addToContacts}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              padding: '1rem',
              background: '#3a3a4a',
              color: '#e0e0e0',
              borderRadius: '14px',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              border: '1px solid #4a4a5a',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#424252';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3a3a4a';
              e.currentTarget.style.color = '#e0e0e0';
            }}
          >
            <FaPlus size={20} />
            <span>Enregistrer le contact</span>
          </button>
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: '1rem',
          borderTop: '1px solid #333',
          color: '#666',
          fontSize: '0.8rem',
          fontWeight: '500'
        }}>
          Powered by 2AB Digital Solutions
        </div>
      </div>
    </div>
  );
}