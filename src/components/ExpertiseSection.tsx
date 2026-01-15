// Section E-E-A-T (Experience, Expertise, Authoritativeness, Trust) pour SEO
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Award,
  Shield,
  Users,
  Clock,
  CheckCircle,
  BadgeCheck,
  Building2,
  Wrench,
  GraduationCap,
  Star,
} from "lucide-react";

interface ExpertiseSectionProps {
  location?: string;
}

const ExpertiseSection = ({ location = "Île-de-France" }: ExpertiseSectionProps) => {
  const expertiseItems = [
    {
      icon: Clock,
      title: "10+ Ans d'Expérience",
      description: "Depuis 2014, HD Connect accompagne particuliers et entreprises dans leurs projets de sécurité. Plus de 2000 installations réalisées.",
      stat: "2014",
      statLabel: "Création"
    },
    {
      icon: Users,
      title: "5000+ Installations",
      description: "Notre équipe a réalisé plus de 5000 installations de systèmes de sécurité en Île-de-France et régions limitrophes.",
      stat: "5000+",
      statLabel: "Projets"
    },
    {
      icon: GraduationCap,
      title: "Techniciens Certifiés",
      description: "Nos techniciens suivent des formations continues auprès des fabricants : Dahua, Hikvision, Ajax, Comelit, Somfy.",
      stat: "100%",
      statLabel: "Certifiés"
    },
    {
      icon: Award,
      title: "Certifications NF&A2P",
      description: "Nous installons exclusivement du matériel certifié NF&A2P, reconnu par les compagnies d'assurance.",
      stat: "NF&A2P",
      statLabel: "Garantie"
    }
  ];

  const trustIndicators = [
    { icon: Shield, label: "Matériel garanti 5 ans" },
    { icon: BadgeCheck, label: "Agrément préfecture" },
    { icon: Building2, label: "Partenaire des syndics" },
    { icon: Wrench, label: "SAV 24/7 disponible" },
    { icon: Star, label: "4.9/5 avis clients" },
    { icon: CheckCircle, label: "Devis transparent" },
  ];

  const comparisons = [
    {
      title: "Caméras HD vs 4K",
      description: "Le Full HD (1080p) suffit pour la plupart des usages domestiques. Le 4K est recommandé pour les commerces et zones à fort trafic nécessitant identification précise.",
      recommendation: "Notre conseil : 2K minimum pour un bon compromis qualité/stockage."
    },
    {
      title: "Alarme filaire vs sans fil",
      description: "Le filaire offre une fiabilité maximale sans risque d'interférences. Le sans fil permet une installation rapide et évolutive.",
      recommendation: "Notre conseil : Sans fil pour rénovation, filaire pour construction neuve."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <Award className="w-4 h-4" />
              <span>Conseils d'Expert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi Faire Confiance à <span className="text-primary">HD Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Plus de 10 ans d'expertise en sécurité électronique en {location}
            </p>
          </div>
        </AnimatedSection>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {expertiseItems.map((item, index) => (
            <AnimatedSection key={index} animation="scale-in" delay={index * 100}>
              <Card className="h-full border-border hover:border-primary/30 transition-all hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{item.stat}</div>
                      <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust Indicators */}
        <AnimatedSection animation="fade-up">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border hover:border-primary/30 transition-colors"
              >
                <indicator.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{indicator.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Technical Comparisons */}
        <AnimatedSection animation="fade-up">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              Comparatifs Techniques
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {comparisons.map((comparison, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-foreground text-lg mb-3">{comparison.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{comparison.description}</p>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground font-medium">{comparison.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExpertiseSection;
