import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, TrendingUp, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-fields.jpg";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lush paddy fields of Tamil Nadu"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("hero.badge")}
            </span>
          </div>
          
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("hero.title")}{" "}
            <span className="text-primary">{t("hero.title.highlight")}</span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            {t("hero.description")}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link to="/predict">
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">{t("hero.cta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="container relative z-10 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title={t("hero.feature.yield")}
            description={t("hero.feature.yield.desc")}
          />
          <FeatureCard
            icon={<TrendingUp className="h-5 w-5" />}
            title={t("hero.feature.price")}
            description={t("hero.feature.price.desc")}
          />
          <FeatureCard
            icon={<Brain className="h-5 w-5" />}
            title={t("hero.feature.ai")}
            description={t("hero.feature.ai.desc")}
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card/80 p-6 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
