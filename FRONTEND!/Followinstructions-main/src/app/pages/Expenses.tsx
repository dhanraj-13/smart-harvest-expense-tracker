import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

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

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  field: string;
};

const categories = ["All", "Labour", "Fertilizer", "Seed", "Machine", "Water", "Pesticide", "Fuel", "Transport", "Storage", "Misc"];
const fieldOptions = ["Field A", "Field B", "Field C", "Home Plot"];

const initialExpenses: Expense[] = [
  { id: 1, description: "DAP Fertilizer - 2 bags", amount: 3200, category: "Fertilizer", date: "2025-03-06", field: "Field A" },
  { id: 2, description: "Field A Harvest Labour", amount: 8000, category: "Labour", date: "2025-03-04", field: "Field A" },
  { id: 3, description: "Sprinkler pipe repair", amount: 1200, category: "Machine", date: "2025-02-28", field: "Field B" },
  { id: 4, description: "Neem pesticide spray", amount: 2800, category: "Pesticide", date: "2025-02-25", field: "Field A" },
  { id: 5, description: "Paddy seed (BPT5204)", amount: 4500, category: "Seed", date: "2025-02-20", field: "Field A" },
  { id: 6, description: "Ploughing tractor hire", amount: 6500, category: "Machine", date: "2025-02-15", field: "Field B" },
  { id: 7, description: "Diesel for pumpset", amount: 1800, category: "Fuel", date: "2025-02-10", field: "Field A" },
  { id: 8, description: "Organic manure", amount: 2200, category: "Fertilizer", date: "2025-02-05", field: "Field C" },
];

const catColors: Record<string, string> = {
  Labour: SH.paddy,
  Fertilizer: SH.turmeric,
  Seed: SH.soil,
  Machine: SH.terracotta,
  Water: "#5B8DB8",
  Pesticide: "#9B7EC8",
  Fuel: "#C47A5A",
  Transport: "#5BBDB8",
  Storage: "#B8A05B",
  Misc: SH.muted,
};

