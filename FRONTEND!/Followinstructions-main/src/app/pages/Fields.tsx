import { useState, type MouseEvent } from "react";
import {
  Plus,
  MapPin,
  Edit2,
  Trash2,
  X,
  Sprout,
  Ruler,
  Map,
  LandPlot,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

const SH = {
  green: "#16A34A",
  deep: "#14532D",
  light: "#DCFCE7",
  yellow: "#EAB308",
  earth: "#A16207",
  text: "#14532D",
  muted: "#4F6D58",
  border: "rgba(20, 83, 45, 0.14)",
};

type Field = {
  id: number;
  name: string;
  crop: string;
  season: string;
  district: string;
  area: string;
  soilType: string;
  gps: string;
  status: string;
};

const soilTypes = ["Clay Loam", "Sandy Loam", "Black Cotton", "Red Sandy", "Alluvial", "Laterite"];
const statusOpts = ["Active", "Fallow", "Harvested", "Preparing"];

const initialFields: Field[] = [
  { id: 1, name: "Field A", crop: "Paddy", season: "Kharif 2025", district: "Thanjavur", area: "1.5 acre", soilType: "Clay Loam", gps: "10.7905°N, 79.1398°E", status: "Active" },
  { id: 2, name: "Field B", crop: "Paddy", season: "Kharif 2025", district: "Thanjavur", area: "1.0 acre", soilType: "Alluvial", gps: "10.7910°N, 79.1402°E", status: "Active" },
  { id: 3, name: "Field C", crop: "Groundnut", season: "Rabi 2024", district: "Dindigul", area: "2.0 acre", soilType: "Red Sandy", gps: "10.3665°N, 77.9819°E", status: "Harvested" },
  { id: 4, name: "Home Plot", crop: "Turmeric", season: "Annual", district: "Erode", area: "0.5 acre", soilType: "Black Cotton", gps: "11.3400°N, 77.7172°E", status: "Active" },
];

const statusColor: Record<string, string> = {
  Active: "#22C55E",
  Fallow: "#EAB308",
  Harvested: "#4F6D58",
  Preparing: "#A16207",
};

const setRippleOrigin = (e: MouseEvent<HTMLButtonElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
};

function FieldModal({ onClose, onSave, initial }: { onClose: () => void; onSave: (field: Omit<Field, "id">) => void; initial?: Field }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    crop: initial?.crop ?? "Paddy",
    season: initial?.season ?? "Kharif 2025",
    district: initial?.district ?? "",
    area: initial?.area ?? "",
    soilType: initial?.soilType ?? "Clay Loam",
    gps: initial?.gps ?? "",
    status: initial?.status ?? "Active",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="premium-card w-full max-w-md p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#14532D]">{initial ? t("pages.fields.editField") : t("pages.fields.addField")}</h3>
          <button onClick={onClose} className="rounded-lg p-1 transition-all hover:bg-black/5">
            <X size={18} color={SH.muted} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t("pages.fields.fieldName"), key: "name", placeholder: "e.g. Field A" },
            { label: t("pages.fields.crop"), key: "crop", placeholder: "e.g. Paddy" },
            { label: t("pages.fields.season"), key: "season", placeholder: "e.g. Kharif 2025" },
            { label: t("pages.fields.district"), key: "district", placeholder: "e.g. Thanjavur" },
            { label: t("pages.fields.area"), key: "area", placeholder: "e.g. 1.5 acre" },
            { label: t("pages.fields.gpsLocation"), key: "gps", placeholder: "10.79°N, 79.14°E" },
          ].map((field) => (
            <div key={field.key} className={field.key === "gps" ? "col-span-2" : ""}>
              <label className="mb-1 block text-xs font-semibold text-[#14532D]">{field.label}</label>
              <input
                value={(form as any)[field.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-[#14532D]/15 bg-white px-3 py-2 text-sm text-[#14532D] outline-none transition-all focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
              />
            </div>
          ))}

          {[
            { label: t("pages.fields.soilType"), key: "soilType", opts: soilTypes },
            { label: t("pages.fields.status"), key: "status", opts: statusOpts },
          ].map((field) => (
            <div key={field.key}>
              <label className="mb-1 block text-xs font-semibold text-[#14532D]">{field.label}</label>
              <select
                value={(form as any)[field.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full appearance-none rounded-xl border border-[#14532D]/15 bg-white px-3 py-2 text-sm text-[#14532D] outline-none transition-all focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
              >
                {field.opts.map((option) => (
                  <option key={option} value={option}>
                    {field.key === "status"
                      ? t(`dynamic.fields.${option.toLowerCase()}`)
                      : t(`dynamic.fields.${option.charAt(0).toLowerCase() + option.slice(1).replace(" ", "")}`)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-full border border-[#14532D]/20 bg-white py-2.5 text-sm text-[#4F6D58] transition-all hover:scale-105">
            {t("common.cancel")}
          </button>
          <button
            onPointerDown={setRippleOrigin}
            onClick={() => {
              if (!form.name) return;
              onSave(form);
              onClose();
            }}
            className="agri-btn flex-1 py-2.5 text-sm font-semibold"
          >
            {initial ? t("common.save") : t("pages.fields.addField")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function Fields() {
  const { t } = useTranslation();
  const [fields, setFields] = useState(initialFields);
  const [modal, setModal] = useState<null | "add" | Field>(null);

  return (
    <div className="min-h-full px-2 py-6 md:px-0">
      <AnimatePresence>
        {modal && (
          <FieldModal
            onClose={() => setModal(null)}
            onSave={(data) => {
              if (modal === "add") {
                setFields((prev) => [...prev, { ...data, id: Date.now() }]);
              } else {
                setFields((prev) => prev.map((field) => (field.id === (modal as Field).id ? { ...data, id: field.id } : field)));
              }
            }}
            initial={modal !== "add" ? (modal as Field) : undefined}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#14532D]">{t("pages.fields.title")}</h1>
            <p className="mt-1 text-sm text-[#4F6D58]">{t("pages.fields.subtitle")}</p>
          </div>
          <button onPointerDown={setRippleOrigin} onClick={() => setModal("add")} className="agri-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
            <Plus size={15} className="icon-hover" />
            {t("pages.fields.addField")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field, idx) => (
            <motion.div key={field.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.04 }} className="premium-card p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <LandPlot size={16} color={SH.green} className="icon-hover" />
                    <h3 className="text-base font-semibold text-[#14532D]">
                      {field.name.includes("Field") || field.name.includes("Home") ? t(`dynamic.fields.${field.name.charAt(0).toLowerCase() + field.name.slice(1).replace(" ", "")}`) : field.name}
                    </h3>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: `${statusColor[field.status] ?? SH.muted}20`, color: statusColor[field.status] ?? SH.muted }}>
                      {t(`dynamic.fields.${field.status.toLowerCase()}`).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-[#4F6D58]">
                    {t(`dynamic.crops.${field.crop.toLowerCase()}`)} · {t(`dynamic.seasons.${field.season.toLowerCase().replace(" ", "")}`)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setModal(field)} className="rounded-lg p-2 transition-all hover:scale-110 hover:bg-[#DCFCE7]">
                    <Edit2 size={15} color={SH.muted} />
                  </button>
                  <button onClick={() => setFields((prev) => prev.filter((item) => item.id !== field.id))} className="rounded-lg p-2 transition-all hover:scale-110 hover:bg-amber-50">
                    <Trash2 size={15} color={SH.earth} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#DCFCE7]/35 p-3">
                {[
                  { icon: Map, label: t("pages.fields.district"), val: field.district },
                  { icon: Ruler, label: t("pages.fields.area"), val: field.area },
                  { icon: Sprout, label: t("pages.fields.soilType"), val: t(`dynamic.fields.${field.soilType.charAt(0).toLowerCase() + field.soilType.slice(1).replace(" ", "")}`) },
                  { icon: MapPin, label: t("pages.fields.gpsLocation"), val: field.gps },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="mb-0.5 inline-flex items-center gap-1 text-[11px] text-[#4F6D58]">
                      <item.icon size={12} /> {item.label}
                    </div>
                    <div className="text-xs font-medium text-[#14532D]">{item.val}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="premium-card py-20 text-center">
            <LandPlot size={48} color="#86A593" className="mx-auto mb-3" />
            <p className="text-sm text-[#4F6D58]">{t("pages.fields.noFields")}</p>
            <button onPointerDown={setRippleOrigin} onClick={() => setModal("add")} className="agri-btn mt-4 px-5 py-2.5 text-sm font-semibold">
              {t("pages.fields.addFirstField")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
