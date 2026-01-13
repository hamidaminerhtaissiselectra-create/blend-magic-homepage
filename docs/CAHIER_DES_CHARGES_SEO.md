# 🔍 Cahier des Charges SEO - HD Connect

## 📌 Vue d'Ensemble

Ce document définit la stratégie SEO complète pour HD Connect, incluant le SEO technique, le SEO local, la structure des pages et l'optimisation pour les moteurs de recherche et l'IA.

---

## 🎯 Objectifs SEO

### Objectifs Principaux
1. **Positionnement national** sur les requêtes "installation sécurité France"
2. **Domination locale** sur Île-de-France (zone prioritaire)
3. **Génération de leads** qualifiés via le formulaire de devis
4. **Autorité thématique** sur la sécurité électronique

### KPIs Cibles
| Métrique | Objectif 6 mois | Objectif 12 mois |
|----------|-----------------|------------------|
| Trafic organique | +150% | +300% |
| Positions Top 3 | 50 mots-clés | 150 mots-clés |
| Leads/mois | 100 | 250 |
| Domain Authority | 25 | 40 |

---

## 🏗️ Architecture SEO

### Structure en Silos

```
hdconnect.fr/
├── / (Accueil)
├── /services/
│   ├── /videosurveillance
│   ├── /alarme
│   ├── /controle-acces
│   ├── /reseau
│   ├── /domotique
│   ├── /antenne-satellite
│   └── /portails-parking
├── /zones-intervention/
│   ├── /ile-de-france/
│   │   ├── /paris
│   │   ├── /creteil
│   │   └── /[autres-villes]
│   ├── /auvergne-rhone-alpes/
│   │   └── /[villes]
│   └── /[autres-regions]/
├── /contact
├── /devis
└── /[pages-legales]
```

### Maillage Interne

#### Règles de Maillage
1. **Page Accueil** → Toutes les pages services + Régions principales
2. **Page Service** → Autres services + Régions pertinentes
3. **Page Région** → Tous les services + Villes de la région
4. **Page Ville (Pivot)** → Services + Région parent + Villes proches

#### Ancres Optimisées
- Variation des ancres (exact match < 30%)
- Ancres contextuelles privilégiées
- Ancres naturelles (nom de ville, "en savoir plus")

---

## 📄 Structure des Pages Pivot (Villes)

### Template de Page Ville

```
[H1] Installation, Dépannage, Location Sécurité à [Ville] ([Département])

[SAB - Paragraphe d'accroche 100-150 mots]
Présentation HD Connect à [Ville], contexte local, proposition de valeur.

[Section Services]
[H2] Nos Services de Sécurité à [Ville]
- Vidéosurveillance [Ville]
- Alarme [Ville]
- Contrôle d'accès [Ville]

[Section Expertise Locale]
[H2] Pourquoi Choisir HD Connect à [Ville] ?
- Connaissance du tissu économique local
- Interventions rapides (délais selon zone)
- Références locales

[Section Types de Clients]
[H2] Solutions pour Tous les Profils à [Ville]
- Particuliers
- Professionnels (commerces, bureaux)
- Collectivités

[Section FAQ Locale]
[H2] Questions Fréquentes - Sécurité [Ville]
3-5 questions spécifiques à la localité

[CTA Final]
[H2] Demandez Votre Devis Gratuit à [Ville]
Formulaire ou lien vers /devis

[Maillage]
- Lien vers région parent
- Liens vers villes proches
- Liens vers services
```

---

## 🏷️ Balises SEO

### Meta Tags Standards

#### Title Tag
```
Format: [Action] [Service] à [Ville] | HD Connect
Exemple: Installation Vidéosurveillance à Créteil | HD Connect
Longueur: 50-60 caractères
```

#### Meta Description
```
Format: [Proposition valeur] à [Ville]. [Bénéfice]. [CTA].
Exemple: Expert en installation de vidéosurveillance à Créteil. Devis gratuit, intervention rapide. Contactez HD Connect !
Longueur: 150-160 caractères
```

#### Meta Keywords
```
[service] [ville], installation [service] [département], 
[service] [région], HD Connect [ville]
```

### Open Graph (Réseaux Sociaux)
```html
<meta property="og:title" content="[Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:image" content="https://hdconnect.fr/og-image.png" />
<meta property="og:url" content="[URL canonique]" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="HD Connect" />
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@hdconnect" />
<meta name="twitter:title" content="[Title]" />
<meta name="twitter:description" content="[Description]" />
<meta name="twitter:image" content="[URL image]" />
```

---

## 📊 Données Structurées (JSON-LD)

### LocalBusiness (Page Accueil)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "HD Connect - Sécurité et Domotique",
  "image": "https://hdconnect.fr/logo.png",
  "url": "https://hdconnect.fr",
  "telephone": "+33 6 27 13 53 04",
  "email": "contact@hdconnect.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Créteil",
    "addressLocality": "Créteil",
    "addressRegion": "Île-de-France",
    "postalCode": "94000",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.7896,
    "longitude": 2.4550
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "€€",
  "areaServed": ["France", "Île-de-France"]
}
```

### Service (Pages Services)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Installation Vidéosurveillance",
  "description": "Installation professionnelle de systèmes de vidéosurveillance HD/4K",
  "provider": {
    "@type": "LocalBusiness",
    "name": "HD Connect"
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "serviceType": "Installation vidéosurveillance"
}
```

