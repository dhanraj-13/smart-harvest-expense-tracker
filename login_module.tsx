import { FormEvent, useMemo, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { Leaf } from "lucide-react";
import { isAuthenticated, login } from "@/app/lib/auth";
import { useTranslation } from "react-i18next";

const SH = {
  green: "#00E58F",
  deep: "#061A13",
  paddy: "#63FFB4",
  turmeric: "#D9A441",
  bg: "#03110D",
  surface: "rgba(7, 24, 18, 0.72)",
  text: "#E8FFF6",
  muted: "#9FD8C0",
  border: "rgba(99, 255, 180, 0.35)",
};

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const canSubmit = useMemo(() => userName.trim().length > 0 && password.trim().length > 0, [userName, password]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      setError(t("login.errorRequired"));
      return;
    }
    login(userName);
    navigate("/", { replace: true });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(2,10,8,0.78), rgba(4,24,18,0.65)), url('/farmer-bg.jpg/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl p-7 shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: SH.surface,
          border: `1px solid ${SH.border}`,
          boxShadow: "0 0 24px rgba(0, 229, 143, 0.25), 0 0 48px rgba(0, 229, 143, 0.14)",
        }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(0,229,143,0.18)", border: "1px solid rgba(99,255,180,0.45)" }}
          >
            <Leaf size={22} color={SH.paddy} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "28px", fontWeight: 700, color: SH.text }}>{t("common.appName")}</h1>
            <p style={{ fontSize: "13px", color: SH.muted }}>{t("login.title")}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold" style={{ color: SH.text }}>
              {t("login.username")}
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t("login.usernamePlaceholder")}
              className="w-full rounded-lg px-3.5 py-2.5 outline-none"
              style={{
                border: `1.5px solid ${SH.border}`,
                backgroundColor: "rgba(3, 17, 13, 0.62)",
                color: SH.text,
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold" style={{ color: SH.text }}>
              {t("login.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login.passwordPlaceholder")}
              className="w-full rounded-lg px-3.5 py-2.5 outline-none"
              style={{
                border: `1.5px solid ${SH.border}`,
                backgroundColor: "rgba(3, 17, 13, 0.62)",
                color: SH.text,
              }}
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm" style={{ color: "#B85C38" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "#00C978",
            boxShadow: "0 0 16px rgba(0, 229, 143, 0.45)",
          }}
        >
          {t("login.submit")}
        </button>
      </form>
    </div>
  );
}

