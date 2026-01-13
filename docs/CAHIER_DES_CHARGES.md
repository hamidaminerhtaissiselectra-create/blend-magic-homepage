# 📋 Cahier des Charges - HD Connect

## 📌 Présentation du Projet

**Client** : HD Connect  
**URL Production** : https://hdconnect.fr  
**Projet Lovable** : https://lovable.dev/projects/cfef176e-4824-41fc-a7a2-f4a1f35a89d4

### 🎯 Objectif Principal
Créer un site vitrine professionnel et performant pour HD Connect, spécialisé dans l'installation, le dépannage et la location de systèmes de sécurité électronique (vidéosurveillance, alarmes, contrôle d'accès) sur l'ensemble du territoire français.

---

## 🏗️ Architecture Technique

### Stack Technologique
| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 18.3.1 | Framework Frontend |
| TypeScript | Latest | Typage statique |
| Vite | Latest | Build tool |
| Tailwind CSS | Latest | Styling |
| Shadcn/UI | Latest | Composants UI |
| Framer Motion | 12.x | Animations |
| React Router | 6.x | Routing |
| Supabase | 2.x | Backend (Auth, DB, Edge Functions) |

### Backend Supabase
- **Base de données** : PostgreSQL avec RLS (Row Level Security)
- **Authentification** : Email/Password pour l'admin
- **Edge Functions** : Envoi d'emails via Resend
- **Tables** : `customer_requests`, `user_roles`

---

## 🎨 Design System - Signature Visuelle

### Philosophie Design
Le site utilise une **signature visuelle unique** caractérisée par :
- **Cercles lumineux flottants** avec `blur-3xl` et `animate-pulse-slow`
- **Gradients subtils** sur les backgrounds
- **Effets glassmorphism** avec `backdrop-blur-sm`
- **Animations au scroll** via AnimatedSection
- **Hover effects** avec `hover:scale-105` et transitions fluides
- **Badges colorés** pour les catégories et services

### Palette de Couleurs (HSL)
```css
/* Couleurs Principales */
--primary: 213 94% 53%        /* Bleu HD Connect */
--accent: 262 83% 58%          /* Violet accent */
--background: 222 47% 11%      /* Fond sombre */
--foreground: 210 40% 98%      /* Texte clair */
--muted: 217 33% 17%           /* Fond secondaire */
--muted-foreground: 215 20% 65% /* Texte secondaire */

/* Couleurs Services */
--videosurveillance: blue-500
--alarme: orange-500
--controle-acces: violet-500
--reseau: cyan-500
--domotique: emerald-500
--antenne: amber-500
--portails: rose-500
```

### Gradients Signature
```css
/* Service Icons */
bg-gradient-to-br from-blue-500/20 to-cyan-500/20
bg-gradient-to-br from-orange-500/20 to-amber-500/20
bg-gradient-to-br from-violet-500/20 to-purple-500/20

/* Backgrounds décoratifs */
bg-gradient-to-br from-primary/10 via-background to-accent/5

/* CTA Buttons */
bg-gradient-to-r from-primary to-accent
```

### Effets Visuels
```css
/* Cercles flottants */
.floating-circle {
  @apply w-72 h-72 rounded-full blur-3xl animate-pulse-slow absolute;
  background: hsl(var(--primary) / 0.15);
}

/* Cards avec hover */
.card-hover {
  @apply transition-all duration-300 hover:scale-105 hover:shadow-lg;
}

/* Badges catégorie */
.category-badge {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium;
  @apply bg-gradient-to-r from-[color]/10 to-[color]/10;
}
```

---

## 📄 Structure des Pages

### Pages Principales
| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Hero, Services, Témoignages, CTA |
| `/services` | Services | Liste des 7 services |
| `/services/[slug]` | Service détail | Page service individuelle |
| `/zones-intervention` | Couverture | Régions et départements |
| `/zones-intervention/[region]` | Région | Détail région |
| `/zones-intervention/[region]/[ville]` | Ville | Page ville (pivot SEO) |
| `/contact` | Contact | Formulaire et informations |
| `/devis` | Devis | Formulaire de demande |
| `/mentions-legales` | Mentions | Mentions légales |
| `/politique-confidentialite` | RGPD | Politique de confidentialité |

