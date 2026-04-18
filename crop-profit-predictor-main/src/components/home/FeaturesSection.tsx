import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    t("features.list.1"),
    t("features.list.2"),
    t("features.list.3"),
    t("features.list.4"),
    t("features.list.5"),
    t("features.list.6"),
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {t("features.title")}{" "}
              <span className="text-primary">{t("features.title.highlight")}</span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              {t("features.description")}
            </p>

            <ul className="mb-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg">
              <Link to="/predict">{t("features.cta")}</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-chart-4" />
                <div className="h-3 w-3 rounded-full bg-chart-1" />
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="rounded-lg bg-background p-4">
                  <div className="text-muted-foreground">// Prediction Output</div>
                  <div className="mt-2 text-foreground">
                    <span className="text-chart-1">crop</span>: "Rice"
                  </div>
                  <div className="text-foreground">
                    <span className="text-chart-1">district</span>: "Thanjavur"
                  </div>
                  <div className="text-foreground">
                    <span className="text-chart-1">predicted_yield</span>: 3.2 t/ha
                  </div>
                  <div className="text-foreground">
                    <span className="text-chart-1">predicted_profit</span>: ₹42,500
                  </div>
                  <div className="text-foreground">
                    <span className="text-chart-1">profit_margin</span>: 28.5%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-chart-1/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
