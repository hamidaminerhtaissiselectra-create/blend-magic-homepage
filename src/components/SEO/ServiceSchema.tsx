import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  serviceImage?: string;
  faqItems?: FAQItem[];
  breadcrumbs: { name: string; url: string }[];
  cityName?: string;
}

const ServiceSchema = ({
  serviceName,
  serviceDescription,
  serviceUrl,
  serviceImage,
  faqItems,
  breadcrumbs,
  cityName,
}: ServiceSchemaProps) => {
  const baseUrl = 'https://hdconnect.fr';

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'HD Connect',
      telephone: '+33 6 27 13 53 04',
	      email: 'kamal@hdconnect.fr',
	      address: {
	        '@type': 'PostalAddress',
	        addressLocality: cityName || 'Paris',
	        addressRegion: 'Île-de-France',
	        postalCode: '75001',
	        addressCountry: 'FR',
	      },
	      url: baseUrl,
	      logo: `${baseUrl}/logo.png`,
	      priceRange: '€€€',
	      openingHours: 'Mo-Su 00:00-23:59',
	      slogan: 'Votre sécurité, notre expertise. Installation, maintenance et dépannage 24/7. Intervention Rapide Urgence.',
	      certification: 'NF&A2P, APSAD P3',
	      knowsAbout: ['Vidéosurveillance IA', 'Alarme NF&A2P', 'Contrôle d\'accès biométrique', 'Domotique', 'Réseau VDI', 'Sécurité 2025-2026'],
	      review: {
	        '@type': 'Review',
	        reviewRating: {
	          '@type': 'Rating',
	          ratingValue: '4.9',
	          bestRating: '5',
	        },
	        author: {
	          '@type': 'Person',
	          name: 'Client Vérifié',
	        },
	        reviewBody: 'Installation rapide et professionnelle. Le système d\'alarme IA est très fiable.',
	      },
	    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de Sécurité 2025-2026',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Alarme NF&A2P',
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vidéosurveillance IA 4K',
          }
        }
      ]
    },
	    areaServed: cityName
	      ? {
	          '@type': 'City',
	          name: cityName,
	          '@id': `${baseUrl}/villes/${cityName.toLowerCase().replace(/\s/g, '-')}`,
	        }
	      : [
	          { '@type': 'Country', name: 'France' },
	          { '@type': 'State', name: 'Île-de-France' },
	          { '@type': 'City', name: 'Paris' },
	          { '@type': 'City', name: 'Lyon' },
	          { '@type': 'City', name: 'Marseille' },
	        ],
    url: `${baseUrl}${serviceUrl}`,
    ...(serviceImage && { image: `${baseUrl}${serviceImage}` }),
	    award: 'Certification NF&A2P & APSAD P3, Garantie 5 Ans',
	    serviceType: 'Sécurité Électronique & IA 2025-2026, Intervention Rapide Urgence',
	    hasMap: 'https://maps.app.goo.gl/HDConnectLocation',
  };

  // FAQ Schema
  const faqSchema = faqItems?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default ServiceSchema;
