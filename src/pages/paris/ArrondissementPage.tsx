import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import FAQAccordion from "@/components/FAQAccordion";
import MiniTestimonials from "@/components/MiniTestimonials";
import WhyHDConnect from "@/components/WhyHDConnect";
import ExpertiseSection from "@/components/ExpertiseSection";
import {
  MapPin,
  Phone,
  Clock,
  Shield,
  ArrowRight,
  Camera,
  ShieldAlert,
  Lock,
  Home,
  Wifi,
  Wrench,
  Award,
  Zap,
  Users,
  AlertTriangle,
  Building2,
  CheckCircle,
} from "lucide-react";
import { getArrondissementBySlug, parisArrondissements, ArrondissementData } from "@/data/parisArrondissements";
import { usePhoneCall } from "@/hooks/usePhoneCall";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const ArrondissementPage = () => {
  const { arrondissementSlug } = useParams<{ arrondissementSlug: string }>();
  const { phoneNumber, callUrl } = usePhoneCall();
  const { scrollToSection } = useSmoothScroll();

  if (!arrondissementSlug) {
    return <Navigate to="/villes/paris" replace />;
  }

  const arrondissement = getArrondissementBySlug(arrondissementSlug);

  if (!arrondissement) {
    return <Navigate to="/villes/paris" replace />;
  }

  const ordinalNumber = arrondissement.number === 1 ? "1er" : `${arrondissement.number}e`;

  useSEO({
    title: `Sécurité ${arrondissement.name} | Vidéosurveillance, Alarme | HD Connect`,
    description: `Expert sécurité ${arrondissement.name} : vidéosurveillance HD, alarmes certifiées NF&A2P, contrôle d'accès. Intervention rapide ${arrondissement.quartiers.slice(0, 3).join(", ")}. Devis gratuit.`,
    keywords: `sécurité Paris ${ordinalNumber}, vidéosurveillance ${arrondissement.name}, alarme ${arrondissement.quartiers[0]}, installation caméra Paris ${arrondissement.number}, HD Connect Paris`,
    canonicalUrl: `https://hdconnect.fr/paris/${arrondissement.slug}`,
  });

  const breadcrumbItems = [
    { name: "Zones d'intervention", url: "/zones-intervention" },
    { name: "Île-de-France", url: "/zones-intervention/ile-de-france" },
    { name: "Paris", url: "/villes/paris" },
    { name: `${ordinalNumber} arrondissement`, url: `/paris/${arrondissement.slug}` },
  ];

  // Services avec données locales
  const services = [
    {
      icon: Camera,
      title: "Vidéosurveillance",
      description: `Installation caméras HD/4K dans le ${ordinalNumber} arrondissement. Surveillance commerces, copropriétés, bureaux.`,
      link: "/services/videosurveillance",
    },
    {
      icon: ShieldAlert,
      title: "Alarmes",
      description: `Systèmes d'alarme certifiés NF&A2P pour ${arrondissement.quartiers[0]} et environs.`,
      link: "/services/alarme",
    },
    {
      icon: Lock,
      title: "Contrôle d'Accès",
      description: `Badges, biométrie, interphones vidéo pour immeubles et bureaux du ${ordinalNumber}.`,
      link: "/services/controle-acces",
    },
    {
      icon: Home,
      title: "Domotique",
      description: `Maison intelligente et automatisation sécurité dans le ${ordinalNumber} arrondissement.`,
      link: "/services/domotique",
    },
    {
      icon: Wifi,
      title: "Réseau",
      description: `Infrastructure réseau professionnelle pour entreprises du ${ordinalNumber}.`,
      link: "/services/reseau",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: `Maintenance préventive et dépannage 24/7 dans le ${ordinalNumber} arrondissement.`,
      link: "/services/maintenance",
    },
  ];

  // FAQ spécifiques à l'arrondissement
  const faqItems = [
    {
      question: `Quels quartiers du ${ordinalNumber} arrondissement couvrez-vous ?`,
      answer: `HD Connect intervient dans tous les quartiers du ${ordinalNumber} arrondissement de Paris : ${arrondissement.quartiers.join(", ")}. Nous connaissons parfaitement les spécificités de chaque quartier pour adapter nos solutions.`,
    },
    {
      question: `Quel est le délai d'intervention dans le ${ordinalNumber} arrondissement ?`,
      answer: `Nous intervenons sous 24 à 48h dans le ${ordinalNumber} arrondissement de Paris pour les installations programmées. Pour les urgences, nous pouvons intervenir le jour même. Notre proximité avec Paris nous permet une grande réactivité.`,
    },
    {
      question: `Le ${ordinalNumber} arrondissement est-il un secteur à risque ?`,
      answer: `Le taux de criminalité du ${ordinalNumber} arrondissement est de ${arrondissement.crimeRate} habitants. ${arrondissement.priority === 'critique' ? "Ce secteur nécessite une vigilance particulière, c'est pourquoi nous proposons des solutions renforcées adaptées." : "Nous recommandons néanmoins une protection adaptée à vos besoins."}`,
    },
    {
      question: `Proposez-vous des solutions pour les copropriétés du ${ordinalNumber} ?`,
      answer: `Oui, nous équipons de nombreuses copropriétés du ${ordinalNumber} arrondissement : vidéosurveillance des parties communes, interphones vidéo connectés, contrôle d'accès par badge. Nous travaillons régulièrement avec les syndics.`,
    },
    {
      question: `Quels monuments ou lieux sensibles sécurisez-vous dans le ${ordinalNumber} ?`,
      answer: `Dans le ${ordinalNumber} arrondissement, nous sécurisons les commerces et résidences à proximité de ${arrondissement.landmarks.slice(0, 2).join(" et ")}. Notre expertise nous permet de proposer des solutions discrètes et efficaces.`,
    },
  ];

  // JSON-LD LocalBusiness enrichi
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `HD Connect - Sécurité ${arrondissement.name}`,
    "image": "https://hdconnect.fr/logo.png",
    "url": `https://hdconnect.fr/paris/${arrondissement.slug}`,
    "telephone": "+33 6 27 13 53 04",
    "email": "contact@hdconnect.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${ordinalNumber} arrondissement`,
      "addressLocality": "Paris",
      "postalCode": `750${arrondissement.number.toString().padStart(2, '0')}`,
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `Paris ${ordinalNumber} arrondissement`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "127"
    },
    "serviceType": [
      "Installation vidéosurveillance",
      "Installation alarme",
      "Contrôle d'accès",
      "Domotique",
      "Maintenance sécurité"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Autres arrondissements pour le maillage interne
  const otherArrondissements = parisArrondissements
    .filter(arr => arr.slug !== arrondissement.slug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                <MapPin className="w-4 h-4" />
                Paris {ordinalNumber} (75{arrondissement.number.toString().padStart(2, '0')})
              </span>
              {arrondissement.priority === 'critique' && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  Secteur prioritaire
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Sécurité <span className="text-primary">{arrondissement.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              {arrondissement.description}
            </p>

            {/* Stats locales */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm"><strong>{arrondissement.population}</strong> habitants</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm"><strong>{arrondissement.quartiers.length}</strong> quartiers</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Taux criminalité : <strong>{arrondissement.crimeRate}</strong></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8"
                onClick={() => scrollToSection("quote", { mode: "quote" })}
              >
                Devis gratuit {ordinalNumber}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 bg-primary/20 backdrop-blur-sm border-2 border-primary/50 hover:bg-primary/30 text-primary transition-all"
                asChild
              >
                <a href={callUrl} target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 w-5 h-5" />
                  {phoneNumber}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quartiers couverts */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Quartiers du {ordinalNumber} Arrondissement
              </h2>
              <p className="text-muted-foreground">
                HD Connect intervient dans tous les quartiers du {ordinalNumber}
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {arrondissement.quartiers.map((quartier, index) => (
              <AnimatedSection key={index} animation="scale-in" delay={index * 50}>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  {quartier}
                </span>
              </AnimatedSection>
            ))}
          </div>

          {/* Lieux remarquables */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Lieux remarquables à proximité :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {arrondissement.landmarks.map((landmark, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos Services dans le {ordinalNumber}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Solutions de sécurité complètes pour particuliers et professionnels du {ordinalNumber} arrondissement
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="scale-in" delay={index * 50}>
                <Link to={service.link}>
                  <Card className="hover-lift h-full border-border group cursor-pointer transition-all hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section E-E-A-T Expertise */}
      <ExpertiseSection location={`Paris ${ordinalNumber}`} />

      {/* Pourquoi HD Connect */}
      <WhyHDConnect cityName={`Paris ${ordinalNumber}`} />

      {/* Mini Témoignages */}
      <MiniTestimonials location={`Paris ${ordinalNumber}`} />

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Questions Fréquentes - {ordinalNumber} Arrondissement
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Autres arrondissements */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Autres Arrondissements de Paris
              </h2>
              <p className="text-muted-foreground">
                HD Connect intervient dans tous les arrondissements parisiens
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {otherArrondissements.map((arr, index) => (
              <AnimatedSection key={index} animation="scale-in" delay={index * 50}>
                <Link to={`/paris/${arr.slug}`}>
                  <Card className="hover-lift text-center cursor-pointer transition-all hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {arr.number === 1 ? "1er" : `${arr.number}e`}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{arr.quartiers[0]}</p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/villes/paris">
                <MapPin className="mr-2 w-5 h-5" />
                Voir tous les arrondissements
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sécurisez Votre {ordinalNumber} Arrondissement
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Devis gratuit sous 24h pour votre projet de sécurité dans le {ordinalNumber} arrondissement de Paris
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8"
              onClick={() => scrollToSection("quote", { mode: "quote" })}
            >
              Demander un devis gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 hover:bg-white hover:text-primary text-lg px-8"
              asChild
            >
              <a href={callUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 w-5 h-5" />
                {phoneNumber}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArrondissementPage;
