import { createClient } from '@supabase/supabase-js';

// Remplace par tes clés Supabase réelles
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock clients avec couleurs (jusqu'à 4), réseaux sociaux dynamiques, et descriptions
export const mockClients = [
  {
    id: '1',
    slug: 'mamadou',
    nom: 'Taxi Mamadou 🚖',
    description: 'Service de taxi Dakar - Aéroport - 24h/24',
    whatsapp: '221772641751',
    phone: '221772641751',
    email: 'mamadou@taxi.sn',
    localisation: 'https://goo.gl/maps/DakarTaxi',
    facebook: 'https://facebook.com/mamadou',
    tiktok: 'https://tiktok.com/@mamadou',
    instagram: 'https://instagram.com/mamadou',
    youtube: null,
    linkedin: null,
    twitter: null,
    image_url: 'https://picsum.photos/300/300?random=1',
    logo_url: 'https://picsum.photos/150/150?random=1',
    catalogue: null,
    couleur_primaire: '#FF6B6B',
    couleur_secondaire: '#FFD93D',
    couleur_3: '#FFC837',
    couleur_4: '#FF8E53'
  },
  {
    id: '2',
    slug: 'boutique-rama',
    nom: 'Boutique Rama 👗',
    description: 'Vêtements et accessoires de qualité premium',
    whatsapp: '221775432345',
    phone: '221775432345',
    email: 'rama@boutique.sn',
    localisation: 'https://goo.gl/maps/BoutiqueMercato',
    facebook: 'https://facebook.com/boutique.rama',
    tiktok: 'https://tiktok.com/@boutique_rama',
    instagram: 'https://instagram.com/boutique_rama',
    youtube: null,
    linkedin: null,
    twitter: null,
    image_url: 'https://picsum.photos/300/300?random=2',
    logo_url: 'https://picsum.photos/150/150?random=2',
    catalogue: 'https://example.com/catalogue-rama',
    couleur_primaire: '#6C5CE7',
    couleur_secondaire: '#A29BFE',
    couleur_3: '#9B8FD9',
    couleur_4: '#7B6BC2'
  },
  {
    id: '3',
    slug: 'restaurant-thies',
    nom: 'Restaurant Thiès 🍽️',
    description: 'Cuisine authentique sénégalaise - Ambiance chaleureuse',
    whatsapp: '221776789012',
    phone: '221776789012',
    email: 'contact@restaurant-thies.sn',
    localisation: 'https://goo.gl/maps/RestaurantThies',
    facebook: 'https://facebook.com/restaurant.thies',
    tiktok: 'https://tiktok.com/@restaurant_thies',
    instagram: 'https://instagram.com/restaurant_thies',
    youtube: 'https://youtube.com/@restaurant_thies',
    linkedin: null,
    twitter: null,
    image_url: 'https://picsum.photos/300/300?random=3',
    logo_url: 'https://picsum.photos/150/150?random=3',
    catalogue: 'https://example.com/menu-thies',
    couleur_primaire: '#00B894',
    couleur_secondaire: '#55EFC4',
    couleur_3: '#2FCC71',
    couleur_4: '#1ABC9C'
  }
];

// Fonction pour récupérer un client (from Supabase ou mock)
export async function getClientBySlug(slug) {
  try {
    console.log('🔍 Récupération client:', slug);
    
    // Essai avec Supabase d'abord
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('❌ Client non trouvé dans Supabase:', slug);
        return mockClients.find(c => c.slug === slug) || null;
      }
      
      console.error('⚠️ Erreur Supabase:', error.message);
      return mockClients.find(c => c.slug === slug) || null;
    }

    if (data) {
      console.log('✅ Client récupéré de Supabase:', data);
      return data;
    }

    return null;
  } catch (err) {
    console.error('🔴 Erreur lors de la récupération du client:', err);
    // Si Supabase n'est pas configuré, utiliser mock
    return mockClients.find(c => c.slug === slug) || null;
  }
}

// Fonction pour récupérer tous les clients
export async function getAllClients() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return mockClients;
    }

    return data || mockClients;
  } catch (err) {
    return mockClients;
  }
}
