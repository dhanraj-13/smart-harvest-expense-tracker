import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Brain, 
  Database, 
  BarChart3, 
  Leaf, 
  Target, 
  Users,
  Code,
  Server,
  AlertTriangle
} from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t("about.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {t("about.mission.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              {t("about.mission.desc")}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t("about.disclaimer.title")}</AlertTitle>
            <AlertDescription>
              {t("about.disclaimer.desc")}
            </AlertDescription>
          </Alert>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                {t("about.tech.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                    <Server className="h-4 w-4" />
                    {t("about.tech.backend")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">FastAPI</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">XGBoost</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">Pydantic</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                    <Leaf className="h-4 w-4" />
                    {t("about.tech.frontend")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">JavaScript (ES6)</Badge>
                    <Badge variant="outline">CSS (Design Tokens)</Badge>
                    <Badge variant="outline">Vite</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-5 w-5 text-chart-1" />
                  {t("about.yield.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t("about.yield.desc")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="h-5 w-5 text-chart-2" />
                  {t("about.market.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t("about.market.desc")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-5 w-5 text-chart-3" />
                  {t("about.ai.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t("about.ai.desc")}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5 text-chart-4" />
                  {t("about.farmer.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t("about.farmer.desc")}
              </CardContent>
            </Card>
          </div>

          {/* Data Coverage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {t("about.data.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 text-sm md:grid-cols-3">
                <div className="rounded-lg bg-accent/50 p-4 text-center">
                  <div className="text-2xl font-bold text-accent-foreground">38+</div>
                  <div className="text-muted-foreground">{t("about.data.districts")}</div>
                </div>
                <div className="rounded-lg bg-accent/50 p-4 text-center">
                  <div className="text-2xl font-bold text-accent-foreground">20+</div>
                  <div className="text-muted-foreground">{t("about.data.crops")}</div>
                </div>
                <div className="rounded-lg bg-accent/50 p-4 text-center">
                  <div className="text-2xl font-bold text-accent-foreground">4</div>
                  <div className="text-muted-foreground">{t("about.data.seasons")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
