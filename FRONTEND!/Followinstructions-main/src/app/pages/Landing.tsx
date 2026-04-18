import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  Calendar,
  ChevronRight,
  History,
  Leaf,
  LineChart,
  Mail,
  MapPin,
  Phone,
  Sprout,
  TrendingUp,
  IndianRupee,
  ClipboardList,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const heroImageUrl = "/farmer-bg.jpg/StockCake-Sunset_Harvest_Time-534727-standard.jpg";

const statIcons = [MapPin, Leaf, Calendar, Activity];
const featureIcons = [TrendingUp, IndianRupee, LineChart, History];
const stepIcons = [ClipboardList, Brain, BarChart3];

export function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: t("landing.stat1Value"), title: t("landing.stat1Title"), desc: t("landing.stat1Desc") },
    { value: t("landing.stat2Value"), title: t("landing.stat2Title"), desc: t("landing.stat2Desc") },
    { value: t("landing.stat3Value"), title: t("landing.stat3Title"), desc: t("landing.stat3Desc") },
    { value: t("landing.stat4Value"), title: t("landing.stat4Title"), desc: t("landing.stat4Desc") },
  ];

  const features = [
    { title: t("landing.feature1Title"), desc: t("landing.feature1Desc") },
    { title: t("landing.feature2Title"), desc: t("landing.feature2Desc") },
    { title: t("landing.feature3Title"), desc: t("landing.feature3Desc") },
    { title: t("landing.feature4Title"), desc: t("landing.feature4Desc") },
  ];

  const steps = [
    { title: t("landing.step1Title"), desc: t("landing.step1Desc") },
    { title: t("landing.step2Title"), desc: t("landing.step2Desc") },
    { title: t("landing.step3Title"), desc: t("landing.step3Desc") },
  ];

  const navLinks = [
    { label: t("common.home"), path: "/" },
    { label: t("common.predict"), path: "/predict" },
    { label: t("common.dashboard"), path: "/dashboard" },
    { label: t("common.history"), path: "/history" },
    { label: t("common.about"), path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-[#F5FBF6] text-slate-900" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <section
        className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pt-32 pb-20 md:px-6"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        <div className="landing-hero-content relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2">
              <Sprout size={14} className="text-[#9EE2AF]" />
              <span className="text-sm font-medium text-white">{t("landing.heroBadge")}</span>
            </div>

            <h1 className="font-['Lora'] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("landing.heroTitle1")}
              <br />
              <span className="text-[#86EFAC]">{t("landing.heroTitle2")}</span>
              <br />
              {t("landing.heroTitle3")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">{t("landing.heroDesc")}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/predict")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#16A34A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-800/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#15803D]"
              >
                {t("common.startPrediction")}
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
              >
                {t("common.learnMore")}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-4 py-20 md:px-6"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)), url('/farmer-bg.jpg/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="font-['Lora'] text-3xl font-semibold text-[#0f2d1a]">{t("landing.statsTitle")}</h2>
            <p className="mt-3 text-slate-600">{t("landing.statsSubtitle")}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = statIcons[index];
              return (
                <article
                  key={index}
                  className="rounded-2xl border border-white/60 bg-white/72 p-6 shadow-sm backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A34A]/15 text-[#16A34A]">
                    <Icon size={20} />
                  </div>
                  <p className="text-3xl font-bold text-[#166534]">{stat.value}</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{stat.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{stat.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="px-4 py-20 md:px-6"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.28), rgba(255,255,255,0.28)), url('/farmer-bg.jpg/bg3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="font-['Lora'] text-3xl font-semibold text-[#0f2d1a]">{t("landing.featuresTitle")}</h2>
            <p className="mt-3 text-slate-600">{t("landing.featuresSubtitle")}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <article
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#16A34A]/10 text-[#16A34A]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="px-4 py-20 md:px-6"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('/farmer-bg.jpg/bg4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="font-['Lora'] text-3xl font-semibold text-[#0f2d1a]">{t("landing.stepsTitle")}</h2>
            <p className="mt-3 text-slate-600">{t("landing.stepsSubtitle")}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <article
                  key={index}
                  className="rounded-2xl border border-[#dcfce7] bg-[#f0fdf4] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#16A34A] text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div>
            <h2 className="font-['Lora'] text-3xl font-semibold text-[#0f2d1a]">{t("landing.chatTitle")}</h2>
            <p className="mt-4 max-w-xl text-slate-600">{t("landing.chatDesc")}</p>
            <button
              onClick={() => navigate("/predict")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16A34A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#15803D]"
            >
              {t("common.startPrediction")}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d2013] px-4 py-14 text-white md:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16A34A] text-white">
                <Leaf size={18} />
              </div>
              <p className="font-['Lora'] text-xl font-semibold">{t("common.appName")}</p>
            </div>
            <h4 className="mb-2 text-sm font-semibold text-green-200">{t("landing.footerAboutTitle")}</h4>
            <p className="text-sm leading-6 text-white/75">{t("landing.footerAboutDesc")}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-green-200">{t("landing.quickLinks")}</h4>
            <div className="space-y-2 text-sm text-white/80">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  className="block transition-colors hover:text-white"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-green-200">{t("landing.contact")}</h4>
            <div className="space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-[#86EFAC]" />
                dhan0474@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-[#86EFAC]" />
                +91 6369789755
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-[#86EFAC]" />
                Coimbatore, Tamil Nadu
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h4 className="mb-2 text-sm font-semibold text-green-200">{t("landing.aiAdvisory")}</h4>
            <p className="text-sm leading-6 text-white/75">
              {t("landing.aiAdvisoryDesc")}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl border-t border-white/10 pt-6 text-sm text-white/60">
          {t("landing.rights")}
        </div>
      </footer>
    </div>
  );
}