### Services (7 au total)
1. **Vidéosurveillance** - Caméras HD/4K, NVR, accès distant
2. **Alarme** - Systèmes anti-intrusion NF&A2P
3. **Contrôle d'accès** - Badges, biométrie, interphonie
4. **Réseau** - Câblage, baies, WiFi
5. **Domotique** - Maison intelligente
6. **Antenne & Satellite** - TNT, parabole, IPTV
7. **Portails & Parking** - Automatismes, barrières

### Régions (13 métropolitaines)
Chaque région génère des pages pour ses départements et villes principales.

---

## 🧩 Composants Principaux

### Layout
- `Header` - Navigation sticky avec menu mobile
- `Footer` - Liens, contact, réseaux sociaux
- `Breadcrumbs` - Fil d'Ariane SEO

### Sections Réutilisables
- `Hero` - Section héroïque avec CTA
- `AnimatedSection` - Wrapper animation scroll
- `ServiceHero` - Hero spécifique services
- `FAQAccordion` - Section FAQ
- `Testimonials` - Témoignages clients
- `QuoteFunnelSimple` - Formulaire de devis

### UI (Shadcn)
- Button, Card, Input, Textarea
- Accordion, Dialog, Sheet
- Select, Checkbox, RadioGroup
- Toast, Tooltip, Tabs

---

## ⚙️ Fonctionnalités

### Formulaire de Devis
- Collecte : nom, email, téléphone, message, type client
- Envoi email via Supabase Edge Function + Resend
- Stockage en base de données
- Confirmation toast

### Navigation
- Menu responsive (desktop/mobile)
- Smooth scroll vers sections
- CTA flottant sur certaines pages

### Animations
- Fade-in au scroll (AnimatedSection)
- Hover effects sur cards
- Transitions sur navigation
- Pulse sur éléments décoratifs

---

## 📱 Responsive Design

| Breakpoint | Largeur | Usage |
|------------|---------|-------|
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablette |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop large |
| `2xl` | 1536px | Écrans larges |

---

## 🔐 Sécurité

### Supabase RLS
- Policies sur `customer_requests`
- Accès admin restreint par `user_roles`
- Authentification requise pour dashboard

### Bonnes Pratiques
- Variables d'environnement pour clés API
- Validation côté client (Zod)
- Sanitization des inputs

---

## 📊 Performance

### Optimisations Appliquées
- Lazy loading images
- Code splitting automatique (Vite)
- Compression des assets
- Caching navigateur
- Fonts optimisées

### Métriques Cibles
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## 🚀 Déploiement

### Production
- Hébergé via Lovable
- Domaine : hdconnect.fr
- SSL automatique

### Variables d'Environnement
```env
VITE_SUPABASE_URL=xxx
VITE_SUPABASE_ANON_KEY=xxx
RESEND_API_KEY=xxx (Edge Function)
```

---

## 📋 État du Projet

### ✅ Fonctionnalités Complétées
- [x] Site vitrine complet
- [x] 7 pages services
- [x] 13 pages régions
- [x] Pages villes dynamiques
- [x] Formulaire de devis fonctionnel
- [x] SEO technique complet
- [x] Design responsive
- [x] Animations et micro-interactions
- [x] Dark mode par défaut

### 🔄 En Cours
- [x] Pages départements détaillées (Intégré depuis la version Polish)
- [x] Blog/Actualités (Intégré depuis la version Polish)
- [ ] Espace client

### 📝 À Venir
- [ ] Intégration paiement (Stripe)
- [ ] Système de RDV en ligne
- [ ] Chat en direct
- [ ] Application mobile

---

## 📞 Contact Technique

**Développement** : Lovable AI  
**Infrastructure** : Supabase + Lovable Hosting  
**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2026
