# 🎯 Architecture SmartNfc - Pages Clients

## 📊 Vue d'ensemble

```
Site Accueil (Home)
    ↓
Page Clients (listing)  ← Affiche tous les clients
    ↓
Page Client Unique (ClientPage)  ← Design personnalisé par client
```

---

## 🗂️ Structure du Projet

### 1. **Routing** (`src/App.jsx`)
- `/` → Accueil
- `/clients` → Liste tous les clients
- `/services` → Services
- `/contact` → Contact
- `/:slug` → Page client unique (ex: `/mamadou`, `/boutique-rama`)

### 2. **Pages Créées**

#### ✅ `src/pages/Clients.jsx` (NOUVEAU)
- **Affiche** : Galerie de tous les clients
- **Design** : Cartes avec logo, nom, description, couleurs du client
- **Liens** : Click → va vers page client unique

#### ✅ `src/pages/ClientPage.jsx` (REFONT)
- **Affiche** : Page client ultra-personnalisée
- **Design** : 
  - Header avec gradient (couleurs du client)
  - Logo large + nom + description
  - 3 gros boutons (WhatsApp, Appeler, Localisation)
  - Réseaux sociaux
  - Catalogue (si existant)
  - Autres clients (liens)
- **Couleurs** : Dynamiques par client

### 3. **Service Supabase** (`src/services/supabase.js`)

**Mock clients (pour DEV)**:
```javascript
{
  slug: 'mamadou',
  nom: 'Taxi Mamadou 🚖',
  whatsapp: '221772641751',
  phone: '221772641751',
  email: 'mamadou@taxi.sn',
  facebook: 'https://facebook.com/mamadou',
  tiktok: 'https://tiktok.com/@mamadou',
  localisation: 'https://goo.gl/maps/...',
  image: 'https://...',
  logo_url: 'https://...',
  catalogue: null/url,
  couleur_primaire: '#FF6B6B',
  couleur_secondaire: '#FFD93D',
  description: 'Service de taxi fiable...'
}
```

---

## 🔧 Configuration Supabase

### Colonnes de la table `clients` :

| Colonne | Type | Exemple |
|---------|------|---------|
| `id` | UUID | auto |
| `slug` | TEXT | mamadou |
| `nom` | TEXT | Taxi Mamadou 🚖 |
| `whatsapp` | TEXT | 221772641751 |
| `phone` | TEXT | 221772641751 |
| `email` | TEXT | mamadou@taxi.sn |
| `facebook` | TEXT | https://facebook.com/... |
| `tiktok` | TEXT | https://tiktok.com/... |
| `localisation` | TEXT | https://goo.gl/maps/... |
| `image` | TEXT | https://... |
| `logo_url` | TEXT | https://... |
| `catalogue` | TEXT | https://... |
| `couleur_primaire` | TEXT | #FF6B6B |
| `couleur_secondaire` | TEXT | #FFD93D |
| `description` | TEXT | Service de taxi... |
| `created_at` | TIMESTAMP | auto |

### SQL à exécuter :

```sql
-- Voir le fichier: sql/update-clients-table.sql
```

---

## 📸 Upload de Logo/Photo

**Actuellement** : URL externes (placeholder.com)

**À faire pour PROD** :
1. Créer bucket Supabase Storage : `clients-logos`
2. Permettre uploads publics
3. Créer fonction upload en React
4. Mettre à jour ServiceWorker pour cache

---

## 🚀 Flux Client (Client Vue)

1. **Client visite** : `example.com/mamadou`
2. **Page charge** : Logo + nom + description affichés
3. **Couleurs** : Automatiques (primaire + secondaire du client)
4. **Boutons** : WhatsApp, Appeler, Localisation, Facebook, TikTok
5. **Découverte** : Lien vers autres clients

---

## 💡 Améliorations Futures

- [ ] Upload de logo direct (Supabase Storage)
- [ ] Dashboard client pour auto-édition
- [ ] Analytics (clics, conversions)
- [ ] QR code NFC personnalisé
- [ ] Template de catalogue intégré
- [ ] Email marketing intégré

---

## ✅ Teste maintenant :

**Accueil** → http://localhost:5174/
**Clients** → http://localhost:5174/clients
**Client 1** → http://localhost:5174/mamadou
**Client 2** → http://localhost:5174/boutique-rama
**Client 3** → http://localhost:5174/restaurant-thies

---

## 🔑 Points clés

✅ **Page Clients** : Liste professionnelle avec cartes
✅ **Page Client** : Design 100% unique par client
✅ **Couleurs** : Dynamiques (couleur_primaire + couleur_secondaire)
✅ **Upload** : Ready pour logo/photo
✅ **Mobile-first** : Responsive sur tout
✅ **Mode PROD** : Pas de démo, données réelles uniquement
