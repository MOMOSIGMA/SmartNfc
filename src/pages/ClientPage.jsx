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

        {/* Logo en cercle */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '4px solid white',
          margin: '0 auto 1.5rem',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
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
          fontSize: '1.8rem',
          margin: '0 0 0.3rem 0',
          color: 'white',
          fontWeight: '700',
          letterSpacing: '-0.3px'
        }}>
          {client.nom}
        </h1>
        <p style={{
          fontSize: '0.95rem',
          margin: '0 0 2rem 0',
          color: '#aaa',
          fontWeight: '500'
        }}>
          {client.description}
        </p>

        {/* Boutons principaux - Gros et dominants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${client.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              padding: '1rem 1.5rem',
              background: '#25D366',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
            }}
          >
            <FaWhatsapp size={20} />
            <span>WhatsApp</span>
          </a>

          {/* Appeler */}
          <a
            href={`tel:+${client.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              padding: '1rem 1.5rem',
              background: '#0066CC',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 102, 204, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.3)';
            }}
          >
            <FaPhone size={20} />
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
              gap: '0.8rem',
              padding: '1rem 1.5rem',
              background: '#FF3B30',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(255, 59, 48, 0.3)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 59, 48, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 59, 48, 0.3)';
            }}
          >
            <FaMapMarkerAlt size={20} />
            <span>Localisation</span>
          </a>
        </div>

        {/* Réseaux sociaux - Petits boutons */}
        {(client.facebook || client.tiktok || client.instagram) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.8rem',
            marginBottom: '1.5rem'
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
                  padding: '1rem',
                  background: '#1877F2',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(24, 119, 242, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FaFacebook size={24} />
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
                  padding: '1rem',
                  background: '#000000',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(100, 100, 100, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FaTiktok size={24} />
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
                  padding: '1rem',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(200, 35, 100, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FaInstagram size={24} />
                <span>Instagram</span>
              </a>
            )}
          </div>
        )}

        {/* Boutons secondaires */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
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
                gap: '0.6rem',
                padding: '0.9rem',
                background: '#333',
                color: '#ccc',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                border: '1px solid #444',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3a3a3a';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.color = '#ccc';
              }}
            >
              <FaShoppingBag size={18} />
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
              gap: '0.6rem',
              padding: '0.9rem',
              background: '#333',
              color: '#ccc',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              border: '1px solid #444',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3a3a3a';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#333';
              e.currentTarget.style.color = '#ccc';
            }}
          >
            <FaPlus size={18} />
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