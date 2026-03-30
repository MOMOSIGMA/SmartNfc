# SQL Complète - Configuration Supabase (Tout en Un)

## 🔧 Requête SQL COMPLÈTE À Exécuter

Copie **TOUT** ce code et exécute-le dans Supabase SQL Editor :

```sql
-- ============================================
-- 1. CRÉER LA TABLE CLIENTS AVEC TOUT
-- ============================================

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Identifiant unique
  slug TEXT UNIQUE NOT NULL,
  
  -- Infos de base
  nom TEXT NOT NULL,
  description TEXT,
  
  -- Contacts (affichés en gros boutons)
  whatsapp TEXT,
  phone TEXT,
  email TEXT,
  localisation TEXT,
  
  -- Réseaux sociaux (nullable - n'affiche que s'il existe)
  facebook TEXT,
  tiktok TEXT,
  instagram TEXT,
  youtube TEXT,
  linkedin TEXT,
  twitter TEXT,
  
  -- Images (via Supabase Storage)
  logo_url TEXT,
  image_url TEXT,
  
  -- Couleurs (jusqu'à 4 par client)
  couleur_primaire TEXT NOT NULL DEFAULT '#6366f1',
  couleur_secondaire TEXT NOT NULL DEFAULT '#8b5cf6',
  couleur_3 TEXT,
  couleur_4 TEXT,
  
  -- Optionnel
  catalogue TEXT
);

-- ============================================
-- 2. CRÉER LES INDEXES (pour vitesse)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients(slug);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

-- ============================================
-- 3. ACTIVER ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Permettre à TOUT LE MONDE de LIRE les clients (public)
CREATE POLICY "Allow public read" ON clients
  FOR SELECT
  USING (true);

-- Permettre à AUTHENTICATED USERS de modifier (tu peux modifier plus tard si besoin)
CREATE POLICY "Allow authenticated update" ON clients
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON clients
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 4. INSÉRER LES 3 CLIENTS DEMO
-- ============================================

INSERT INTO clients (
  slug,
  nom,
  description,
  whatsapp,
  phone,
  email,
  localisation,
  facebook,
  tiktok,
  instagram,
  youtube,
  linkedin,
  twitter,
  logo_url,
  image_url,
  couleur_primaire,
  couleur_secondaire,
  couleur_3,
  couleur_4,
  catalogue
) VALUES
(
  'mamadou',
  'Taxi Mamadou 🚖',
  'Service de taxi Dakar - Aéroport - 24h/24',
  '221772641751',
  '221772641751',
  'mamadou@taxi.sn',
  'https://goo.gl/maps/DakarTaxi',
  'https://facebook.com/mamadou',
  'https://tiktok.com/@mamadou',
  'https://instagram.com/mamadou',
  NULL,
  NULL,
  NULL,
  'https://picsum.photos/150/150?random=1',
  'https://picsum.photos/300/300?random=1',
  '#FF6B6B',
  '#FFD93D',
  '#FFC837',
  '#FF8E53',
  NULL
),
(
  'boutique-rama',
  'Boutique Rama 👗',
  'Vêtements et accessoires de qualité premium',
  '221775432345',
  '221775432345',
  'rama@boutique.sn',
  'https://goo.gl/maps/BoutiqueMercato',
  'https://facebook.com/boutique.rama',
  'https://tiktok.com/@boutique_rama',
  'https://instagram.com/boutique_rama',
  NULL,
  NULL,
  NULL,
  'https://picsum.photos/150/150?random=2',
  'https://picsum.photos/300/300?random=2',
  '#6C5CE7',
  '#A29BFE',
  '#9B8FD9',
  '#7B6BC2',
  'https://example.com/catalogue-rama'
),
(
  'restaurant-thies',
  'Restaurant Thiès 🍽️',
  'Cuisine authentique sénégalaise - Ambiance chaleureuse',
  '221776789012',
  '221776789012',
  'contact@restaurant-thies.sn',
  'https://goo.gl/maps/RestaurantThies',
  'https://facebook.com/restaurant.thies',
  'https://tiktok.com/@restaurant_thies',
  'https://instagram.com/restaurant_thies',
  'https://youtube.com/@restaurant_thies',
  NULL,
  NULL,
  'https://picsum.photos/150/150?random=3',
  'https://picsum.photos/300/300?random=3',
  '#00B894',
  '#55EFC4',
  '#2FCC71',
  '#1ABC9C',
  'https://example.com/menu-thies'
);

-- ============================================
-- 5. VÉRIFIER QUE TOUT EST CRÉÉ
-- ============================================

SELECT COUNT(*) as "Nombre de clients" FROM clients;
SELECT * FROM clients LIMIT 1;
```

---

## 📋 Étapes pour Exécuter

### 1️⃣ Va sur Supabase
- Ouvre https://app.supabase.com
- Clique sur ton projet

### 2️⃣ Ouvre SQL Editor
- Clique sur **SQL Editor** (menu gauche)
- Clique sur **New Query** (bouton bleu)

### 3️⃣ Copie-Colle la Requête
- Copie **TOUT** le code SQL ci-dessus
- Colle-le dans l'éditeur Supabase

### 4️⃣ Exécute
- Appuie sur **Ctrl+Enter** ou clique sur le bouton **▶ Run**

### 5️⃣ Vérification
- Tu devrais voir :
  ```
  CREATE TABLE (ou déjà existante - pas grave)
  CREATE INDEX (ou déjà existent - pas grave)
  ALTER TABLE (RLS activé)
  CREATE POLICY (3 policies créées)
  INSERT (3 lignes insérées)
  ```