function ExpenseModal({
  onClose,
  onSave,
  initial,
}: {
  onClose: () => void;
  onSave: (e: Omit<Expense, "id">) => void;
  initial?: Expense;
}) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    description: initial?.description ?? "",
    amount: initial?.amount?.toString() ?? "",
    category: initial?.category ?? "Fertilizer",
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    field: initial?.field ?? "Field A",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
        <div className="flex items-center justify-between mb-5">
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: SH.text }}>
            {initial ? t("pages.expenses.editExpense") : t("pages.expenses.addExpense")}
          </h3>
          <button onClick={onClose}><X size={18} color={SH.muted} /></button>
        </div>
        <div className="flex flex-col gap-3.5">
          <div>
            <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{t("pages.expenses.description")}</label>
            <input
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder={t("pages.expenses.descPlaceholder")}
              className="w-full px-3.5 py-2.5 rounded-lg outline-none"
              style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{t("pages.expenses.amount")}</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                placeholder={t("pages.expenses.amountPlaceholder")}
                className="w-full px-3.5 py-2.5 rounded-lg outline-none"
                style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}
              />
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{t("pages.expenses.date")}</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg outline-none"
                style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{t("pages.expenses.category")}</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg outline-none appearance-none"
                style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}
              >
                {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{t(`dynamic.categories.${c.toLowerCase()}`)}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: "12px", fontWeight: 600, color: SH.text }}>{t("pages.expenses.field")}</label>
              <select
                value={form.field}
                onChange={(e) => setForm((p) => ({ ...p, field: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg outline-none appearance-none"
                style={{ border: `1.5px solid ${SH.border}`, fontSize: "13px", color: SH.text, backgroundColor: "white" }}
              >
                {fieldOptions.map((f) => <option key={f} value={f}>{t(`dynamic.fields.${f.charAt(0).toLowerCase() + f.slice(1).replace(" ", "")}`)}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl" style={{ border: `1.5px solid ${SH.border}`, color: SH.muted, fontSize: "13px" }}>
            {t("common.cancel")}
          </button>
          <button
            onClick={() => {
              if (!form.description || !form.amount) return;
              onSave({ ...form, amount: parseFloat(form.amount) });
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl text-white"
            style={{ backgroundColor: SH.green, fontSize: "13px", fontWeight: 600 }}
          >
            {initial ? t("pages.expenses.saveChanges") : t("pages.expenses.addExpense")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Expenses() {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [modal, setModal] = useState<null | "add" | Expense>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = expenses.filter((e) => {
    const matchCat = catFilter === "All" || e.category === catFilter;
    const matchSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredTotal = filtered.reduce((s, e) => s + e.amount, 0);

  const getDescTranslation = (desc: string) => {
    if (desc === "DAP Fertilizer - 2 bags") return t("dynamic.expenses.dapFertilizer");
    if (desc === "Field A Harvest Labour") return t("dynamic.expenses.harvestLabour");
    if (desc === "Sprinkler pipe repair") return t("dynamic.expenses.sprinklerRepair");
    if (desc === "Neem pesticide spray") return t("dynamic.expenses.neemSpray");
    if (desc === "Paddy seed (BPT5204)") return t("dynamic.expenses.paddySeed");
    if (desc === "Ploughing tractor hire") return t("dynamic.expenses.ploughingHire");
    if (desc === "Diesel for pumpset") return t("dynamic.expenses.dieselPump");
    if (desc === "Organic manure") return t("dynamic.expenses.organicManure");
    return desc;
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: SH.bg }}>
      {modal && (
        <ExpenseModal
          onClose={() => setModal(null)}
          onSave={(data) => {
            if (modal === "add") {
              setExpenses((p) => [{ ...data, id: Date.now() }, ...p]);
            } else {
              setExpenses((p) => p.map((e) => (e.id === (modal as Expense).id ? { ...data, id: e.id } : e)));
            }
          }}
          initial={modal !== "add" ? (modal as Expense) : undefined}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: SH.text }}>
              {t("pages.expenses.title")}
            </h1>
            <p style={{ color: SH.muted, fontSize: "14px", marginTop: "4px" }}>
              {t("pages.expenses.subtitle")}
            </p>
          </div>
          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white"
            style={{ backgroundColor: SH.green, fontSize: "13px" }}
          >
            <Plus size={15} />
            {t("pages.expenses.addExpense")}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl" style={{ backgroundColor: SH.surface, border: `1.5px solid ${SH.border}` }}>
            <Search size={15} color={SH.muted} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("pages.expenses.searchExpenses")}
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: "14px", color: SH.text }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className="px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: catFilter === c ? SH.green : SH.surface,
                  color: catFilter === c ? "white" : SH.muted,
                  border: `1.5px solid ${catFilter === c ? SH.green : SH.border}`,
                  fontSize: "12px",
                }}
              >
                {t(`dynamic.categories.${c.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="p-4 rounded-2xl" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={15} color={SH.turmeric} />
              <span style={{ fontSize: "12px", color: SH.muted }}>{t("pages.expenses.filteredTotal")}</span>
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 700, color: SH.text }}>₹{filteredTotal.toLocaleString("en-IN")}</div>
          </div>
          <div className="p-4 rounded-2xl" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: "12px", color: SH.muted }}>{t("pages.expenses.entries")}</span>
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 700, color: SH.text }}>{filtered.length}</div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: SH.surface, border: `1px solid ${SH.border}` }}>
          <div className="hidden md:grid px-5 py-3" style={{ gridTemplateColumns: "1fr 100px 120px 100px 100px 60px", borderBottom: `1px solid ${SH.border}`, backgroundColor: SH.bg }}>
            {[t("pages.expenses.description"), t("pages.expenses.category"), t("pages.expenses.amount"), t("pages.expenses.date"), t("pages.expenses.field"), ""].map((h) => (
              <div key={h} style={{ fontSize: "11px", fontWeight: 600, color: SH.muted, letterSpacing: "0.04em" }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>💰</div>
              <p style={{ fontSize: "15px", color: SH.muted }}>{t("pages.expenses.noExpenses")}</p>
            </div>
          )}

          {filtered.map((exp, i) => (
            <div
              key={exp.id}
              className="flex flex-col md:grid items-center px-5 py-3.5 gap-2"
              style={{ gridTemplateColumns: "1fr 100px 120px 100px 100px 60px", borderBottom: i < filtered.length - 1 ? `1px solid ${SH.border}` : "none" }}
            >
              <div style={{ fontSize: "14px", fontWeight: 500, color: SH.text }}>{getDescTranslation(exp.description)}</div>
              <div>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: `${catColors[exp.category] || SH.muted}18`, color: catColors[exp.category] || SH.muted, fontSize: "11px", fontWeight: 600 }}>
                  {t(`dynamic.categories.${exp.category.toLowerCase()}`)}
                </span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: SH.terracotta }}>₹{exp.amount.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: "12px", color: SH.muted }}>{exp.date}</div>
              <div style={{ fontSize: "12px", color: SH.muted }}>{t(`dynamic.fields.${exp.field.charAt(0).toLowerCase() + exp.field.slice(1).replace(" ", "")}`)}</div>
              <div className="flex gap-1.5">
                <button onClick={() => setModal(exp)} className="p-1.5 rounded-lg hover:bg-gray-100"><Edit2 size={13} color={SH.muted} /></button>
                <button onClick={() => setExpenses((p) => p.filter((e) => e.id !== exp.id))} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 size={13} color={SH.terracotta} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
