import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium">
        {language === "en" ? "தமிழ்" : "EN"}
      </span>
    </Button>
  );
}
