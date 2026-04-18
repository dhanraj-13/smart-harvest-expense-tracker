import { Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-sm font-medium text-foreground">
              Smart Harvest SCP³
            </span>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            {t("footer.tagline")}
          </p>
          
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}
