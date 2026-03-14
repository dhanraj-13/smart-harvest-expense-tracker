import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";

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

const categories = ["All", "Seed", "Fertilizer", "Pesticide", "Labour", "Machine", "Water", "Fuel", "Transport", "Storage", "Misc"];
const fields = ["All Fields", "Field A", "Field B", "Field C"];
const crops = ["All Crops", "Paddy", "Sugarcane", "Groundnut"];

const initialExpenses = [
  { id: 1, date: "2025-03-08", desc: "DAP Fertilizer — 2 bags", category: "Fertilizer", amount: 4500, field: "Field A", crop: "Paddy" },
  { id: 2, date: "2025-03-06", desc: "Tractor Ploughing — 3 hrs", category: "Machine", amount: 2800, field: "Field B", crop: "Paddy" },
  { id: 3, date: "2025-03-05", desc: "Labour — Transplanting (10 workers)", category: "Labour", amount: 3200, field: "Field A", crop: "Paddy" },
  { id: 4, date: "2025-03-03", desc: "Paddy Seed IET 21212 — 5 kg", category: "Seed", amount: 1800, field: "Field A", crop: "Paddy" },
  { id: 5, date: "2025-03-01", desc: "Canal Water Charge", category: "Water", amount: 900, field: "Field B", crop: "Paddy" },
  { id: 6, date: "2025-02-25", desc: "Urea — 1 bag", category: "Fertilizer", amount: 1300, field: "Field A", crop: "Paddy" },
  { id: 7, date: "2025-02-20", desc: "Pesticide — Chlorpyrifos 250ml", category: "Pesticide", amount: 680, field: "Field A", crop: "Paddy" },
  { id: 8, date: "2025-02-18", desc: "Fuel — Pump irrigation", category: "Fuel", amount: 1200, field: "Field B", crop: "Paddy" },
  { id: 9, date: "2025-02-15", desc: "Transport to market", category: "Transport", amount: 1500, field: "Field A", crop: "Paddy" },
  { id: 10, date: "2025-02-10", desc: "Storage facility charges", category: "Storage", amount: 2000, field: "Field A", crop: "Paddy" },
];

const catColors: Record<string, string> = {
  Seed: SH.paddy,
  Fertilizer: SH.turmeric,
  Pesticide: "#9B7EC8",
  Labour: SH.terracotta,
  Machine: SH.soil,
  Water: "#5B8DB8",
  Fuel: "#E08A3C",
  Transport: "#6BAE9B",
  Storage: "#8B7A6B",
  Misc: SH.muted,
};

type Expense = typeof initialExpenses[0];

