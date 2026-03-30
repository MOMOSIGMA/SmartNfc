-- ============================================
-- MISE À JOUR TABLE CLIENTS EXISTANTE
-- ============================================
-- Copie-colle UNIQUEMENT CE CODE dans Supabase SQL Editor

-- 1. Ajouter les colonnes manquantes (si elles n'existent pas)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS youtube TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS linkedin TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS twitter TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS couleur_primaire TEXT DEFAULT '#6366f1';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS couleur_secondaire TEXT DEFAULT '#8b5cf6';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS couleur_3 TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS couleur_4 TEXT;

-- 2. Mettre à jour les clients existants avec les données complètes
UPDATE clients SET
  description = CASE 
    WHEN slug = 'mamadou' THEN 'Service de taxi Dakar - Aéroport - 24h/24'
    WHEN slug = 'boutique-rama' THEN 'Vêtements et accessoires de qualité premium'
    WHEN slug = 'restaurant-thies' THEN 'Cuisine authentique sénégalaise - Ambiance chaleureuse'
    ELSE description
  END,
  email = CASE
    WHEN slug = 'mamadou' THEN 'mamadou@taxi.sn'
    WHEN slug = 'boutique-rama' THEN 'rama@boutique.sn'
    WHEN slug = 'restaurant-thies' THEN 'contact@restaurant-thies.sn'
    ELSE email
  END,
  instagram = CASE
    WHEN slug = 'mamadou' THEN 'https://instagram.com/mamadou'
    WHEN slug = 'boutique-rama' THEN 'https://instagram.com/boutique_rama'
    WHEN slug = 'restaurant-thies' THEN 'https://instagram.com/restaurant_thies'
    ELSE instagram
  END,
  youtube = CASE
    WHEN slug = 'restaurant-thies' THEN 'https://youtube.com/@restaurant_thies'
    ELSE youtube
  END,
  logo_url = CASE
    WHEN slug = 'mamadou' THEN 'https://picsum.photos/150/150?random=1'
    WHEN slug = 'boutique-rama' THEN 'https://picsum.photos/150/150?random=2'
    WHEN slug = 'restaurant-thies' THEN 'https://picsum.photos/150/150?random=3'
    ELSE logo_url
  END,
  image_url = CASE
    WHEN slug = 'mamadou' THEN 'https://picsum.photos/300/300?random=1'
    WHEN slug = 'boutique-rama' THEN 'https://picsum.photos/300/300?random=2'
    WHEN slug = 'restaurant-thies' THEN 'https://picsum.photos/300/300?random=3'
    ELSE image_url
  END,
  couleur_primaire = CASE
    WHEN slug = 'mamadou' THEN '#FF6B6B'
    WHEN slug = 'boutique-rama' THEN '#6C5CE7'
    WHEN slug = 'restaurant-thies' THEN '#00B894'
    ELSE couleur_primaire
  END,
  couleur_secondaire = CASE
    WHEN slug = 'mamadou' THEN '#FFD93D'
    WHEN slug = 'boutique-rama' THEN '#A29BFE'
    WHEN slug = 'restaurant-thies' THEN '#55EFC4'
    ELSE couleur_secondaire
  END,
  couleur_3 = CASE
    WHEN slug = 'mamadou' THEN '#FFC837'
    WHEN slug = 'boutique-rama' THEN '#9B8FD9'
    WHEN slug = 'restaurant-thies' THEN '#2FCC71'
    ELSE couleur_3
  END,
  couleur_4 = CASE
    WHEN slug = 'mamadou' THEN '#FF8E53'
    WHEN slug = 'boutique-rama' THEN '#7B6BC2'
    WHEN slug = 'restaurant-thies' THEN '#1ABC9C'
    ELSE couleur_4
  END;

-- 3. Vérifier le résultat
SELECT slug, nom, description, email, instagram, youtube, couleur_primaire, couleur_secondaire, couleur_3, couleur_4 FROM clients;
