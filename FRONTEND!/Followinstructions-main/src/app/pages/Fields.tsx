import { useState } from "react";
import { Plus, MapPin, Edit2, Trash2, X } from "lucide-react";

const SH = {
  green: "#2F6B3B",
  deep: "#1F4D2A",
  paddy: "#7BAE58",
  turmeric: "#D9A441",
  terracotta: "#B85C38",
  soil: "#6B4F3A",
  bg: "#F7F3EA",
  surface: "#FFFDF8",
  text: "#1F2933",
  muted: "#667085",
  border: "#D9D2C3",
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
  Active: SH.paddy,
  Fallow: SH.turmeric,
  Harvested: SH.muted,
  Preparing: SH.soil,
};

function FieldModal({ onClose, onSave, initial }: { onClose: () => void; onSave: (f: Omit<Field, "id">) => void; initial?: Field }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: SH.text }}>
            {initial ? "Edit Field" : "Add Field"}
          </h3>
          <button onClick={onClose}><X size={18} color={SH.muted} /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Field Name", key: "name", placeholder: "e.g. Field A" },
            { label: "Crop", key: "crop", placeholder: "e.g. Paddy" },
            { label: "Season", key: "season", placeholder: "e.g. Kharif 2025" },
            { label: "District", key: "district", placeholder: "e.g. Thanjavur" },
            { label: "Area", key: "area", placeholder: "e.g. 1.5 acre" },
            { label: "GPS Location", key: "gps", placeholder: "10.79°N, 79.14°E" },
          ].map((f) => (
            <div key={f.key} className={f.key === "gps" ? "col-span-2" : ""}>
              <label className="block mb-1" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{f.label}</label>
              <input
                value={(form as any)[f.key]}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, fontFamily: "'Work Sans', sans-serif", backgroundColor: "white" }}
                onFocus={(e) => (e.target.style.borderColor = SH.green)}
                onBlur={(e) => (e.target.style.borderColor = SH.border)}
              />
            </div>
          ))}
          {[
            { label: "Soil Type", key: "soilType", opts: soilTypes },
            { label: "Status", key: "status", opts: statusOpts },
          ].map((f) => (
            <div key={f.key}>
              <label className="block mb-1" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{f.label}</label>
              <select
                value={(form as any)[f.key]}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg outline-none appearance-none"
                style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}
              >
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl" style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "13px" }}>
            Cancel
          </button>
          <button
            onClick={() => { if (!form.name) return; onSave(form); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-white"
            style={{ backgroundColor: SH.green, fontSize: "13px", fontWeight: 600 }}
          >
            {initial ? "Save" : "Add Field"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Fields() {
  const [fields, setFields] = useState(initialFields);
  const [modal, setModal] = useState<null | "add" | Field>(null);

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      {modal && (
        <FieldModal
          onClose={() => setModal(null)}
          onSave={(data) => {
            if (modal === "add") {
              setFields((p) => [...p, { ...data, id: Date.now() }]);
            } else {
              setFields((p) => p.map((f) => f.id === (modal as Field).id ? { ...data, id: f.id } : f));
            }
          }}
          initial={modal !== "add" ? (modal as Field) : undefined}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>
              Fields
            </h1>
            <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
              Manage your farm fields and plot information.
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white"
            style={{ backgroundColor: SH.green, fontSize: "13px" }}
          >
            <Plus size={15} />
            Add Field
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="p-5 rounded-2xl"
              style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: SH.text }}>
                      {field.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${statusColor[field.status] ?? SH.muted}20`,
                        color: statusColor[field.status] ?? SH.muted,
                        fontSize: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {field.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: SH.muted }}>{field.crop} · {field.season}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(field)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Edit2 size={15} color={SH.muted} />
                  </button>
                  <button
                    onClick={() => setFields((p) => p.filter((f) => f.id !== field.id))}
                    className="p-2 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={15} color={SH.terracotta} />
                  </button>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-2 p-3 rounded-xl"
                style={{ backgroundColor: SH.bg }}
              >
                {[
                  { icon: "📍", label: "District", val: field.district },
                  { icon: "📐", label: "Area", val: field.area },
                  { icon: "🌍", label: "Soil Type", val: field.soilType },
                  { icon: <MapPin size={12} color={SH.muted} />, label: "GPS", val: field.gps },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ fontSize: "10px", color: SH.muted, marginBottom: "2px" }}>
                      {typeof item.icon === "string" ? item.icon : item.icon} {item.label}
                    </div>
                    <div style={{ fontSize: "12px", color: SH.text, fontWeight: 500 }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div
            className="py-20 rounded-2xl text-center"
            style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🗺️</div>
            <p style={{ fontSize: "15px", color: SH.muted }}>No fields added yet.</p>
            <button
              onClick={() => setModal("add")}
              className="mt-4 px-5 py-2.5 rounded-xl text-white"
              style={{ backgroundColor: SH.green, fontSize: "13px" }}
            >
              Add Your First Field
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