function Modal({ onClose, onSave, initial }: { onClose: () => void; onSave: (e: Omit<Expense, "id">) => void; initial?: Expense }) {
  const [form, setForm] = useState({
    date: initial?.date ?? new Date().toISOString().split("T")[0],
    desc: initial?.desc ?? "",
    category: initial?.category ?? "Fertilizer",
    amount: initial?.amount?.toString() ?? "",
    field: initial?.field ?? "Field A",
    crop: initial?.crop ?? "Paddy",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: SH.text }}>
            {initial ? "Edit Expense" : "Add Expense"}
          </h3>
          <button onClick={onClose}>
            <X size={18} color={SH.muted} />
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {[
            { label: "Description", key: "desc", type: "text", placeholder: "e.g. DAP Fertilizer 2 bags" },
            { label: "Amount (₹)", key: "amount", type: "number", placeholder: "e.g. 4500" },
            { label: "Date", key: "date", type: "date" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>
                {f.label}
              </label>
              <input
                type={f.type}
                value={(form as any)[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg outline-none"
                style={{ border: `1.5px solid ${SH.border}`, backgroundColor: "white", color: SH.text, fontSize: "14px", fontFamily: "'Work Sans', sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = SH.green)}
                onBlur={(e) => (e.target.style.borderColor = SH.border)}
              />
            </div>
          ))}

          {[
            { label: "Category", key: "category", opts: categories.slice(1) },
            { label: "Field", key: "field", opts: ["Field A", "Field B", "Field C"] },
            { label: "Crop", key: "crop", opts: ["Paddy", "Sugarcane", "Groundnut"] },
          ].map((f) => (
            <div key={f.key}>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>
                {f.label}
              </label>
              <select
                value={(form as any)[f.key]}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg outline-none appearance-none"
                style={{ border: `1.5px solid ${SH.border}`, backgroundColor: "white", color: SH.text, fontSize: "14px", fontFamily: "'Work Sans', sans-serif" }}
              >
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl"
            style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "13px" }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.desc || !form.amount) return;
              onSave({ ...form, amount: parseFloat(form.amount) });
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl text-white"
            style={{ backgroundColor: SH.green, fontSize: "13px", fontWeight: 600 }}
          >
            {initial ? "Save Changes" : "Add Expense"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Expenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [fieldFilter, setFieldFilter] = useState("All Fields");
  const [modal, setModal] = useState<null | "add" | Expense>(null);

  const filtered = expenses.filter((e) => {
    const matchSearch =
      e.desc.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || e.category === catFilter;
    const matchField = fieldFilter === "All Fields" || e.field === fieldFilter;
    return matchSearch && matchCat && matchField;
  });

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const handleAdd = (data: Omit<Expense, "id">) => {
    setExpenses((prev) => [...prev, { ...data, id: Date.now() }]);
  };

  const handleEdit = (data: Omit<Expense, "id">) => {
    if (typeof modal === "object" && modal !== null) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === (modal as Expense).id ? { ...data, id: e.id } : e))
      );
    }
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      {modal && (
        <Modal
          onClose={() => setModal(null)}
          onSave={modal === "add" ? handleAdd : handleEdit}
          initial={modal !== "add" ? (modal as Expense) : undefined}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>
              Expenses
            </h1>
            <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
              Track and manage all farm expenses.
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{ backgroundColor: SH.green, fontSize: "13px" }}
          >
            <Plus size={15} />
            Add Expense
          </button>
        </div>

        {/* Summary */}
        <div
          className="mb-5 p-4 rounded-2xl flex flex-wrap gap-4 items-center"
          style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
        >
          <div>
            <div style={{ fontSize: "11px", color: SH.muted }}>Filtered Total</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: SH.text }}>
              ₹{total.toLocaleString("en-IN")}
            </div>
          </div>
          <div style={{ width: "1px", height: "36px", backgroundColor: SH.border }} />
          <div>
            <div style={{ fontSize: "11px", color: SH.muted }}>Entries</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: SH.text }}>{filtered.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div
            className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl"
            style={{ backgroundColor: SH.surface, border: `1.5px solid ${SH.border}` }}
          >
            <Search size={15} color={SH.muted} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expenses..."
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: "14px", color: SH.text, fontFamily: "'Work Sans', sans-serif" }}
            />
          </div>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl outline-none appearance-none"
            style={{ border: `1.5px solid ${SH.border}`, backgroundColor: SH.surface, color: SH.text, fontSize: "13px" }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl outline-none appearance-none"
            style={{ border: `1.5px solid ${SH.border}`, backgroundColor: SH.surface, color: SH.text, fontSize: "13px" }}
          >
            {fields.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}
        >
          <div
            className="hidden md:grid px-5 py-3"
            style={{
              gridTemplateColumns: "100px 1fr 120px 80px 80px 80px",
              borderBottom: `1px solid ${SH.border}`,
              backgroundColor: SH.bg,
            }}
          >
            {["Date", "Description", "Category", "Field", "Amount", ""].map((h) => (
              <div key={h} style={{ fontSize: "11px", fontWeight: 600, color: SH.muted, letterSpacing: "0.04em" }}>
                {h}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🌾</div>
              <p style={{ fontSize: "15px", color: SH.muted }}>No expenses found.</p>
            </div>
          )}

          {filtered.map((exp, i) => (
            <div
              key={exp.id}
              className="flex flex-col md:grid px-5 py-4 gap-2 transition-all hover:bg-amber-50/50"
              style={{
                gridTemplateColumns: "100px 1fr 120px 80px 80px 80px",
                borderBottom: i < filtered.length - 1 ? `1px solid ${SH.border}` : "none",
              }}
            >
              <div style={{ fontSize: "13px", color: SH.muted }}>{exp.date}</div>
              <div style={{ fontSize: "13px", color: SH.text, fontWeight: 500 }}>{exp.desc}</div>
              <div>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${catColors[exp.category] ?? SH.muted}18`,
                    color: catColors[exp.category] ?? SH.muted,
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {exp.category}
                </span>
              </div>
              <div style={{ fontSize: "13px", color: SH.muted }}>{exp.field}</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: SH.text }}>
                ₹{exp.amount.toLocaleString("en-IN")}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModal(exp)}
                  className="p-1.5 rounded-lg transition-all hover:bg-gray-100"
                >
                  <Edit2 size={14} color={SH.muted} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-1.5 rounded-lg transition-all hover:bg-red-50"
                >
                  <Trash2 size={14} color={SH.terracotta} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
