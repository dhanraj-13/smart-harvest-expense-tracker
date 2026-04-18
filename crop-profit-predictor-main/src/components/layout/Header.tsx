import { Leaf, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/predict", label: t("nav.predict") },
    { to: "/history", label: t("nav.history") },
    { to: "/about", label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold leading-tight text-foreground">
              Smart Harvest
            </span>
            <span className="text-xs text-muted-foreground">SCP³ Platform</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