### FAQPage (Sections FAQ)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question 1 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Réponse 1."
      }
    }
  ]
}
```

### BreadcrumbList (Fil d'Ariane)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://hdconnect.fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Île-de-France",
      "item": "https://hdconnect.fr/zones-intervention/ile-de-france"
    }
  ]
}
```

---

## 🤖 Optimisation IA (SGE/AIO)

### Objectif
Optimiser le contenu pour être sélectionné par les AI Overviews de Google et autres systèmes IA.

### Principes

#### Format "Réponse Directe"
```
Question claire → Réponse concise (2-3 phrases) → Développement
```

#### Contenu Structuré
- Listes à puces pour les étapes
- Tableaux pour les comparaisons
- Définitions claires en début de section

#### Signaux E-E-A-T
- **Expérience** : Témoignages, études de cas
- **Expertise** : Certifications, années d'expérience
- **Autorité** : Mentions presse, partenariats
- **Fiabilité** : Avis clients, garanties

### Exemples de Contenu AIO-Ready

```markdown
## Qu'est-ce que la vidéosurveillance IP ?

La vidéosurveillance IP utilise des caméras connectées au réseau 
pour transmettre les images en temps réel via Internet. 
Contrairement aux systèmes analogiques, elle offre une qualité 
HD/4K et un accès distant depuis smartphone.

### Avantages :
- Qualité d'image supérieure (jusqu'à 4K)
- Accès distant 24h/24
- Stockage cloud sécurisé
- Évolutivité facile
```

---

## 🗺️ SEO Local

### Google Business Profile
- Fiche optimisée avec photos
- Horaires à jour
- Catégories pertinentes
- Posts réguliers
- Gestion des avis

### Citations NAP
Cohérence Name-Address-Phone sur :
- Pages Jaunes
- Yelp
- Annuaires locaux
- Réseaux sociaux

### Pages Locales
- 1 page par ville principale (50+ villes)
- Contenu unique par page
- Témoignages locaux si disponibles
- Références clients locales

---

## 📈 Plan d'Action SEO

### Phase 1 : Fondations (Mois 1-2)
- [x] Audit technique complet
- [x] Correction erreurs techniques
- [x] Mise en place des données structurées
- [x] Optimisation des balises meta
- [ ] Création des pages régions (13/13)
- [ ] Création des pages villes prioritaires (IDF)

### Phase 2 : Contenu (Mois 3-4)
- [ ] Rédaction pages villes (50 pages)
- [ ] Création contenu blog (10 articles)
- [ ] Optimisation pages services
- [ ] FAQ enrichies

### Phase 3 : Autorité (Mois 5-6)
- [ ] Campagne de netlinking
- [ ] Partenariats locaux
- [ ] Guest posting
- [ ] Relations presse

### Phase 4 : Expansion (Mois 7-12)
- [ ] Pages départements
- [ ] Contenu vidéo
- [ ] Études de cas clients
- [ ] Expansion géographique

---

## 📋 Checklist SEO par Page

### Avant Publication
- [ ] Title unique (50-60 car.)
- [ ] Meta description unique (150-160 car.)
- [ ] H1 unique avec mot-clé principal
- [ ] Structure H2/H3 cohérente
- [ ] Images optimisées (alt, compression)
- [ ] Liens internes (3-5 minimum)
- [ ] Données structurées appropriées
- [ ] URL propre et descriptive
- [ ] Canonical défini
- [ ] Mobile-friendly vérifié

### Après Publication
- [ ] Indexation vérifiée (Google Search Console)
- [ ] Pas d'erreurs 404/500
- [ ] Vitesse de chargement < 3s
- [ ] Partage réseaux sociaux testé

---

## 🔧 Outils SEO Recommandés

| Outil | Usage |
|-------|-------|
| Google Search Console | Suivi indexation, erreurs |
| Google Analytics 4 | Trafic, conversions |
| Screaming Frog | Audit technique |
| SEMrush / Ahrefs | Positions, backlinks |
| PageSpeed Insights | Performance |
| Schema Markup Validator | Données structurées |

---

## 📊 Reporting SEO

### Rapport Mensuel
1. Évolution du trafic organique
2. Positions sur mots-clés cibles
3. Nouvelles pages indexées
4. Leads générés
5. Backlinks acquis
6. Actions du mois suivant

### Mots-clés Prioritaires
| Mot-clé | Volume | Difficulté | Position actuelle |
|---------|--------|------------|-------------------|
| installation vidéosurveillance paris | 720 | Moyenne | - |
| alarme maison ile de france | 590 | Moyenne | - |
| contrôle accès entreprise | 480 | Facile | - |
| dépannage alarme 94 | 210 | Facile | - |

---

## 📞 Contact SEO

**Stratégie SEO** : Définie par le client  
**Implémentation** : Lovable AI  
**Suivi** : Google Search Console + Analytics  
**Dernière mise à jour** : Janvier 2026
