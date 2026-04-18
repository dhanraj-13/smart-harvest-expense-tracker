import { MapPin, Sprout, Calendar, Ruler } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { icon: <MapPin className="h-5 w-5" />, value: "38+", label: t("stats.districts") },
    { icon: <Sprout className="h-5 w-5" />, value: "20+", label: t("stats.crops") },
    { icon: <Calendar className="h-5 w-5" />, value: "4", label: t("stats.seasons") },
    { icon: <Ruler className="h-5 w-5" />, value: "95%+", label: t("stats.accuracy") },
  ];

  return (
    <section className="border-y border-border bg-card py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
