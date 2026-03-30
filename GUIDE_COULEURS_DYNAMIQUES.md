# Guide Configuration Couleurs Dynamiques + Réseaux Sociaux

## ✅ Ce qui a été fait

### 1. Réseaux Sociaux Maintenant Dynamiques

La page client affiche ** UNIQUEMENT ** les réseaux sociaux présents dans Supabase :

```javascript
// Si le client n'a pas TikTok, le bouton TikTok ne s'affiche pas
// Si le client a YouTube et LinkedIn, ils s'affichent

const socialNetworks = [
  { key: 'facebook', label: 'Facebook', icon: FaFacebook, color: '#1877F2' },
  { key: 'tiktok', label: 'TikTok', icon: FaTiktok, color: '#000000' },
  { key: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'gradient' },
  { key: 'youtube', label: 'YouTube', icon: FaYoutube, color: '#FF0000' },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
  { key: 'twitter', label: 'Twitter', icon: FaTwitter, color: '#1DA1F2' }
];

// Filtre : affiche uniquement si client[key] existe (n'est pas null/undefined)
const availableSocials = socialNetworks.filter(social => client[social.key]);
```

**Résultat** : 
- Si tu mets `facebook: null` → Le bouton Facebook ne s'affiche pas
- Si tu mets `youtube: "https://..."` → Le bouton YouTube s'affiche avec la bonne couleur

### 2. Jusqu'à 4 Couleurs par Client

Chaque client peut maintenant avoir jusqu'à 4 couleurs :

```
couleur_primaire   (hex) - Couleur principale
couleur_secondaire (hex) - Couleur secondaire
couleur_3          (hex) - Couleur tertiaire (optionnel)
couleur_4          (hex) - Couleur quaternaire (optionnel)
```

**Exemple** :
```javascript
{
  nom: "Taxi Mamadou",
  couleur_primaire: "#FF6B6B",      // Rouge
  couleur_secondaire: "#FFD93D",     // Jaune
  couleur_3: "#FFC837",              // Orange
  couleur_4: "#FF8E53"               // Orange-rougeâtre
}
```

## 📊 Ajouter un Client dans Supabase

### Étape 1 : Ouvre SQL Editor dans Supabase

Clique sur **SQL Editor** → **New Query**

