# Configuration Complète Supabase + Storage

## 1. Schéma SQL pour la Table Clients

Exécute ce SQL dans l'éditeur SQL de Supabase (SQL Editor) :

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT,
  
  -- Contacts
  whatsapp TEXT,
  phone TEXT,
  email TEXT,
  localisation TEXT,
  
  -- Réseaux sociaux (nullable - affichés uniquement si présent)
  facebook TEXT,
  tiktok TEXT,
  instagram TEXT,
  youtube TEXT,
  linkedin TEXT,
  twitter TEXT,
  
  -- Images
  logo_url TEXT,
  image_url TEXT,
  
  -- Couleurs (jusqu'à 4 couleurs par client)
  couleur_primaire TEXT NOT NULL DEFAULT '#6366f1',
  couleur_secondaire TEXT NOT NULL DEFAULT '#8b5cf6',
  couleur_3 TEXT,
  couleur_4 TEXT,
  
  -- Catalogue
  catalogue TEXT
);

-- Index pour recherche rapide par slug
CREATE INDEX idx_clients_slug ON clients(slug);
```

## 2. Configurer Supabase Storage

### Étape 1 : Créer un Bucket Public

1. Ouvre ton projet Supabase (https://app.supabase.com)
2. Clique sur **Storage** (dans le menu gauche)
3. Clique sur **Create a new bucket**
4. Nomme-le : `client-images`
5. **Coche** : "Public bucket" (✓)
6. Clique sur **Create bucket**

### Étape 2 : Créer des Dossiers (optionnel)

À l'intérieur du bucket `client-images`, tu peux créer des dossiers :
- `logos/` - pour les logos des clients
- `images/` - pour les images principales

### Étape 3 : Obtenir l'URL Publique d'une Image

Une fois une image uploadée, tu vérras une URL comme :
```
https://YOUR_PROJECT.supabase.co/storage/v1/object/public/client-images/logos/mamadou-logo.png
```

## 3. Ajouter des Clients avec Images

### Exemple d'INSERT avec Images Supabase Storage

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
  logo_url,
  image_url,
  couleur_primaire,
  couleur_secondaire,
  couleur_3,
  couleur_4,
  catalogue
) VALUES (
  'mamadou',
  'Taxi Mamadou 🚖',
  'Service de taxi Dakar - Aéroport - Disponible 24h/24',
  '221772641751',
  '221772641751',
  'mamadou@taxi.sn',
  'https://goo.gl/maps/DakarTaxi',
  'https://facebook.com/mamadou',
  'https://tiktok.com/@mamadou',
  'https://instagram.com/mamadou',
  NULL,
  'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/client-images/logos/mamadou.png',
  'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/client-images/mamadou-cover.jpg',
  '#FF6B6B',
  '#FFD93D',
  '#FFC837',
  '#FF8E53',
  'https://example.com/catalogue'
);
```

## 4. Comment Uploader des Images

### Option A : Via l'Interface Supabase

1. Ouvre ton bucket `client-images`
2. Clique sur **Upload**
3. Sélectionne tes fichiers (PNG, JPG)
4. Clique sur le fichier uploadé
5. Copie l'URL publique

### Option B : Programmatiquement (React)

```javascript
import { supabase } from './supabase';

async function uploadLogo(file, clientSlug) {
  const { data, error } = await supabase.storage
    .from('client-images')
    .upload(`logos/${clientSlug}-${Date.now()}.png`, file);

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  // Obtenir l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('client-images')
    .getPublicUrl(data.path);

  return publicUrl;
}
```

## 5. Structure des Données Attendue

Chaque client doit avoir :

```javascript
{
  id: "uuid",
  slug: "mamadou",                              // Unique
  nom: "Taxi Mamadou 🚖",
  description: "Service de taxi Dakar...",      // Affiché sous le nom
  
  // Contacts (affichés en gros boutons si présent)
  whatsapp: "221772641751",
  phone: "221772641751",
  email: "mamadou@taxi.sn",
  localisation: "https://goo.gl/maps/...",
  
  // Réseaux sociaux (affichés en 3x2 UNIQUEMENT s'ils existent)
  facebook: "https://facebook.com/mamadou",    // null ou URL
  tiktok: "https://tiktok.com/@mamadou",       // null ou URL
  instagram: "https://instagram.com/mamadou",  // null ou URL
  youtube: "https://youtube.com/@mamadou",     // null ou URL
  linkedin: "https://linkedin.com/company/...", // null ou URL
  twitter: "https://twitter.com/mamadou",      // null ou URL
  
  // Images
  logo_url: "https://YOUR_PROJECT.supabase.co/storage/...",
  image_url: "https://picsum.photos/300/300",
  
  // Couleurs (dynamiques pour les boutons)
  couleur_primaire: "#FF6B6B",
  couleur_secondaire: "#FFD93D",
  couleur_3: "#FFC837",
  couleur_4: "#FF8E53",
  
  // Optionnel
  catalogue: "https://example.com/menu"
}
```

## 6. Test Rapide

1. Ajoute un client dans Supabase SQL Editor
2. Teste l'URL : `http://localhost:5173/p/mamadou`
3. Vérifie que les couleurs, images et réseaux sociaux s'affichent correctement

## ⚠️ Notes Importantes

- Les colonnes de réseaux sociaux sont **nullable** - ne mets que ceux qui existent
- Les images stockées dans Supabase Storage doivent être dans un **bucket public**
- Les URLs des images doivent être **complètes** (commencent par `https://`)
- La colonne `slug` doit être **unique** pour éviter les doublons
