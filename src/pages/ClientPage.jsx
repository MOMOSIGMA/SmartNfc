// Page Client - Standalone NFC Card - Professionnel & moderne avec couleurs dynamiques
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClientBySlug } from '../services/supabase';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaInstagram, FaYoutube, FaLinkedin, FaX, FaPlus, FaShoppingBag } from 'react-icons/fa';

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
TEL:${client.phone || ''}
EMAIL:${client.email || ''}
ORG:${client.nom}
NOTE:${client.description || ''}
END:VCARD`;
    
    // Déterminer si on est sur mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && navigator.contacts) {
      // API Contact Native (si disponible sur le téléphone)
      try {
        const contact = new navigator.Contact();
        contact.displayName = client.nom;
        contact.nickname = client.nom;
        contact.note = client.description || '';
        
        const phoneNumbers = [new navigator.ContactField('mobile', client.phone || '', true)];
        contact.phoneNumbers = phoneNumbers;
        
        const emails = [new navigator.ContactField('work', client.email || '', false)];
        contact.emails = emails;
        
        contact.save(
          () => console.log('✅ Contact ajouté avec succès'),
          (err) => console.error('❌ Erreur ajout contact', err)
        );
        return;
      } catch (err) {
        console.log('API Contact not available, using vCard fallback');
      }
    }
    
    // Fallback : créer un blob et déclencher le téléchargement
    // Sur mobile, ça ouvrira l'app Contacts automatiquement
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${client.slug}-contact.vcf`;
    link.click();
    
    // Nettoyer
    setTimeout(() => URL.revokeObjectURL(url), 100);
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

        {/* Boutons principaux - Gros et dominants avec couleurs dynamiques */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.8rem' }}>
          {/* WhatsApp - Couleur Officielle (#25D366) */}
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

          {/* Appeler - Couleur Primaire du Client */}
          <a
            href={`tel:+${client.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '1.1rem 1.5rem',
              background: client.couleur_primaire || '#0066CC',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '1.05rem',
              transition: 'all 0.2s ease',
              boxShadow: `0 6px 20px ${client.couleur_primaire}66`,
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = `0 8px 28px ${client.couleur_primaire}99`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${client.couleur_primaire}66`;
            }}
          >
            <FaPhone size={22} />
            <span>Appeler</span>
          </a>

          {/* Localisation - Couleur Secondaire du Client */}
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
              background: client.couleur_secondaire || '#DC3545',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '1.05rem',
              transition: 'all 0.2s ease',
              boxShadow: `0 6px 20px ${client.couleur_secondaire}66`,
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = `0 8px 28px ${client.couleur_secondaire}99`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${client.couleur_secondaire}66`;
            }}
          >
            <FaMapMarkerAlt size={22} />
            <span>Localisation</span>
          </a>
        </div>

        {/* Réseaux sociaux - Boutons dynamiques en grille */}
        {(() => {
          // Créer un tableau des réseaux sociaux disponibles
          const socialNetworks = [
            { key: 'facebook', label: 'Facebook', icon: FaFacebook, color: '#1877F2' },
            { key: 'tiktok', label: 'TikTok', icon: FaTiktok, color: '#000000' },
            { key: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFC837 50%, #639FFF 100%)' },
            { key: 'youtube', label: 'YouTube', icon: FaYoutube, color: '#FF0000' },
            { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
            { key: 'twitter', label: 'X', icon: FaX, color: '#000000' }
          ];
          
          // Filtrer uniquement ceux qui existent dans client
          const availableSocials = socialNetworks.filter(social => client[social.key]);
          
          if (availableSocials.length === 0) return null;
          
          return (
            <div style={{
              display: 'grid',
              gridTemplateColumns: availableSocials.length <= 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.8rem'
            }}>
              {availableSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.key}
                    href={client[social.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.1rem 0.8rem',
                      background: social.color,
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
                      boxShadow: `0 4px 14px ${social.color === 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFC837 50%, #639FFF 100%)' ? 'rgba(255, 107, 107, 0.35)' : social.color.includes('rgb') ? social.color.replace(/rgb/g, 'rgba').replace(')', ', 0.35)') : social.color + '59'}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 20px ${social.color === 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFC837 50%, #639FFF 100%)' ? 'rgba(255, 107, 107, 0.5)' : social.color.includes('rgb') ? social.color.replace(/rgb/g, 'rgba').replace(')', ', 0.5)') : social.color + '80'}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 14px ${social.color === 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFC837 50%, #639FFF 100%)' ? 'rgba(255, 107, 107, 0.35)' : social.color.includes('rgb') ? social.color.replace(/rgb/g, 'rgba').replace(')', ', 0.35)') : social.color + '59'}`;
                    }}
                  >
                    <Icon size={28} />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          );
        })()}

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