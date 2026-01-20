// Données structurées globales JSON-LD pour le SEO
// Schema.org Organization + LocalBusiness + Services

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hdconnect.fr/#organization",
  "name": "HD Connect",
  "alternateName": "HD Connect Sécurité",
  "url": "https://hdconnect.fr",
  "logo": {
    "@type": "ImageObject",
    "url": "https://hdconnect.fr/logo.png",
    "width": 512,
    "height": 512
  },
  "image": "https://hdconnect.fr/og-image.webp",
  "description": "Leader français en sécurité électronique 2025-2026 : vidéosurveillance IA 4K, alarmes certifiées NF&A2P/APSAD, contrôle d'accès biométrique. Intervention Rapide Urgence en Île-de-France et grandes villes. Visez le Top 3 Sécurité.",
  "foundingDate": "2015",
  "telephone": "+33 6 27 13 53 04",
  "email": "kamal@hdconnect.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Créteil",
    "addressLocality": "Créteil",
    "postalCode": "94000",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR"
  },
  "sameAs": [
    "https://www.facebook.com/hdconnectsecurite",
    "https://www.linkedin.com/company/hdconnect-securite",
    "https://www.instagram.com/hdconnect_securite"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+33627135304",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": ["French"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+33627135304",
      "contactType": "sales",
      "areaServed": "FR",
      "availableLanguage": ["French"]
    }
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hdconnect.fr/#localbusiness",
  "name": "HD Connect - Sécurité et Domotique",
  "image": "https://hdconnect.fr/og-image.webp",
  "url": "https://hdconnect.fr",
  "telephone": "+33 6 27 13 53 04",
  "email": "kamal@hdconnect.fr",
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Créteil",
    "addressLocality": "Créteil",
    "postalCode": "94000",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.7904,
    "longitude": 2.4556
  },
  "areaServed": [
    { "@type": "Country", "name": "France" },
    { "@type": "AdministrativeArea", "name": "Île-de-France" },
    { "@type": "AdministrativeArea", "name": "Auvergne-Rhône-Alpes" },
    { "@type": "AdministrativeArea", "name": "Provence-Alpes-Côte d'Azur" },
    { "@type": "AdministrativeArea", "name": "Nouvelle-Aquitaine" },
    { "@type": "AdministrativeArea", "name": "Occitanie" },
    { "@type": "AdministrativeArea", "name": "Hauts-de-France" },
    { "@type": "AdministrativeArea", "name": "Grand Est" },
    { "@type": "AdministrativeArea", "name": "Pays de la Loire" },
    { "@type": "AdministrativeArea", "name": "Bretagne" },
    { "@type": "AdministrativeArea", "name": "Normandie" },
    { "@type": "AdministrativeArea", "name": "Bourgogne-Franche-Comté" },
    { "@type": "AdministrativeArea", "name": "Centre-Val de Loire" },
    { "@type": "AdministrativeArea", "name": "Corse" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "215",
    "bestRating": "5"
  }
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Services HD Connect",
  "description": "Nos services d'installation, dépannage et location de systèmes de sécurité",
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "Installation Vidéosurveillance IA 4K",
      "description": "Installation de caméras de surveillance IA 4K pour particuliers et professionnels. Analyse vidéo intelligente, accès mobile 24/7, stockage cloud sécurisé.",
      "url": "https://hdconnect.fr/services/videosurveillance",
      "provider": { "@id": "https://hdconnect.fr/#organization" },
      "areaServed": { "@type": "Country", "name": "France" },
      "serviceType": "Installation de systèmes de vidéosurveillance"
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "Installation Alarme Anti-Intrusion NF&A2P/APSAD",
      "description": "Systèmes d'alarme certifiés NF&A2P/APSAD avec détection IA. Télésurveillance 24/7, intervention 4h Urgence.",
      "url": "https://hdconnect.fr/services/alarme",
      "provider": { "@id": "https://hdconnect.fr/#organization" },
      "areaServed": { "@type": "Country", "name": "France" },
      "serviceType": "Installation de systèmes d'alarme"
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "Contrôle d'Accès Biométrique",
      "description": "Solutions de contrôle d'accès professionnelles : badges RFID, biométrie, interphonie vidéo, gestion centralisée par IA.",
      "url": "https://hdconnect.fr/services/controle-acces",
      "provider": { "@id": "https://hdconnect.fr/#organization" },
      "areaServed": { "@type": "Country", "name": "France" },
      "serviceType": "Installation de contrôle d'accès"
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "Domotique Sécurité Intelligente",
      "description": "Automatisation de votre habitat par IA : éclairage, chauffage, volets, sécurité. Contrôle smartphone, économies d'énergie, scénarios de protection avancés.",
      "url": "https://hdconnect.fr/services/domotique",
      "provider": { "@id": "https://hdconnect.fr/#organization" },
      "areaServed": { "@type": "Country", "name": "France" },
      "serviceType": "Installation domotique"
    },
    {
      "@type": "Service",
      "position": 5,
      "name": "Infrastructure Réseau",
      "description": "Câblage structuré, WiFi professionnel, firewall et sécurité réseau pour entreprises.",
      "url": "https://hdconnect.fr/services/reseau",
      "provider": { "@id": "https://hdconnect.fr/#organization" },
      "areaServed": { "@type": "Country", "name": "France" },
      "serviceType": "Installation réseau informatique"
    },
    {
      "@type": "Service",
      "position": 6,
      "name": "Maintenance Préventive IA et Dépannage 4h",
      "description": "Maintenance préventive par diagnostic IA et dépannage 4h Urgence 24/7 de vos équipements de sécurité. Contrats sur mesure.",
      "url": "https://hdconnect.fr/services/maintenance",
      "provider": { "@id": "https://hdconnect.fr/#organization" },
      "areaServed": { "@type": "Country", "name": "France" },
      "serviceType": "Maintenance systèmes de sécurité"
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hdconnect.fr/#website",
  "url": "https://hdconnect.fr",
  "name": "HD Connect",
  "description": "Expert français en installation de systèmes de sécurité",
  "publisher": { "@id": "https://hdconnect.fr/#organization" },
  "inLanguage": "fr-FR"
};

// Fonction pour générer le JSON-LD complet de la page d'accueil
export const getHomePageJsonLd = () => {
  return [
    organizationSchema,
    localBusinessSchema,
    servicesSchema,
    websiteSchema
  ];
};
