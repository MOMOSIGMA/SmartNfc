-- SQL pour ajouter les colonnes couleurs et logo à la table clients

-- Ajouter colonnes pour personnaliser par client
ALTER TABLE clients ADD COLUMN IF NOT EXISTS couleur_primaire TEXT DEFAULT '#00AEEF';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS couleur_secondaire TEXT DEFAULT '#6C5CE7';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email TEXT;

-- Mettre à jour les clients existants avec des couleurs différentes
UPDATE clients SET 
  couleur_primaire = '#FF6B6B',
  couleur_secondaire = '#FFD93D',
  description = 'Service de taxi fiable et rapide à Dakar'
WHERE slug = 'mamadou';

UPDATE clients SET 
  couleur_primaire = '#6C5CE7',
  couleur_secondaire = '#A29BFE',
  description = 'Boutique de vêtements et accessoires tendance'
WHERE slug = 'boutique-rama';

UPDATE clients SET 
  couleur_primaire = '#00B894',
  couleur_secondaire = '#55EFC4',
  description = 'Restaurant traditionnel avec cuisine authentique'
WHERE slug = 'restaurant-thies';

-- Créer un bucket publique pour les uploads de logos
-- (À faire via l'interface Supabase directement)