- À la fin : **"Nombre de clients: 3"** ✅

---

## ✅ Ce que cette Requête Fait

1. ✅ Crée la table `clients` avec **TOUTES les colonnes**
2. ✅ Ajoute les **4 colonnes de couleurs** (couleur_primaire, couleur_secondaire, couleur_3, couleur_4)
3. ✅ Ajoute toutes les **colonnes de réseaux sociaux** (facebook, tiktok, instagram, youtube, linkedin, twitter)
4. ✅ Ajoute les **colonnes pour images** (logo_url, image_url)
5. ✅ Ajoute les **colonnes pour contacts** (whatsapp, phone, email, localisation)
6. ✅ Crée les **indexes** pour la vitesse
7. ✅ Active **Row Level Security** (permissions)
8. ✅ Crée des **policies** pour permettre la lecture publique
9. ✅ Insère les **3 clients demo** avec les bonnes couleurs et infos

---

## 🔒 Permissions Configurées

### Qui peut LIRE ?
✅ **TOUT LE MONDE** (public read) - important pour les pages `/p/mamadou`

### Qui peut MODIFIER ?
✅ **UTILISATEURS AUTHENTIFIÉS** (tu peux changer ça plus tard)

---

## 🎯 Si tu as une Erreur

### Erreur : "relation already exists"
**C'est normal !** Ça veut dire que la table existe déjà. La requête a le `IF NOT EXISTS` donc elle ne va pas la créer deux fois.

### Erreur : "syntax error"
- Copie **TOUT** le code (pas juste une partie)
- Vérifie qu'il n'y a pas de caractères bizarres
- Réessaye

### Erreur : "permission denied"
- Vérifie que tu as **Admin** ou **Editor** dans ton projet Supabase
- Va dans Settings → Users pour vérifier

---

## 📊 Tester que ça Marche

### Test 1 : Voir les clients dans Supabase

1. Va dans **Table Editor** (Supabase)
2. Tu devrais voir la table `clients` dans la liste gauche
3. Clique dessus → tu vois les 3 clients (Mamadou, Boutique Rama, Restaurant Thiès)

### Test 2 : Vérifier que le Storage fonctionne

1. Va dans **Storage** (Supabase)
2. Tu devrais voir ton bucket `client-images` avec les dossiers `logos/` et `images/`
3. **À faire plus tard** : Upload tes vrais logos

### Test 3 : Tester l'App

1. Visite : https://smart-nfc.vercel.app/p/mamadou
2. **Tu devrais voir** :
   - Taxi Mamadou 🚖
   - Description : "Service de taxi Dakar - Aéroport - 24h/24"
   - 3 réseaux sociaux : Facebook, TikTok, Instagram
   - 4 couleurs : Rouge, Jaune, Orange clair, Orange-rougeâtre
   - Logo avec glow bleu

---

## 🚀 Prochaines Étapes

Une fois que tu as exécuté la requête SQL :

1. ✅ Vérifie que les 3 clients apparaissent
2. ✅ Upload tes vrais logos dans le bucket `client-images/logos/`
3. ✅ Mets à jour les URLs dans Supabase (colonne `logo_url` et `image_url`)
4. ✅ Ajoute tes propres clients avec leurs couleurs

---

## 💡 Comment Ajouter un Nouveau CLIENT

Une fois la table créée, pour ajouter un client :

```sql
INSERT INTO clients (
  slug,
  nom,
  description,
  whatsapp,
  phone,
  email,
  localisation,
  facebook,
  tiktok,
  instagram,
  youtube,
  linkedin,
  twitter,
  logo_url,
  image_url,
  couleur_primaire,
  couleur_secondaire,
  couleur_3,
  couleur_4,
  catalogue
) VALUES (
  'mon-client',                    -- SLUG unique
  'Mon Client 🎯',                 -- NOM
  'Une description courte',        -- DESCRIPTION
  '221772641751',                  -- WHATSAPP
  '221772641751',                  -- PHONE
  'contact@client.sn',             -- EMAIL
  'https://goo.gl/maps/client',    -- LOCALISATION
  'https://facebook.com/client',   -- FACEBOOK (ou NULL)
  'https://tiktok.com/@client',    -- TIKTOK (ou NULL)
  'https://instagram.com/client',  -- INSTAGRAM (ou NULL)
  NULL,                            -- YOUTUBE (ou URL)
  NULL,                            -- LINKEDIN (ou URL)
  NULL,                            -- TWITTER (ou URL)
  'https://YOUR_SUPABASE.supabase.co/storage/v1/object/public/client-images/logos/client.png',
  'https://YOUR_SUPABASE.supabase.co/storage/v1/object/public/client-images/client-cover.jpg',
  '#FF6B6B',                       -- COULEUR 1
  '#FFD93D',                       -- COULEUR 2
  '#FFC837',                       -- COULEUR 3
  '#FF8E53',                       -- COULEUR 4
  'https://example.com/catalogue'  -- CATALOGUE (ou NULL)
);
```

---

## ⚠️ Rappel Important

- **slug** = unique (pas de doublons)
- **Réseaux sociaux** = `NULL` ou URL complète (jamais chaîne vide `""`)
- **Images** = URLs complètes (`https://...`)
- **Couleurs** = Code hex (`#RRGGBB`)

**C'est tout ! La requête fait EVERYTHING ! 🎉**
