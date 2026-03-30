import { createClient } from '@supabase/supabase-js';

// Remplace par tes clés Supabase réelles
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock clients avec couleurs et descriptions
export const mockClients = [
  {
    id: '1',
    slug: 'mamadou',
    nom: 'Taxi Mamadou 🚖',
    whatsapp: '221772641751',
    phone: '221772641751',
    email: 'mamadou@taxi.sn',
    facebook: 'https://facebook.com/mamadou',
    tiktok: 'https://tiktok.com/@mamadou',
    localisation: 'https://goo.gl/maps/DakarTaxi',
    image: 'https://via.placeholder.com/300x300?text=Taxi+Mamadou',
    logo_url: 'https://via.placeholder.com/150x150?text=Taxi+Logo',
    catalogue: null,
    couleur_primaire: '#FF6B6B',
    couleur_secondaire: '#FFD93D',
    description: 'Service de taxi fiable et rapide à Dakar'
  },
  {
    id: '2',
    slug: 'boutique-rama',
    nom: 'Boutique Rama 👗',
    whatsapp: '221775432345',
    phone: '221775432345',
    email: 'rama@boutique.sn',
    facebook: 'https://facebook.com/boutique.rama',
    tiktok: 'https://tiktok.com/@boutique_rama',
    localisation: 'https://goo.gl/maps/BoutiqueMercato',
    image: 'https://via.placeholder.com/300x300?text=Boutique+Rama',
    logo_url: 'https://via.placeholder.com/150x150?text=Boutique+Logo',
    catalogue: 'https://example.com/catalogue-rama',
    couleur_primaire: '#6C5CE7',
    couleur_secondaire: '#A29BFE',
    description: 'Boutique de vêtements et accessoires tendance'
  },
  {
    id: '3',
    slug: 'restaurant-thies',
    nom: 'Restaurant Thiès 🍽️',
    whatsapp: '221776789012',
    phone: '221776789012',
    email: 'contact@restaurant-thies.sn',
    facebook: 'https://facebook.com/restaurant.thies',
    tiktok: 'https://tiktok.com/@restaurant_thies',
    localisation: 'https://goo.gl/maps/RestaurantThies',
    image: 'https://via.placeholder.com/300x300?text=Restaurant+Thies',
    logo_url: 'https://via.placeholder.com/150x150?text=Restaurant+Logo',
    catalogue: 'https://example.com/menu-thies',
    couleur_primaire: '#00B894',
    couleur_secondaire: '#55EFC4',
    description: 'Restaurant traditionnel avec cuisine authentique'
  }
];

// Fonction pour récupérer un client (from Supabase ou mock)
export async function getClientBySlug(slug) {
  try {
    // Essai avec Supabase d'abord
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code === 'PGRST116') {
      // Client non trouvé dans Supabase, utiliser mock
      return mockClients.find(c => c.slug === slug) || null;
    }

    return data;
  } catch (err) {
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