### Étape 2 : Insère un nouveau client

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
  'new-client',
  'Mon Nouveau Client 🌟',
  'Une description courte du client',
  '221772641751',                          -- WhatsApp
  '221772641751',                          -- Téléphone
  'client@email.sn',                       -- Email
  'https://goo.gl/maps/location',          -- Localisation Google Maps
  'https://facebook.com/client',           -- NULL si pas présent
  'https://tiktok.com/@client',            -- NULL si pas présent
  'https://instagram.com/client',          -- NULL si pas présent
  NULL,                                    -- YouTube (ne s'affichera pas)
  NULL,                                    -- LinkedIn (ne s'affichera pas)
  NULL,                                    -- Twitter (ne s'affichera pas)
  'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/client-images/logo.png',
  'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/client-images/image.jpg',
  '#FF6B6B',                               -- Couleur 1
  '#FFD93D',                               -- Couleur 2
  '#FFC837',                               -- Couleur 3
  '#FF8E53',                               -- Couleur 4
  'https://example.com/catalogue'          -- NULL si pas de catalogue
);
```

## 🎨 Choisir les Couleurs

### Palettes Prédéfinies

**Taxi/Transport (Mamadou)** :
```
#FF6B6B (rouge)
#FFD93D (jaune)
#FFC837 (orange)
#FF8E53 (orange-rougeâtre)
```

**Boutique/Mode (Rama)** :
```
#6C5CE7 (violet)
#A29BFE (violet clair)
#9B8FD9 (violet-gris)
#7B6BC2 (violet-bleu)
```

**Restaurant (Thiès)** :
```
#00B894 (vert)
#55EFC4 (vert clair)
#2FCC71 (vert foncé)
#1ABC9C (teal)
```

### Générer tes Couleurs

- Utilise [Coolors.co](https://coolors.co/) pour générer des palettes
- Utilise [Color Hunt](https://colorhunt.co/) pour des palettes inspirées
- Copie les codes HEX (#RRGGBB)

## 📸 Ajouter des Images via Supabase Storage

### Option 1 : Interface Web

1. Va sur [app.supabase.com](https://app.supabase.com)
2. Ouvre ton projet
3. Clique sur **Storage** (menu gauche)
4. Clique sur le bucket **client-images**
5. Clique sur **Upload** et sélectionne tes fichiers
6. Clique sur le fichier uploadé
7. **Copie l'URL complète** (bouton copy)

### Option 2 : Via React (Formulaire d'Upload)

Si tu veux ajouter un formulaire d'upload :

```javascript
import { supabase } from './supabase';

async function uploadClientLogo(file, clientSlug) {
  const fileName = `logos/${clientSlug}-${Date.now()}.png`;
  
  const { data, error } = await supabase.storage
    .from('client-images')
    .upload(fileName, file);

  if (error) {
    console.error('Erreur upload:', error);
    return null;
  }

  // Obtenir l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('client-images')
    .getPublicUrl(data.path);

  return publicUrl;
}
```

## 🔍 Vérifier que tout fonctionne

### Test 1 : Réseaux Sociaux Dynamiques

1. Crée un client avec `youtube: NULL` et `tiktok: "https://..."`
2. Visite `/p/ton-client`
3. **Vérification** : TikTok doit s'afficher, YouTube ne doit PAS s'afficher

### Test 2 : Couleurs

1. Utilise tes 4 couleurs dans `couleur_primaire`, `couleur_secondaire`, `couleur_3`, `couleur_4`
2. Visite `/p/ton-client`
3. **Vérification** : Les couleurs doivent s'afficher sur les boutons

### Test 3 : Images

1. Ajoute des URLs valides pour `logo_url` et `image_url`
2. Visite `/p/ton-client`
3. **Vérification** : Les images doivent se charger correctement

## 🚀 Déployer sur Vercel

```bash
git add .
git commit -m "🎨 Réseaux sociaux dynamiques + 4 couleurs par client"
git push origin main
```

Vercel va recompiler automatiquement. Vérifie https://smart-nfc.vercel.app/p/mamadou après quelques secondes.

## 📝 Structure Complète d'un Client

```javascript
{
  // Identifiant unique
  slug: "mon-client",                    // URL = /p/mon-client
  
  // Affichage
  nom: "Mon Entreprise 🎯",
  description: "Courte description",
  
  // Contacts (toujours affichés s'ils existent)
  whatsapp: "221772641751",              // Pour lien WhatsApp
  phone: "221772641751",                 // Pour appel direct
  email: "contact@email.sn",             // Pour formulaire contact
  localisation: "https://goo.gl/maps/...", // Google Maps
  
  // Réseaux sociaux (affichés UNIQUEMENT s'ils existent = non NULL)
  facebook: "https://...",               // ou NULL
  tiktok: "https://...",                 // ou NULL
  instagram: "https://...",              // ou NULL
  youtube: "https://...",                // ou NULL
  linkedin: "https://...",               // ou NULL
  twitter: "https://...",                // ou NULL
  
  // Images
  logo_url: "https://...",               // Logo cercle
  image_url: "https://...",              // Image de couverture
  
  // Couleurs (hex)
  couleur_primaire: "#RRGGBB",
  couleur_secondaire: "#RRGGBB",
  couleur_3: "#RRGGBB",                  // Optionnel
  couleur_4: "#RRGGBB",                  // Optionnel
  
  // Optionnel
  catalogue: "https://...",              // Lien catalogue
}
```

## ⚠️ Points Importants

1. **slug doit être unique** - pas deux clients avec le même slug
2. **Les URLs doivent être complètes** - `https://...` pas `/path/file`
3. **Les couleurs doivent être en hex** - `#RRGGBB` pas `rgb(...)`
4. **Les réseaux sociaux doivent être NULL si absent** - pas une chaîne vide
5. **Les images Supabase doivent être dans un bucket PUBLIC**
6. **Après chaque modification Supabase, l'app récupère automatiquement les données**

## 🆘 Dépannage

### Les boutons de réseaux sociaux ne s'affichent pas

**Cause** : Les données dans Supabase ne sont pas correctes
**Solution** :
- Vérifie que `facebook`, `tiktok`, etc. ne sont pas vides (`""`)
- Ils doivent être SOIT avoir une URL valide, SOIT être `NULL`
- Pas d'URLs sans `https://`

### Les couleurs ne changent pas

**Cause** : Le cache du navigateur
**Solution** :
- Appuie sur **Ctrl+Shift+R** (clear cache) ou **Ctrl+F5**
- Ou visite `/p/ton-client?refresh=true`

### Les images ne se chargent pas

**Cause** : URL invalide ou bucket non public
**Solution** :
- Vérifiez que le bucket `client-images` est marqué comme **public**
- Vérifiez que l'URL commence par `https://`
- Testez l'URL directement dans le navigateur

