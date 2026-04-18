import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center md:px-12 md:py-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
              {t("cta.description")}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <Link to="/predict">
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
